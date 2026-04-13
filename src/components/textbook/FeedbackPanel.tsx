"use client";

import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { Locale } from "@/lib/textbook/types";
import type { ProblemSubmissionResult, SectionMastery } from "@/lib/textbook/types";

export function FeedbackPanel({
  mastery,
  locale,
  result,
}: {
  mastery?: SectionMastery;
  locale: Locale;
  result: ProblemSubmissionResult;
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
        {result.correct
          ? getLocalizedText(uiText.correct, locale)
          : getLocalizedText(uiText.notCorrectYet, locale)}
      </p>
      {!result.correct && result.hint ? (
        <p className="mt-2">
          {getLocalizedText(uiText.hint, locale)}: {result.hint}
        </p>
      ) : null}
      {!result.correct && result.solutionLocked ? (
        <p className="mt-2">{getLocalizedText(uiText.solutionLocked, locale)}</p>
      ) : null}
      {mastery ? (
        <p className="mt-2 text-xs opacity-80">
          {getLocalizedText(uiText.sectionMastery, locale)}:{" "}
          {(mastery.mastery * 100).toFixed(0)}% ({mastery.correctAttempts}/
          {mastery.totalAttempts} {getLocalizedText(uiText.correctAttemptsLabel, locale)})
        </p>
      ) : null}
    </div>
  );
}
