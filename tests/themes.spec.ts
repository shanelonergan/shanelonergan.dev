import { expect, test, visit } from './helpers'

test.describe('GeoCities', () => {
  test('the hit counter counts once per session', async ({ page }) => {
    await visit(page, '/', 'geocities')
    await expect(page.locator('.gc-counter')).toContainText('number 1')
    await page.getByRole('navigation', { name: 'Site' }).getByRole('link', { name: 'Projects' }).click()
    await page.reload()
    await expect(page.locator('.gc-counter')).toContainText('number 1')
  })

  test('the marquee can be stopped', async ({ page }) => {
    await visit(page, '/', 'geocities')
    const stop = page.getByRole('button', { name: /Stop the scrolling message/ })
    await stop.click()
    await expect(page.getByRole('button', { name: /Scroll the scrolling message/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  test('the bio page moves to Broadway', async ({ page }) => {
    await visit(page, '/bio', 'geocities')
    await expect(page.getByText('Broadway/Stage/1998')).toBeVisible()
  })
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('no startup screen, no marquee movement', async ({ page }) => {
    await page.addInitScript(() => sessionStorage.removeItem('startup-seen'))
    await visit(page, '/', 'macos9')
    await expect(page.locator('.mac-startup')).toHaveCount(0)
    await visit(page, '/', 'geocities')
    const anim = await page.locator('.gc-marquee-text').evaluate((el) => getComputedStyle(el).animationName)
    expect(anim).toBe('none')
  })
})

test.describe('Mac OS 9', () => {
  test('plays the startup screen, and any key skips it', async ({ page }) => {
    await page.addInitScript(() => {
      if (!sessionStorage.getItem('test-started')) {
        sessionStorage.setItem('test-started', '1')
        sessionStorage.removeItem('startup-seen')
      }
    })
    await page.goto('/?theme=macos9')
    await expect(page.locator('.mac-startup')).toBeVisible()
    await page.keyboard.press('Shift')
    await expect(page.locator('.mac-startup')).toHaveCount(0)
  })

  test('works by keyboard: menus, windows and Esc', async ({ page }, info) => {
    test.skip(info.project.name === 'phone', 'desktop menu layout')
    await visit(page, '/', 'macos9')
    // Into the menu bar, over to File, down into it
    await page.getByRole('menuitem', { name: 'File' }).focus()
    await page.keyboard.press('ArrowDown')
    await expect(page.getByRole('menuitem', { name: 'Open Read Me' })).toBeFocused()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects/)
    await expect(page.locator('#page-title')).toHaveText('Projects')
    await expect(page.locator('#page-title')).toBeFocused()

    // Window-shade has a keyboard equivalent
    const collapse = page.getByRole('button', { name: 'Collapse Projects' })
    await collapse.press('Enter')
    await expect(collapse).toHaveAttribute('aria-expanded', 'false')
    await collapse.press('Enter')

    // Esc closes the window and returns focus to its desktop icon
    await page.keyboard.press('Escape')
    await expect(page.locator('#icon-projects')).toBeFocused()
    await expect(page).toHaveURL(/\/(\?|$)/)

    // Enter on an icon opens it
    await page.keyboard.press('Enter')
    await expect(page.locator('#page-title')).toHaveText('Projects')
  })

  test('Finder rows expand with disclosure triangles', async ({ page }) => {
    await visit(page, '/projects', 'macos9')
    const row = page.getByRole('button', { name: 'Indigo' })
    await expect(row).toHaveAttribute('aria-expanded', 'false')
    await row.click()
    await expect(row).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('link', { name: /Open site for Indigo/ })).toBeVisible()
  })

  test('Empty Trash is a modal alert that returns focus', async ({ page }, info) => {
    test.skip(info.project.name === 'phone', 'desktop menu layout')
    await visit(page, '/', 'macos9')
    await page.getByRole('menuitem', { name: 'Special' }).click()
    await page.getByRole('menuitem', { name: 'Empty Trash…' }).click()
    const alert = page.getByRole('alertdialog')
    await expect(alert).toBeVisible()
    await expect(alert.getByRole('button', { name: 'OK' })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(alert.getByRole('button', { name: 'OK' })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(alert).toHaveCount(0)
  })

  test('on a phone, a tap opens an icon and the close box returns to the desktop', async ({ page }, info) => {
    test.skip(info.project.name !== 'phone', 'phone layout')
    await visit(page, '/', 'macos9')
    await page.getByRole('button', { name: 'Close Read Me' }).tap()
    await page.locator('#icon-resume').tap()
    await expect(page.locator('#page-title')).toHaveText('Résumé')
    await expect(page).toHaveURL(/\/resume/)
  })

  test('dragging moves a window', async ({ page }, info) => {
    test.skip(info.project.name === 'phone', 'no dragging on touch')
    await visit(page, '/projects', 'macos9')
    const win = page.locator('.mac-window.is-front')
    const before = (await win.boundingBox())!
    await page.mouse.move(before.x + 150, before.y + 10)
    await page.mouse.down()
    await page.mouse.move(before.x + 350, before.y + 110, { steps: 5 })
    await page.mouse.up()
    const after = (await win.boundingBox())!
    expect(Math.round(after.x - before.x)).toBe(200)
    expect(Math.round(after.y - before.y)).toBe(100)
  })
})

test.describe('MySpace', () => {
  test('the profile song only plays when asked, and stops', async ({ page }) => {
    await page.addInitScript(() => {
      // Count AudioContexts so we can prove nothing starts on load
      const Real = window.AudioContext
      ;(window as unknown as { __audio: number }).__audio = 0
      window.AudioContext = class extends Real {
        constructor() {
          super()
          ;(window as unknown as { __audio: number }).__audio++
        }
      }
    })
    await visit(page, '/', 'myspace')
    await page.waitForTimeout(500)
    expect(await page.evaluate(() => (window as unknown as { __audio: number }).__audio)).toBe(0)
    const play = page.getByRole('button', { name: /Play the profile song/ })
    await play.click()
    await expect(page.getByRole('button', { name: /Stop the profile song/ })).toHaveAttribute('aria-pressed', 'true')
    expect(await page.evaluate(() => (window as unknown as { __audio: number }).__audio)).toBe(1)
    await page.getByRole('button', { name: /Stop the profile song/ }).click()
    await expect(page.getByRole('button', { name: /Play the profile song/ })).toHaveAttribute('aria-pressed', 'false')
  })

  test('the Top 8 lists projects and links to all of them', async ({ page }) => {
    await visit(page, '/', 'myspace')
    await expect(page.locator('.ms-top8 li')).toHaveCount(6)
    await page.getByRole('link', { name: "View All of Shane's Friends" }).click()
    await expect(page).toHaveURL(/\/projects/)
    await expect(page.locator('#page-title')).toHaveText("Shane's Friends")
  })

  test('on a phone, the Top 8 comes before the interests', async ({ page }, info) => {
    test.skip(info.project.name !== 'phone', 'phone layout')
    await visit(page, '/', 'myspace')
    const order = await page.locator('.ms-profile > *').evaluateAll((els) => els.map((e) => e.textContent?.slice(0, 30)))
    const top8 = order.findIndex((t) => t?.includes('Friend Space'))
    const interests = order.findIndex((t) => t?.includes('Interests'))
    expect(top8).toBeGreaterThan(-1)
    expect(top8).toBeLessThan(interests)
  })
})
