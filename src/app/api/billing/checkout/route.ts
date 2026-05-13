import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripeClient, getAppUrl } from "@/lib/membership/stripe";
import {
  getMembershipRecordByEmail,
  getMembershipRecordByUserId,
  getUserEntitlements,
} from "@/lib/membership/entitlements";
import {
  getBillingConfigStatus,
  getBillingPlan,
  normalizeBillingPlanId,
} from "@/lib/membership/plans";
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

    const payload = (await request.json().catch(() => ({}))) as {
      locale?: string;
      plan?: string;
    };
    const normalizedPlan = normalizeBillingPlanId(payload.plan) ?? "member_monthly";
    const billingPlan = getBillingPlan(normalizedPlan);

    if (!billingPlan) {
      return NextResponse.json(
        { error: "Unsupported billing plan.", errorCode: "unsupported_plan" },
        { status: 400 }
      );
    }

    const entitlements = await getUserEntitlements(session);
    if (entitlements.isAdmin) {
      return NextResponse.json(
        { error: "Admin account already has full access.", errorCode: "admin_full_access" },
        { status: 400 }
      );
    }

    const tierRank = { FREE: 0, MEMBER: 1, PRO: 2 } as const;
    if (tierRank[entitlements.tier] >= tierRank[billingPlan.tier]) {
      return NextResponse.json(
        { error: "Membership is already active for this tier.", errorCode: "already_member" },
        { status: 400 }
      );
    }

    const billingConfig = getBillingConfigStatus();
    if (!billingConfig.secretKeyConfigured || !billingConfig.webhookSecretConfigured) {
      return NextResponse.json(
        {
          error: "Membership billing is not fully configured.",
          errorCode: "billing_not_ready",
        },
        { status: 503 }
      );
    }

    const locale = payload.locale && isLocale(payload.locale) ? payload.locale : defaultLocale;
    const priceId = billingPlan?.priceId;

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price ID is missing for this plan.", errorCode: "plan_not_configured" },
        { status: 503 }
      );
    }

    const membership =
      (await getMembershipRecordByUserId(user.id)) ??
      (await getMembershipRecordByEmail(user.email));

    if (membership?.customerId && entitlements.tier !== "FREE") {
      return NextResponse.json(
        {
          error: "Use the billing portal to change an active subscription.",
          errorCode: "use_billing_portal",
        },
        { status: 409 }
      );
    }

    const stripe = getStripeClient();
    const appUrl = getAppUrl(request);

    const checkoutSession = await stripe.checkout.sessions.create({
      cancel_url: `${appUrl}${getMembershipCancelHref(locale)}`,
      client_reference_id: user.id ?? user.email,
      ...(membership?.customerId
        ? { customer: membership.customerId }
        : { customer_email: user.email }),
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        locale,
        plan: normalizedPlan,
        planInterval: billingPlan.interval,
        priceId,
        tier: billingPlan.tier,
        userEmail: user.email,
        userId: user.id ?? "",
      },
      mode: "subscription",
      subscription_data: {
        metadata: {
          plan: normalizedPlan,
          planInterval: billingPlan.interval,
          priceId,
          tier: billingPlan.tier,
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
