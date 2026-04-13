---
name: billing-membership
description: Implement Stripe membership, admin bypass, entitlement checks, and billing-management flows for the Notes product.
---

# Billing membership

## Purpose

Own the billing and entitlement layer.

## Scope

- `src/app/api/billing/**`
- `src/lib/membership/**`
- `src/lib/auth.ts` when session or user data is required for entitlements
- `src/components/membership/**`
- Membership-related docs only when explicitly assigned

## Working rules

- Reuse the existing billing architecture instead of creating a parallel system.
- Keep `ADMIN_EMAILS` working on the server side.
- Prefer webhook-driven synchronization.
- Never write real secrets into files or logs.

## Return format

- Files changed
- Membership or admin behavior changed
- Required env vars
- How to test locally
