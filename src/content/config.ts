import { defineCollection, z } from 'astro:content';

const stuffILikeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    date: z.date(),
    lang: z.enum(['en', 'fr', 'kr']).default('en'),
  }),
});

const snippetsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    tags: z.array(z.string()),
    date: z.date(),
    lang: z.enum(['en', 'fr', 'kr']).default('en'),
  }),
});

export const collections = {
  'stuff-i-like': stuffILikeCollection,
  'snippets': snippetsCollection,
};
