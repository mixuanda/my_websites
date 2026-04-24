# Stripe Subscription Deployment Guide (English)

This document explains how to deploy the membership subscription flow (Free / Member / Admin).

## A. Create product and prices in Stripe

1. Open Stripe Dashboard → Product catalog.
2. Create a product (e.g. `Notes Membership`).
3. Create at least one recurring price:
   - Monthly: map to `STRIPE_PRICE_ID_MEMBER_MONTHLY` (`price_...`)
4. Optionally create yearly recurring price:
   - Yearly: map to `STRIPE_PRICE_ID_MEMBER_YEARLY` (`price_...`)
5. Current membership checkout uses Stripe subscriptions, so one-time prices cannot replace recurring prices.

## B. Configure environment variables in deployment

Set the following in your platform:

- `STRIPE_SECRET_KEY`: Stripe secret key (`sk_live_...`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: publishable key (`pk_live_...`)
- `STRIPE_PRICE_ID_MEMBER_MONTHLY`: monthly recurring price id (`price_...`)
- `STRIPE_PRICE_ID_MEMBER_YEARLY`: yearly recurring price id (optional)
- `STRIPE_WEBHOOK_SECRET`: webhook signing secret (`whsec_...`)
- `APP_URL`: production base URL (e.g. `https://your-domain.com`)
- `ADMIN_EMAILS`: comma-separated admin emails

## C. Create webhook endpoint

1. Stripe Dashboard → Developers → Webhooks.
2. Add endpoint:
   - `https://your-domain.com/api/billing/webhook`
3. Subscribe at least to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy signing secret (`whsec_...`) into `STRIPE_WEBHOOK_SECRET`.

## D. Local test flow

1. Start app: `npm run dev`
2. Forward Stripe events (recommended):
   - `stripe listen --forward-to localhost:3000/api/billing/webhook`
3. Put printed `whsec_...` into `.env.local`.
4. Start checkout on `/notes/membership` and verify webhook-driven entitlement sync.

## E. Verify admin bypass

1. Add a signed-in email to `ADMIN_EMAILS`.
2. Open `/api/admin/system-status` and confirm:
   - `admin.configured=true`
   - `stripe.secretKeyConfigured=true`
   - `stripe.webhookSecretConfigured=true`
   - at least one `stripe.plans[].price.status=ready`
3. That account should access premium note units and premium checkpoint APIs without payment.
4. Confirm premium submit APIs do not return `403` for that admin account.

## F. Troubleshooting

- Success page but still Free tier:
  - Usually webhook delivery failure or wrong `STRIPE_WEBHOOK_SECRET`.
- Cannot open customer portal:
  - Customer/membership record has not been synced yet.
- Admin still blocked:
  - Check comma-separated format in `ADMIN_EMAILS` and exact email match.
