import { NextResponse } from "next/server";
import { getStripeClient, getAppUrl } from "@/lib/membership/stripe";
import { donationAmountsHkd } from "@/lib/membership/plans";
import { notFoundApiResponseInProduction } from "@/lib/production-api-guard";
import { defaultLocale, isLocale } from "@/lib/textbook/i18n";
import { getMembershipHref } from "@/lib/textbook/routes";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  try {
    const payload = (await request.json()) as {
      amountHkd?: number;
      locale?: string;
    };
    const amountHkd = Number(payload.amountHkd);
    const locale = payload.locale && isLocale(payload.locale) ? payload.locale : defaultLocale;
    const allowedAmounts = new Set<number>(donationAmountsHkd as readonly number[]);

    if (!Number.isInteger(amountHkd) || !allowedAmounts.has(amountHkd)) {
      return NextResponse.json({ error: "Unsupported donation amount." }, { status: 400 });
    }

    const stripe = getStripeClient();
    const appUrl = getAppUrl(request);
    const returnHref = getMembershipHref(locale);
    const checkoutSession = await stripe.checkout.sessions.create({
      cancel_url: `${appUrl}${returnHref}?donation=cancelled`,
      line_items: [
        {
          price_data: {
            currency: "hkd",
            product_data: {
              name: "Evanalysis Notes donation",
            },
            unit_amount: amountHkd * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        amountHkd: String(amountHkd),
        locale,
        purpose: "notes_donation",
      },
      mode: "payment",
      submit_type: "donate",
      success_url: `${appUrl}${returnHref}?donation=success&session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Create donation checkout failed:", error);
    return NextResponse.json({ error: "Unable to create donation checkout." }, { status: 500 });
  }
}
