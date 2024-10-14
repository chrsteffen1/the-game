import {
 defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import { VitePWA } from 'vite-plugin-pwa';

   export default defineConfig({
    base: '/the-game/',
     plugins: [
       react(),
       VitePWA({
         registerType: 'autoUpdate', 
         workbox: {
           globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg}'], // Adjust patterns as needed
         },
         manifest: {
          "name": "The Game",
          "short_name": "Game",
          "start_url": "/the-game/",
          "display": "standalone",
          "background_color": "#ffffff",
          "theme_color": "#ffffff",
          "scope": "/the-game/",
          "icons": [
            {
              "src": "/the-game/icon-192.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "/the-game/icon-512.png",
              "sizes": "512x512",
              "type": "image/png"
            }
          ]
        },
       }),
     ],
   });
