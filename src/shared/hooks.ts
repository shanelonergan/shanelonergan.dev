import { useEffect, useRef, useSyncExternalStore } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MOTION)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
}

export const PAGE_TITLE_ID = 'page-title'

/**
 * After a route change or theme switch (never on first load), move focus to the
 * page's <h1 id="page-title" tabIndex={-1}>. Lazy themes may not have rendered
 * it yet, so retry for about a second. Pass enabled=false for navigations that
 * shouldn't move focus (e.g. clicking into a Mac OS 9 window updates the URL).
 */
export function useFocusPageTitle(enabled: boolean, ...deps: unknown[]) {
  // Compare against the previous deps rather than a "first run" flag, so
  // StrictMode's double-invoked mount effect doesn't steal focus on load.
  const prev = useRef(deps)
  useEffect(() => {
    if (deps.every((d, i) => Object.is(d, prev.current[i]))) return
    prev.current = deps
    if (!enabled) return
    let frame = 0
    let tries = 0
    const tick = () => {
      // While a lazy theme loads, Suspense keeps the old h1 in the DOM but hidden,
      // and focus() on it silently fails, so keep trying until focus actually lands.
      const el = document.getElementById(PAGE_TITLE_ID)
      el?.focus()
      if ((!el || document.activeElement !== el) && tries++ < 90) frame = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Location state a theme can pass to navigate() to keep focus where it is. */
export interface NavState {
  keepFocus?: boolean
}
