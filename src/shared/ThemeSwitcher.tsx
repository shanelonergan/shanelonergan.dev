import { useTheme } from './ThemeProvider'
import { THEME_IDS, isThemeId, prefetchThemes, themeLabels } from './themeRegistry'

export const SWITCHER_ID = 'theme-select'

/** "Best viewed in:" — a native select; each theme styles it via className. */
export function ThemeSwitcher({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  return (
    <div className={`switcher ${className}`} onPointerEnter={prefetchThemes}>
      <label htmlFor={SWITCHER_ID} className="switcher-label">
        Best viewed in:
      </label>
      <select
        id={SWITCHER_ID}
        className="switcher-select"
        value={theme}
        onFocus={prefetchThemes}
        onChange={(e) => {
          if (isThemeId(e.target.value)) setTheme(e.target.value)
        }}
      >
        {THEME_IDS.map((id) => (
          <option key={id} value={id}>
            {themeLabels[id]}
          </option>
        ))}
      </select>
    </div>
  )
}

/** Footer badge: brings the switcher into view and focuses it. */
export function focusSwitcher() {
  const select = document.getElementById(SWITCHER_ID)
  if (!select) return
  select.scrollIntoView({ block: 'center', behavior: 'smooth' })
  select.focus({ preventScroll: true })
}
