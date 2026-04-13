import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripeClient, getAppUrl } from "@/lib/membership/stripe";
import { getMembershipRecordByUserId, getMembershipRecordByEmail } from "@/lib/membership/entitlements";
import { defaultLocale, isLocale } from "@/lib/textbook/i18n";
import { getMembershipHref } from "@/lib/textbook/routes";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const user = session?.user as { id?: string; email?: string | null } | undefined;

    if (!user?.email) {
      return NextResponse.json(
        { error: "Please sign in first.", errorCode: "auth_required" },
        { status: 401 }
      );
    }

    const payload = (await request.json().catch(() => ({}))) as { locale?: string };
    const locale = payload.locale && isLocale(payload.locale) ? payload.locale : defaultLocale;
    const membership = (await getMembershipRecordByUserId(user.id)) ?? (await getMembershipRecordByEmail(user.email));
    if (!membership?.customerId) {
      return NextResponse.json(
        { error: "No billing profile found.", errorCode: "billing_profile_missing" },
        { status: 404 }
      );
    }

    const stripe = getStripeClient();
    const portal = await stripe.billingPortal.sessions.create({
      customer: membership.customerId,
      return_url: `${getAppUrl()}${getMembershipHref(locale)}`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (error) {
    console.error("Create portal session failed:", error);
    return NextResponse.json({ error: "Unable to open billing portal." }, { status: 500 });
  }
}
