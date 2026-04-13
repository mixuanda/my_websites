import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getEntitlementsByUserId } from "./store";
import type { EntitlementRecord, ProductScope } from "./types";

export async function getSessionWithEntitlements(): Promise<{
  userId: string | null;
  entitlements: EntitlementRecord | null;
}> {
  const session = await auth();
  const userId = session?.user ? (session.user as { id?: string }).id ?? null : null;

  if (!userId) {
    return { userId: null, entitlements: null };
  }

  const entitlements = await getEntitlementsByUserId(userId);
  return { userId, entitlements };
}

export function hasScope(
  entitlements: EntitlementRecord | null,
  scope: ProductScope
): boolean {
  if (!entitlements?.active) {
    return false;
  }

  return entitlements.scopes.includes(scope);
}

export async function requireScope(scope: ProductScope) {
  const { userId, entitlements } = await getSessionWithEntitlements();

  if (!userId) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/settings/billing")}`);
  }

  if (!hasScope(entitlements, scope)) {
    redirect("/settings/billing?upgradeRequired=1");
  }

  return { userId, entitlements };
}
