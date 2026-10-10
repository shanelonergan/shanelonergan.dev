import { lazy, type ComponentType } from 'react'
import NetscapeLayout from '../themes/netscape/Layout'
import type { Section } from '../content/types'

export const THEME_IDS = ['netscape', 'geocities', 'macos9', 'myspace', 'today'] as const
export type ThemeId = (typeof THEME_IDS)[number]
export const DEFAULT_THEME: ThemeId = 'netscape'
export const THEME_STORAGE_KEY = 'theme'

export interface LayoutProps {
  /** null renders the theme's 404 */
  section: Section | null
}

export const themeLabels: Record<ThemeId, string> = {
  netscape: 'Netscape Navigator (1995)',
  geocities: 'GeoCities (1998)',
  macos9: 'Mac OS 9 (1999)',
  myspace: 'MySpace (2006)',
  today: 'Today (2026)',
}

const loaders = {
  geocities: () => import('../themes/geocities/Layout'),
  macos9: () => import('../themes/macos9/Layout'),
  myspace: () => import('../themes/myspace/Layout'),
  today: () => import('../themes/today/Layout'),
}

// Netscape is the default, so it ships in the main bundle; the others are separate chunks.
export const layouts: Record<ThemeId, ComponentType<LayoutProps>> = {
  netscape: NetscapeLayout,
  geocities: lazy(loaders.geocities),
  macos9: lazy(loaders.macos9),
  myspace: lazy(loaders.myspace),
  today: lazy(loaders.today),
}

/** Warm the chunk cache before the visitor commits to a theme. */
export function prefetchThemes() {
  loaders.geocities()
  loaders.macos9()
  loaders.myspace()
  loaders.today()
}

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value)
}
