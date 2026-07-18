import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/pages/posts" }),
  schema: z.object({
    title: z.string(),
    // description: z.string(),
    // pubDate: z.coerce.date(),
  }),
});

const snippets = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "src/snippets" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { posts, snippets };
