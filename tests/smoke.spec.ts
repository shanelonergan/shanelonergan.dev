import AxeBuilder from '@axe-core/playwright'
import { ROUTES, THEMES, expect, test, visit } from './helpers'

const headings: Record<string, string> = {
  '/': 'Shane',
  '/projects': 'Projects|Friends',
  '/resume': 'Résumé',
  '/bio': 'Bio|About Me|Blurbs',
  '/contact': 'Contact|E-mail|Mail',
}

for (const theme of THEMES) {
  test.describe(theme, () => {
    for (const route of ROUTES) {
      test(`renders ${route}`, async ({ page }) => {
        await visit(page, route, theme)
        await expect(page.locator('main#main')).toBeVisible()
        // In Mac OS 9 the front window's title is the heading for the route
        const title = page.locator('#page-title')
        await expect(title).toBeVisible()
        if (theme === 'macos9' && route === '/') await expect(title).toHaveText('Read Me')
        else await expect(title).toHaveText(new RegExp(headings[route]))
        await expect(page).toHaveTitle(/Shane Lonergan/)
      })

      test(`${route} has no axe violations`, async ({ page }) => {
        await visit(page, route, theme)
        const { violations } = await new AxeBuilder({ page }).analyze()
        expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([])
      })
    }

    test('never scrolls sideways at 360px', async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 740 })
      for (const route of ROUTES) {
        await visit(page, route, theme)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
        expect(overflow, `${route} overflows`).toBeLessThanOrEqual(0)
      }
    })

    test('shows a not-found page', async ({ page }) => {
      await visit(page, '/no-such-page', theme)
      await expect(page.locator('#page-title')).toBeVisible()
      await expect(page.getByText(/not (be )?found/i).first()).toBeVisible()
    })
  })
}

test('every route is prerendered with its own title and real content', async ({ request }) => {
  for (const [route, title] of [
    ['/', 'Shane Lonergan | Full-stack engineer'],
    ['/projects', 'Projects | Shane Lonergan'],
    ['/resume', 'Résumé | Shane Lonergan'],
  ]) {
    const html = await (await request.get(route)).text()
    expect(html).toContain(`<title>${title}</title>`)
    expect(html).toContain('id="page-title"')
  }
})
