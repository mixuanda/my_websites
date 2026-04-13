"use client";

export function SolutionSteps({
  steps,
}: {
  steps: string[];
}) {
  return (
    <div className="space-y-3 rounded-md border p-4">
      <h4 className="text-sm font-semibold">Full solution steps</h4>
      <ol className="list-decimal space-y-2 pl-5 text-sm">
        {steps.map((step, index) => (
          <li key={`${index}-${step.slice(0, 20)}`}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
