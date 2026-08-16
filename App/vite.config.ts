import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // На проде /api/* обслуживают функции Vercel. Локально вместо них
      // json-server, а он отдаёт коллекции в корне: /products, не /api/products.
      // Без этого переписывания весь каталог в dev отвечал 404.
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
