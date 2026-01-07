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
      filter: (page) => {
        // Exclude web-development (off-topic)
        if (page.includes('/web-development')) return false;
        
        // Exclude supporting pages (trust signals, not enquiry drivers)
        if (page.includes('/about/sustainability')) return false;
        if (page.includes('/about/compliance')) return false;
        if (page.includes('/about/qualifications')) return false;
        
        return true;
      },
      serialize: (page) => {
        let priority = 0.7; // Default
        let changefreq = "weekly";
        
        // Homepage - highest priority
        if (page === 'https://coulsyjoinery.co.uk/') {
          priority = 1.0;
          changefreq = "daily";
        }
        
        // Base service pages - very high priority (category pages)
        if (page.match(/\/joinery-services\/[a-z-]+$/)) {
          priority = 0.95;
          changefreq = "weekly";
        }
        
        // Location pages - high priority (money pages)
        if (page.match(/\/joinery-services\/[a-z-]+-[a-z-]+$/)) {
          priority = 0.9;
          changefreq = "weekly";
        }
        
        // Contact page - high priority
        if (page.includes('/contact')) {
          priority = 0.9;
          changefreq = "weekly";
        }
        
        // Services overview - high priority
        if (page === 'https://coulsyjoinery.co.uk/joinery-services') {
          priority = 0.85;
          changefreq = "weekly";
        }
        
        // FAQ - medium-high priority
        if (page.includes('/faq')) {
          priority = 0.8;
          changefreq = "monthly";
        }
        
        // About - medium priority
        if (page === 'https://coulsyjoinery.co.uk/about') {
          priority = 0.7;
          changefreq = "monthly";
        }
        
        return {
          ...page,
          priority,
          changefreq,
          lastmod: page.data?.lastmod || new Date().toISOString(),
        };
      },
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
  // CSS handling - allow auto-inlining for better consistency
  build: {
    inlineStylesheets: "auto",
  },
});

