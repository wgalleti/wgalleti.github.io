import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import adminPlugin from './vite-plugin-admin.js'

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    ...(command === 'serve' ? [adminPlugin()] : [])
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
