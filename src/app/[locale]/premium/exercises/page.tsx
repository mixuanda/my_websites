import { PremiumRouteGate } from "@/components/billing/PremiumRouteGate";

export const metadata = {
  title: "Advanced Exercises",
};

export default function PremiumExercisesPage() {
  return (
    <PremiumRouteGate requiredScope="premium.advanced_exercises">
      <section className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold">Advanced Exercises</h1>
        <p className="text-muted-foreground">
          These challenge sets are included with Premium Notes and Premium Video/Tools plans.
        </p>
      </section>
    </PremiumRouteGate>
  );
}
