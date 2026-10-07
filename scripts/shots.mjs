// Screenshot every route in a theme at phone and desktop widths, for design review.
// Usage: node scripts/shots.mjs [theme] [baseURL]   → screenshots/<theme>/<route>-<width>.png
import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const theme = process.argv[2] ?? 'netscape'
const base = process.argv[3] ?? 'http://localhost:4173'
const routes = ['/', '/projects', '/resume', '/bio', '/contact', '/nope']
const widths = [390, 1280]
const outDir = `screenshots/${theme}`

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 600 ? 844 : 800 } })
  // Skip one-time intros (e.g. a startup screen) for review shots
  await page.addInitScript(() => sessionStorage.setItem('startup-seen', '1'))
  for (const route of routes) {
    await page.goto(`${base}${route}?theme=${theme}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    const name = route === '/' ? 'home' : route.slice(1)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    await page.screenshot({ path: `${outDir}/${name}-${width}.png`, fullPage: true })
    console.log(`${name}-${width}${overflow > 0 ? `  ⚠ horizontal overflow ${overflow}px` : ''}`)
  }
  await page.close()
}
await browser.close()
