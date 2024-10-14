import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

import {
 defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import { VitePWA } from 'vite-plugin-pwa';

   export default defineConfig({
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
           start_url: "/",
           display: "standalone",
           theme_color: "#ffffff", // Your theme color
           background_color: "#ffffff",
           lang: "en",
           scope: "/"// Your PWA manifest configuration here 
         },
       }),
     ],
   });
