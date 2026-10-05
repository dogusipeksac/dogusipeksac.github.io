import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // Dev: /   |  Canlı (GitHub Pages): https://dogusipeksac.com/eticaret/dist/
  base: mode === 'production' ? '/eticaret/dist/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}))
