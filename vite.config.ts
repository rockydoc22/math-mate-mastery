import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "40² - The Path to 1600",
        short_name: "40²",
        description: "Master the SAT with 1000+ hard practice questions",
        theme_color: "#6366f1",
        background_color: "#0f0f23",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Only cache JS, CSS, and assets - NEVER cache HTML
        globPatterns: ["**/*.{js,css,ico,png,svg,woff2}"],
        // Explicitly exclude index.html from precache
        globIgnores: ["**/index.html", "**/node_modules/**"],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        skipWaiting: true,
        clientsClaim: true,
        navigationPreload: false,
        cleanupOutdatedCaches: true,
        // Navigation requests (HTML) should ALWAYS go to network
        navigateFallback: null,
        runtimeCaching: [
          {
            // Force network-first for ALL navigation requests (HTML pages)
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60, // 1 hour max
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
