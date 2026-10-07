import { Suspense, useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router'
import { sectionForPath } from './content/site'
import { Announcer, announce } from './shared/announce'
import { useFocusPageTitle } from './shared/hooks'
import { pageTitle } from './shared/meta'
import { ThemeProvider, useTheme } from './shared/ThemeProvider'
import { layouts, themeLabels, type ThemeId } from './shared/themeRegistry'

/** Reveals the page once a non-default theme has actually rendered (see base.css). */
function Ready() {
  useEffect(() => {
    document.documentElement.classList.add('theme-ready')
  }, [])
  return null
}

function Shell() {
  const { pathname } = useLocation()
  const { theme, switchCount } = useTheme()
  const section = sectionForPath(pathname) ?? null
  const Layout = layouts[theme]

  useEffect(() => {
    document.title = pageTitle(section)
  }, [section])

  // Scrolling is per-theme for Mac OS 9 (it has no page scroll), harmless elsewhere.
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (switchCount > 0) announce(`Now viewing in ${themeLabels[theme]}`)
  }, [theme, switchCount])

  useFocusPageTitle(pathname, switchCount)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Suspense
        fallback={
          <p className="theme-loading" role="status">
            Contacting host…
          </p>
        }
      >
        <Layout section={section} />
        <Ready />
      </Suspense>
      <Announcer />
    </>
  )
}

export default function App({ initialTheme }: { initialTheme: ThemeId }) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <Shell />
    </ThemeProvider>
  )
}
