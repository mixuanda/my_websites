import { NextResponse } from "next/server";
import { POST as createBillingCheckout } from "../../billing/checkout/route";
import type { BillingPlanId } from "@/lib/membership/plans";

interface CheckoutBody {
  cycle?: "monthly" | "one_time";
  locale?: string;
  plan?: "free" | "premium_notes" | "premium_video_tools";
}

export const runtime = "nodejs";

function mapLegacyPlan(body: CheckoutBody): BillingPlanId | null {
  if (body.plan === "premium_notes") {
    return body.cycle === "one_time" ? "member_yearly" : "member_monthly";
  }

  if (body.plan === "premium_video_tools") {
    return body.cycle === "one_time" ? "pro_yearly" : "pro_monthly";
  }

  return null;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CheckoutBody;
  const plan = mapLegacyPlan(body);

  if (!plan) {
    return NextResponse.json(
      {
        error: "Legacy Stripe checkout plan is no longer supported.",
        errorCode: "unsupported_plan",
      },
      { status: 400 }
    );
  }

  const rewrittenRequest = new Request(request.url, {
    body: JSON.stringify({
      locale: body.locale,
      plan,
    }),
    headers: request.headers,
    method: "POST",
  });

  return createBillingCheckout(rewrittenRequest);
}
