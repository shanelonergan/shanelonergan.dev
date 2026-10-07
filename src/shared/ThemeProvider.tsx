import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { safeSet } from './storage'
import { THEME_STORAGE_KEY, type ThemeId } from './themeRegistry'

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  /** Increments on every switch, so effects can react to "a switch happened" */
  switchCount: number
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ initialTheme, children }: { initialTheme: ThemeId; children: ReactNode }) {
  const [theme, setThemeState] = useState(initialTheme)
  const [switchCount, setSwitchCount] = useState(0)

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next)
    setSwitchCount((n) => n + 1)
    document.documentElement.setAttribute('data-theme', next)
    safeSet(THEME_STORAGE_KEY, next)
    // Keep a shared ?theme= link honest: if it's in the URL, it follows the switch.
    const url = new URL(window.location.href)
    if (url.searchParams.has('theme')) {
      url.searchParams.set('theme', next)
      window.history.replaceState(window.history.state, '', url)
    }
  }, [])

  const value = useMemo(() => ({ theme, setTheme, switchCount }), [theme, setTheme, switchCount])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
