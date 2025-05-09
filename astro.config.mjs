import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://coulsyjoinery.co.uk/",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [
    tailwind(),
    sitemap({
      // configuration options
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2024-07-31"),
      redirects: {
        "/joinery-services/truss-roofs": {
          status: 302,
          destination: "/joinery-services/truss-roof-installers",
        },
      },
    }),
  ],
});
