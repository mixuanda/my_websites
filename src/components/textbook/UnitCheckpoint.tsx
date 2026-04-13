"use client";

import { useMemo, useState } from "react";
import { PracticeQuestion } from "@/components/textbook/PracticeQuestion";
import type { ProblemSchema } from "@/lib/textbook/types";

export function UnitCheckpoint({
  problems,
  title,
}: {
  problems: ProblemSchema[];
  title: string;
}) {
  const [finished, setFinished] = useState<string[]>([]);

  const progress = useMemo(() => {
    if (problems.length === 0) return 0;
    return Math.round((finished.length / problems.length) * 100);
  }, [finished.length, problems.length]);

  return (
    <section className="space-y-4 rounded-xl border p-5">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          Complete the questions below to run a final section checkpoint. Progress: {progress}%.
        </p>
      </div>

      {problems.map((problem) => (
        <PracticeQuestion
          key={problem.id}
          onSubmitted={() => {
            setFinished((current) => (current.includes(problem.id) ? current : [...current, problem.id]));
          }}
          problem={problem}
        />
      ))}

      {finished.length === problems.length && problems.length > 0 ? (
        <p className="rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
          Section checkpoint completed. You can now review any item and revisit guided solutions.
        </p>
      ) : null}
    </section>
  );
}
