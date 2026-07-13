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

        // /about/qualifications IS included: it carries City & Guilds, CSCS, CITB,
        // GQA, FireQual, NVQ L7 and ICWCI. Those are the experience/expertise signals,
        // and it is the target of every "view my credentials" link on the site.

        return true;
      },
      serialize: (item) => {
        const url = item.url;
        let priority = 0.7;
        let changefreq = "weekly";

        if (url === 'https://coulsyjoinery.co.uk/') {
          priority = 1.0;
          changefreq = "daily";
        } else if (url.includes('/joinery-services/')) {
          priority = 0.9;
        } else if (url === 'https://coulsyjoinery.co.uk/joinery-services') {
          priority = 0.85;
        } else if (url.includes('/contact')) {
          priority = 0.9;
        } else if (url.includes('/faq')) {
          priority = 0.8;
          changefreq = "monthly";
        } else if (url === 'https://coulsyjoinery.co.uk/about') {
          priority = 0.7;
          changefreq = "monthly";
        }

        return {
          ...item,
          priority,
          changefreq,
          lastmod: item.lastmod || new Date().toISOString(),
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

