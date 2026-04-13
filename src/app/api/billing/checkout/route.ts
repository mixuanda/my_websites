import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripeClient, getAppUrl } from "@/lib/membership/stripe";
import { getUserEntitlements } from "@/lib/membership/entitlements";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const user = session?.user as { id?: string; email?: string | null } | undefined;

    if (!user?.email) {
      return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    }

    const entitlements = await getUserEntitlements(session);
    if (entitlements.isAdmin) {
      return NextResponse.json({ error: "Admin account already has full access." }, { status: 400 });
    }

    const payload = (await request.json()) as { plan?: "monthly" | "yearly" };
    const plan = payload.plan === "yearly" ? "yearly" : "monthly";
    const priceId =
      plan === "yearly"
        ? process.env.STRIPE_PRICE_ID_MEMBER_YEARLY || process.env.STRIPE_PRICE_ID_MEMBER_MONTHLY
        : process.env.STRIPE_PRICE_ID_MEMBER_MONTHLY;

    if (!priceId) {
      return NextResponse.json({ error: "Stripe price ID is missing." }, { status: 500 });
    }

    const stripe = getStripeClient();
    const appUrl = getAppUrl();

    const checkoutSession = await stripe.checkout.sessions.create({
      cancel_url: `${appUrl}/notes/membership/cancel`,
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        plan,
        userEmail: user.email,
        userId: user.id ?? "",
      },
      mode: "subscription",
      success_url: `${appUrl}/notes/membership/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Create checkout session failed:", error);
    return NextResponse.json({ error: "Unable to create checkout session." }, { status: 500 });
  }
}
