import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// import purgecss from "astro-purgecss";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://coulsyjoinery.co.uk/',
  integrations: [tailwind(),
    sitemap({
    // configuration options
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date('2024-07-31'),
  }),
    
  ],
  

});