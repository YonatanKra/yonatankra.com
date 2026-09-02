# Decap CMS

The blog uses Decap CMS as a Git-backed editor for `src/content/posts`.

## What is already configured

- `/admin/` loads Decap CMS.
- Articles map directly to the Astro `posts` content collection.
- New articles are Markdown with YAML frontmatter.
- Media uploads go to `public/wp-content/uploads` and are referenced as `/wp-content/uploads/...`.
- `publish_mode: editorial_workflow` makes drafts/reviews GitHub pull requests instead of writing straight to `main`.
- `local_backend: true` allows local CMS testing with `npx decap-server`.

## Production authentication

GitHub's OAuth flow requires a server-side client secret, so the static GitHub Pages site cannot complete authentication on its own.

Recommended setup:

1. Deploy a small OAuth proxy, for example as a Cloudflare Worker, on `https://cms-auth.yonatankra.com`.
2. Create a GitHub OAuth App.
   - Homepage URL: `https://yonatankra.com/admin/`
   - Authorization callback URL: `https://cms-auth.yonatankra.com/callback`
3. Store the GitHub OAuth Client ID and Client Secret only in the worker's secret/environment configuration.
4. In `public/admin/config.yml`, uncomment:

   ```yaml
   base_url: https://cms-auth.yonatankra.com
   auth_endpoint: auth
   ```

5. Open `https://yonatankra.com/admin/` and sign in with a GitHub account that has write access to `YonatanKra/yonatankra.com`.

Never commit the OAuth client secret to this repository.

## Local testing

From a local checkout:

```bash
npx decap-server
npm run dev
```

Then open the local Astro `/admin/` route. Local backend mode does not use the production GitHub OAuth flow.

## Publishing model

With editorial workflow enabled:

- Save draft: Decap creates/updates a `cms/...` branch and pull request.
- Review: continue editing the draft through the CMS or GitHub PR.
- Publish: Decap merges the pull request into `main`.
- The existing GitHub Pages workflow then rebuilds and deploys the site.

The CMS `draft` frontmatter field remains useful independently: Astro excludes entries where `draft: true` from public indexes/routes.
