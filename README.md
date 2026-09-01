# yonatankra.com

Astro migration of the WordPress site at https://yonatankra.com.

## Goals

- Preserve existing root-level post URLs (`/<slug>/`) and trailing slashes.
- Preserve public WordPress content, taxonomy, approved historical comments and SEO metadata.
- Preserve `/wp-content/uploads/...` media URLs during the migration.
- Keep `/ykdemos/` and `/performance/` as static passthrough directories when their files are added.
- Deploy the generated static site through GitHub Pages.
- Never commit the raw WordPress SQL backup.

## Local development

```bash
npm install
npm run dev
```

## Re-running the WordPress import

The SQL dump is intentionally excluded by `.gitignore`.

```bash
npm install
npm run migrate:wp -- /absolute/path/to/wordpress-backup.sql
npm run build
npm run test:legacy
```

The importer reads the WordPress table prefix from the WPvivid backup header and generates public post files under `src/content/posts/` plus a legacy URL manifest under `migration/legacy-posts.json`.

## Media

Copy the original WordPress uploads directory to:

```text
public/wp-content/uploads/
```

This deliberately preserves old image URLs so existing links and indexed assets do not break.

## Deployment

`.github/workflows/deploy-pages.yml` builds Astro and deploys `dist/` to GitHub Pages on pushes to `main`.

Do not point `yonatankra.com` DNS at GitHub Pages until migration verification is complete.
