import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [sitemap(), mdx(), svelte()],
  build: {
    inlineStylesheets: "always",
  },
  site: "https://bomh.net",
  vite: {
    server: {
      watch: {
        ignored: ["**/.direnv/**"],
      },
    },
  },
  server: {
    allowedHosts: true,
  },
  markdown: {
    shikiConfig: {
      theme: "dark-plus",
    },
  },
  devToolbar: { enabled: false },
});
