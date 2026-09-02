import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const canonicalSite = 'https://yonatankra.com';
const previewBase = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site: canonicalSite,
  base: previewBase,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        if (previewBase !== '/') {
          const normalizedBase = previewBase.replace(/^\/+|\/+$/g, '');
          item.url = item.url.replace(
            `${canonicalSite}/${normalizedBase}/`,
            `${canonicalSite}/`,
          );
        }
        return item;
      },
    }),
  ],
});
