import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [mdx(), svelte()],
  build: {
    inlineStylesheets: "always",
    assetsPrefix: "_lasse",
  },
  site: "https://bomh.net",
  vite: {
    server: {
      watch: {
        ignored: ["**/.direnv/**"],
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: "dark-plus",
    },
  },
  devToolbar: { enabled: false },
});
