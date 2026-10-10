import { test as base, expect, type Page } from '@playwright/test'

export const THEMES = ['netscape', 'geocities', 'macos9', 'myspace', 'today'] as const
export const ROUTES = ['/', '/projects', '/resume', '/bio', '/contact'] as const

/**
 * A page that skips the Mac OS 9 startup screen and fails the test on any
 * uncaught error or console error (hydration mismatches included).
 */
export const test = base.extend<{ page: Page }>({
  page: async ({ page }, provide) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('console', (m) => {
      // The not-found tests get a real 404 status, which Chrome logs as an error
      if (m.type() === 'error' && !m.text().includes('status of 404')) errors.push(m.text())
    })
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem('startup-seen', '1')
      } catch {
        /* storage blocked: the startup screen will just play */
      }
    })
    await provide(page)
    expect(errors, 'console or page errors').toEqual([])
  },
})

export { expect }

export async function visit(page: Page, route: string, theme: string) {
  await page.goto(`${route}?theme=${theme}`, { waitUntil: 'networkidle' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
}
