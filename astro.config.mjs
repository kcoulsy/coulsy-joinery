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
  changefreq: "weekly",
  priority: 0.7,
  serialize: (page) => ({
    ...page,
    lastmod: page.data?.lastmod || new Date().toISOString(),
  }),
}),
  ],
});
