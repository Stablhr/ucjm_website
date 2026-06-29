import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/*.jpg', 'images/*.png', 'songs.json'],
      manifest: {
        name: 'UCJM Church',
        short_name: 'UCJM',
        description: 'Unity in Christ Jesus Ministries — Church Website',
        theme_color: '#0a1db0',
        background_color: '#FAF9F7',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/images/logo.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
          },
          {
            src: '/images/logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,json,jpg,png,svg,ico}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/smqbmromffltzihpjbfe\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ],
})
