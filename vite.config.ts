import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// scripts/build.mjs sets BUILD_DATE once so the client and prerender bundles agree.
const buildDate = process.env.BUILD_DATE ?? new Date().toISOString()

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
})
