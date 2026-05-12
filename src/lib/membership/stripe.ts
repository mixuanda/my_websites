import Stripe from "stripe";

export function getStripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return new Stripe(apiKey, {
    apiVersion: "2026-04-22.dahlia",
  });
}

export function getAppUrl(request?: Request) {
  if (request) {
    return new URL(request.url).origin;
  }

  return process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
