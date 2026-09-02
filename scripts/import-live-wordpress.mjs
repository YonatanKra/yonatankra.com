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

async function request(url, optional) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000), headers: { 'user-agent': 'Mozilla/5.0 yonatankra.com Astro migration', accept: 'application/json' } });
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.includes('json')) throw new Error(`${res.status} ${res.statusText}, content-type=${type}`);
    return res;
  } catch (e) {
    if (optional) { console.warn(`WARN ${url}: ${e}`); return null; }
    throw e;
  }
}

async function all(resource, params = {}, optional = false) {
  const out = [];
  const perPage = resource === 'posts' ? 5 : 20;
  for (let page = 1; ; page++) {
    const q = new URLSearchParams({ per_page: String(perPage), page: String(page), ...params });
    const url = `${API}/${resource}?${q}`;
    const res = await request(url, optional);
    if (!res) return out;
    const rows = await res.json();
    out.push(...rows);
    const totalPages = Number(res.headers.get('x-wp-totalpages') || 1);
    console.log(`${resource}: page ${page}/${totalPages}, ${out.length} items`);
    if (page >= totalPages) break;
  }
  return out;
}

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
function terms(post) { return (post._embedded?.['wp:term'] || []).flat(); }
function mediaUrlsFromHtml(html = '') {
  const found = new Set();
  for (const m of html.matchAll(/(?:https?:)?\/\/[^"'\s<>]+|\/wp-content\/uploads\/[^"'\s<>]+/g)) {
    const raw = m[0].replaceAll('&amp;', '&');
    if (uploadPath(raw)) found.add(raw.startsWith('/') ? `${SITE}${raw}` : raw.startsWith('//') ? `https:${raw}` : raw);
  }
  return found;
}

const [posts, pages, comments] = await Promise.all([
  all('posts', { status: 'publish', _embed: '1' }),
  all('pages', { status: 'publish', _embed: '1' }),
  all('comments', { status: 'approve' }, true),
]);
const commentsByPost = new Map();
for (const c of comments) {
  if (!commentsByPost.has(c.post)) commentsByPost.set(c.post, []);
  commentsByPost.get(c.post).push({ author: c.author_name || 'Anonymous', date: c.date, content: c.content?.rendered || '' });
}
const mediaMap = new Map();
function registerMedia(url) { const dest = uploadPath(url); if (dest) mediaMap.set(dest, url.startsWith('/') ? `${SITE}${url}` : url); }

for (const p of posts) {
  const embeddedTerms = terms(p);
  const cats = embeddedTerms.filter(t => t.taxonomy === 'category' && t.slug !== 'uncategorized');
  const postTags = embeddedTerms.filter(t => t.taxonomy === 'post_tag');
  const featured = p._embedded?.['wp:featuredmedia']?.[0];
  const fm = {
    title: decodeHtml(p.title?.rendered), slug: p.slug, published: p.date, updated: p.modified,
    author: decodeHtml(p._embedded?.author?.[0]?.name || 'Yonatan Kra'), description: decodeHtml(p.excerpt?.rendered),
    categories: cats.map(c => ({ name: decodeHtml(c.name), slug: c.slug, path: categoryPath(c) })),
    tags: postTags.map(t => decodeHtml(t.name)),
    ...(uploadPath(featured?.source_url) ? { featuredImage: uploadPath(featured.source_url) } : {}),
    canonical: `${SITE}/${p.slug}/`, comments: (commentsByPost.get(p.id) || []).sort((a,b) => a.date.localeCompare(b.date)),
  };
  const body = p.content?.rendered || '';
  fs.writeFileSync(path.join(postDir, `${p.slug}.md`), `---\n${YAML.stringify(fm, { lineWidth: 0 }).trim()}\n---\n\n${body}\n`);
  for (const url of mediaUrlsFromHtml(body)) registerMedia(url);
  if (featured) {
    registerMedia(featured.source_url);
    for (const s of Object.values(featured.media_details?.sizes || {})) registerMedia(s.source_url);
  }
}

const keepPages = new Set(['about-me', 'privacy-policy', 'hacktoberfest-2020']);
for (const p of pages.filter(p => keepPages.has(p.slug))) {
  const fm = { title: decodeHtml(p.title?.rendered), slug: p.slug, description: decodeHtml(p.excerpt?.rendered), canonical: `${SITE}/${p.slug}/` };
  const body = p.content?.rendered || '';
  fs.writeFileSync(path.join(pageDir, `${p.slug}.md`), `---\n${YAML.stringify(fm, { lineWidth: 0 }).trim()}\n---\n\n${body}\n`);
  for (const url of mediaUrlsFromHtml(body)) registerMedia(url);
}
fs.mkdirSync('migration', { recursive: true });
fs.writeFileSync('migration/legacy-posts.json', JSON.stringify(posts.map(p => ({ id: p.id, url: `/${p.slug}/`, title: decodeHtml(p.title?.rendered) })), null, 2) + '\n');
fs.writeFileSync('migration/media-urls.json', JSON.stringify([...mediaMap].map(([dest, url]) => ({ dest, url })), null, 2) + '\n');
console.log(`Imported ${posts.length} posts, ${comments.length} approved comments, ${mediaMap.size} referenced media URLs.`);
if (posts.length !== 85) throw new Error(`Expected 85 published posts, got ${posts.length}`);
