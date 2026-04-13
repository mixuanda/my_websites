import { redirect } from "next/navigation";
import { BillingClient } from "@/components/billing/BillingClient";
import { auth } from "@/lib/auth";
import { getEntitlementsByUserId } from "@/lib/billing/store";

export default async function BillingPage() {
  const session = await auth();
  const userId = session?.user ? (session.user as { id?: string }).id : null;

  if (!userId) {
    redirect("/login?callbackUrl=/settings/billing");
  }

  const entitlements = await getEntitlementsByUserId(userId);

  return (
    <BillingClient
      initialEntitlements={entitlements}
      userEmail={session?.user?.email ?? "unknown user"}
    />
  );
}
