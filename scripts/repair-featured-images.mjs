#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { WORDPRESS_SITE as SITE, fetchWordPress, normalizeMediaUrl, publicPath, uploadPath } from './wordpress-migration-utils.mjs';

const API = `${SITE}/wp-json/wp/v2`;
const postDir = path.resolve('src/content/posts');
const mediaManifestPath = path.resolve('migration/media-urls.json');

async function json(url) {
  const res = await fetchWordPress(url, { timeout: 30000 });
  const type = res.headers.get('content-type') || '';
  if (!res.ok || !type.includes('json')) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return res.json();
}

const posts = await json(`${API}/posts?status=publish&per_page=100&_fields=id,slug,featured_media`);
const ids = [...new Set(posts.map((post) => post.featured_media).filter(Boolean))];
let media = [];
for (let i = 0; i < ids.length; i += 100) {
  const chunk = ids.slice(i, i + 100);
  media.push(...await json(`${API}/media?per_page=100&include=${chunk.join(',')}&_fields=id,source_url,media_details`));
}
const mediaById = new Map(media.map((item) => [item.id, item]));
const postBySlug = new Map(posts.map((post) => [post.slug, post]));

let manifest = [];
try { manifest = JSON.parse(fs.readFileSync(mediaManifestPath, 'utf8')); } catch {}
const manifestByDest = new Map(manifest.map((item) => [item.dest, item.url]));

let repaired = 0;
for (const file of fs.readdirSync(postDir).filter((name) => /\.mdx?$/.test(name))) {
  const filename = path.join(postDir, file);
  const text = fs.readFileSync(filename, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) continue;
  const fm = YAML.parse(match[1]);
  if (fm.featuredImage) continue;
  const post = postBySlug.get(fm.slug);
  const featured = post ? mediaById.get(post.featured_media) : null;
  const dest = uploadPath(featured?.source_url);
  if (!dest) continue;

  fm.featuredImage = publicPath(dest);
  const rest = text.slice(match[0].length);
  fs.writeFileSync(filename, `---\n${YAML.stringify(fm, { lineWidth: 0 }).trim()}\n---\n${rest}`);
  const original = normalizeMediaUrl(featured.source_url);
  manifestByDest.set(dest, original);
  for (const size of Object.values(featured.media_details?.sizes || {})) {
    const sizeDest = uploadPath(size.source_url);
    if (sizeDest) manifestByDest.set(sizeDest, normalizeMediaUrl(size.source_url));
  }
  repaired++;
}

fs.writeFileSync(mediaManifestPath, JSON.stringify([...manifestByDest].map(([dest, url]) => ({ dest, url })), null, 2) + '\n');
console.log(`Featured images resolved: ${mediaById.size}/${ids.length}; repaired post frontmatter: ${repaired}`);
if (ids.length && mediaById.size === 0) throw new Error('WordPress returned no featured media; refusing to deploy placeholders silently.');
