import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // El Service Worker se actualiza solo cuando hay una nueva versión publicada
      registerType: 'autoUpdate',
      // Se usa el manifest propio de la US #3 (public/manifest.json), enlazado en index.html
      manifest: false,
      workbox: {
        // Pre-cacheo offline de los recursos estáticos (HTML, CSS, JS e íconos)
        globPatterns: ['**/*.{js,css,html,svg,png,json}'],
        // Rutas profundas (/expenses/:id) funcionan offline y al recargar
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
      // Service Worker solo en el build de producción (npm run build + npm run preview)
      devOptions: { enabled: false },
    }),
  ],
})