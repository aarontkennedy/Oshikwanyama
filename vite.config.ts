import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { themeChoice } from './scripts/theme-choice.mjs';

export default defineConfig({
  // Relative base so the build works at any path (e.g. username.github.io/Oshikwanyama/).
  base: './',
  server: { host: true }, // reachable from your phone on the same Wi-Fi
  // Dark blocks also follow the Appearance choice (scripts/theme-choice.mjs).
  css: { postcss: { plugins: [themeChoice()] } },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png'],
      manifest: {
        name: 'Oshikwanyama',
        short_name: 'Oshikwanyama',
        description: 'A companion to Hai ti!, a beginner’s guide to Oshikwanyama: every chapter, with quizzes. Works offline.',
        theme_color: '#15110e',
        background_color: '#15110e',
        display: 'standalone',
        orientation: 'any',
        lang: 'en',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache everything so the whole app works offline after the first visit.
        globPatterns: ['**/*.{js,css,html,png,svg,woff2,txt}'],
      },
    }),
  ],
});
