import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { contentApiPlugin } from './vite.content-api.js'

// https://vite.dev/config/
export default defineConfig({
  // Overridden by the GitHub Pages workflow (VITE_BASE_PATH=/TRS_Website/)
  // for that preview build. Local dev and the eventual production deploy
  // under bvmengineering.ac.in/TRS/ both set this differently — keep it an
  // env var rather than hard-coding either path here.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss(), contentApiPlugin()],
})
