#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve('migration/legacy-posts.json');
if (!fs.existsSync(manifestPath)) {
  console.log('No migration/legacy-posts.json yet; skipping legacy URL validation.');
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const missingPages = [];
const externalUploadRefs = [];
const missingMedia = [];
let localMediaRefs = 0;
const base = (process.env.PUBLIC_BASE_PATH || '').replace(/^\/+|\/+$/g, '');

for (const { url } of manifest) {
  const relative = url.replace(/^\//, '').replace(/\/$/, '');
  const htmlPath = path.join('dist', relative, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    missingPages.push(url);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const external = [...html.matchAll(/(?:https?:)?\/\/[^"'\s<>,]*wp-content\/uploads\/[^"'\s<>,]+/g)].map(m => m[0]);
  for (const ref of external) externalUploadRefs.push({ page: url, ref });

  const localRefs = [...html.matchAll(/(?:\/[^"'\s<>,]*)?\/wp-content\/uploads\/[^"'\s<>,]+/g)].map(m => m[0]);
  for (const ref of localRefs) {
    localMediaRefs++;
    const pathname = ref.split(/[?#]/, 1)[0];
    let filePath = pathname.replace(/^\//, '');
    if (base && filePath.startsWith(`${base}/`)) filePath = filePath.slice(base.length + 1);
    const diskPath = path.join('dist', filePath);
    if (!fs.existsSync(diskPath)) missingMedia.push({ page: url, ref, diskPath });
  }
}

if (missingPages.length || externalUploadRefs.length || missingMedia.length) {
  if (missingPages.length) {
    console.error(`Missing ${missingPages.length} legacy URLs:`);
    for (const url of missingPages) console.error(`  ${url}`);
  }
  if (externalUploadRefs.length) {
    console.error(`Found ${externalUploadRefs.length} external WordPress upload references:`);
    for (const { page, ref } of externalUploadRefs.slice(0, 20)) console.error(`  ${page}: ${ref}`);
  }
  if (missingMedia.length) {
    console.error(`Found ${missingMedia.length} local media references without bundled files:`);
    for (const { page, ref } of missingMedia.slice(0, 20)) console.error(`  ${page}: ${ref}`);
  }
  process.exit(1);
}

console.log(`Verified ${manifest.length} legacy post URLs.`);
console.log(`Verified ${localMediaRefs} local media references with no external WordPress upload dependencies.`);
