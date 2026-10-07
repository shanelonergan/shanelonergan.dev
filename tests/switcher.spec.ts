import { expect, test, visit } from './helpers'

test('switching keeps you on the same section and moves focus to its heading', async ({ page }) => {
  await visit(page, '/resume', 'netscape')
  await page.selectOption('#theme-select', 'geocities')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'geocities')
  await expect(page).toHaveURL(/\/resume/)
  await expect(page.locator('#page-title')).toBeFocused()
  await expect(page.getByRole('status').filter({ hasText: 'Now viewing in GeoCities' })).toBeAttached()
})

test('the choice persists across reloads and pages', async ({ page }) => {
  await page.goto('/')
  await page.selectOption('#theme-select', 'macos9')
  await page.goto('/projects', { waitUntil: 'networkidle' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'macos9')
  await expect(page.locator('#page-title')).toHaveText('Projects')
})

test('?theme= wins over the saved choice, and bad values fall back', async ({ page }) => {
  await page.goto('/')
  await page.selectOption('#theme-select', 'geocities')
  await page.goto('/?theme=macos9')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'macos9')
  await page.goto('/?theme=netscape-4')
  // An unknown value is ignored; the last valid choice (macos9) stays
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'macos9')
})

test('a shared ?theme= link follows a switch', async ({ page }) => {
  await visit(page, '/', 'geocities')
  await page.selectOption('#theme-select', 'netscape')
  await expect(page).toHaveURL(/theme=netscape/)
})

test('the footer badge focuses the switcher', async ({ page }) => {
  for (const theme of ['netscape', 'geocities'] as const) {
    await visit(page, '/', theme)
    await page.getByRole('button', { name: /Best viewed in/ }).click()
    await expect(page.locator('#theme-select')).toBeFocused()
  }
  await visit(page, '/', 'macos9')
  // On phones the Read Me window covers the desktop's sticky note, so close it first
  await page.getByRole('button', { name: 'Close Read Me' }).click()
  await page.getByRole('button', { name: 'Best viewed in…' }).click()
  await expect(page.locator('#theme-select')).toBeFocused()
})
