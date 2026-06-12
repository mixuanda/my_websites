# Account Preview Provider Key Setup

Last updated: 2026-06-12

This document records how to obtain the real development keys needed to open
public login and registration on `development.evanalysis.top`. Do not paste
secret values into this file. Put real values only in
`.env.codex-account.preview.local` or directly in Vercel branch-scoped Preview
environment variables for `codex/account`.

## Current command-line status

The local machine can manage the Vercel project env surface, but it cannot
magically discover provider secrets that have not already been created.

Installed local CLIs observed on 2026-06-12:

- `vercel`: installed and can list/write project env vars.
- `stripe`: installed, but use it only after confirming the intended Stripe
  account and test mode.
- `gh`: installed, but GitHub OAuth app client secrets are still normally
  created or regenerated through the GitHub developer settings flow.
- `firebase`, `gcloud`, and `wrangler`: not installed in this worktree shell.

What the command line can safely do:

- generate `AUTH_SECRET` locally:

  ```bash
  openssl rand -base64 32
  ```

- list the existing branch-scoped Preview env names without printing values:

  ```bash
  vercel env ls preview codex/account --scope mixuandahotmailcoms-projects
  ```

- dry-run the exact Vercel import target:

  ```bash
  npm run auth:apply-development-env -- --file .env.codex-account.preview.local
  ```

- write only `Preview (codex/account)` env vars after the file is complete:

  ```bash
  npm run auth:apply-development-env -- --file .env.codex-account.preview.local --apply
  ```

  The import script validates the development isolation contract before writing:
  `APP_URL`, `NEXTAUTH_URL`, and `NEXT_PUBLIC_SITE_URL` must point at
  `https://development.evanalysis.top`; `SITE_SURFACE` values must stay
  `preview`; registration persistence and Turnstile requirements must remain
  enabled; and obvious live Stripe keys such as `pk_live_...`, `sk_live_...`,
  or `rk_live_...` are rejected.

- pull already configured Vercel env values into a local file if needed and if
  the current Vercel identity has permission:

  ```bash
  vercel env pull .env.vercel-preview.codex-account.local \
    --environment preview \
    --git-branch codex/account \
    --scope mixuandahotmailcoms-projects
  ```

  Treat that pulled file as secret material. Do not commit it. This can only
  recover values that already exist in Vercel; it will not create missing
  Firebase, Turnstile, OAuth, or Stripe keys.

Current branch Preview env status observed through `vercel env ls` after the
Firebase bridge update:

- present: core preview surface flags, `AUTH_SECRET`, registration flags,
  membership gating flags, member monthly/yearly Stripe price IDs, staging
  Firebase Admin envs, Firebase Web App public config, and Turnstile
  site/secret keys.
- missing for full checkout QA: Stripe test publishable key.

## Local handoff file

Create the ignored local file:

```bash
cp .env.codex-account.preview.example .env.codex-account.preview.local
```

Fill the following values in `.env.codex-account.preview.local`.

## Required values for public credentials registration

### Auth.js session secret

Variable:

- `AUTH_SECRET`

Generate it locally:

```bash
openssl rand -base64 32
```

Use a new development value. Do not reuse production.

### Cloudflare Turnstile

Variables:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `AUTH_TURNSTILE_SECRET_KEY`

Create a Turnstile widget in the Cloudflare dashboard for the development
surface.

Recommended hostnames:

- `development.evanalysis.top`
- `localhost` only if local browser registration testing is needed.

Use the widget site key as `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Use the secret key
as `AUTH_TURNSTILE_SECRET_KEY`.

Reference: https://developers.cloudflare.com/turnstile/get-started/

Safe CLI check after creating the widget:

```bash
node --input-type=module <<'NODE'
const secret = process.env.AUTH_TURNSTILE_SECRET_KEY;
if (!secret) throw new Error("Set AUTH_TURNSTILE_SECRET_KEY locally first");
const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
  method: "POST",
  body: new URLSearchParams({ secret, response: "codex-dummy-token" }),
});
const result = await response.json();
const codes = Array.isArray(result["error-codes"]) ? result["error-codes"] : [];
console.log({
  httpStatus: response.status,
  secretAcceptedBySiteverify:
    !codes.includes("invalid-input-secret") && !codes.includes("missing-input-secret"),
  expectedDummyTokenFailure:
    !result.success && codes.some((code) => code.includes("input-response")),
  errorCodes: codes,
});
NODE
```

Expected result with a valid secret and dummy token: HTTP `200`,
`secretAcceptedBySiteverify: true`, and `invalid-input-response`.

### Firebase Admin staging project

Variables:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Use a development/staging Firebase project, not production.

Required setup:

1. Create or choose the staging Firebase project.
2. Enable Firestore in that project.
3. Create a service account key for the staging project.
4. Add `development.evanalysis.top` to Firebase Authentication authorized
   domains before using Firebase Client Auth flows.
5. Copy the JSON fields into the local env file:
   - `project_id` -> `FIREBASE_PROJECT_ID`
   - `client_email` -> `FIREBASE_CLIENT_EMAIL`
   - `private_key` -> `FIREBASE_PRIVATE_KEY`

Keep the PEM line breaks in `FIREBASE_PRIVATE_KEY`. In the local env file, the
single-line escaped form is safest:

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

The Vercel import script keeps `FIREBASE_PRIVATE_KEY` in this single-line
escaped `\n` form when writing Preview env vars. The runtime converts `\n` back
to real PEM line breaks before initializing Firebase Admin.

Reference: https://firebase.google.com/docs/admin/setup

### Firebase Client Auth Web App config

Variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- optional `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

These values are public Firebase Web App config, not service-account secrets.
They are still environment-specific and must be scoped to
`Preview (codex/account)` for this development branch.

The current staging project `evanalysislogin` has a Firebase Web App named
`development.evanalysis.top`; its public config was applied to Vercel Preview
branch env from the command line through the Firebase Management API.

## Firebase Client Auth login providers

If either provider is not ready, remove it from:

```env
NEXT_PUBLIC_AUTH_PROVIDERS=credentials,github,google
```

For example, credentials-only public registration is:

```env
NEXT_PUBLIC_AUTH_PROVIDERS=credentials
```

GitHub and Google login on this branch are configured inside Firebase
Authentication. The app does not require Auth.js `GITHUB_CLIENT_SECRET` or
`GOOGLE_CLIENT_SECRET` for these buttons.

Firebase Authentication setup checklist:

1. Enable Email/Password in Firebase Authentication.
2. Enable Google and GitHub providers in Firebase Authentication.
3. Keep `development.evanalysis.top` in Firebase Authentication authorized
   domains.
4. Keep `NEXT_PUBLIC_AUTH_PROVIDERS=credentials,github,google` only after the
   provider buttons work in the Firebase console.

### Optional legacy Auth.js OAuth

The repo can still support Auth.js GitHub/Google providers if the corresponding
server-side env vars are provided, but the `codex/account` development branch
uses Firebase Client Auth by default. Only configure the legacy Auth.js OAuth
vars when intentionally testing that alternate path.

## Stripe test checkout values

Required for full browser checkout QA:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Already present in branch Preview at the time of writing:

- `STRIPE_PRICE_ID_MEMBER_MONTHLY`
- `STRIPE_PRICE_ID_MEMBER_YEARLY`

Optional branch overrides if you want this preview branch to use a different
test account or prices:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_MEMBER_MONTHLY`
- `STRIPE_PRICE_ID_MEMBER_YEARLY`

Use Stripe test mode values only for `codex/account` development.
The env import script rejects obvious live-mode key prefixes for this branch.

The live deployed webhook endpoint for this branch is:

```text
https://development.evanalysis.top/api/billing/webhook
```

The compatibility endpoint exists at:

```text
https://development.evanalysis.top/api/stripe/webhook
```

The current membership webhook handler processes subscription lifecycle events
used by Stripe Checkout and subscriptions, especially:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

References:

- https://docs.stripe.com/keys
- https://docs.stripe.com/webhooks

## Apply and verify

After filling `.env.codex-account.preview.local`, run:

```bash
npm run auth:apply-development-env -- --file .env.codex-account.preview.local
```

If the dry-run lists only intended `Preview (codex/account)` variables, write
them:

```bash
npm run auth:apply-development-env -- --file .env.codex-account.preview.local --apply
```

Redeploy the latest `codex/account` preview, then require registration
readiness, Firebase bridge availability, and browser checkout configuration:

```bash
npm run auth:verify-development -- --require-ready --require-oauth --require-checkout
```

Only after that check passes should Vercel Authentication be opened for ordinary
public requests to `development.evanalysis.top`. Then verify again:

```bash
npm run auth:verify-development -- --require-ready --require-oauth --require-checkout --expect-public
```

Vercel Authentication reference:
https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication

For a narrow public development domain, use a Vercel Deployment Protection
Exception for `development.evanalysis.top` rather than disabling project-wide
protection. Exceptions are managed from the Vercel dashboard under the
project's Deployment Protection settings, and Vercel documents them as an
Advanced Deployment Protection feature for Preview domains.

## Non-production isolation rules

- Never copy production Firebase Admin credentials into
  `.env.codex-account.preview.local`.
- Never use `pk_live_`, `sk_live_`, or live webhook secrets for this branch.
- Keep `development.evanalysis.top` branch-scoped to `codex/account`.
- Keep all writes targeted to `Preview (codex/account)`, never Production.
- Do not disable Vercel Authentication before both Firestore persistence and
  Turnstile server verification are ready.
