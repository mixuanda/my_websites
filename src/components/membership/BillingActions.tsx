"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { Locale } from "@/lib/textbook/types";

function getBillingErrorMessage(errorCode: string | undefined, locale: Locale) {
  switch (errorCode) {
    case "auth_required":
      return getLocalizedText(uiText.signInToSubscribe, locale);
    case "admin_full_access":
      return getLocalizedText(uiText.adminHasFullAccess, locale);
    case "already_member":
      return getLocalizedText(uiText.membershipAlreadyActive, locale);
    case "billing_profile_missing":
      return getLocalizedText(uiText.noBillingProfile, locale);
    case "plan_not_configured":
      return getLocalizedText(uiText.billingPlanNotConfigured, locale);
    default:
      return getLocalizedText(uiText.billingActionFailed, locale);
  }
}

export function BillingActions({
  canManageBilling,
  canSubscribe,
  locale,
  monthlyEnabled,
  yearlyEnabled,
}: {
  canManageBilling: boolean;
  canSubscribe: boolean;
  locale: Locale;
  monthlyEnabled: boolean;
  yearlyEnabled: boolean;
}) {
  const [loadingPlan, setLoadingPlan] = useState<"monthly" | "yearly" | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);

  const startCheckout = async (plan: "monthly" | "yearly") => {
    setLoadingPlan(plan);
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, plan }),
      });

      const data = (await response.json()) as {
        error?: string;
        errorCode?: string;
        url?: string;
      };
      if (!response.ok || !data.url) {
        throw new Error(getBillingErrorMessage(data.errorCode, locale));
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      window.alert(
        error instanceof Error
          ? error.message
          : getLocalizedText(uiText.billingActionFailed, locale)
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  const openPortal = async () => {
    setLoadingPortal(true);
    try {
      const response = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });
      const data = (await response.json()) as {
        error?: string;
        errorCode?: string;
        url?: string;
      };

      if (!response.ok || !data.url) {
        throw new Error(getBillingErrorMessage(data.errorCode, locale));
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      window.alert(
        error instanceof Error
          ? error.message
          : getLocalizedText(uiText.billingActionFailed, locale)
      );
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {canSubscribe ? (
        <>
          {monthlyEnabled ? (
            <Button
              disabled={Boolean(loadingPlan)}
              onClick={() => startCheckout("monthly")}
            >
              {loadingPlan === "monthly"
                ? getLocalizedText(uiText.openCheckout, locale)
                : getLocalizedText(uiText.subscribeMonthly, locale)}
            </Button>
          ) : null}
          {yearlyEnabled ? (
            <Button
              disabled={Boolean(loadingPlan)}
              onClick={() => startCheckout("yearly")}
              variant="outline"
            >
              {loadingPlan === "yearly"
                ? getLocalizedText(uiText.openCheckout, locale)
                : getLocalizedText(uiText.subscribeYearly, locale)}
            </Button>
          ) : null}
        </>
      ) : null}
      {canManageBilling ? (
        <Button disabled={loadingPortal} onClick={openPortal} variant="secondary">
          {loadingPortal
            ? getLocalizedText(uiText.loading, locale)
            : getLocalizedText(uiText.manageBilling, locale)}
        </Button>
      ) : null}
    </div>
  );
}
