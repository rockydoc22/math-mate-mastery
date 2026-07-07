import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mcpPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "AlphaOmega — Every Test, Every Time",
        short_name: "AlphaOmega",
        description: "Free test prep for SAT, ACT, AP, GED, MAP & more — 15,000+ questions",
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
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'apush-bank': ['./src/data/apush_full_question_bank.json'],
          'apush-bank-v2': ['./src/data/apush_full_question_bank_v2.json'],
          'aplit-bank': ['./src/data/aplit_full_question_bank.json'],
          'aplit-bank-v2': ['./src/data/aplit_full_question_bank_v2.json'],
          'apcalcbc-bank': ['./src/data/apcalcbc_full_question_bank.json'],
          'apcalcbc-bank-v2': ['./src/data/apcalcbc_full_question_bank_v2.json'],
          'ap-chem-bank': ['./src/data/ap_chem_full_question_bank.json'],
          'ap-physics-bank': ['./src/data/ap_physics_2_question_bank_lovable.json'],
          'ap-mega-bank-v2': ['./src/data/ap_mega_bank_v2.json'],
          'ap-mega-bank-lovable': ['./src/data/ap_mega_bank_lovable.json'],
          'ccff-practice': ['./src/data/ccff_french_competition_practice.json'],
          'ccff-winning': ['./src/data/ccff_winning_pack.json'],
          'ccff-phrases': ['./src/data/ccff_elite_french_phrases_pack.json'],
          'frq-histories': ['./src/data/ap_histories_frq_pack.json'],
          'frq-english': ['./src/data/ap_english_essays_and_anchors.json'],
          'frq-calc': ['./src/data/ap_calc_ab_bc_frq_pack.json'],
          'frq-chem-stats': ['./src/data/ap_chem_stats_apes_frq_pack.json'],
          'frq-csp': ['./src/data/ap_csp_create_task_pack.json'],
        },
      },
    },
  },
}));
