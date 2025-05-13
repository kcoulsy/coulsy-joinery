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
      filter: (page) => ({
        ...page,
        lastmod: new Date().toISOString(),
      }),
      redirects: {
        "/joinery-services/truss-roofs": {
          status: 302,
          destination: "/joinery-services/truss-roof-installers",
        },
      },
    }),
  ],
});
