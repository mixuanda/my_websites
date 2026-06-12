# Account, Login, And Billing Development Notes

Date: 2026-05-25
Last updated: 2026-06-12

This file records the first focused account/login/subscription deployment pass
from the `codex/account` workstream.

## Current source posture

- Account and registration planning is in
  `docs/next-work-preparation-2026-05-25.md`.
- Auth implementation is centered on `src/lib/auth.ts`,
  `src/lib/password-auth.ts`, `/login`, `/api/auth/register`,
  `/api/user/profile`, and `/api/user/accounts`.
- Membership and subscription billing are centered on `src/lib/membership/**`,
  `/api/billing/**`, compatibility `/api/stripe/**`, and
  `/{locale}/notes/membership`.
- Production remains guarded by `src/lib/site-surface.ts`; registration,
  settings, and billing membership pages stay preview/development-only until
  deliberately opened.

## Code correction in this pass

`registerPasswordAuthUser` now treats Firestore as the durable source of truth
when Firestore is configured:

- static password users are checked before registration;
- Firestore registrations use `runTransaction` and `transaction.create`;
- duplicate credential docs return `email_already_registered`;
- the in-memory credential cache is updated only after Firestore creation
  succeeds;
- the no-Firestore fallback remains memory-only for local or temporary
  development.
- deployed preview / production runtimes now require Firestore before public
  registration can create accounts, so a branch env mistake cannot silently
  create memory-only public users.

Follow-up account/login hardening in this workstream:

- `/api/auth/register` now applies IP and email scoped rate limits before
  creating a credential user.
- Credentials login now applies an email-scoped rate limit before password
  verification.
- When `AUTH_REGISTRATION_REQUIRE_TURNSTILE=true`, public registration must
  include a Turnstile token and the server validates it against Cloudflare
  Siteverify before account creation.
- When a deployed Vercel runtime has `AUTH_REGISTRATION_ENABLED=true` but no
  Firebase Admin envs, `/api/auth/register` returns
  `503 registration_persistence_not_configured`.
- `GET /api/auth/register` now returns a preview-only readiness payload with
  `ready`, `blockers`, `persistence`, and `captcha` booleans. The login page
  uses this payload to disable public self-registration before submit when
  staging storage or Turnstile server verification is not configured.
- `/login` no longer defaults to showing GitHub / Google buttons. It intersects
  `NEXT_PUBLIC_AUTH_PROVIDERS` with the actual NextAuth provider list so public
  buttons do not appear before the backend provider is configured.
- When `NEXT_PUBLIC_AUTH_PROVIDERS` is empty, `disabled`, `none`, or `off`,
  `/login` no longer calls the NextAuth providers endpoint. This keeps a
  deliberately closed development deployment from surfacing a misleading
  provider-configuration error.
- `/settings` reports GitHub, Google, persistence, and registration-verification
  readiness separately.
- The public membership page no longer presents the internal admin bypass as a
  normal public membership plan.

## Storage decision for the account branch

Keep Firestore for the current account/login/billing branch.

Reasoning:

- The current repository already stores Auth.js adapter data, user profiles,
  credential users, membership entitlements, Stripe mappings, practice attempts,
  and private user data through Firestore-oriented code paths.
- Vercel's storage products are not one single built-in auth database. Vercel
  Blob and Edge Config are not the right primary store for accounts or billing
  state; Marketplace Postgres providers such as Neon or Supabase are credible
  future migration targets, but require schema and migration work.
- Clerk is the most direct Vercel Marketplace auth product if the goal becomes
  managed user identity, email verification, social login, and bot protection in
  one product. Adopting it would replace a meaningful part of the current
  Auth.js/Firestore design, so it should be a separate migration decision.

Therefore the concrete next implementation path is:

1. Use a development/staging Firebase project for branch-scoped preview data.
2. Keep production and preview Firebase credentials separate.
3. Enable Turnstile before public registration is opened on
   `development.evanalysis.top`.
4. Configure GitHub / Google OAuth as preview branch env vars first.
5. Only evaluate Neon / Clerk migration after the current account and billing
   flow is stable enough to migrate with fixtures and rollback.

## Local verification

Commands run:

- `npm ci`
- `npm run lint`
- `npx tsc --noEmit --pretty false`
- `npm run verify:mdx-tables`
- preview-surface `npm run build`
- preview-surface `next start -p 3020`

Local smoke results:

- `/login` returned `200`.
- `/zh-hk/notes/membership` returned `200`.
- `/api/billing/status` returned `billingReady=true`,
  `configuredPlanCount=2`, `freeDailyAttemptLimit=8`, and
  `membershipGatingEnabled=true` with local test env.
- unauthenticated `POST /api/billing/checkout` returned JSON
  `401 auth_required`.
- unauthenticated compatibility `POST /api/stripe/webhook` reached the handler
  and returned `400 Missing stripe-signature`.
- invalid `POST /api/auth/register` returned `400 invalid_email`.
- with `AUTH_REGISTRATION_ENABLED=false`, `POST /api/auth/register` returned
  `403 registration_disabled` before captcha checks.
- with `AUTH_REGISTRATION_REQUIRE_TURNSTILE=true` and no Turnstile token,
  `POST /api/auth/register` returned `403 captcha_required`.
- with `AUTH_REGISTRATION_REQUIRE_TURNSTILE=true`, a fake token and no
  `AUTH_TURNSTILE_SECRET_KEY`, registration returned
  `503 captcha_not_configured`.
- with Turnstile disabled for local development, a unique email/password
  registration returned `201` and created a memory-backed local profile.
- repeated same-email registration attempts hit `429 rate_limited` on the
  fourth attempt, matching the configured hourly email limit.
- `GET /api/auth/providers` returned only `credentials` under the local
  credentials-only env.
- `/zh-hk/notes/membership` rendered Plus/Pro membership markers and zero
  public `Admin` / `管理員` / `管理员` matches.

## Vercel deployment

Attempting `vercel deploy --target development` failed because the Vercel
project has no custom environment named `development`.

The completed deployment therefore used a standard preview deployment with
explicit preview/development surface env overrides and no production promotion.

Verified development deployments in this pass:

- Manual CLI preview before the commit was pushed:
  `dpl_6XXrPsuh1ZZ9u3b9EoFsYozivyaP`,
  `https://my-websites-otdp36cj4-mixuandahotmailcoms-projects.vercel.app`
- Clean Git preview after pushing `origin/codex/account` was:
  `dpl_2anZdbHjD2y2cupeZG62WHUHbtnu`,
  `https://my-websites-k58p82gpq-mixuandahotmailcoms-projects.vercel.app`
- Git preview inspect URL:
  `https://vercel.com/mixuandahotmailcoms-projects/my-websites/2anZdbHjD2y2cupeZG62WHUHbtnu`
- Git preview commit: `32909e3a16dd05cf4e5e25ba3ea17020a49d80aa`
- Vercel deployment state: `READY`
- Vercel deployment target: `null` / preview, not production
- Vercel source: `git`, branch `codex/account`

Remote smoke through authenticated Vercel fetch/curl against the Git preview:

- `POST /api/auth/register` returned
  `{"error":"Registration is not enabled.","errorCode":"registration_disabled"}`.
- `/api/billing/status` returned `billingReady=true`,
  `configuredPlanCount=2`, `freeDailyAttemptLimit=8`, and
  `membershipGatingEnabled=true`.
- unauthenticated `POST /api/billing/checkout` returned JSON
  `401 auth_required`.
- unauthenticated compatibility `POST /api/stripe/webhook` returned
  `400 Missing stripe-signature`.
- `/zh-hk/notes/membership` rendered expected Traditional Chinese membership
  markers including `筆記會員`, `Notes Plus 會員`,
  `免費可評分練習限額`, and `請先登入`.
- `/zh-hk/notes/membership` had zero public `Admin` / `管理員` / `管理员`
  matches.

## Production / development domain separation

`development.evanalysis.top` must not be treated as a production domain.

Current Vercel state after the follow-up domain isolation pass:

- The remote Git branch `codex/account` exists so Vercel can use it as a branch
  domain target.
- The Vercel project-domain configuration for `development.evanalysis.top` now
  has `gitBranch: codex/account` instead of `gitBranch: null`.
- At the branch-push smoke point, `development.evanalysis.top` resolved to the
  verified Git preview deployment `dpl_2anZdbHjD2y2cupeZG62WHUHbtnu`.
- `www.evanalysis.top` remains the production public domain.

Verified after isolation:

- `https://development.evanalysis.top/` returns `401 Authentication Required`
  for ordinary public requests because Vercel Authentication protects the
  development preview.
- Authenticated Vercel fetch/curl for
  `https://development.evanalysis.top/zh-hk/notes/membership` returns `200`
  and renders the preview-only membership page.
- `https://development.evanalysis.top/api/billing/status` returns
  `billingReady=true`, `configuredPlanCount=2`, and
  `membershipGatingEnabled=true`.
- authenticated `POST /api/auth/register` on the development preview returns
  `403 registration_disabled`.
- `https://www.evanalysis.top/en/notes` still returns `200` as the production
  Notes surface.

Future rule: if the development domain ever shows production-only behavior
again, first check the Vercel project domain entry. `gitBranch` must not be
`null` for `development.evanalysis.top`.

## Current blockers / constraints

- 2026-06-12 public-registration preparation deployed code
  `7e55c77a4c8ecded9179155a5145e9d7f53616fd` to preview deployment
  `dpl_5X3HQCHgnPAx8fnS2kyFQCyWLBLL`,
  `https://my-websites-db3p7sk5o-mixuandahotmailcoms-projects.vercel.app`.
  Vercel reports target `preview`, status `Ready`, and aliases include
  `https://development.evanalysis.top` plus the `codex/account` git preview
  alias.
- The branch-scoped `Preview (codex/account)` env now enables the credentials
  surface and registration preparation flags without adding production secrets:
  `NEXT_PUBLIC_AUTH_PROVIDERS=credentials`,
  `AUTH_REGISTRATION_ENABLED=true`,
  `NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED=true`,
  `AUTH_REGISTRATION_REQUIRE_TURNSTILE=true`,
  `NEXT_PUBLIC_AUTH_REGISTRATION_REQUIRE_TURNSTILE=true`, and
  `AUTH_REGISTRATION_REQUIRE_PERSISTENCE=true`.
- Remote verification against the 2026-06-12 preview deployment:
  `/api/auth/providers` returns only the `credentials` provider with callback
  URLs under `https://development.evanalysis.top`;
  `POST /api/auth/register` returns
  `registration_persistence_not_configured`; `/api/billing/status` returns
  `billingReady=true`, `configuredPlanCount=2`,
  `membershipGatingEnabled=true`, Stripe secret/webhook configured, and
  `publishableKeyConfigured=false`.
- Ordinary public requests to `https://development.evanalysis.top/` still
  return Vercel Authentication `401`. Do not disable deployment protection
  until Turnstile and a development/staging Firebase project are configured;
  otherwise the login page could become publicly reachable before registration
  is actually safe.
- `development.evanalysis.top` has been repointed to the verified preview
  deployment through the Vercel API, and its project-domain config is branch
  scoped to `codex/account`. Do not replace this with a production alias or a
  `gitBranch: null` domain entry.
- The preview environment for this branch does not currently include Firebase
  or OAuth provider env vars. Public remote registration should remain disabled
  until preview Firestore and Turnstile are both configured.
- The current development deploy deliberately uses
  `NEXT_PUBLIC_AUTH_PROVIDERS=disabled`. The login page does not call the
  NextAuth providers endpoint in this closed state; direct provider-endpoint
  output is not a readiness check until at least one backend provider is
  configured.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is not configured in the one-off preview
  deployment. Current subscription readiness still passes because server-side
  subscription checkout uses Stripe secret key plus recurring price IDs, but the
  public key should be added before a full browser checkout QA pass.

## Recommended next step

Configure branch-scoped preview env for `codex/account` before the next remote
QA pass:

- Auth: `AUTH_SECRET`, `AUTH_TRUST_HOST`, actual provider envs or a deliberate
  credentials-registration strategy.
- Registration security: `AUTH_REGISTRATION_REQUIRE_TURNSTILE=true`,
  `NEXT_PUBLIC_AUTH_REGISTRATION_REQUIRE_TURNSTILE=true`,
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, and `AUTH_TURNSTILE_SECRET_KEY`.
- Persistence: Firebase Admin envs, preferably a development/staging Firebase
  project rather than production data if public registration is enabled.
- Billing: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
  `STRIPE_PRICE_ID_MEMBER_MONTHLY`, `STRIPE_PRICE_ID_MEMBER_YEARLY`,
  `NOTES_MEMBERSHIP_GATING`, and `NEXT_PUBLIC_NOTES_MEMBERSHIP_GATING`.
- Domain: ordinary `vercel alias set` still reports no access to
  `development.evanalysis.top` under the current CLI identity, but the Vercel
  REST API successfully repoints the alias. Re-check this before relying on CLI
  alias commands in future deployment work.
