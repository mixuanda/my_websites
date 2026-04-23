"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Button } from "@/components/ui/button";
import type { BillingCycle, BillingPlan, EntitlementRecord } from "@/lib/billing/types";

interface BillingClientProps {
  initialEntitlements: EntitlementRecord;
  userEmail: string;
}

interface CheckoutState {
  loading: boolean;
  plan: BillingPlan | null;
  cycle: BillingCycle;
}

const planCards: Array<{ plan: BillingPlan; title: string; bullets: string[] }> = [
  {
    plan: "free",
    title: "Free",
    bullets: [
      "All core Math1090/Math1030 section notes remain public.",
      "Structured article reading, proofs, and standard examples.",
      "No payment needed.",
    ],
  },
  {
    plan: "premium_notes",
    title: "Premium Notes",
    bullets: [
      "Advanced exercises and guided challenge sets.",
      "Premium export format for deeper study packs.",
      "Choose monthly subscription or one-time course unlock.",
    ],
  },
  {
    plan: "premium_video_tools",
    title: "Premium Video/Tools",
    bullets: [
      "Everything in Premium Notes.",
      "Video explanations and premium interactive tools.",
      "Choose monthly subscription or one-time course unlock.",
    ],
  },
];

export function BillingClient({ initialEntitlements, userEmail }: BillingClientProps) {
  const searchParams = useSearchParams();
  const [checkout, setCheckout] = useState<CheckoutState>({
    loading: false,
    plan: null,
    cycle: "monthly",
  });

  const checkoutNotice = useMemo(() => {
    const marker = searchParams.get("checkout");
    if (marker === "success") return "Payment successful. Entitlements are syncing now.";
    if (marker === "canceled") return "Checkout canceled. You can retry anytime.";
    return null;
  }, [searchParams]);

  const startCheckout = async (plan: BillingPlan, cycle: BillingCycle) => {
    setCheckout({ loading: true, plan, cycle });
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, cycle }),
    });

    const data = await res.json();
    if (res.ok && data.url) {
      window.location.assign(data.url);
      return;
    }

    setCheckout({ loading: false, plan: null, cycle });
    alert(data.error ?? "Failed to create checkout session");
  };

  const openPortal = async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (res.ok && data.url) {
      window.location.assign(data.url);
      return;
    }
    alert(data.error ?? "Failed to open billing portal");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Billing & Access</h1>
        <p className="text-muted-foreground">
          Core notes remain free. Paid tiers unlock advanced exercises, premium exports, and video/tools.
        </p>
      </header>

      {checkoutNotice ? (
        <GlassPanel className="border border-primary/30 p-4 text-sm">{checkoutNotice}</GlassPanel>
      ) : null}

      <GlassCard className="p-6">
        <h2 className="text-lg font-medium">Current access</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as {userEmail}. Plan: {initialEntitlements.plan}.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Renewal: {initialEntitlements.renewsAt ? new Date(initialEntitlements.renewsAt).toLocaleString() : "N/A"}
          {initialEntitlements.cancelAtPeriodEnd ? " (cancellation scheduled at period end)" : ""}
        </p>
        <div className="mt-4">
          <Button variant="outline" onClick={openPortal}>
            Manage subscription, cancellation, renewals
          </Button>
        </div>
      </GlassCard>

      <section className="grid gap-4 md:grid-cols-3">
        {planCards.map((card) => (
          <GlassCard key={card.plan} className="p-5">
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {card.bullets.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            {card.plan !== "free" ? (
              <div className="mt-4 space-y-2">
                <Button
                  className="w-full"
                  onClick={() => startCheckout(card.plan, "monthly")}
                  disabled={checkout.loading}
                >
                  {checkout.loading && checkout.plan === card.plan && checkout.cycle === "monthly"
                    ? "Redirecting…"
                    : "Subscribe monthly"}
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => startCheckout(card.plan, "one_time")}
                  disabled={checkout.loading}
                >
                  {checkout.loading && checkout.plan === card.plan && checkout.cycle === "one_time"
                    ? "Redirecting…"
                    : "One-time course unlock"}
                </Button>
              </div>
            ) : (
              <p className="mt-4 text-sm text-emerald-500">Always available publicly.</p>
            )}
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
