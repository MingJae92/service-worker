import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'service-worker',
        short_name: 'App',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'path/to/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'path/to/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom', // Use jsdom for DOM testing in Vitest
    globals: true, // Allows global test methods like describe, test, etc.
    setupFiles: '../vitest.setup.js', // Setup file for jest-dom matchers
    coverage: {
      reporter: ['text', 'json', 'html'], // Coverage reporting formats
    },
  },
});
