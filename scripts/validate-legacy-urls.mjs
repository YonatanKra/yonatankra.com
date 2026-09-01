#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve('migration/legacy-posts.json');
if (!fs.existsSync(manifestPath)) {
  console.log('No migration/legacy-posts.json yet; skipping legacy URL validation.');
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const missing = [];
for (const { url } of manifest) {
  const relative = url.replace(/^\//, '').replace(/\/$/, '');
  const html = path.join('dist', relative, 'index.html');
  if (!fs.existsSync(html)) missing.push(url);
}

if (missing.length) {
  console.error(`Missing ${missing.length} legacy URLs:`);
  for (const url of missing) console.error(`  ${url}`);
  process.exit(1);
}
console.log(`Verified ${manifest.length} legacy post URLs.`);
