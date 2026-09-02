#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const manifest = JSON.parse(fs.readFileSync(process.argv[2] || 'migration/media-urls.json', 'utf8'));
const root = path.resolve('public');
let done = 0;

async function download(item) {
  const dest = path.join(root, item.dest.replace(/^\//, ''));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return;
  const candidates = [item.url, `https://yonatankra.com${item.dest}`];
  let last;
  for (const url of [...new Set(candidates)]) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'yonatankra.com Astro migration' }, redirect: 'follow' });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const bytes = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, bytes);
      done++;
      if (done % 100 === 0) console.log(`Downloaded ${done} media files`);
      return;
    } catch (e) { last = e; }
  }
  console.warn(`WARN media failed: ${item.dest}: ${last}`);
}

const concurrency = 12;
let index = 0;
async function worker() {
  while (index < manifest.length) {
    const item = manifest[index++];
    await download(item);
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));
console.log(`Media complete: ${manifest.length} manifest entries, ${done} downloaded this run.`);
