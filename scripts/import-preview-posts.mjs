#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const SITE = 'https://yonatankra.com';
const API = `${SITE}/wp-json/wp/v2`;
const postDir = path.resolve('src/content/posts');

function decodeHtml(s = '') {
  return s.replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"').replaceAll('&#039;', "'").replaceAll('&nbsp;', ' ').trim();
}

function uploadPath(url) {
  if (!url) return undefined;
  try {
    const u = new URL(url.startsWith('//') ? `https:${url}` : url, SITE);
    const marker = '/wp-content/uploads/';
    const i = u.pathname.indexOf(marker);
    return i >= 0 ? decodeURIComponent(u.pathname.slice(i)) : undefined;
  } catch { return undefined; }
}

function categoryPath(term) {
  try { return new URL(term.link).pathname.match(/\/category\/(.+?)\/?$/)?.[1] || term.slug; }
  catch { return term.slug; }
}

function mediaUrlsFromHtml(html = '') {
  const found = new Set();
  for (const m of html.matchAll(/(?:https?:)?\/\/[^"'\s<>]+|\/wp-content\/uploads\/[^"'\s<>]+/g)) {
    const raw = m[0].replaceAll('&amp;', '&');
    if (uploadPath(raw)) found.add(raw.startsWith('/') ? `${SITE}${raw}` : raw.startsWith('//') ? `https:${raw}` : raw);
  }
  return found;
}

const url = `${API}/posts?per_page=2&orderby=date&order=desc&status=publish&_embed=1`;
const res = await fetch(url, {
  signal: AbortSignal.timeout(30000),
  headers: { 'user-agent': 'Mozilla/5.0 yonatankra.com Astro preview migration', accept: 'application/json' },
});
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
  const normalized = rawUrl.startsWith('/') ? `${SITE}${rawUrl}` : rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
  const dest = uploadPath(normalized);
  if (dest) mediaMap.set(dest, normalized);
}

for (const p of posts) {
  const embeddedTerms = (p._embedded?.['wp:term'] || []).flat();
  const cats = embeddedTerms.filter(t => t.taxonomy === 'category' && t.slug !== 'uncategorized');
  const tags = embeddedTerms.filter(t => t.taxonomy === 'post_tag');
  const featured = p._embedded?.['wp:featuredmedia']?.[0];
  const fm = {
    title: decodeHtml(p.title?.rendered),
    slug: p.slug,
    published: p.date,
    updated: p.modified,
    author: decodeHtml(p._embedded?.author?.[0]?.name || 'Yonatan Kra'),
    description: decodeHtml(p.excerpt?.rendered),
    categories: cats.map(c => ({ name: decodeHtml(c.name), slug: c.slug, path: categoryPath(c) })),
    tags: tags.map(t => decodeHtml(t.name)),
    ...(uploadPath(featured?.source_url) ? { featuredImage: uploadPath(featured.source_url) } : {}),
    canonical: `${SITE}/${p.slug}/`,
    comments: [],
  };

  const body = p.content?.rendered || '';
  fs.writeFileSync(path.join(postDir, `${p.slug}.md`), `---\n${YAML.stringify(fm, { lineWidth: 0 }).trim()}\n---\n\n${body}\n`);

  for (const mediaUrl of mediaUrlsFromHtml(body)) registerMedia(mediaUrl);
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
