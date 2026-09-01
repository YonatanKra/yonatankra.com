import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Yonatan Kra'),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    canonical: z.string().url().optional(),
    draft: z.boolean().default(false),
    comments: z.array(z.object({
      author: z.string(),
      date: z.coerce.date(),
      content: z.string(),
    })).default([]),
  }),
});

export const collections = { posts };
