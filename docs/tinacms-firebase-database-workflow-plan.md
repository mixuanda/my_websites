# TinaCMS / Firebase / Database Workflow Plan

Date: 2026-05-12

Worktree: `/Users/evan/.codex/worktrees/tinacms-database-workflow-plan/my_websites`

Branch: `codex/tinacms-database-workflow-plan`

Base: `origin/main` at `241fc58 Stabilize notes QA and auth hardening`

Original scope on 2026-05-12: read-only audit plus planning document. No TinaCMS removal, no database migration, no production database read/write, no Vercel/Firebase secret inspection, and no production data changes were performed in that first pass.

Implementation update on 2026-05-13:

- The owner confirmed TinaCMS should be removed from the repository.
- Option B was implemented in this worktree: TinaCMS packages, npm scripts, `tina/` config/generated files, Tina env examples, the standalone Tina guide, and the `/admin` Tina static-bundle fallback were removed.
- The `/admin` route is now only the authenticated backend status / user-management surface for preview/development.
- Firebase / Firestore was not migrated or modified. The current recommendation remains to keep Firebase for now while adding database inventory, backup/rollback, and billing-entitlement reconciliation before any migration.
- After Tina removal, `npm audit` and `npm audit --omit=dev` both report only the remaining 8 low-severity Firebase Admin transitive findings. The former Tina moderate/high dev-tooling findings are gone.
- Local verification passed: `npm run contentlayer`, `npm run verify:mdx-tables`, `npx tsc --noEmit --pretty false`, `npm run lint`, `git diff --check`, and `npm run build`. Production-surface smoke on port 3205 returned `/en/notes` 200, `/admin` 404, `/api/billing/status` 404, and `/api/stripe/webhook` 500 for missing local Stripe env rather than a production-surface 404.

Commands run:

```bash
git fetch --prune
git worktree add -b codex/tinacms-database-workflow-plan /Users/evan/.codex/worktrees/tinacms-database-workflow-plan/my_websites origin/main
npm audit --omit=dev
npm audit
npm install
npm audit --omit=dev
npm audit
```

Only `.env.example` was read. No real `.env.local` file exists in this worktree, and no real secret values were printed or inspected.

External primary references checked:

- [Vercel Storage overview](https://vercel.com/docs/storage)
- [Storage on Vercel Marketplace](https://vercel.com/docs/marketplace-storage)
- [Redis on Vercel](https://vercel.com/docs/redis)
- [Neon for Vercel](https://vercel.com/marketplace/neon/)
- [Supabase for Vercel](https://vercel.com/marketplace/supabase)
- [Firebase Cloud Firestore overview](https://firebase.google.com/products/firestore)
- [Firebase Admin SDK setup](https://firebase.google.com/docs/admin/setup)
- [Firestore transactions and batched writes](https://firebase.google.com/docs/firestore/manage-data/transactions)
- [Auth.js Firebase Adapter reference](https://authjs.dev/reference/firebase-adapter)

Current Firebase / Vercel database status checked again on 2026-05-13:

- Firebase Admin Node SDK release notes show `firebase-admin@13.9.0` released on 2026-05-07, which matches the package currently used in this repo. This indicates active maintenance, not abandonment.
- Firebase's Firestore docs still position Cloud Firestore as a scalable Google Cloud-backed NoSQL database with realtime updates, offline support, ACID transactions, and standard server SDKs.
- Firebase's official blog published a Firestore Enterprise update on 2026-04-27 about search and JOIN-like pipeline capabilities. That is another sign Firestore is still receiving platform investment.
- Vercel Marketplace storage is real and current, but it is a marketplace/provider layer. For Postgres, Vercel lists providers such as Neon, Supabase, and AWS Aurora Postgres; for key-value storage, it points to Upstash Redis.
- Vercel KV is no longer available for new projects and was moved to Upstash Redis for existing stores. Redis/Upstash should therefore be treated as cache/rate-limit/idempotency tooling, not as the primary Auth/billing database.

## 1. Audit Findings

### TinaCMS usage surface

Baseline finding before the 2026-05-13 cleanup:

- TinaCMS was present in `devDependencies`, `tina/**`, `docs/TINACMS_GUIDE.md`,
  `/admin` fallback behavior, and optional build scripts.
- It was not on the default production build path.
- It did not manage the main mathematics Notes content under
  `content/textbook/**`.
- Its primary cost was dev-tooling audit noise and stale deployment/admin
  documentation.

Current state after owner-confirmed cleanup:

- TinaCMS packages and scripts have been removed from `package.json`.
- Tina config/generated files and `docs/TINACMS_GUIDE.md` have been deleted.
- Tina env examples have been removed from `.env.example`.
- `/admin` no longer redirects to a generated Tina static bundle.
- `/admin` is now only the authenticated backend status / user-management
  surface in preview/development, and remains hidden in production.
- Content authoring is repository-file based.

Conclusion:

The TinaCMS decision is now separate from the database decision. Removing Tina
lowers dev-tooling noise but does not migrate, modify, or reduce the need to
inventory Firestore-backed auth, billing, entitlement, progress, and diary data.

### Firebase and Firestore current usage surface

Firebase is not merely a diary database. In this repository, Firebase Admin / Firestore currently acts as the central durable persistence layer whenever service-account env vars are present.

Relevant files:

- `src/lib/firebase-admin.ts`
- `src/lib/auth.ts`
- `src/lib/user-store.ts`
- `src/lib/password-auth.ts`
- `src/lib/admin-users.ts`
- `src/lib/membership/entitlements.ts`
- `src/lib/membership/plans.ts`
- `src/lib/membership/stripe.ts`
- `src/lib/billing/store.ts`
- `src/lib/billing/catalog.ts`
- `src/lib/billing/stripe.ts`
- `src/lib/db.ts`
- `src/lib/textbook/problem-attempts.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/app/api/auth/register/route.ts`
- `src/app/api/user/profile/route.ts`
- `src/app/api/user/accounts/route.ts`
- `src/app/api/admin/users/route.ts`
- `src/app/api/admin/system-status/route.ts`
- `src/app/api/billing/**`
- `src/app/api/stripe/**`
- `src/app/api/textbook/problems/**`

Firebase initialization:

- `src/lib/firebase-admin.ts` enables Firebase only when all three env vars exist:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY`
- It initializes `firebase-admin` with a service-account credential and exports `firestore`.
- If these values are missing, many features fall back to memory-only behavior.

Current Firestore-backed responsibilities:

- Auth.js adapter:
  - `src/lib/auth.ts` uses `FirestoreAdapter(firestore)` when Firebase is configured.
  - The Auth.js Firebase adapter defaults include collections such as `users`, `accounts`, `sessions`, and `verificationTokens`.
  - This repo uses JWT sessions, so persistent `sessions` may be less central, but `users` and `accounts` are still important for OAuth account linking.
- User profile:
  - `src/lib/user-store.ts` reads/writes `users/{userId}` with profile fields such as email, name, role, preferred locale, theme, login count, last login, and timestamps.
- Registered credentials:
  - `src/lib/password-auth.ts` stores self-registered credential users in the top-level `credentialUsers` collection.
  - Env-configured credential users remain in env vars, not Firestore.
- Admin user listing:
  - `src/lib/admin-users.ts` reads `users`, `accounts`, and `credentialUsers` to build the admin view.
- Membership record path:
  - `src/lib/membership/entitlements.ts` stores a `membership` object embedded under `users/{userId}`.
  - `setMembershipByEmail` also looks up `users` by email before updating the embedded membership.
- Product entitlement path:
  - `src/lib/billing/store.ts` stores normalized entitlements in top-level `user_entitlements/{userId}`.
  - It also stores Stripe customer links in `stripe_customers/{stripeCustomerId}`.
- Textbook problem progress:
  - `src/lib/textbook/problem-attempts.ts` writes attempts under `users/{userId}/textbookProblemAttempts/{attemptId}`.
  - It writes section mastery under `users/{userId}/textbookSectionProgress/{unitId}`.
  - Anonymous or unconfigured persistence falls back to process memory.
- Private diary:
  - `src/lib/db.ts` stores diaries under `users/{userId}/diaries/{diaryId}` when Firestore is configured.
  - It otherwise uses an in-memory store and sample data for development.

Firestore data types likely present:

- `users` documents:
  - Auth.js adapter user fields.
  - Custom profile fields from `SiteUserProfile`.
  - Optional embedded `membership`.
  - Last login provider data.
- `accounts` documents:
  - Auth.js OAuth account records.
- `sessions` / `verificationTokens`:
  - Possible Auth.js adapter collections depending on provider/session behavior.
- `credentialUsers`:
  - Registered credential login records and PBKDF2 password hashes.
- `users/{userId}/diaries`:
  - Private diary documents.
- `users/{userId}/textbookProblemAttempts`:
  - Individual problem attempt records.
- `users/{userId}/textbookSectionProgress`:
  - Derived section mastery.
- `user_entitlements`:
  - Newer product-scope entitlement records.
- `stripe_customers`:
  - Stripe customer id to user id mapping.

Important inconsistency:

- The repo currently has two Stripe/billing models:
  - `src/lib/membership/**` plus `/api/billing/**`, using `STRIPE_PRICE_ID_MEMBER_MONTHLY` and `STRIPE_PRICE_ID_MEMBER_YEARLY`, and storing embedded `users.membership`.
  - `src/lib/billing/**` plus `/api/stripe/**`, using product-scope env vars such as `STRIPE_PRICE_PREMIUM_NOTES_MONTHLY`, and storing `user_entitlements` plus `stripe_customers`.
- Production surface rules hide `/api/billing/**`, `/api/user/**`, `/api/auth/**`, `/admin`, `/settings`, and membership pages.
- `/api/stripe/webhook` is intentionally exempted from auth middleware and is not hidden by `site-surface.ts`.
- Before any database migration, the billing model must be reconciled. Migrating duplicate or partially hidden billing state would be risky.

### Vercel deployment and env var dependencies

Current repository docs identify the production project as `my-websites` and the production domain as `https://www.evanalysis.top`.

Important runtime env vars found in code or `.env.example`:

Core site / Auth.js:

- `AUTH_SECRET` or `NEXTAUTH_SECRET`
- `AUTH_TRUST_HOST`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_SITE_URL`
- `SITE_SURFACE`
- `NEXT_PUBLIC_SITE_SURFACE`
- `VERCEL_ENV` and `VERCEL_GIT_COMMIT_REF` are read as platform-provided signals.

OAuth:

- `GITHUB_CLIENT_ID` or `AUTH_GITHUB_ID`
- `GITHUB_CLIENT_SECRET` or `AUTH_GITHUB_SECRET`
- `GOOGLE_CLIENT_ID` or `AUTH_GOOGLE_ID`
- `GOOGLE_CLIENT_SECRET` or `AUTH_GOOGLE_SECRET`

Credentials login / registration:

- `NEXT_PUBLIC_AUTH_PROVIDERS`
- `AUTH_REGISTRATION_ENABLED`
- `NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED`
- `AUTH_PASSWORD_EMAIL`
- `AUTH_PASSWORD_NAME`
- `AUTH_PASSWORD_ROLE`
- `AUTH_PASSWORD_HASH`
- `AUTH_PASSWORD_USERS_JSON`
- Optional: `AUTH_PASSWORD_USER_ID`, `AUTH_PASSWORD_IMAGE`

Firebase Admin:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Membership and billing:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_MEMBER_MONTHLY`
- `STRIPE_PRICE_ID_MEMBER_YEARLY`
- `NOTES_MEMBERSHIP_GATING`
- `NEXT_PUBLIC_NOTES_MEMBERSHIP_GATING`
- `APP_URL`
- `NEXT_PUBLIC_APP_URL`
- `STRIPE_PRODUCT_PREMIUM_NOTES`
- `STRIPE_PRICE_PREMIUM_NOTES_MONTHLY`
- `STRIPE_PRICE_PREMIUM_NOTES_ONE_TIME`
- `STRIPE_PRODUCT_PREMIUM_VIDEO_TOOLS`
- `STRIPE_PRICE_PREMIUM_VIDEO_TOOLS_MONTHLY`
- `STRIPE_PRICE_PREMIUM_VIDEO_TOOLS_ONE_TIME`

Admin / SEO / optional integrations:

- `ADMIN_EMAILS`
- `GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPO_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

Env var documentation issue:

- `.env.example` reflects the current Firebase Admin style: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`.
- `docs/VERCEL_DEPLOYMENT.md` previously contained older Firebase client-side env names such as `NEXT_PUBLIC_FIREBASE_API_KEY` and older server-key names such as `FIREBASE_SERVICE_ACCOUNT_KEY` / `FIREBASE_ADMIN_SDK_KEY`. The 2026-05-13 cleanup corrected that document to the current Firebase Admin SDK variables.
- Tina env vars have been removed from `.env.example`; if a future CMS is
  introduced, it should get a new setup document instead of reusing stale Tina
  instructions.

### Current audit/security state

`npm audit --omit=dev` result:

- 8 low-severity vulnerabilities remain in the production dependency graph.
- The chain is under `firebase-admin@13.9.0` through Google Cloud dependencies:
  - `@tootallnate/once`
  - `http-proxy-agent`
  - `teeny-request`
  - `retry-request`
  - `google-gax`
  - `@google-cloud/firestore`
  - `@google-cloud/storage`
- `npm audit` proposes `npm audit fix --force`, but that would install `firebase-admin@10.3.0`, a breaking downgrade. Do not use that force fix.

Baseline full `npm audit` result before Tina removal:

- Baseline before Tina removal had 21 vulnerabilities total:
  - 8 low
  - 5 moderate
  - 8 high
- The additional moderate/high findings are dev-only TinaCMS tooling chains:
  - `lodash`
  - `@graphql-codegen/**`
  - `react-router`
  - `react-router-dom`
  - `vite`
  - `@tinacms/app`
  - `@tinacms/cli`
  - `tinacms`
- Audit force fixes would downgrade Tina packages to older majors. Do not use `npm audit fix --force` here.
- After Tina removal, `npm audit` was rerun and now matches
  `npm audit --omit=dev`: 8 low-severity Firebase Admin transitive findings
  remain, and the former Tina moderate/high dev-only chains are gone.

Interpretation:

- Production dependency audit is currently dominated by a known low-severity upstream Firebase Admin chain.
- Dev audit was materially worsened by TinaCMS tooling.
- Since the owner confirmed Tina is not needed, the correct path is removal in
  this worktree, not a forced downgrade.

### Production-critical vs dev-only / optional

Production-critical or potentially production-critical:

- `src/lib/firebase-admin.ts`
- `src/lib/auth.ts`
- `src/lib/user-store.ts`
- `src/lib/password-auth.ts`
- `src/lib/membership/entitlements.ts`
- `src/lib/billing/store.ts`
- `src/lib/textbook/problem-attempts.ts`
- `src/lib/db.ts`
- `/api/stripe/webhook`
- `/api/textbook/problems/**`
- `/api/textbook-export/**`
- Stripe env vars used by active billing paths.
- Firebase Admin service-account env vars if any authenticated state should persist.

Preview/admin/unfinished surface:

- `/admin`
- `/api/admin/**`
- `/api/user/**`
- `/api/auth/**`
- `/api/billing/**`
- `/settings`
- `/diary`
- membership center pages.

Removed dev-only / optional surface:

- `tinacms`
- `@tinacms/cli`
- `tina/config.ts`
- `tina/__generated__/**`
- `tina/tina-lock.json`
- `npm run tina:dev`
- `npm run tina:build`
- `npm run build:cms`
- Tina docs and setup guides.

### Migration, backup, seed, schema, rollback, runbook status

Existing docs contain generic database guidance, including sample Firebase export and PostgreSQL backup commands in `docs/DATABASE_CONFIG.md` and `docs/PRIVATE_DIARY_GUIDE.md`.

Current status for the production data model:

- `docs/database-inventory.md` now records the current Firestore collection
  surface found in code.
- `docs/database-backup-rollback-runbook.md` now records the required backup,
  restore, and rollback discipline for future work.
- `docs/billing-entitlement-reconciliation.md` now records the duplicate
  billing/entitlement models and the recommended canonical target.
- No checked-in Firestore index/rules file exists.
- No migration runner exists.
- No seed runner for Firestore-backed user/billing/progress data exists.
- No executable backup script exists.
- No executable restore script exists.
- No dual-write or read-only mirror framework exists.
- No staging migration rehearsal has been run.

This is the main blocker to any serious database migration.

## 2. TinaCMS Removal State

Status: implemented in this worktree on 2026-05-13 after owner confirmation.

Removed:

- `tinacms` and `@tinacms/cli` from `devDependencies`.
- Tina build and dev scripts:
  - `build:cms`
  - `tina:build`
  - `tina:build:auto`
  - `tina:dev`
- Tina configuration and generated files:
  - `tina/config.ts`
  - `tina/config.ts.example`
  - `tina/tina-lock.json`
  - `tina/__generated__/**`
- optional Tina env examples:
  - `TINA_CLIENT_ID`
  - `NEXT_PUBLIC_TINA_CLIENT_ID`
  - `TINA_TOKEN`
- standalone `docs/TINACMS_GUIDE.md`.
- generated-admin-bundle fallback behavior in `src/app/admin/page.tsx`.

Current intended state:

- Public Notes authoring remains file-based under the repository.
- `/admin` is an authenticated backend status / user-management surface in
  preview and development only.
- Production `/admin` remains hidden by `notFoundInProduction()`.
- Vercel builds should use the default `npm run build`; there is no CMS build
  path.
- A future CMS should be evaluated as a new feature branch rather than casually
  restoring the old Tina setup.

Expected impact:

- Public Notes build should not break because default build did not depend on
  Tina.
- Main `content/textbook/**` authoring is unaffected.
- Browser-based Tina editing for `content/blog`, `content/notes`, and
  `content/projects` is no longer available.
- Full `npm audit` should no longer include the old Tina dependency chains.

Verification for this removal:

```bash
npm install
npm audit --omit=dev
npm audit
npm run contentlayer
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
npm run build
rg -n "tinacms|TinaCMS|TINA_|@tinacms|tina:" . --glob '!docs/tinacms-firebase-database-workflow-plan.md'
```

Rollback:

- Revert the Tina-removal commit.
- Run `npm install`.
- Restore Tina env vars only if CMS workflow is intentionally reintroduced.

## 3. Firebase / Database Plan

### Is Firebase actually outdated here?

No clear evidence says Firebase is outdated for this project. The current problem is not that Firestore is obsolete. The current problem is that Firestore is being used as an implicit multi-purpose production database without a formal schema, backup, migration, and rollback workflow.

Firebase / Firestore remains a legitimate fit for:

- Document-shaped user profile data.
- Low-to-medium write volume progress data.
- Serverless usage from Next.js route handlers.
- Simple document and subcollection storage.
- Existing Auth.js Firebase adapter integration.
- Avoiding immediate production-data migration risk.

Firebase drawbacks in this repo:

- The current service-account code bypasses Firestore security rules; all authorization must be correct in application code.
- The schema is implicit in TypeScript and route behavior, not enforced at the database layer.
- Auth, user profile, billing entitlement, progress, and diary data are mixed under shared collections.
- There are two billing/entitlement models.
- Production backup/export/restore is not operationalized.
- `npm audit --omit=dev` currently has a low-severity upstream Firebase Admin dependency chain.
- Querying/reporting across users, accounts, entitlements, Stripe customer ids, and progress is more awkward than in SQL.

Continuing Firebase costs and risks:

- Need to tolerate the low-severity upstream audit chain until Google dependencies resolve it.
- Need to document schema and add backup/runbook discipline.
- Need to reconcile billing models while preserving existing data.
- Need to add explicit test-mode smoke tests for Firestore reads/writes.

Migrating out of Firebase costs and risks:

- Auth.js adapter data must move without breaking OAuth account linking.
- User ids must remain stable or be mapped permanently.
- Stripe customer ids, subscription ids, and entitlement state must not be mismatched.
- Progress history and derived section mastery must stay consistent.
- Credential login hashes in `credentialUsers` must be migrated carefully.
- Existing users could be locked out if Auth adapter data is incomplete.
- A one-shot migration would have a high data-loss and rollback risk.

### Option 1: Continue with Firebase / Firestore

Best when:

- The priority is protecting existing user, membership, and progress state.
- Query complexity stays modest.
- The owner wants the least risky near-term plan.
- The team can accept the low-severity Firebase Admin audit chain.

Required cleanup before calling this stable:

- Write `docs/database-inventory.md`.
- Write `docs/database-backup-rollback-runbook.md`.
- Document all collections and document shapes.
- Reconcile `/api/billing/**` versus `/api/stripe/**`.
- Add safe test-mode Firestore smoke checks.
- Add a non-secret Vercel env var checklist.

### Option 2: Vercel Marketplace Postgres

Vercel Marketplace currently provides storage integrations for Postgres providers such as Neon, Supabase, and AWS Aurora Postgres. Vercel can provision databases from the dashboard and inject connection credentials as environment variables.

Best suited data:

- Auth adapter data.
- User profiles.
- Stripe customers/subscriptions/entitlements.
- Textbook progress and attempts if analytics/reporting matters.
- Admin reporting tables.

Advantages:

- Strong schema and migrations.
- ACID transactions and foreign keys.
- Better reporting over users, entitlements, attempts, and billing.
- Standard backup tools and migration workflows.
- Easier dual-write and mirror verification.

Risks:

- Requires choosing and adding an Auth.js SQL adapter or ORM path.
- Requires schema design and migration scripts.
- Requires connection pooling / serverless-safe client setup.
- Requires careful id mapping from Firestore docs to relational rows.
- A wrong cutover can break auth and billing.

### Option 3: Supabase / Neon Postgres

Neon:

- Strong fit for Vercel-hosted Next.js apps that need serverless Postgres.
- Useful if preview-branch databases are valuable for migration rehearsals.
- Good candidate for long-term relational app data while keeping Vercel deployment workflow tight.

Supabase:

- Strong fit if the project wants Postgres plus optional Auth, Storage, Realtime, and dashboard tooling.
- Supabase Auth should not be adopted casually here because the current Auth.js setup already has OAuth, credentials, admin allowlist, and Firestore adapter state.
- Supabase Postgres alone is a reasonable candidate; Supabase Auth is a separate long-term auth migration.

Recommendation if choosing Postgres:

- Evaluate Neon and Supabase first as Postgres backends.
- Prefer the database provider that gives the best backup, branching/staging, and predictable cost profile for small but critical user/billing data.
- Do not choose based only on Vercel proximity. Choose based on schema fit, migration safety, and rollback clarity.

### Option 4: Vercel KV / Redis-style storage

Current Vercel docs say Vercel KV is no longer available for new projects and existing Vercel KV stores were moved to Upstash Redis in December 2024. For new Redis/KV use, use a Redis integration from Vercel Marketplace, such as Upstash Redis or Redis Cloud.

Good uses:

- Rate limiting.
- Short-lived caches.
- Temporary session/cache data.
- Idempotency keys.
- Background workflow coordination.
- Non-authoritative computed checkpoint summaries.

Bad uses:

- Primary auth records.
- Stripe billing source of truth.
- Membership entitlements.
- Long-term progress history.
- Credential password hashes.

Conclusion:

Redis/KV should not replace Firestore as the primary user/billing database. It can be added later as a cache or rate limiter.

### Option 5: Partial migration to Vercel-platform storage while Auth stays Firebase

Possible staged path:

- Keep Auth.js Firebase adapter and `users/accounts` in Firestore.
- Move lower-risk derived or auxiliary state first, such as cached section mastery or analytics summaries.
- Later move textbook attempts/progress after schema and export tests exist.
- Keep billing/membership on Firestore until Stripe reconciliation is solved.

Advantages:

- Lower blast radius.
- Lets the project build database abstractions gradually.
- Preserves user login while testing Postgres.

Risks:

- Split-brain data model.
- More env vars and operational surfaces.
- Requires stable identity mapping from Firestore user ids to new DB rows.
- Harder local testing unless abstractions are clean.

### Option 6: Full Auth + DB migration

This is a long-term option, not a next step.

It would include:

- Replacing the Auth.js Firebase adapter with a SQL-compatible adapter.
- Migrating `users`, `accounts`, optional `verificationTokens`, and any session state.
- Migrating custom profile fields.
- Migrating credential users and password hashes.
- Migrating memberships, entitlements, Stripe customer links, progress, and diaries.
- Running dual-read or read-only mirror checks before cutover.

This should only happen after:

- Complete inventory.
- Schema mapping.
- Backup export.
- Staging rehearsal.
- Verified rollback.
- Explicit owner approval.

## 4. Recommended Plan

Conservative recommendation:

1. Do not remove Firebase now.
2. Do not migrate production data now.
3. Treat TinaCMS removal as complete in this worktree; do not restore it unless a future CMS feature is explicitly approved.
4. Fix the database workflow first:
   - document the actual database inventory;
   - reconcile the duplicate billing models;
   - write backup/rollback runbooks;
   - add safe smoke tests;
   - make production audit and full dev audit separate gates.
5. Evaluate Postgres as a long-term destination, with Neon and Supabase as the first serious candidates.
6. Treat Redis/KV as cache/rate-limit tooling only, not a primary database replacement.

Why this is the safest path:

- Firebase is currently production-critical for auth-adjacent and user-state data.
- The cost of accidental user lockout, wrong membership entitlement, or lost progress is higher than the benefit of a quick provider switch.
- The current audit issue is low-severity in production and does not justify a breaking Firebase Admin downgrade.
- TinaCMS removal lowers dev-tooling audit noise but does not change the database decision.

This round does:

- Create isolated worktree.
- Audit current code and docs.
- Write this plan document.
- Remove TinaCMS from the repository after owner confirmation.
- Add database inventory, Vercel database evaluation, backup/rollback, and billing reconciliation documents.

Next implementation phases can do:

- Database inventory refinements and schema docs.
- Local abstraction work that does not touch production data.
- Safe test-mode smoke tooling.
- Migration prototype only after approval.

If a migration is later approved, the minimum phased sequence is:

1. Inventory.
2. Schema mapping.
3. Backup.
4. Read-only mirror.
5. Dual-write or migration rehearsal.
6. Staging verification.
7. Production cutover.
8. Rollback.

No step that writes, deletes, migrates, or mutates production database state should run without explicit confirmation.

## 5. New Workflow Design

### Branch and worktree rules

- Database work must use its own feature branch and worktree.
- Tina cleanup was intentionally done in this isolated worktree before any
  database migration work. Future production database migration work should use
  a separate branch/worktree if it goes beyond documentation and local fixtures.
- Notes QA/content work must not share a branch with database migration.
- Vercel env var changes must be tracked in a plan/checklist before they are applied.

### Phase 1: Read-only audit and plan

Status: completed by this document.

Allowed:

- Read repository code and docs.
- Read `.env.example`.
- Run `npm audit` commands.
- Research official platform docs.
- Write planning docs.

Forbidden:

- Read real secret files.
- Pull Vercel/Firebase env vars.
- Connect to production Firestore.
- Write production database data.
- Change Vercel project settings.

### Phase 2: Local model/schema abstraction

Allowed after confirmation:

- Add TypeScript interfaces or schema docs for current Firestore collections.
- Add a repository-owned database inventory document.
- Add local-only mock repositories or adapter interfaces.
- Add tests using in-memory fixtures.
- Add safe smoke-test commands that require explicit test env vars.

Forbidden:

- Production data reads/writes.
- Production migration.
- Vercel env var edits.

Deliverables:

- `docs/database-inventory.md`
- `docs/database-backup-rollback-runbook.md`
- `docs/billing-entitlement-reconciliation.md`
- Optional local adapter interfaces under `src/lib/**` without changing production behavior.

### Phase 3: Migration rehearsal design

Allowed after confirmation:

- Design Firestore export format.
- Design target Postgres schema.
- Build dry-run conversion scripts using fixtures or sanitized exports.
- Build idempotency checks.
- Build row-count/hash comparison reports.

Forbidden:

- Production writes.
- Production cutover.
- Deleting Firestore data.

### Phase 4: Staging rehearsal

Allowed only after explicit approval:

- Use staging Firebase/Vercel/Postgres credentials.
- Run read-only source export from staging.
- Run import into staging target DB.
- Verify auth, profile, membership, progress, billing, and exports on staging.

Required:

- Backup before rehearsal.
- Rollback checklist.
- Smoke-test evidence.

### Phase 5: Production cutover

Allowed only after explicit approval:

- Freeze or queue writes if needed.
- Backup production Firestore.
- Run migration.
- Enable read from target database.
- Keep source Firestore unchanged during rollback window.
- Monitor auth, billing, membership, progress, and export routes.

Rollback requirement:

- Be able to switch reads back to Firestore.
- Keep Firestore write path available until the migration is proven stable.
- Never delete source data during initial cutover.

### Vercel env var workflow

Before any Vercel env var changes:

- Produce a checklist of current required vars.
- Classify each as secret, public, optional, deprecated, or migration-only.
- Confirm target environment: Production, Preview, Development.
- Apply only after owner approval.
- Verify deployment readiness with Vercel deployment inspection.

## 6. Verification Matrix

### Baseline dependency and build checks

```bash
npm install
npm audit --omit=dev
npm run contentlayer
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Use full audit as a separate dev-tooling signal:

```bash
npm audit
```

Do not run:

```bash
npm audit fix --force
```

### TinaCMS checks

```bash
rg -n "tinacms|TinaCMS|TINA_|@tinacms|tina:" .
npm audit
npm run build
```

Expected:

- No runtime/package/script references remain unless intentionally documented as
  historical notes.
- Full audit no longer includes Tina dependency chains.
- `/admin` remains backend status/user-management only in preview/development.

### Local route smoke tests

Run against local server after build/dev server setup:

- `/`
- `/en/notes`
- `/zh-hk/notes`
- `/zh-cn/notes`
- Representative note detail page.
- Representative TXT export.
- Representative PDF export.
- `/api/billing/status` only in preview/development surface.
- `/api/admin/system-status` only as signed-in admin in preview/development surface.

### Auth route smoke

Test in safe local or preview mode:

- `/login` renders expected provider buttons.
- Credentials login with test-only credential.
- GitHub OAuth only if test OAuth env is configured.
- Google OAuth only if test OAuth env is configured.
- Registration rejects weak password.
- Registration rejects admin allowlist email.
- Registration creates only test user in test database.

### User profile smoke

- `GET /api/user/profile` returns profile for signed-in test user.
- `PATCH /api/user/profile` updates only name, preferred locale, and theme.
- Role, email, membership, and provider fields cannot be changed by client patch.
- Persistence reports `firestore` only when test Firestore is configured.

### Membership entitlement smoke

- Admin allowlist user has member access without payment.
- Non-member user cannot access member-gated unit when gating is enabled.
- Member record lookup by user id and email is consistent.
- Embedded `users.membership` and `user_entitlements` models are reconciled or intentionally separated before migration.

### Textbook progress smoke

- `GET /api/textbook/problems/{problemId}/progress`
- `POST /api/textbook/problems/submit`
- `GET /api/textbook/problems/sections/{sectionId}/progress`
- Attempt count increments once.
- Max attempts lockout works.
- Section mastery updates correctly.
- Anonymous and signed-in behavior are distinct and documented.

### Billing / Stripe smoke

Use Stripe test mode only unless explicitly approved for live:

- Checkout route returns a Stripe Checkout URL.
- Portal route returns a portal URL for a known test customer.
- Webhook rejects missing signature.
- Webhook rejects invalid signature.
- Webhook with valid test event updates only test entitlement records.
- `/api/stripe/webhook` remains reachable without site session cookies.
- `/api/billing/webhook` behavior is reconciled with production surface policy before use.

### Database read/write smoke in safe test mode

Only with test database env vars:

- Create test user profile.
- Read test user profile.
- Update test profile preference.
- Create test credential user.
- Create test entitlement.
- Create test problem attempt.
- Read test section progress.
- Delete test fixture data if the smoke runner owns it.

### Vercel deployment verify

After implementation branches only:

```bash
npx --yes vercel@latest ls my-websites
npx --yes vercel@latest inspect <deployment-url> --wait
```

Then verify:

- Production domain responds.
- Production route surface still hides preview-only pages.
- `/api/stripe/webhook` signature behavior remains correct.
- Representative Notes routes render.
- Representative export routes work.
- Vercel logs have no new runtime errors.

### Production route/export/API smoke

Only after deployment is Ready:

- `https://www.evanalysis.top/`
- `https://www.evanalysis.top/en/notes`
- `https://www.evanalysis.top/zh-hk/notes`
- Representative `/{locale}/notes/{course}/{chapter}/{unit}`.
- Representative `/api/textbook-export/{locale}/{course}/{chapter}/{unit}`.
- Representative `/api/textbook-export/{locale}/{course}/{chapter}/{unit}/pdf`.
- Representative `/api/textbook/problems/grade`.
- Webhook signature rejection test for `/api/stripe/webhook`.

## 7. Risks and Rollback

### TinaCMS removal risk

Risks:

- Loss of browser-based editing for blog, legacy notes, and projects.
- Stale docs or admin copy may still point users to Tina.
- Any hidden Tina-generated admin bundle assumptions may break.
- Devs who relied on `npm run tina:dev` lose that workflow.

Rollback:

- Revert the Tina-removal commit.
- Run `npm install`.
- Restore Tina env vars only if CMS is intentionally used.
- Re-run build and audit checks.

### Firebase continued-use risk

Risks:

- Low-severity upstream audit chain remains.
- Service-account code has broad server-side privileges.
- Data model remains implicit.
- Firestore queries and subcollection shapes remain harder to audit than SQL schema.
- Billing duplication can continue to drift.

Mitigation:

- Add schema inventory.
- Add backup/restore runbook.
- Add test-mode smoke checks.
- Reconcile billing models.
- Keep `firebase-admin` current without major downgrade.

Rollback:

- If cleanup changes break runtime behavior, revert code/docs changes.
- Since no data is moved, existing Firestore remains source of truth.

### Firebase migration risk

Risks:

- Auth user/account mismatch.
- OAuth account linking failures.
- Credential user password hash mismatch.
- Stripe customer/subscription mismatch.
- Member access wrongly granted or revoked.
- Progress attempts duplicated or lost.
- Derived section mastery inconsistent.
- Private diary loss.
- Cutover writes split between two databases.

Mitigation:

- Inventory first.
- Backup first.
- Read-only mirror before writes.
- Idempotent migration scripts.
- Staging rehearsal.
- Dual-write or freeze-window plan.
- Explicit rollback switch.

Rollback:

- Keep Firestore unchanged during first cutover.
- Keep feature flag/env switch to return reads to Firestore.
- Disable new target writes if mismatch is detected.
- Reconcile failed dual-write queue before retry.

### Vercel database lock-in risk

Risks:

- Marketplace convenience may hide provider-specific billing, limits, and env var conventions.
- Redis/KV providers are not substitutes for relational durability.
- Prisma Postgres may imply Prisma ORM adoption.
- Provider-specific preview branching or serverless drivers can affect portability.

Mitigation:

- Prefer standard Postgres schema and migrations if migrating core app state.
- Keep SQL portable where practical.
- Document provider-specific env vars.
- Avoid using Redis/Edge Config/Blob for primary auth or billing state.

Rollback:

- Retain Firestore as source until new provider is proven.
- Keep migration scripts one-way only for rehearsal, not destructive.
- Do not delete source data until a later confirmed archival phase.

### Auth / billing / membership data mismatch risk

Risks:

- User id in Auth.js adapter may not match custom `SiteUserProfile.id`.
- Stripe customer id may map to the wrong user.
- Embedded `users.membership` and `user_entitlements` may disagree.
- `/api/billing/**` and `/api/stripe/**` may update different records.

Mitigation:

- Reconcile billing models before migration.
- Create one canonical entitlement model.
- Build comparison reports.
- Treat Stripe as external source of truth for subscription status, but app database as authorization cache.

Rollback:

- Revert to existing Firestore entitlement reads.
- Reprocess Stripe test/live events only after owner approval.
- Never bulk-delete entitlement records during migration.

### Data loss risk

Risks:

- Missing backup.
- Partial import.
- Duplicate writes.
- Bad id mapping.
- Production write during cutover.

Mitigation:

- Export before migration.
- Store checksum/count reports.
- Run dry-run conversion.
- Use idempotent upserts.
- Keep immutable source backup.
- Require human approval before production writes.

Rollback:

- Restore from backup only if source Firestore is corrupted.
- Prefer switching app reads back to Firestore if target migration fails.
- Keep source writes enabled until rollback window closes.

## 8. Questions Requiring Owner Confirmation

1. Should Firebase remain the source of truth while we first fix schema
   inventory, backup/rollback workflow, and billing reconciliation?
2. Should the next database branch focus on inventory/schema docs and local
   fixtures only, with no production data access?
3. Should Neon, Supabase Postgres, and Prisma Postgres be evaluated as
   long-term Postgres candidates?
4. Is Supabase Auth in scope, or should Supabase be considered only as a
   Postgres database for now?
5. Should Redis/Upstash be considered only for cache/rate
   limiting/idempotency, not primary user state?
6. May a future phase create a local migration prototype using fixture data
   only?
7. May a future phase use staging Firebase/Vercel/Postgres env vars for smoke
   tests?
8. May any future phase perform read-only inspection of production Firestore,
   or should all production inspection wait until a separate approval?
9. Should `user_entitlements` become the canonical entitlement model, with
   embedded `users.membership` kept only as a bridge/legacy view?
10. Should production membership/billing pages remain hidden for now under
    `SITE_SURFACE=production`?
11. Is `https://www.evanalysis.top/api/stripe/webhook` the intended live webhook
    endpoint, or should docs that mention `/api/billing/webhook` be corrected
    first?
