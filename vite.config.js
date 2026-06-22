import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  server: { port: 5176 },
  // vite-ssg: pre-render every static route to HTML at build time.
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
