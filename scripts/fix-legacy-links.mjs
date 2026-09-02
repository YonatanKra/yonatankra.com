import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const from = '/wp-admin/post.php?post=453&amp;action=edit#server-resources';
const to = '#server-resources';

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;

    const source = await fs.readFile(full, 'utf8');
    const fixed = source.replaceAll(from, to);
    if (fixed !== source) await fs.writeFile(full, fixed);
  }
}

await walk(root);
