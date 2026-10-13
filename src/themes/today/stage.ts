import { useCallback, useEffect, useRef, useState, type MouseEvent, type RefObject } from 'react'
import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router'
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
 * The follow-spot. On hover-capable devices the hero's --st-sx/--st-sy follow
 * the pointer; CSS eases them (@property + transition). Elsewhere a CSS
 * keyframe drifts the spot, and under reduced motion it holds still.
 */
export function useSpotlight(ref: RefObject<HTMLElement | null>) {
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduced = usePrefersReducedMotion()
  const frame = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el || !canHover || reduced) return
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--st-sx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
        el.style.setProperty('--st-sy', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame.current)
      el.style.removeProperty('--st-sx')
      el.style.removeProperty('--st-sy')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame.current)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      onLeave()
    }
  }, [ref, canHover, reduced])
}

/**
 * Scene changes: in-app navigation wrapped in a view transition (a short
 * crossfade), when the browser supports it and motion is welcome. Returns
 * an onClick for a <Link>; the router still handles modified clicks and
 * browsers without the API.
 */
export function useSceneChange() {
  const navigate = useNavigate()
  const reduced = usePrefersReducedMotion()
  return useCallback(
    (to: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (reduced || typeof document.startViewTransition !== 'function') return
      e.preventDefault()
      document.startViewTransition(() => {
        flushSync(() => navigate(to))
      })
    },
    [navigate, reduced],
  )
}
