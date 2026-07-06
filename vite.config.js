import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'UCJM Church',
        short_name: 'UCJM',
        description: 'UCJM Church Website',
        theme_color: '#ffffff',
        icons: [
          { src: '/images/logo.jpg', sizes: '192x192', type: 'image/jpeg' },
          { src: '/images/logo.jpg', sizes: '512x512', type: 'image/jpeg' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,jpg,jpeg,png,svg,woff,woff2}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/smqbmromffltzihpjbfe\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
              networkTimeoutSeconds: 10
            }
          }
        ]
      }
    })
  ],
})
