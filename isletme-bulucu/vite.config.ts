import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // Dev: /  |  Production (GitHub Pages): /isletme-bulucu/dist/
  base: mode === 'production' ? '/isletme-bulucu/dist/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}))
