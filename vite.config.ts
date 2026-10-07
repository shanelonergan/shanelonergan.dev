import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// scripts/build.mjs sets BUILD_DATE once so the client and prerender bundles agree.
const buildDate = process.env.BUILD_DATE ?? new Date().toISOString()

/** Make `vite preview` behave like Netlify: unknown paths get 404.html with a 404 status. */
function netlify404(): Plugin {
  return {
    name: 'netlify-404',
    configurePreviewServer(server) {
      // Runs before the static server, so only paths with no file behind them get the 404 page
      const outDir = resolve(server.config.root, server.config.build.outDir)
      const exists = (p: string) => existsSync(p) && statSync(p).isFile()
      server.middlewares.use((req, res, next) => {
        const path = decodeURIComponent((req.url ?? '/').split('?')[0])
        const file = resolve(outDir, `.${path}`)
        if (exists(file) || exists(`${file}.html`) || exists(resolve(file, 'index.html'))) return next()
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(readFileSync(resolve(outDir, '404.html')))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), netlify404()],
  // No SPA fallback: every real page is prerendered, as on Netlify
  appType: 'mpa',
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
})
