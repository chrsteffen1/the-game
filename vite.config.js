import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg}'],
      },
      manifest: {
        // Your PWA manifest configuration here
      },
    }),
  ],
  // Remove or adjust the base path
  base: process.env.NODE_ENV === 'production' ? '/the-game/' : '/', 
});
