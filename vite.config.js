import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { contentApiPlugin } from './vite.content-api.js'

// src/lib/ContentContext.jsx imports this file directly so a static build
// (no server, e.g. GitHub Pages) still has real content instead of bare
// placeholders — which means it must exist before Vite resolves that
// import, or the build fails outright. Guaranteed here rather than relying
// on it already being there (a fresh clone, before anyone's used /admin,
// wouldn't have one yet).
const contentJsonPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'content.json')
if (!fs.existsSync(contentJsonPath)) {
  fs.writeFileSync(contentJsonPath, '{}\n')
}

// https://vite.dev/config/
export default defineConfig({
  // Overridden by the GitHub Pages workflow (VITE_BASE_PATH=/TRS_Website/)
  // for that preview build. Local dev and the eventual production deploy
  // under bvmengineering.ac.in/TRS/ both set this differently — keep it an
  // env var rather than hard-coding either path here.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss(), contentApiPlugin()],
})
