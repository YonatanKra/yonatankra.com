#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import {
  WORDPRESS_SITE as SITE,
  categoryPath,
  decodeHtml,
  fetchWordPress,
  mediaUrlsFromHtml,
  normalizeMediaUrl,
  publicPath,
  rewriteImportedHtml,
  uploadPath,
} from './wordpress-migration-utils.mjs';

const API = `${SITE}/wp-json/wp/v2`;
const postDir = path.resolve('src/content/posts');

const url = `${API}/posts?per_page=2&orderby=date&order=desc&status=publish&_embed=1`;
const res = await fetchWordPress(url, { userAgent: 'Mozilla/5.0 yonatankra.com Astro preview migration' });
if (!res.ok || !(res.headers.get('content-type') || '').includes('json')) {
  throw new Error(`Could not fetch preview posts: ${res.status} ${res.statusText}`);
}
const posts = await res.json();
if (posts.length !== 2) throw new Error(`Expected 2 preview posts, got ${posts.length}`);

fs.rmSync(postDir, { recursive: true, force: true });
fs.mkdirSync(postDir, { recursive: true });

const mediaMap = new Map();
function registerMedia(rawUrl) {
  if (!rawUrl) return;
  const normalized = normalizeMediaUrl(rawUrl);
  const dest = uploadPath(normalized);
  if (dest) mediaMap.set(dest, normalized);
}

for (const p of posts) {
  const embeddedTerms = (p._embedded?.['wp:term'] || []).flat();
  const cats = embeddedTerms.filter(t => t.taxonomy === 'category' && t.slug !== 'uncategorized');
  const tags = embeddedTerms.filter(t => t.taxonomy === 'post_tag');
  const featured = p._embedded?.['wp:featuredmedia']?.[0];
  const featuredPath = uploadPath(featured?.source_url);
  const fm = {
    title: decodeHtml(p.title?.rendered),
    slug: p.slug,
    published: p.date,
    updated: p.modified,
    author: decodeHtml(p._embedded?.author?.[0]?.name || 'Yonatan Kra'),
    description: decodeHtml(p.excerpt?.rendered),
    categories: cats.map(c => ({ name: decodeHtml(c.name), slug: c.slug, path: categoryPath(c) })),
    tags: tags.map(t => decodeHtml(t.name)),
    ...(featuredPath ? { featuredImage: publicPath(featuredPath) } : {}),
    canonical: `${SITE}/${p.slug}/`,
    comments: [],
  };

  const originalBody = p.content?.rendered || '';
  const body = rewriteImportedHtml(originalBody);
  fs.writeFileSync(path.join(postDir, `${p.slug}.md`), `---\n${YAML.stringify(fm, { lineWidth: 0 }).trim()}\n---\n\n${body}\n`);

  for (const mediaUrl of mediaUrlsFromHtml(originalBody)) registerMedia(mediaUrl);
  if (featured) {
    registerMedia(featured.source_url);
    for (const size of Object.values(featured.media_details?.sizes || {})) registerMedia(size.source_url);
  }
}

fs.mkdirSync('migration', { recursive: true });
fs.writeFileSync('migration/legacy-posts.json', JSON.stringify(posts.map(p => ({ id: p.id, url: `/${p.slug}/`, title: decodeHtml(p.title?.rendered) })), null, 2) + '\n');
fs.writeFileSync('migration/media-urls.json', JSON.stringify([...mediaMap].map(([dest, mediaUrl]) => ({ dest, url: mediaUrl })), null, 2) + '\n');
console.log(`Preview imported: ${posts.map(p => p.slug).join(', ')}`);
console.log(`Referenced media URLs: ${mediaMap.size}`);
