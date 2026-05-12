"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { AccessTier, Locale, LocalizedText } from "@/lib/textbook/types";
import type { BillingPlanConfig, BillingPlanId } from "@/lib/membership/plans";

const accessRank: Record<AccessTier, number> = {
  FREE: 0,
  MEMBER: 1,
  PRO: 2,
};

const billingCopy = {
  donate: {
    en: "Donate",
    "zh-cn": "捐赠支持",
    "zh-hk": "捐款支持",
  },
  donationFailed: {
    en: "We could not open the donation checkout right now. Try again in a moment.",
    "zh-cn": "目前无法打开捐赠付款流程，请稍后再试。",
    "zh-hk": "目前無法打開捐款付款流程，請稍後再試。",
  },
  included: {
    en: "Included in current access",
    "zh-cn": "已包含在当前权限",
    "zh-hk": "已包含在目前權限",
  },
  notConfigured: {
    en: "Not configured yet",
    "zh-cn": "尚未配置",
    "zh-hk": "尚未配置",
  },
} satisfies Record<string, LocalizedText>;

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
  activeTier,
  canManageBilling,
  canSubscribe,
  donationEnabled,
  donationAmounts,
  locale,
  plans,
}: {
  activeTier: AccessTier;
  canManageBilling: boolean;
  canSubscribe: boolean;
  donationEnabled: boolean;
  donationAmounts: readonly number[];
  locale: Locale;
  plans: BillingPlanConfig[];
}) {
  const [loadingPlan, setLoadingPlan] = useState<BillingPlanId | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loadingDonation, setLoadingDonation] = useState<number | null>(null);

  const startCheckout = async (plan: BillingPlanId) => {
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

  const startDonation = async (amountHkd: number) => {
    setLoadingDonation(amountHkd);
    try {
      const response = await fetch("/api/billing/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountHkd, locale }),
      });
      const data = (await response.json()) as {
        error?: string;
        url?: string;
      };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? getLocalizedText(billingCopy.donationFailed, locale));
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      window.alert(
        error instanceof Error
          ? error.message
          : getLocalizedText(billingCopy.donationFailed, locale)
      );
    } finally {
      setLoadingDonation(null);
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
    <div className="space-y-5">
      {canSubscribe ? (
        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan) => {
            const enabled = Boolean(plan.priceId);
            const alreadyIncluded = accessRank[activeTier] >= accessRank[plan.tier];

            return (
              <div
                key={plan.id}
                className={`rounded-lg border p-4 ${
                  plan.highlighted ? "border-primary/50 bg-primary/5" : "bg-background/30"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{getLocalizedText(plan.label, locale)}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {getLocalizedText(plan.description, locale)}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {getLocalizedText(plan.priceLabel, locale)}
                  </p>
                </div>
                {plan.savingsLabel ? (
                  <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
                    {getLocalizedText(plan.savingsLabel, locale)}
                  </p>
                ) : null}
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={getLocalizedText(feature, "en")}>
                      {getLocalizedText(feature, locale)}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-4 w-full"
                  disabled={Boolean(loadingPlan) || !enabled || alreadyIncluded}
                  onClick={() => startCheckout(plan.id)}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {loadingPlan === plan.id
                    ? getLocalizedText(uiText.openCheckout, locale)
                    : alreadyIncluded
                      ? getLocalizedText(billingCopy.included, locale)
                      : enabled
                        ? getLocalizedText(plan.ctaLabel, locale)
                        : getLocalizedText(billingCopy.notConfigured, locale)}
                </Button>
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {canManageBilling ? (
          <Button disabled={loadingPortal} onClick={openPortal} variant="secondary">
            {loadingPortal
              ? getLocalizedText(uiText.loading, locale)
              : getLocalizedText(uiText.manageBilling, locale)}
          </Button>
        ) : null}
        {donationEnabled
          ? donationAmounts.map((amount) => (
              <Button
                disabled={Boolean(loadingDonation)}
                key={amount}
                onClick={() => startDonation(amount)}
                variant="outline"
              >
                {loadingDonation === amount
                  ? getLocalizedText(uiText.openCheckout, locale)
                  : `${getLocalizedText(billingCopy.donate, locale)} HK$${amount}`}
              </Button>
            ))
          : null}
      </div>
    </div>
  );
}
