#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import {
  WORDPRESS_SITE as SITE,
  categoryPath,
  decodeHtml,
  fetchWordPress,
  normalizeTagSlug,
  normalizeTagTerms,
  TAG_ALIASES,
} from './wordpress-migration-utils.mjs';

const API = `${SITE}/wp-json/wp/v2`;
const postDir = path.resolve('src/content/posts');

async function requestJson(url) {
  const res = await fetchWordPress(url, { timeout: 30000 });
  const type = res.headers.get('content-type') || '';
  if (!res.ok || !type.includes('json')) {
    throw new Error(`${res.status} ${res.statusText}: ${url}`);
  }
  return res;
}

async function allPosts() {
  const out = [];
  for (let page = 1; ; page++) {
    const q = new URLSearchParams({
      per_page: '10',
      page: String(page),
      status: 'publish',
      _fields: 'id,slug,categories,tags',
    });
    const res = await requestJson(`${API}/posts?${q}`);
    out.push(...await res.json());
    const pages = Number(res.headers.get('x-wp-totalpages') || 1);
    console.log(`posts: ${page}/${pages} (${out.length})`);
    if (page >= pages) break;
  }
  return out;
}

async function fetchTerm(resource, id) {
  const res = await requestJson(`${API}/${resource}/${id}`);
  return res.json();
}

function parseMarkdown(file) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`Missing YAML frontmatter: ${file}`);
  return {
    data: YAML.parse(match[1]) || {},
    body: text.slice(match[0].length),
  };
}

function writeMarkdown(file, data, body) {
  fs.writeFileSync(file, `---\n${YAML.stringify(data, { lineWidth: 0 }).trim()}\n---\n\n${body.replace(/^\s*/, '')}`);
}

const posts = await allPosts();
if (posts.length !== 85) throw new Error(`Expected 85 published WordPress posts, got ${posts.length}`);

const categoryIds = [...new Set(posts.flatMap(post => post.categories || []))];
const tagIds = [...new Set(posts.flatMap(post => post.tags || []))];

const [categories, tags] = await Promise.all([
  Promise.all(categoryIds.map(id => fetchTerm('categories', id))),
  Promise.all(tagIds.map(id => fetchTerm('tags', id))),
]);

const categoryById = new Map(categories.map(term => [term.id, term]));
const tagById = new Map(tags.map(term => [term.id, term]));
const tagBySlug = new Map(tags.map(term => [term.slug, term]));

const unresolvedCategories = categoryIds.filter(id => !categoryById.has(id));
const unresolvedTags = tagIds.filter(id => !tagById.has(id));
if (unresolvedCategories.length || unresolvedTags.length) {
  throw new Error(`Unresolved taxonomy terms: categories=${unresolvedCategories.join(',')} tags=${unresolvedTags.join(',')}`);
}

let changed = 0;
const categoryPaths = new Set();
const normalizedTagSlugs = new Set();

for (const post of posts) {
  const file = path.join(postDir, `${post.slug}.md`);
  if (!fs.existsSync(file)) throw new Error(`Missing migrated post for WordPress slug: ${post.slug}`);

  const { data, body } = parseMarkdown(file);
  const postCategories = (post.categories || [])
    .map(id => categoryById.get(id))
    .filter(Boolean)
    .map(term => ({
      name: decodeHtml(term.name),
      slug: term.slug,
      path: categoryPath(term),
    }));

  const rawPostTags = (post.tags || []).map(id => tagById.get(id)).filter(Boolean);
  const canonicalPostTerms = rawPostTags.map(term => tagBySlug.get(normalizeTagSlug(term.slug)) ?? term);
  const postTags = normalizeTagTerms(canonicalPostTerms);

  const categories = [];
  const seenCategoryPaths = new Set();
  for (const category of postCategories) {
    if (seenCategoryPaths.has(category.path)) continue;
    seenCategoryPaths.add(category.path);
    categoryPaths.add(category.path);
    categories.push(category);
  }

  const tagsForFrontmatter = postTags.map(tag => {
    normalizedTagSlugs.add(tag.slug);
    return tag.name;
  });

  const before = JSON.stringify({ categories: data.categories || [], tags: data.tags || [] });
  data.categories = categories;
  data.tags = tagsForFrontmatter;
  const after = JSON.stringify({ categories: data.categories, tags: data.tags });
  if (before !== after) changed++;
  writeMarkdown(file, data, body);
}

console.log(`Taxonomy restored for ${posts.length} posts; ${changed} post frontmatters changed.`);
console.log(`Category archive paths: ${categoryPaths.size}`);
console.log(`Normalized tag archives: ${normalizedTagSlugs.size}`);
console.log(`Tag aliases merged: ${Object.entries(TAG_ALIASES).map(([from, to]) => `${from}->${to}`).join(', ')}`);
