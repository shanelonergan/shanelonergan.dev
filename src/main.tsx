import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { DEFAULT_THEME, isThemeId } from './shared/themeRegistry'
import './shared/base.css'

// The inline script in index.html has already resolved ?theme= → localStorage → default.
const attr = document.documentElement.getAttribute('data-theme')
const theme = isThemeId(attr) ? attr : DEFAULT_THEME
const root = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <App initialTheme={theme} />
    </BrowserRouter>
  </StrictMode>
)

// Pages are prerendered in the default theme. Hydrate that; for any other theme
// the markup won't match, so render fresh (base.css keeps it hidden until ready).
if (theme === DEFAULT_THEME && root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  root.textContent = ''
  createRoot(root).render(app)
}
