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
           name: "the-game",
           short_name: "the-game",
           start_url: "/the-game/",
           display: "standalone",
           theme_color: "#ffffff", 
           background_color: "#ffffff",
           lang: "en",
           scope: "/the-game/"
         },
       }),
     ],
   });
