#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const SITE = 'https://yonatankra.com';
const API = `${SITE}/wp-json/wp/v2`;
const postDir = path.resolve('src/content/posts');
const pageDir = path.resolve('src/content/pages');
fs.mkdirSync(postDir, { recursive: true });
fs.mkdirSync(pageDir, { recursive: true });

async function getJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'yonatankra.com Astro migration' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return res.json();
}

async function all(resource, params = {}) {
  const out = [];
  for (let page = 1; ; page++) {
    const q = new URLSearchParams({ per_page: '100', page: String(page), ...params });
    const res = await fetch(`${API}/${resource}?${q}`, { headers: { 'user-agent': 'yonatankra.com Astro migration' } });
    if (res.status === 400 && page > 1) break;
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${res.url}`);
    const rows = await res.json();
    out.push(...rows);
    const totalPages = Number(res.headers.get('x-wp-totalpages') || 1);
    if (page >= totalPages) break;
  }
  return out;
}

function decodeHtml(s = '') {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"').replaceAll('&#039;', "'").replaceAll('&nbsp;', ' ')
    .trim();
}

function uploadPath(url) {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    const marker = '/wp-content/uploads/';
    const i = u.pathname.indexOf(marker);
    return i >= 0 ? u.pathname.slice(i) : undefined;
  } catch { return undefined; }
}

const [posts, pages, categories, tags, comments, media] = await Promise.all([
  all('posts', { status: 'publish', _embed: '1' }),
  all('pages', { status: 'publish' }),
  all('categories'), all('tags'), all('comments', { status: 'approve' }), all('media'),
]);

const catById = new Map(categories.map(c => [c.id, c]));
const tagById = new Map(tags.map(t => [t.id, t]));
function catPath(id) {
  const slugs = [];
  const seen = new Set();
  let c = catById.get(id);
  while (c && !seen.has(c.id)) {
    seen.add(c.id); slugs.unshift(c.slug); c = c.parent ? catById.get(c.parent) : undefined;
  }
  return slugs.join('/');
}
const commentsByPost = new Map();
for (const c of comments) {
  if (!commentsByPost.has(c.post)) commentsByPost.set(c.post, []);
  commentsByPost.get(c.post).push({ author: c.author_name || 'Anonymous', date: c.date, content: c.content?.rendered || '' });
}

for (const p of posts) {
  const featured = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const fm = {
    title: decodeHtml(p.title?.rendered), slug: p.slug, published: p.date, updated: p.modified,
    author: decodeHtml(p._embedded?.author?.[0]?.name || 'Yonatan Kra'),
    description: decodeHtml(p.excerpt?.rendered),
    categories: (p.categories || []).map(id => catById.get(id)).filter(Boolean)
      .filter(c => c.slug !== 'uncategorized').map(c => ({ name: decodeHtml(c.name), slug: c.slug, path: catPath(c.id) })),
    tags: (p.tags || []).map(id => tagById.get(id)).filter(Boolean).map(t => decodeHtml(t.name)),
    ...(uploadPath(featured) ? { featuredImage: uploadPath(featured) } : {}),
    canonical: `${SITE}/${p.slug}/`, comments: (commentsByPost.get(p.id) || []).sort((a,b) => a.date.localeCompare(b.date)),
  };
  fs.writeFileSync(path.join(postDir, `${p.slug}.md`), `---\n${YAML.stringify(fm, { lineWidth: 0 }).trim()}\n---\n\n${p.content?.rendered || ''}\n`);
}

const keepPages = new Set(['about-me', 'privacy-policy', 'hacktoberfest-2020']);
for (const p of pages.filter(p => keepPages.has(p.slug))) {
  const fm = { title: decodeHtml(p.title?.rendered), slug: p.slug, description: decodeHtml(p.excerpt?.rendered), canonical: `${SITE}/${p.slug}/` };
  fs.writeFileSync(path.join(pageDir, `${p.slug}.md`), `---\n${YAML.stringify(fm, { lineWidth: 0 }).trim()}\n---\n\n${p.content?.rendered || ''}\n`);
}

const mediaMap = new Map();
for (const m of media) {
  const urls = [m.source_url, ...Object.values(m.media_details?.sizes || {}).map(s => s.source_url)];
  for (const url of urls.filter(Boolean)) {
    const dest = uploadPath(url);
    if (dest) mediaMap.set(dest, url);
  }
}
fs.mkdirSync('migration', { recursive: true });
fs.writeFileSync('migration/legacy-posts.json', JSON.stringify(posts.map(p => ({ id: p.id, url: `/${p.slug}/`, title: decodeHtml(p.title?.rendered) })), null, 2) + '\n');
fs.writeFileSync('migration/media-urls.json', JSON.stringify([...mediaMap].map(([dest, url]) => ({ dest, url })), null, 2) + '\n');
console.log(`Imported ${posts.length} posts, ${comments.length} approved comments, ${mediaMap.size} media URLs.`);
if (posts.length !== 85) throw new Error(`Expected 85 published posts, got ${posts.length}`);
