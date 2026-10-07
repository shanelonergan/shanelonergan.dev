import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { sectionForPath, sections } from './content/site'
import { headTags } from './shared/meta'
import { DEFAULT_THEME } from './shared/themeRegistry'

export const routes = [...sections.map((s) => s.path), '/404']

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App initialTheme={DEFAULT_THEME} />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, head: headTags(sectionForPath(url) ?? null) }
}
