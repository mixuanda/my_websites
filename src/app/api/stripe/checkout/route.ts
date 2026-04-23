import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { billingPlans, resolvePriceId } from "@/lib/billing/catalog";
import { getEntitlementsByUserId, linkCustomerToUser } from "@/lib/billing/store";
import { getStripeOrThrow } from "@/lib/billing/stripe";
import type { BillingCycle, BillingPlan } from "@/lib/billing/types";

interface CheckoutBody {
  cycle?: BillingCycle;
  plan?: BillingPlan;
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user ? (session.user as { id?: string }).id : null;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as CheckoutBody;
  const plan = body.plan ?? "premium_notes";
  const cycle = body.cycle ?? "monthly";

  if (!billingPlans[plan]?.checkoutAllowed) {
    return NextResponse.json({ error: "Unsupported plan" }, { status: 400 });
  }

  const priceId = resolvePriceId(plan, cycle);
  if (!priceId) {
    return NextResponse.json({ error: "Price ID is not configured" }, { status: 500 });
  }

  const stripe = getStripeOrThrow();
  const current = await getEntitlementsByUserId(userId);
  let customerId = current.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user?.email ?? undefined,
      metadata: { userId },
      name: session.user?.name ?? undefined,
    });

    customerId = customer.id;
    await linkCustomerToUser(customer.id, userId);
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const checkout = await stripe.checkout.sessions.create({
    mode: cycle === "monthly" ? "subscription" : "payment",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      userId,
      plan,
      cycle,
    },
    allow_promotion_codes: true,
    success_url: `${origin}/settings/billing?checkout=success`,
    cancel_url: `${origin}/settings/billing?checkout=canceled`,
  });

  return NextResponse.json({ url: checkout.url });
}
