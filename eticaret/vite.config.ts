import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // Dev: /   |  Canlı: https://dogusipeksac.com/eticaret/
  base: mode === 'production' ? '/eticaret/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}))
