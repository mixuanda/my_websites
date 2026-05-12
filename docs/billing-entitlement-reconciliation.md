# Billing Entitlement Reconciliation

Date: 2026-05-13

Scope: current repository behavior only. No Stripe live data or production
Firestore data was inspected.

## Problem

The repo currently has two billing/entitlement models.

### Legacy/current Notes membership path

Files:

- `src/lib/membership/entitlements.ts`
- `src/lib/membership/plans.ts`
- `src/lib/membership/stripe.ts`
- `src/app/api/billing/checkout/route.ts`
- `src/app/api/billing/portal/route.ts`
- `src/app/api/billing/webhook/route.ts`
- `src/app/[locale]/notes/membership/**`

Database state:

- Embedded under `users/{userId}.membership`.

Plan env vars:

- `STRIPE_PRICE_ID_MEMBER_MONTHLY`
- `STRIPE_PRICE_ID_MEMBER_YEARLY`

Production surface:

- `/api/billing/**` and localized Notes membership pages are preview-only under
  current production surface guards.

### Product-scope billing path

Files:

- `src/lib/billing/catalog.ts`
- `src/lib/billing/store.ts`
- `src/lib/billing/stripe.ts`
- `src/app/api/stripe/checkout/route.ts`
- `src/app/api/stripe/portal/route.ts`
- `src/app/api/stripe/webhook/route.ts`
- `src/app/api/stripe/entitlements/route.ts`

Database state:

- `user_entitlements/{userId}`
- `stripe_customers/{stripeCustomerId}`

Plan env vars:

- `STRIPE_PRODUCT_PREMIUM_NOTES`
- `STRIPE_PRICE_PREMIUM_NOTES_MONTHLY`
- `STRIPE_PRICE_PREMIUM_NOTES_ONE_TIME`
- `STRIPE_PRODUCT_PREMIUM_VIDEO_TOOLS`
- `STRIPE_PRICE_PREMIUM_VIDEO_TOOLS_MONTHLY`
- `STRIPE_PRICE_PREMIUM_VIDEO_TOOLS_ONE_TIME`

Production surface:

- `/api/stripe/webhook` is intentionally reachable without a site session so
  Stripe can deliver signed events.
- Other `/api/stripe/**` routes require auth through `src/proxy.ts`.

## Canonical Target

Use `user_entitlements/{userId}` plus `stripe_customers/{stripeCustomerId}` as
the long-term canonical app authorization cache.

Reasoning:

- It supports multiple product scopes instead of only one Notes membership.
- It separates billing/authorization cache from the broad `users` profile doc.
- It is easier to map into Postgres later.
- It keeps Stripe customer mapping in a top-level collection.
- It can represent subscription and one-time purchase sources.

Do not delete or ignore `users.membership` yet. The current Notes gating code
still reads the embedded membership model. Until code is reconciled, both
models must be compared, and production changes must preserve current access.

## Reconciliation Sequence

1. Freeze the model decision in this document.
2. Add read-only comparison tooling that reports, for a test database:
   - users with embedded membership only;
   - users with `user_entitlements` only;
   - users where Stripe customer IDs disagree;
   - users where active/inactive access disagrees;
   - subscriptions with missing user mapping.
3. Update webhook handling so a single Stripe event path writes canonical
   `user_entitlements`.
4. Add a compatibility reader for Notes gating that can read canonical
   `user_entitlements` while still tolerating old embedded membership records.
5. Backfill canonical test records from embedded membership in staging.
6. Verify membership UI, export gating, problem grading, settings, portal, and
   admin users against the canonical reader.
7. Keep embedded `users.membership` as a denormalized legacy view only if there
   is a clear operational need.
8. Remove or redirect `/api/billing/**` only after production route policy and
   Stripe webhook endpoint policy are confirmed.

## Fields Mapping

| Embedded membership | Canonical entitlement |
| --- | --- |
| `customerId` | `stripeCustomerId` |
| `subscriptionId` | provider-specific metadata to add if needed |
| `status` | `active`, plus status metadata if retained |
| `priceId` | resolve to `plan` through billing catalog |
| `updatedAt` | `updatedAt` |
| `email` | resolved through `users/{userId}.email`; do not use as primary key |

The current `EntitlementRecord` does not store `subscriptionId` or raw Stripe
subscription status. If recurring subscription management is canonicalized
through `user_entitlements`, add explicit fields before migration:

- `stripeSubscriptionId`
- `stripeStatus`
- `stripePriceId`

## Do Not Do Yet

- Do not bulk-delete embedded `users.membership`.
- Do not replay live Stripe events.
- Do not switch Notes access checks to a new model without a comparison report.
- Do not move to Postgres before this reconciliation is finished.

## Verification Checklist

- `/api/stripe/webhook` rejects missing signatures.
- `/api/stripe/webhook` rejects invalid signatures.
- A valid test checkout event writes one canonical entitlement.
- A valid test subscription update changes the canonical entitlement.
- Notes gating agrees with the canonical entitlement.
- Admin allowlist still grants full access without Stripe.
- Existing embedded membership users do not lose access during the bridge
  period.
- The comparison report has zero unexplained mismatches before production
  cutover.
