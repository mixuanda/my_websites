import Stripe from "stripe";
import { NextResponse } from "next/server";
import { billingPlans, resolvePlanByPriceId } from "@/lib/billing/catalog";
import { getStripeOrThrow } from "@/lib/billing/stripe";
import {
  linkCustomerToUser,
  resolveUserIdByCustomerId,
  upsertEntitlements,
} from "@/lib/billing/store";

export const runtime = "nodejs";

function extractPriceIdFromSubscription(subscription: Stripe.Subscription): string | null {
  return subscription.items.data[0]?.price?.id ?? null;
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (!customerId) {
    return;
  }

  const priceId = extractPriceIdFromSubscription(subscription);
  if (!priceId) {
    return;
  }

  const mapped = resolvePlanByPriceId(priceId);
  if (!mapped) {
    return;
  }

  const resolvedUserId =
    subscription.metadata.userId ||
    (subscription.latest_invoice && typeof subscription.latest_invoice !== "string"
      ? subscription.latest_invoice.metadata?.userId
      : null) ||
    (await resolveUserIdByCustomerId(customerId));

  if (!resolvedUserId) {
    return;
  }

  await linkCustomerToUser(customerId, resolvedUserId);

  await upsertEntitlements(resolvedUserId, {
    active: ["active", "trialing", "past_due"].includes(subscription.status),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    plan: mapped.plan,
    renewsAt: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : undefined,
    scopes: billingPlans[mapped.plan].scopes,
    source: "stripe_subscription",
    stripeCustomerId: customerId,
  });
}

async function syncCheckoutSession(session: Stripe.Checkout.Session) {
  const customerId = typeof session.customer === "string" ? session.customer : null;
  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan as keyof typeof billingPlans | undefined;

  if (!customerId || !userId || !plan || !(plan in billingPlans)) {
    return;
  }

  await linkCustomerToUser(customerId, userId);

  const source = session.mode === "subscription" ? "stripe_subscription" : "stripe_onetime";

  await upsertEntitlements(userId, {
    active: session.payment_status === "paid" || session.mode === "subscription",
    cancelAtPeriodEnd: false,
    plan,
    renewsAt: undefined,
    scopes: billingPlans[plan].scopes,
    source,
    stripeCustomerId: customerId,
  });
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const stripe = getStripeOrThrow();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json({ error: "Invalid webhook signature", details: String(error) }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await syncCheckoutSession(event.data.object as Stripe.Checkout.Session);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await syncSubscription(event.data.object as Stripe.Subscription);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
