#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const sqlPath = process.argv[2];
if (!sqlPath) {
  console.error('Usage: npm run migrate:wp -- /path/to/wordpress.sql');
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, 'utf8');
const prefix = sql.match(/\/\* # table_prefix: ([^ ]+) \*\//)?.[1] ?? 'wp_';
const outDir = path.resolve('src/content/posts');
fs.mkdirSync(outDir, { recursive: true });

function columns(table) {
  const re = new RegExp(`CREATE TABLE \\`${table}\\` \\((.*?)\\) ENGINE`, 's');
  const body = sql.match(re)?.[1];
  if (!body) throw new Error(`Missing table ${table}`);
  return [...body.matchAll(/^\\s*`([^`]+)`/gm)].map((m) => m[1]);
}

function insertBlocks(table) {
  const escaped = table.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
  const re = new RegExp(`INSERT INTO \\`${escaped}\\` VALUES\\s*(.*?);\\n`, 'gs');
  return [...sql.matchAll(re)].map((m) => m[1]);
}

function parseRows(input) {
  const rows = [];
  let row = [];
  let value = '';
  let inString = false;
  let escaped = false;
  let depth = 0;
  let quoted = false;

  const pushValue = () => {
    const raw = value.trim();
    row.push(!quoted && raw.toUpperCase() === 'NULL' ? null : raw);
    value = '';
    quoted = false;
  };

  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (inString) {
      if (escaped) {
        const map = { n: '\n', r: '\r', t: '\t', 0: '\0', Z: '\x1a' };
        value += map[c] ?? c;
        escaped = false;
      } else if (c === '\\') {
        escaped = true;
      } else if (c === "'") {
        inString = false;
      } else {
        value += c;
      }
      continue;
    }

    if (c === "'") {
      inString = true;
      quoted = true;
    } else if (c === '(') {
      depth++;
      if (depth === 1) {
        row = [];
        value = '';
        quoted = false;
      } else value += c;
    } else if (c === ')' && depth === 1) {
      pushValue();
      rows.push(row);
      row = [];
      depth--;
    } else if (c === ')') {
      value += c;
      depth--;
    } else if (c === ',' && depth === 1) {
      pushValue();
    } else if (depth === 1) {
      value += c;
    }
  }
  return rows;
}

function table(name) {
  const tableName = `${prefix}${name}`;
  const cols = columns(tableName);
  const result = [];
  for (const block of insertBlocks(tableName)) {
    for (const values of parseRows(block)) {
      if (values.length !== cols.length) {
        throw new Error(`${tableName}: expected ${cols.length} columns, got ${values.length}`);
      }
      result.push(Object.fromEntries(cols.map((col, i) => [col, values[i]])));
    }
  }
  return result;
}

const posts = table('posts');
const postmeta = table('postmeta');
const comments = table('comments');
const terms = table('terms');
const taxonomy = table('term_taxonomy');
const relationships = table('term_relationships');
const users = table('users');

const byId = (rows, key = 'ID') => new Map(rows.map((row) => [row[key], row]));
const postById = byId(posts);
const termById = byId(terms, 'term_id');
const taxonomyById = byId(taxonomy, 'term_taxonomy_id');
const userById = byId(users);
const categoryTaxonomyByTermId = new Map(
  taxonomy.filter((t) => t.taxonomy === 'category').map((t) => [t.term_id, t]),
);

const metaByPost = new Map();
for (const meta of postmeta) {
  if (!metaByPost.has(meta.post_id)) metaByPost.set(meta.post_id, new Map());
  const map = metaByPost.get(meta.post_id);
  if (!map.has(meta.meta_key)) map.set(meta.meta_key, []);
  map.get(meta.meta_key).push(meta.meta_value);
}

function categoryPath(tax) {
  const slugs = [];
  let current = tax;
  const seen = new Set();
  while (current && !seen.has(current.term_id)) {
    seen.add(current.term_id);
    const term = termById.get(current.term_id);
    if (term) slugs.unshift(term.slug);
    current = current.parent && current.parent !== '0'
      ? categoryTaxonomyByTermId.get(current.parent)
      : undefined;
  }
  return slugs.join('/');
}

const taxByPost = new Map();
for (const rel of relationships) {
  const tax = taxonomyById.get(rel.term_taxonomy_id);
  const term = tax && termById.get(tax.term_id);
  if (!tax || !term) continue;
  if (!taxByPost.has(rel.object_id)) taxByPost.set(rel.object_id, []);
  taxByPost.get(rel.object_id).push({
    taxonomy: tax.taxonomy,
    name: term.name,
    slug: term.slug,
    path: tax.taxonomy === 'category' ? categoryPath(tax) : term.slug,
  });
}

const commentsByPost = new Map();
for (const comment of comments) {
  if (comment.comment_approved !== '1') continue;
  if (!commentsByPost.has(comment.comment_post_ID)) commentsByPost.set(comment.comment_post_ID, []);
  commentsByPost.get(comment.comment_post_ID).push(comment);
}

function firstMeta(postId, key) {
  return metaByPost.get(postId)?.get(key)?.[0];
}

function featuredImage(postId) {
  const thumbnailId = firstMeta(postId, '_thumbnail_id');
  const attachment = thumbnailId && postById.get(thumbnailId);
  if (!attachment) return undefined;
  return attachment.guid?.replace(/^https?:\/\/(?:www\.)?yonatankra\.com/, '');
}

function replaceGistShortcodes(content) {
  return content.replace(/\[gist\s+(https?:\/\/gist\.github\.com\/[^\s\]#]+)(?:#[^\s\]]+)?\s*\/?\]/gi, (_all, url) => {
    return `<script src="${url}.js"></script>`;
  });
}

function normalizeBody(content) {
  return replaceGistShortcodes(content ?? '')
    .replaceAll('https://www.yonatankra.com/', 'https://yonatankra.com/');
}

function frontmatter(post) {
  const terms = taxByPost.get(post.ID) ?? [];
  const historicalComments = (commentsByPost.get(post.ID) ?? [])
    .sort((a, b) => a.comment_date.localeCompare(b.comment_date))
    .map((c) => ({ author: c.comment_author, date: c.comment_date, content: c.comment_content }));
  const author = userById.get(post.post_author)?.display_name ?? 'Yonatan Kra';
  const description = firstMeta(post.ID, 'rank_math_description') || post.post_excerpt || undefined;

  return {
    title: post.post_title,
    slug: post.post_name,
    published: post.post_date,
    updated: post.post_modified,
    author,
    ...(description ? { description } : {}),
    categories: terms
      .filter((t) => t.taxonomy === 'category' && t.name !== 'Uncategorized')
      .map(({ name, slug, path }) => ({ name, slug, path })),
    tags: terms.filter((t) => t.taxonomy === 'post_tag').map((t) => t.name),
    ...(featuredImage(post.ID) ? { featuredImage: featuredImage(post.ID) } : {}),
    canonical: `https://yonatankra.com/${post.post_name}/`,
    comments: historicalComments,
  };
}

const published = posts.filter((p) => p.post_type === 'post' && p.post_status === 'publish' && p.post_name);
const manifest = [];

for (const post of published) {
  const yaml = YAML.stringify(frontmatter(post), { lineWidth: 0 }).trim();
  const body = normalizeBody(post.post_content);
  fs.writeFileSync(path.join(outDir, `${post.post_name}.md`), `---\n${yaml}\n---\n\n${body}\n`);
  manifest.push({ id: Number(post.ID), url: `/${post.post_name}/`, title: post.post_title });
}

fs.mkdirSync('migration', { recursive: true });
fs.writeFileSync('migration/legacy-posts.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Migrated ${published.length} published WordPress posts from ${prefix}posts.`);
