import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categorySchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    slug: z.string(),
    path: z.string(),
  }),
]);

const commentsSchema = z.array(z.object({
  author: z.string(),
  date: z.coerce.date(),
  content: z.string(),
})).default([]);

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
    categories: z.array(categorySchema).default([]),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    canonical: z.string().url().optional(),
    draft: z.boolean().default(false),
    comments: commentsSchema,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    published: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    canonical: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, pages };
