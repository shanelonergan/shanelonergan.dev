import { useCallback, useEffect, useLayoutEffect, useState, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useMediaQuery, usePrefersReducedMotion } from '../../shared/hooks'
import { safeGet, safeSet } from '../../shared/storage'

export type House = 'up' | 'down'
const HOUSE_KEY = 'house-lights'

/**
 * "House lights": this theme's light/dark mode. Down is show mode (dark),
 * up is a matinee (light). It follows the system until the visitor flips
 * the switch, and the choice is remembered. The attribute lives on <html>
 * so the page background follows too, and it's removed when the theme unmounts.
 */
export function useHouseLights(): [House, () => void] {
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [override, setOverride] = useState<House | null>(() => {
    const saved = safeGet(HOUSE_KEY)
    return saved === 'up' || saved === 'down' ? saved : null
  })
  const house: House = override ?? (systemDark ? 'down' : 'up')

  useEffect(() => {
    document.documentElement.setAttribute('data-house', house)
    return () => document.documentElement.removeAttribute('data-house')
  }, [house])

  const toggle = useCallback(() => {
    const next: House = house === 'down' ? 'up' : 'down'
    setOverride(next)
    safeSet(HOUSE_KEY, next)
  }, [house])

  return [house, toggle]
}

/**
 * Scene changes: in-app navigation wrapped in a view transition, when the
 * browser supports it and motion is welcome. React Router commits navigations
 * as a low-priority transition that flushSync can't force, so the view
 * transition's update callback waits for the Layout's commit effect to resolve
 * it (with a timeout, so a page can never get stuck mid-change).
 */
let pendingScene: (() => void) | null = null

/** Mounted once in the Layout: resolves the pending scene change after each route commit. */
export function useSceneCommit() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    pendingScene?.()
    pendingScene = null
  }, [pathname])
}

export function useSceneChange() {
  const navigate = useNavigate()
  const reduced = usePrefersReducedMotion()
  return useCallback(
    (to: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (reduced || typeof document.startViewTransition !== 'function') return
      if (to === window.location.pathname) return
      e.preventDefault()
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            const timer = window.setTimeout(resolve, 600)
            pendingScene = () => {
              window.clearTimeout(timer)
              resolve()
            }
            navigate(to)
          }),
      )
    },
    [navigate, reduced],
  )
}
