# Database Inventory

Date: 2026-05-13

Scope: repository inspection only. No production Firestore, Vercel environment
values, Firebase secrets, or Stripe live data were read while preparing this
inventory.

## Current Persistence Decision

The current durable application database is Firebase Cloud Firestore, reached
through the Firebase Admin SDK in `src/lib/firebase-admin.ts`.

Firestore is enabled only when all of these server-side variables are present:

```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

If those variables are missing, this repo falls back to in-process memory for
several features. Memory mode is acceptable for local development and temporary
preview smoke checks only. It is not durable and must not be treated as
production persistence.

The repo does not currently contain a checked-in `firestore.rules`,
`firestore.indexes.json`, migration runner, seed runner, or backup script.
Server-side Firebase Admin usage bypasses Firestore client security rules, so
authorization correctness must come from application code and route guards.

## Environment Variables

| Area | Variables | Notes |
| --- | --- | --- |
| Auth.js | `AUTH_SECRET`, `NEXTAUTH_SECRET`, `AUTH_TRUST_HOST`, `NEXTAUTH_URL` | `AUTH_SECRET` or `NEXTAUTH_SECRET` is required for stable auth sessions. |
| OAuth | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, plus `AUTH_*` aliases | GitHub and Google providers are optional but must be paired. |
| Credentials auth | `AUTH_PASSWORD_EMAIL`, `AUTH_PASSWORD_HASH`, `AUTH_PASSWORD_USERS_JSON`, `AUTH_REGISTRATION_ENABLED`, `NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED` | Registered credentials persist in Firestore when configured. |
| Firebase Admin | `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Current source of durable app state. |
| Legacy Notes membership | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID_MEMBER_MONTHLY`, `STRIPE_PRICE_ID_MEMBER_YEARLY`, `NOTES_MEMBERSHIP_GATING` | Used by `src/lib/membership/**` and `/api/billing/**`. |
| Product-scope billing | `STRIPE_PRODUCT_PREMIUM_NOTES`, `STRIPE_PRICE_PREMIUM_NOTES_MONTHLY`, `STRIPE_PRICE_PREMIUM_NOTES_ONE_TIME`, `STRIPE_PRODUCT_PREMIUM_VIDEO_TOOLS`, `STRIPE_PRICE_PREMIUM_VIDEO_TOOLS_MONTHLY`, `STRIPE_PRICE_PREMIUM_VIDEO_TOOLS_ONE_TIME` | Used by `src/lib/billing/**` and `/api/stripe/**`. |
| Public URLs | `NEXT_PUBLIC_SITE_URL`, `APP_URL`, `NEXT_PUBLIC_APP_URL` | Used for callback, checkout, and portal URLs. |
| Surface guards | `SITE_SURFACE`, `NEXT_PUBLIC_SITE_SURFACE`, `VERCEL_ENV` | Production surface hides preview-only pages and APIs. |
| Admin | `ADMIN_EMAILS` | Server-side allowlist for admin role and admin routes. |

## Current Firestore Collections

| Collection / path | Writer | Reader | Durability role |
| --- | --- | --- | --- |
| `users/{userId}` | `src/lib/user-store.ts`, Auth.js Firebase adapter, membership webhook | auth session profile, settings, admin users, membership checks | Primary user profile and Auth.js-adjacent user record. |
| `accounts/{accountId}` | Auth.js Firebase adapter | `src/lib/user-store.ts`, `src/lib/admin-users.ts` | OAuth account-linking records. |
| `sessions/{sessionId}` | Auth.js Firebase adapter if adapter uses it | Auth.js adapter | Lower priority because this repo configures JWT sessions, but still part of the adapter surface. |
| `verificationTokens/{tokenId}` | Auth.js Firebase adapter when token flows are used | Auth.js adapter | Auth token flow support. |
| `credentialUsers/{credentialId}` | `src/lib/password-auth.ts` | credentials provider, admin users | Registered site-password users and PBKDF2 hashes. |
| `users/{userId}.membership` | `src/lib/membership/entitlements.ts`, `/api/billing/webhook` | Notes membership UI, export/access gating, settings, admin users | Legacy/current Notes membership authorization cache. |
| `user_entitlements/{userId}` | `src/lib/billing/store.ts`, `/api/stripe/webhook` | `/api/stripe/entitlements`, settings billing path | Product-scope entitlement model for premium products. |
| `stripe_customers/{stripeCustomerId}` | `src/lib/billing/store.ts` | `/api/stripe/webhook`, Stripe portal path | Stripe customer to app user mapping. |
| `users/{userId}/textbookProblemAttempts/{attemptId}` | `src/lib/textbook/problem-attempts.ts` | textbook progress APIs | Per-problem attempt history. |
| `users/{userId}/textbookSectionProgress/{unitId}` | `src/lib/textbook/problem-attempts.ts` | textbook section progress APIs | Derived section mastery summary. |
| `users/{userId}/diaries/{diaryId}` | `src/lib/db.ts` | diary pages/API | Private diary content. Preview/private feature. |

## Important Data Shapes

### `users/{userId}`

Repository-owned fields include:

- `id`
- `email`
- `name`
- `image`
- `role`
- `preferredLocale`
- `theme`
- `loginCount`
- `lastLoginAt`
- `lastProvider`
- `createdAt`
- `updatedAt`
- optional embedded `membership`

Auth.js adapter fields may also appear in the same top-level `users`
collection. Any migration must preserve adapter-required user IDs and OAuth
account links.

### `credentialUsers/{credentialId}`

Repository-owned fields:

- `id`
- `email`
- `name`
- `image`
- `role`
- `passwordHash`
- `createdAt`
- `updatedAt`

`passwordHash` uses the repo's PBKDF2 format. Do not rewrite or migrate these
records without a password-hash compatibility test.

### Embedded `users/{userId}.membership`

Fields:

- `customerId`
- `email`
- `priceId`
- `status`
- `subscriptionId`
- `updatedAt`

Active membership is derived from `active` or `trialing` status in
`src/lib/membership/entitlements.ts`.

### `user_entitlements/{userId}`

Fields:

- `userId`
- `stripeCustomerId`
- `plan`
- `scopes`
- `active`
- `renewsAt`
- `cancelAtPeriodEnd`
- `source`
- `updatedAt`

This model is more extensible than embedded `users.membership` because it can
represent multiple product scopes. It is not yet the sole canonical Notes
authorization model.

### Textbook progress subcollections

`textbookProblemAttempts` stores immutable or append-only attempt records keyed
by `attemptId`. `textbookSectionProgress` stores a derived mastery summary per
unit. If a migration happens, attempts should be treated as source data and
section progress as rebuildable derived data.

## Data Classification

| Data | Classification | Migration priority |
| --- | --- | --- |
| Auth.js `users` and `accounts` | Source of truth | Highest. Broken migration can lock users out. |
| `credentialUsers` | Source of truth | Highest. Contains password hashes. |
| Stripe customer links | Source of truth / authorization mapping | Highest. Wrong mapping can grant or revoke paid access incorrectly. |
| Embedded `users.membership` | Authorization cache | High until reconciled. |
| `user_entitlements` | Authorization cache / future canonical model | High if product billing is activated. |
| Problem attempts | User learning history | Medium/high. Preserve before progress features become user-critical. |
| Section progress | Derived state | Medium. Can be rebuilt from attempts. |
| Diaries | Private user content | High if feature is actively used. |

## Known Gaps

- No checked-in Firestore schema or index file.
- No tested backup/export script.
- No restore rehearsal.
- No database seed script.
- No fixture-based migration test.
- No row-count/hash comparison tooling.
- Two billing models exist: `src/lib/membership/**` with embedded
  `users.membership`, and `src/lib/billing/**` with `user_entitlements`.
- `/api/billing/**` is preview-only in production surface rules, while
  `/api/stripe/webhook` remains reachable for Stripe signature verification.
- `.nvmrc` currently pins Node `20.10.0`; Firebase Admin SDK `13.9.0`
  deprecates Node 20 support and recommends Node 22 or higher for future
  deployments. This is not an immediate break, but it should be tracked before
  the next Firebase Admin major version.

## Current Recommendation

Keep Firestore as the source of truth for now. The current risk is not that
Firestore is obsolete; the risk is that production-relevant auth, billing,
entitlement, progress, and diary data are implicit and not operationalized.

Before any migration to Neon, Supabase Postgres, Prisma Postgres, or another
Vercel Marketplace provider, finish these prerequisites:

1. Decide the canonical billing entitlement model.
2. Run and record a Firestore backup rehearsal in a non-production project.
3. Add fixture-based export/import or conversion tests.
4. Add comparison reports for user IDs, emails, OAuth accounts, Stripe customer
   IDs, subscriptions, entitlement state, and problem-attempt counts.
5. Use a staging database for the first end-to-end migration rehearsal.

## External References Checked

- [Vercel Storage overview](https://vercel.com/docs/storage)
- [Redis on Vercel](https://vercel.com/docs/redis)
- [Cloud Firestore overview](https://firebase.google.com/products/firestore)
- [Firestore transactions and batched writes](https://firebase.google.com/docs/firestore/manage-data/transactions)
- [Firebase Admin Node.js SDK release notes](https://firebase.google.com/support/release-notes/admin/node)
