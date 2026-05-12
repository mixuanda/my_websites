# Vercel Database Evaluation

Date: 2026-05-13

Scope: choosing a possible future Vercel-hosted or Vercel-integrated database
path for this repository. This document does not approve a production database
migration.

## Current Answer

Do not migrate from Firebase / Firestore yet.

Vercel does not provide one single generic "Vercel database" that should
replace Firestore automatically. Current Vercel storage is a mix of first-party
storage products and Marketplace provider integrations. For this repo's auth,
billing, entitlement, and progress data, a relational database may become a good
long-term target, but only after the current Firestore schema and billing model
are reconciled.

## Vercel Storage Options

| Option | Fit for this repo | Use / avoid |
| --- | --- | --- |
| Vercel Blob | Low for app database; good for files | Use for exported PDFs, user uploads, large generated media. Do not use for auth, billing, or progress records. |
| Vercel Edge Config | Low for app database | Use for feature flags or rarely changed global config. Do not use for user data or frequently written data. |
| Neon Postgres via Marketplace | Strong long-term candidate | Good fit for Auth.js data, user profiles, entitlements, Stripe customer mapping, and progress analytics after migration prep. |
| Supabase Postgres via Marketplace | Strong candidate if dashboard tooling is useful | Consider as Postgres. Do not adopt Supabase Auth casually while Auth.js is already established. |
| Prisma Postgres / Prisma ORM path | Possible if ORM adoption is desired | Requires schema design, migrations, generated client, and connection strategy. |
| Upstash Redis / Redis Marketplace | Cache-only | Use for rate limits, idempotency keys, ephemeral workflow state. Do not use as primary auth or billing storage. |
| MongoDB Atlas | Possible but lower immediate fit | Flexible document model, but current pain points are schema, reporting, and billing reconciliation, where SQL is clearer. |
| Turso / libSQL | Possible for smaller relational state | Evaluate only if edge-read latency matters more than standard Postgres ecosystem. |
| Convex | Product architecture change | Not a small storage swap; treat as a separate backend decision. |

## Why Firestore Stays for Now

- Auth.js Firebase adapter is already wired.
- Current user IDs, OAuth account links, credential users, membership records,
  Stripe customer links, problem attempts, section progress, and diaries may all
  depend on Firestore data.
- Firestore remains an actively supported Google Cloud-backed NoSQL database.
- Firebase Admin SDK `13.9.0` is current in this repo as of this pass.
- The immediate issue is missing operational discipline, not provider
  obsolescence.

## Why Postgres May Be Better Later

Postgres is a better long-term shape if the project needs:

- explicit schemas and migrations;
- foreign keys between users, accounts, customers, subscriptions, entitlements,
  and attempts;
- reliable reporting across users and learning progress;
- easier reconciliation of Stripe customer and subscription state;
- portable backups and fixture-based migration tests.

Neon and Supabase are the first serious candidates because Vercel Marketplace
can provision and inject credentials, and both support standard Postgres
workflows. The project should still choose based on backup, branching/staging,
cost, operational clarity, and migration safety, not only on Vercel proximity.

## Migration Prerequisites

Before choosing or provisioning a target database:

1. Finish `docs/database-inventory.md`.
2. Finish `docs/billing-entitlement-reconciliation.md`.
3. Run a Firestore backup rehearsal in staging.
4. Build fixture-based migration tests.
5. Build count/hash comparison reports.
6. Decide whether Auth.js keeps Firebase temporarily or moves to a SQL adapter.
7. Define a rollback switch that returns reads to Firestore.

## Provider-Specific Notes

### Neon Postgres

Best candidate when the project wants serverless Postgres, branching, and a
Vercel-aligned workflow. If adopted, initialize the database client lazily so
`next build` does not fail before env vars are configured.

### Supabase Postgres

Good candidate when the project benefits from a dashboard, SQL editor,
optional storage, and optional realtime features. Treat Supabase Auth as out of
scope unless a separate auth migration is approved.

### Upstash Redis

Redis is useful for rate limiting, cache, session-adjacent ephemeral state, and
webhook idempotency keys. It should not replace Firestore for primary user,
credential, billing, entitlement, or learning-progress records.

## Decision Record

Current decision:

- TinaCMS removal and database migration are separate tracks.
- TinaCMS has been removed from this worktree.
- Firestore remains the application database for now.
- Vercel Marketplace Postgres remains a future candidate after schema,
  backup/rollback, and billing reconciliation work.
- Redis/KV is cache/rate-limit/idempotency tooling only.
- No production database reads or writes are approved by this document.

## External References Checked

- [Vercel Storage overview](https://vercel.com/docs/storage)
- [Redis on Vercel](https://vercel.com/docs/redis)
- [Cloud Firestore overview](https://firebase.google.com/products/firestore)
- [Firebase Admin Node.js SDK release notes](https://firebase.google.com/support/release-notes/admin/node)
