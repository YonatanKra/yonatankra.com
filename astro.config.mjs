import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yonatankra.com',
  base: process.env.PUBLIC_BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
