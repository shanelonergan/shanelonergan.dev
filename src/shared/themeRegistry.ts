import { lazy, type ComponentType } from 'react'
import NetscapeLayout from '../themes/netscape/Layout'
import type { Section } from '../content/types'

export const THEME_IDS = ['netscape', 'geocities', 'macos9'] as const
export type ThemeId = (typeof THEME_IDS)[number]
export const DEFAULT_THEME: ThemeId = 'netscape'
export const THEME_STORAGE_KEY = 'theme'

export interface LayoutProps {
  /** null renders the theme's 404 */
  section: Section | null
}

export const themeLabels: Record<ThemeId, string> = {
  netscape: 'Netscape Navigator (1996)',
  geocities: 'GeoCities (1998)',
  macos9: 'Mac OS 9 (1999)',
}

const loaders = {
  geocities: () => import('../themes/geocities/Layout'),
  macos9: () => import('../themes/macos9/Layout'),
}

// Netscape is the default, so it ships in the main bundle; the others are separate chunks.
export const layouts: Record<ThemeId, ComponentType<LayoutProps>> = {
  netscape: NetscapeLayout,
  geocities: lazy(loaders.geocities),
  macos9: lazy(loaders.macos9),
}

/** Warm the chunk cache before the visitor commits to a theme. */
export function prefetchThemes() {
  loaders.geocities()
  loaders.macos9()
}

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value)
}
