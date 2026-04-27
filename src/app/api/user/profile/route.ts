import { auth, authBackendStatus } from "@/lib/auth";
import {
  getMembershipRecordByEmail,
  getMembershipRecordByUserId,
  getUserEntitlements,
} from "@/lib/membership/entitlements";
import {
  getBillingConfigStatus,
  getConfiguredBillingPlans,
} from "@/lib/membership/plans";
import {
  getSessionProfile,
  updateUserProfile,
  type SiteUserLocale,
  type SiteUserTheme,
} from "@/lib/user-store";
import { usingFirestore } from "@/lib/db";
import { notFoundApiResponseInProduction } from "@/lib/production-api-guard";
import { NextResponse } from "next/server";

function isLocale(value: unknown): value is SiteUserLocale {
  return value === "en" || value === "zh-hk" || value === "zh-cn";
}

function isTheme(value: unknown): value is SiteUserTheme {
  return value === "system" || value === "light" || value === "dark";
}

export async function GET() {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await getSessionProfile(session);
    const entitlements = await getUserEntitlements(session);
    const user = session.user as { email?: string | null; id?: string } | undefined;
    const membership =
      (await getMembershipRecordByUserId(user?.id)) ??
      (await getMembershipRecordByEmail(user?.email));
    const billingConfig = getBillingConfigStatus();

    return NextResponse.json({
      backend: {
        authProvidersConfigured: authBackendStatus.hasConfiguredProvider,
        passwordUserCount: authBackendStatus.passwordUserCount,
        persistence: usingFirestore ? "firestore" : "memory",
        registrationEnabled: authBackendStatus.registrationEnabled,
      },
      billing: {
        configuredPlanCount: getConfiguredBillingPlans().length,
        ready:
          getConfiguredBillingPlans().length > 0 &&
          billingConfig.secretKeyConfigured &&
          billingConfig.webhookSecretConfigured,
        secretKeyConfigured: billingConfig.secretKeyConfigured,
        webhookSecretConfigured: billingConfig.webhookSecretConfigured,
      },
      entitlements,
      membership,
      profile,
    });
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = (await request.json()) as {
      name?: unknown;
      preferredLocale?: unknown;
      theme?: unknown;
    };

    const profile = await updateUserProfile(session, {
      name: typeof payload.name === "string" ? payload.name : undefined,
      preferredLocale: isLocale(payload.preferredLocale)
        ? payload.preferredLocale
        : undefined,
      theme: isTheme(payload.theme) ? payload.theme : undefined,
    });

    if (!profile) {
      return NextResponse.json({ error: "Unable to update profile" }, { status: 500 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Profile update API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
