import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripeClient, getAppUrl } from "@/lib/membership/stripe";
import { getUserEntitlements } from "@/lib/membership/entitlements";
import { getBillingPlan, type BillingPlanId } from "@/lib/membership/plans";
import { notFoundApiResponseInProduction } from "@/lib/production-api-guard";
import { defaultLocale, isLocale } from "@/lib/textbook/i18n";
import { getMembershipCancelHref, getMembershipSuccessHref } from "@/lib/textbook/routes";

export async function POST(request: Request) {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  try {
    const session = await auth();
    const user = session?.user as { id?: string; email?: string | null } | undefined;

    if (!user?.email) {
      return NextResponse.json(
        { error: "Please sign in first.", errorCode: "auth_required" },
        { status: 401 }
      );
    }

    const entitlements = await getUserEntitlements(session);
    if (entitlements.isAdmin) {
      return NextResponse.json(
        { error: "Admin account already has full access.", errorCode: "admin_full_access" },
        { status: 400 }
      );
    }

    if (entitlements.isMember) {
      return NextResponse.json(
        { error: "Membership is already active.", errorCode: "already_member" },
        { status: 400 }
      );
    }

    const payload = (await request.json()) as {
      locale?: string;
      plan?: BillingPlanId;
    };
    const locale = payload.locale && isLocale(payload.locale) ? payload.locale : defaultLocale;
    const plan = payload.plan === "yearly" ? "yearly" : "monthly";
    const billingPlan = getBillingPlan(plan);
    const priceId = billingPlan?.priceId;

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price ID is missing for this plan.", errorCode: "plan_not_configured" },
        { status: 500 }
      );
    }

    const stripe = getStripeClient();
    const appUrl = getAppUrl();

    const checkoutSession = await stripe.checkout.sessions.create({
      cancel_url: `${appUrl}${getMembershipCancelHref(locale)}`,
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        locale,
        plan,
        planInterval: billingPlan.interval,
        priceId,
        userEmail: user.email,
        userId: user.id ?? "",
      },
      mode: "subscription",
      subscription_data: {
        metadata: {
          plan,
          planInterval: billingPlan.interval,
          priceId,
          userEmail: user.email,
          userId: user.id ?? "",
        },
      },
      success_url: `${appUrl}${getMembershipSuccessHref(locale)}?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Create checkout session failed:", error);
    return NextResponse.json({ error: "Unable to create checkout session." }, { status: 500 });
  }
}
