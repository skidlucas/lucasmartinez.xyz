import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stuffILikeCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/stuff-i-like',
  }),
  schema: z.object({
    title: z.string(),
    url: z.url(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    date: z.coerce.date(),
    lang: z.enum(['en', 'fr', 'kr']).default('en'),
  }),
});

const snippetsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/snippets',
  }),
  schema: z.object({
    title: z.string(),
    url: z.url(),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    lang: z.enum(['en', 'fr', 'kr']).default('en'),
  }),
});

export const collections = {
  'stuff-i-like': stuffILikeCollection,
  snippets: snippetsCollection,
};
