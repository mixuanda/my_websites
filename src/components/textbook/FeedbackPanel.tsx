"use client";

import type { ProblemSubmissionResult, SectionMastery } from "@/lib/textbook/types";

export function FeedbackPanel({
  result,
  mastery,
}: {
  result: ProblemSubmissionResult;
  mastery?: SectionMastery;
}) {
  return (
    <div
      className={`rounded-md border p-4 text-sm ${
        result.correct
          ? "border-emerald-500/40 bg-emerald-500/10"
          : "border-amber-500/40 bg-amber-500/10"
      }`}
    >
      <p className="font-medium">
        {result.correct ? "Correct." : "Not correct yet."}
      </p>
      {!result.correct && result.hint ? (
        <p className="mt-2">Hint: {result.hint}</p>
      ) : null}
      {mastery ? (
        <p className="mt-2 text-xs opacity-80">
          Section mastery: {(mastery.mastery * 100).toFixed(0)}% ({mastery.correctAttempts}/
          {mastery.totalAttempts} correct attempts)
        </p>
      ) : null}
    </div>
  );
}
