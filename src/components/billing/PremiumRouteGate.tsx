import Link from "next/link";
import { GlassCard } from "@/components/glass";
import { hasScope, requireScope } from "@/lib/billing/access";
import type { ProductScope } from "@/lib/billing/types";

interface PremiumRouteGateProps {
  requiredScope: ProductScope;
  children: React.ReactNode;
}

export async function PremiumRouteGate({ requiredScope, children }: PremiumRouteGateProps) {
  const { entitlements } = await requireScope(requiredScope);

  if (!hasScope(entitlements, requiredScope)) {
    return (
      <GlassCard className="p-6">
        <h1 className="text-2xl font-semibold">Premium access required</h1>
        <p className="mt-3 text-muted-foreground">
          This route is part of premium learning features. Upgrade to continue.
        </p>
        <Link className="mt-4 inline-block text-primary underline" href="/settings/billing">
          View plans
        </Link>
      </GlassCard>
    );
  }

  return <>{children}</>;
}
