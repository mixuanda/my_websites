import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/membership/stripe";
import { setMembershipByEmail, setMembershipByUserId, type MembershipRecord } from "@/lib/membership/entitlements";
import { notFoundApiResponseInProduction } from "@/lib/production-api-guard";

function toMembershipStatus(status?: string): MembershipRecord["status"] {
  if (
    status === "active" ||
    status === "trialing" ||
    status === "past_due" ||
    status === "canceled" ||
    status === "unpaid"
  ) {
    return status;
  }
  return "inactive";
}

async function syncMembership(record: MembershipRecord, userId?: string, email?: string) {
  if (userId) {
    await setMembershipByUserId(userId, record);
  }
  if (email) {
    await setMembershipByEmail(email, record);
  }
}

export async function POST(request: Request) {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const stripe = getStripeClient();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error("Webhook signature verify failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email ?? session.customer_email ?? session.metadata?.userEmail;
      const userId = session.metadata?.userId;

      await syncMembership(
        {
          customerId: typeof session.customer === "string" ? session.customer : undefined,
          email: email ?? undefined,
          priceId: session.metadata?.priceId,
          status: "active",
          subscriptionId: typeof session.subscription === "string" ? session.subscription : undefined,
          updatedAt: new Date().toISOString(),
        },
        userId,
        email ?? undefined
      );
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : undefined;

      let email: string | undefined;
      if (customerId) {
        const customer = await stripe.customers.retrieve(customerId);
        if (!("deleted" in customer)) {
          email = customer.email ?? undefined;
        }
      }

      await syncMembership(
        {
          customerId,
          email,
          priceId: subscription.items.data[0]?.price.id,
          status: toMembershipStatus(subscription.status),
          subscriptionId: subscription.id,
          updatedAt: new Date().toISOString(),
        },
        subscription.metadata?.userId,
        email
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
