"use client";

import { useMemo, useState } from "react";
import { PracticeQuestion } from "@/components/textbook/PracticeQuestion";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { Locale, ProblemSchema, ProblemSubmissionResult } from "@/lib/textbook/types";

export function UnitCheckpoint({
  locale,
  problems,
  title,
}: {
  locale: Locale;
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
          {getLocalizedText(uiText.checkpointRequiresCorrectAnswers, locale)}{" "}
          {getLocalizedText(uiText.checkpointProgressLabel, locale)}: {progress}%.
        </p>
      </div>

      {problems.map((problem) => (
        <PracticeQuestion
          key={problem.id}
          locale={locale}
          onSubmitted={(result: ProblemSubmissionResult) => {
            if (!result.correct) {
              return;
            }

            setFinished((current) =>
              current.includes(problem.id) ? current : [...current, problem.id]
            );
          }}
          problem={problem}
        />
      ))}

      {finished.length === problems.length && problems.length > 0 ? (
        <p className="rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
          {getLocalizedText(uiText.checkpointCompleted, locale)}
        </p>
      ) : null}
    </section>
  );
}
