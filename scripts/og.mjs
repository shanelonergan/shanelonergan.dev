// Builds public/og.png (1200×630): the home page in all three eras, side by side.
// Usage: node scripts/og.mjs [baseURL]   (needs `npm run build` + a running preview)
import { chromium } from '@playwright/test'

const base = process.argv[2] ?? 'http://localhost:4173'
const themes = ['netscape', 'geocities', 'macos9']
const browser = await chromium.launch()
const shots = []
for (const theme of themes) {
  const page = await browser.newPage({ viewport: { width: 400, height: 630 }, deviceScaleFactor: 1 })
  await page.addInitScript(() => sessionStorage.setItem('startup-seen', '1'))
  await page.goto(`${base}/?theme=${theme}`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: '*{animation:none!important} .gc-marquee-text{padding-left:8px!important}' })
  await page.waitForTimeout(200)
  shots.push((await page.screenshot()).toString('base64'))
  await page.close()
}
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(`<body style="margin:0;display:flex;background:#000">${shots
  .map((s) => `<img src="data:image/png;base64,${s}" style="width:400px;height:630px;border-right:2px solid #000">`)
  .join('')}</body>`)
await page.screenshot({ path: 'public/og.png' })
await browser.close()
console.log('wrote public/og.png')
