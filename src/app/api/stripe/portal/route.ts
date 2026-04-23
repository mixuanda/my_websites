import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getEntitlementsByUserId } from "@/lib/billing/store";
import { getStripeOrThrow } from "@/lib/billing/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user ? (session.user as { id?: string }).id : null;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entitlements = await getEntitlementsByUserId(userId);
  if (!entitlements.stripeCustomerId) {
    return NextResponse.json({ error: "No Stripe customer found" }, { status: 400 });
  }

  const stripe = getStripeOrThrow();
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

  const portal = await stripe.billingPortal.sessions.create({
    customer: entitlements.stripeCustomerId,
    return_url: `${origin}/settings/billing`,
  });

  return NextResponse.json({ url: portal.url });
}
