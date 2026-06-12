# Production and Preview Surface

## Current production rule

Production is intentionally small while unfinished public areas are cleaned up.

Production keeps:

- `/`
- `/{locale}/notes`
- `/{locale}/notes/{course}`
- `/{locale}/notes/{course}/{chapter}/{unit}`
- `/{locale}/courses*` legacy redirects into Notes
- `/login` and `/api/auth/**` for authenticated private surfaces
- `/admin*` only for signed-in `ADMIN_EMAILS` administrators; anonymous and
  non-admin requests return 404
- `/api/admin/**` only for signed-in `ADMIN_EMAILS` administrators; anonymous
  and non-admin requests return 404
- `/api/textbook-export/**`
- `/api/textbook/problems/**`

Production hides:

- public registration, account settings, diary, and membership billing pages
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

`https://development.evanalysis.top` is a development / preview domain, not a
production domain. In Vercel project-domain configuration it should be assigned
to the `codex/account` Git branch or an equivalent non-production target; it
must not have `gitBranch: null`, because a null branch assignment makes Vercel
treat it as a normal production project domain.

During the 2026-06-10 account/login QA pass, `development.evanalysis.top` was
confirmed with `gitBranch: codex/account` and resolved to a non-production Git
preview deployment for commit `32909e3`. Ordinary public HTTP requests return
Vercel Authentication `401`; use Vercel authenticated fetch/curl for
development QA, and check the current Vercel deployment before recording new
remote evidence.

Production should keep these non-secret URL/surface variables:

- `NEXT_PUBLIC_SITE_URL=https://www.evanalysis.top`
- `APP_URL=https://www.evanalysis.top`
- `NEXTAUTH_URL=https://www.evanalysis.top`
- `SITE_SURFACE=production`
- `NEXT_PUBLIC_SITE_SURFACE=production`

Development can explicitly use:

- `SITE_SURFACE=preview`
- `NEXT_PUBLIC_SITE_SURFACE=preview`
- `NEXT_PUBLIC_SITE_URL=https://development.evanalysis.top`
- `APP_URL=https://development.evanalysis.top`
- `NEXTAUTH_URL=https://development.evanalysis.top`

If public registration is enabled on a preview branch, keep it branch scoped and
pair it with staging persistence plus Turnstile:

- `AUTH_REGISTRATION_ENABLED=true`
- `NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED=true`
- `AUTH_REGISTRATION_REQUIRE_TURNSTILE=true`
- `NEXT_PUBLIC_AUTH_REGISTRATION_REQUIRE_TURNSTILE=true`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY=...`
- `AUTH_TURNSTILE_SECRET_KEY=...`
- Firebase Admin envs from a development/staging Firebase project, not the
  production data project

The deployed preview runtime refuses public registration without Firestore
persistence. If the branch registration env is enabled before staging Firebase
is configured, `/api/auth/register` returns
`registration_persistence_not_configured` rather than creating memory-only
public users.

Preview deployments may rely on Vercel's built-in `VERCEL_ENV=preview` signal;
that keeps unfinished preview-only routes available without pointing sitemap
metadata at the production domain unless a branch-specific override is added.

## Maintenance note

When a hidden area is ready for public use, remove it from
`src/lib/site-surface.ts`, add it back to the sitemap if it should be indexed,
and make sure the production navigation exposes it deliberately.
