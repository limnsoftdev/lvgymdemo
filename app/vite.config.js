import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works on a GitHub Pages project path
// (/lvgymdemo/) as well as on a custom domain.
export default defineConfig({
  base: './',
  plugins: [react()],
})
