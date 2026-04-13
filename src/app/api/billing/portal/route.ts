import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripeClient, getAppUrl } from "@/lib/membership/stripe";
import { getMembershipRecordByUserId, getMembershipRecordByEmail } from "@/lib/membership/entitlements";

export async function POST() {
  try {
    const session = await auth();
    const user = session?.user as { id?: string; email?: string | null } | undefined;

    if (!user?.email) {
      return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    }

    const membership = (await getMembershipRecordByUserId(user.id)) ?? (await getMembershipRecordByEmail(user.email));
    if (!membership?.customerId) {
      return NextResponse.json({ error: "No billing profile found." }, { status: 404 });
    }

    const stripe = getStripeClient();
    const portal = await stripe.billingPortal.sessions.create({
      customer: membership.customerId,
      return_url: `${getAppUrl()}/notes/membership`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (error) {
    console.error("Create portal session failed:", error);
    return NextResponse.json({ error: "Unable to open billing portal." }, { status: 500 });
  }
}
