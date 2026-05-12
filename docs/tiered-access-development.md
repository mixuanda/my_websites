# Tiered Access Development Checkpoints

This document tracks the dedicated development workstream for tiered Notes access.

## Workspace

- Worktree: `/Users/evan/.codex/worktrees/tiered-access-development/my_websites`
- Branch: `codex/tiered-access-development`
- Target Vercel domain: `development.evanalysis.top`
- Current deployment: `my-websites-3lucsbqdf-mixuandahotmailcoms-projects.vercel.app`
- Current deployment ID: `dpl_8zvoEuKZQeXF1nzofbXXCGRPVjLU`
- Intended surface: preview/development, not the public production Notes surface.

## Product checkpoints

| Checkpoint | Status | Notes |
| --- | --- | --- |
| Isolated workspace and branch | Done | Created from `main` without touching the dirty primary checkout. |
| Public / Plus / Pro / Admin access model | Done | `FREE`, `MEMBER`, `PRO`, and `ADMIN` tiers are represented in the Notes membership model. |
| Free daily checkpoint quota | Done | Free graded checkpoint submissions are counted server-side per Hong Kong day. Plus, Pro, and Admin bypass the daily quota. |
| Plus subscription plans | Done | Monthly and yearly Plus plans use Stripe recurring prices, with yearly savings shown in UI. |
| Pro subscription plans | Done | Monthly and yearly Pro plan slots are prepared with separate Stripe price env vars. |
| Donation flow | Done | Notes membership page exposes fixed HKD donation buttons through Stripe Checkout payment mode. |
| Checkpoint API enforcement | Done | Problem submission APIs enforce access tier and daily free quota server-side. |
| Legacy billing surface consolidation | Done | `/settings/billing`, `/api/stripe/*`, premium gates, and premium export checks now converge on the Notes membership model instead of the older product-scope entitlement store. |
| Vercel development deployment | Done | Preview build is READY and aliased to `development.evanalysis.top`. |
| Final verification | Done | Local lint, TypeScript, build, route/API smoke tests, Vercel build, DNS, alias, and development-domain HTTP/API checks passed. |

## Stripe environment variables

Existing Plus prices:

- `STRIPE_PRICE_ID_MEMBER_MONTHLY`
- `STRIPE_PRICE_ID_MEMBER_YEARLY`

Prepared Pro prices:

- `STRIPE_PRICE_ID_PRO_MONTHLY`
- `STRIPE_PRICE_ID_PRO_YEARLY`

Donation checkout does not require a saved Stripe price. It creates one-time Checkout line items from the fixed HKD amounts in code.

`development.evanalysis.top` currently has a DNS-only Cloudflare `A` record pointing to Vercel `76.76.21.21`.

## Free checkpoint quota

- Default limit: `8` graded checkpoint submissions per Hong Kong day.
- Override: `NOTES_FREE_DAILY_ATTEMPT_LIMIT` or `NEXT_PUBLIC_NOTES_FREE_DAILY_ATTEMPT_LIMIT`.
- Signed-in free users are keyed by user ID.
- Anonymous users are keyed by a hashed request fingerprint so raw IP addresses are not stored directly by the quota module.

## Verification log

- Done: dependency install in the new worktree with `npm ci`.
- Done: `npm run lint`.
- Done: `npx tsc --noEmit --pretty false`.
- Done: `npm run verify:mdx-tables`.
- Done: `AUTH_SECRET=local-test-secret SITE_SURFACE=preview NEXT_PUBLIC_SITE_SURFACE=preview npm run build`.
- Done: local membership page returned `200`.
- Done: `/api/billing/status` reports the four plan slots and free daily attempt limit.
- Done: unauthenticated `/api/billing/checkout` returns `401 auth_required`.
- Done: checkpoint preview and submit APIs work for a free checkpoint problem.
- Done: with `NOTES_FREE_DAILY_ATTEMPT_LIMIT=1`, first checkpoint submit returns `200` and the second returns `429`.
- Done: TXT and PDF export routes still return `200`.
- Blocked: Codex in-app Browser screenshot was unavailable because no `iab` browser session was exposed.
- Done: Vercel preview deployment `dpl_8zvoEuKZQeXF1nzofbXXCGRPVjLU` reached `READY`.
- Done: Cloudflare DNS record `development.evanalysis.top A 76.76.21.21` was created as DNS-only.
- Done: Vercel alias now points `development.evanalysis.top` to `my-websites-3lucsbqdf-mixuandahotmailcoms-projects.vercel.app`.
- Done: development-domain membership page returns `200` using the resolved Vercel edge.
- Done: development-domain `/api/billing/status` reports `membershipGatingEnabled=true`, `freeDailyAttemptLimit=8`, and `configuredPlanCount=2`.
- Done: development-domain unauthenticated checkout returns `401 auth_required`.
- Done: development-domain donation endpoint creates a Stripe Checkout URL for the fixed HKD donation flow.
- Done: development-domain checkpoint submit returns a correct result and free quota data.

## 2026-05-13 continuation notes

- Continued in the existing worktree and branch: `/Users/evan/.codex/worktrees/tiered-access-development/my_websites` on `codex/tiered-access-development`.
- Consolidated the older `/settings/billing` UI path into the localized Notes membership center.
- Kept `/api/stripe/checkout`, `/api/stripe/portal`, `/api/stripe/webhook`, and `/api/stripe/entitlements` as compatibility surfaces, but redirected their behavior to the newer membership-backed `/api/billing` model.
- Updated premium feature gates and premium PDF export checks to use `FREE` / `MEMBER` / `PRO` membership entitlements.
- Applied the webhook middleware exemption for `/api/stripe/webhook` so compatibility webhook delivery is not blocked by login middleware before Stripe signature verification.
- Removed the unused legacy product-scope entitlement implementation under `src/lib/billing/**` and the old `BillingClient`.
- Verified after integration:
  - `npm run lint`
  - `npx tsc --noEmit --pretty false`
  - `AUTH_SECRET=local-test-secret SITE_SURFACE=preview NEXT_PUBLIC_SITE_SURFACE=preview NEXT_PUBLIC_SITE_URL=http://localhost:3020 APP_URL=http://localhost:3020 STRIPE_SECRET_KEY=sk_test_local NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_local STRIPE_WEBHOOK_SECRET=whsec_local STRIPE_PRICE_ID_MEMBER_MONTHLY=price_member_monthly STRIPE_PRICE_ID_PRO_MONTHLY=price_pro_monthly NOTES_MEMBERSHIP_GATING=true NEXT_PUBLIC_NOTES_MEMBERSHIP_GATING=true npm run build`
  - Preview local smoke on `localhost:3020`: `/zh-hk/notes/membership` returned `200`; `/api/billing/status` returned `billingReady=true`, `configuredPlanCount=2`, and `membershipGatingEnabled=true`; unauthenticated `/api/billing/checkout` returned `401 auth_required`; compatibility `/api/stripe/webhook` reached the handler and returned `400 Missing stripe-signature`; unauthenticated premium PDF export returned `401`.
