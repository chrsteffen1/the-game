// Suggested code may be subject to a license. Learn more: ~LicenseLog:2098669325.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3340542294.

import { defineConfig } from 'vite'; // Import only once
import react from '@vitejs/plugin-react'; // Import only once
import { VitePWA } from 'vite-plugin-pwa'; // Import only once

export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg}'], 
      },
      manifest: {
        name: "the-game",
        short_name: "the-game",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff", 
        background_color: "#ffffff",
        lang: "en",
        scope: "/" 
      },
    }),
  ],
});
