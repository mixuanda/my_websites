# Production and Preview Surface

## Current production rule

Production is intentionally small while unfinished public areas are cleaned up.

Production keeps:

- `/`
- `/{locale}/notes`
- `/{locale}/notes/{course}`
- `/{locale}/notes/{course}/{chapter}/{unit}`
- `/{locale}/courses*` legacy redirects into Notes
- `/api/textbook-export/**`
- `/api/textbook/problems/**`

Production hides:

- login, registration, account settings, admin, diary, and membership billing pages
- blog, project, tag, and category pages
- legacy `/notes/{slug}` pages from `content/notes`
- article/project/legacy-note export APIs

The preview and development surface keeps those routes available so they can be
edited without appearing on the production site.

## Environment selection

The site reads `SITE_SURFACE` or `NEXT_PUBLIC_SITE_SURFACE` first. Accepted
values are `production`, `preview`, `development`, and `dev`.

If no explicit value is set:

- `VERCEL_ENV=production` becomes production
- `VERCEL_ENV=preview` becomes preview
- local `next dev` becomes preview
- local production builds become production

## Vercel configuration

The production project is `my-websites` on Vercel, with the public domain
`https://www.evanalysis.top`.

Production should keep these non-secret URL/surface variables:

- `NEXT_PUBLIC_SITE_URL=https://www.evanalysis.top`
- `APP_URL=https://www.evanalysis.top`
- `NEXTAUTH_URL=https://www.evanalysis.top`
- `SITE_SURFACE=production`
- `NEXT_PUBLIC_SITE_SURFACE=production`

Development can explicitly use:

- `SITE_SURFACE=preview`
- `NEXT_PUBLIC_SITE_SURFACE=preview`

Preview deployments may rely on Vercel's built-in `VERCEL_ENV=preview` signal;
that keeps unfinished preview-only routes available without pointing sitemap
metadata at the production domain unless a branch-specific override is added.

## Maintenance note

When a hidden area is ready for public use, remove it from
`src/lib/site-surface.ts`, add it back to the sitemap if it should be indexed,
and make sure the production navigation exposes it deliberately.
