import { PremiumRouteGate } from "@/components/billing/PremiumRouteGate";

export const metadata = {
  title: "Premium Video Explanations",
};

export default function PremiumVideosPage() {
  return (
    <PremiumRouteGate requiredScope="premium.video_tools">
      <section className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold">Premium Video Explanations</h1>
        <p className="text-muted-foreground">
          This area is reserved for subscribers with Premium Video/Tools entitlements.
        </p>
      </section>
    </PremiumRouteGate>
  );
}
