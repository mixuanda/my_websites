"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BillingActions() {
  const [loadingPlan, setLoadingPlan] = useState<"monthly" | "yearly" | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);

  const startCheckout = async (plan: "monthly" | "yearly") => {
    setLoadingPlan(plan);
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to create checkout session.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Unable to start checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const openPortal = async () => {
    setLoadingPortal(true);
    try {
      const response = await fetch("/api/billing/portal", { method: "POST" });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to open billing portal.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Unable to open billing portal.");
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled={Boolean(loadingPlan)} onClick={() => startCheckout("monthly")}>
        {loadingPlan === "monthly" ? "Opening…" : "Subscribe monthly"}
      </Button>
      <Button disabled={Boolean(loadingPlan)} onClick={() => startCheckout("yearly")} variant="outline">
        {loadingPlan === "yearly" ? "Opening…" : "Subscribe yearly"}
      </Button>
      <Button disabled={loadingPortal} onClick={openPortal} variant="secondary">
        {loadingPortal ? "Loading…" : "Manage billing"}
      </Button>
    </div>
  );
}
