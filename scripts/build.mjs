// Client build, SSR build, then prerender every route to static HTML.
// One process, one BUILD_DATE, so "Last modified" matches between server and client.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrOut = resolve(root, 'node_modules/.ssr')

process.env.BUILD_DATE = new Date().toISOString()

await build({ root, logLevel: 'warn' })
await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrOut, emptyOutDir: true },
})

const { render, routes } = await import(pathToFileURL(resolve(ssrOut, 'entry-server.js')).href)
const template = await readFile(resolve(dist, 'index.html'), 'utf8')

for (const route of routes) {
  const { html, head } = render(route)
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
  const file = route === '/404' ? resolve(dist, '404.html') : route === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${route}.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page)
  console.log(`prerendered ${route} → ${file.replace(root + '/', '')}`)
}

await rm(ssrOut, { recursive: true, force: true })
