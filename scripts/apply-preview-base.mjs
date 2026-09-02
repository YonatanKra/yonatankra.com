import { promises as fs } from 'node:fs';
import path from 'node:path';

const rawBase = process.env.PUBLIC_BASE_PATH || '';
const base = rawBase && rawBase !== '/'
  ? `/${rawBase.replace(/^\/+|\/+$/g, '')}`
  : '';

if (!base) {
  console.log('No preview base path configured; leaving generated HTML unchanged.');
  process.exit(0);
}

const dist = path.resolve('dist');
let filesChanged = 0;
let replacements = 0;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) await rewriteHtml(full);
  }
}

async function rewriteHtml(file) {
  const original = await fs.readFile(file, 'utf8');
  let html = original;

  // WordPress media paths are intentionally stored root-relative so the
  // production site works at yonatankra.com/. GitHub project Pages needs the
  // repository base prefix. Handle quoted attributes and srcset candidates.
  html = html.replace(
    /(["'(=\s,])\/wp-content\/uploads\//g,
    (match, prefix) => {
      replacements += 1;
      return `${prefix}${base}/wp-content/uploads/`;
    },
  );

  if (html !== original) {
    await fs.writeFile(file, html);
    filesChanged += 1;
  }
}

await walk(dist);
console.log(`Applied preview base ${base} to ${replacements} media references across ${filesChanged} HTML files.`);
