import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://coulsyjoinery.co.uk/",
  trailingSlash: "never",
  integrations: [
    tailwind(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      serialize: (page) => ({
        ...page,
        lastmod: page.data?.lastmod || new Date().toISOString(),
      }),
    }),
  ],
  image: {
    // Enable image optimization
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    // Generate multiple formats for better browser support
    formats: ["webp", "avif"],
    // Responsive image sizes
    densities: [1, 2],
    // Quality settings
    quality: 80,
  },
  vite: {
    build: {
      minify: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    esbuild: {
      minify: false,
    },
  },
  // Try to disable Astro's built-in HTML compression
  build: {
    inlineStylesheets: "never",
  },
});

