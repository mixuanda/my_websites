"use client";

import { TextbookInlineRichText } from "@/components/textbook/mdx-blocks";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { Locale, ProblemProgress } from "@/lib/textbook/types";
import type { ProblemSubmissionResult, SectionMastery } from "@/lib/textbook/types";

function getProgressStatusText(progress: ProblemProgress, locale: Locale) {
  switch (progress.status) {
    case "solved":
      return getLocalizedText(uiText.solved, locale);
    case "in-progress":
      return getLocalizedText(uiText.inProgress, locale);
    case "locked-out":
      return getLocalizedText(uiText.lockedOut, locale);
    default:
      return getLocalizedText(uiText.notStarted, locale);
  }
}

export function FeedbackPanel({
  mastery,
  locale,
  progress,
  result,
}: {
  mastery?: SectionMastery;
  locale: Locale;
  progress?: ProblemProgress | null;
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
          {getLocalizedText(uiText.hint, locale)}:{" "}
          <TextbookInlineRichText text={result.hint} />
        </p>
      ) : null}
      {!result.correct && result.solutionLocked ? (
        <p className="mt-2">{getLocalizedText(uiText.solutionLocked, locale)}</p>
      ) : null}
      {result.showCorrectAnswer && result.correctAnswerPreview ? (
        <p className="mt-2">
          {getLocalizedText(uiText.correctAnswer, locale)}:{" "}
          <TextbookInlineRichText text={result.correctAnswerPreview} />
        </p>
      ) : null}
      {progress ? (
        <div className="mt-3 space-y-1 text-xs opacity-80">
          <p>
            {getLocalizedText(uiText.progress, locale)}:{" "}
            {getProgressStatusText(progress, locale)}
          </p>
          <p>
            {getLocalizedText(uiText.attemptsUsed, locale)}: {progress.attemptsUsed}
          </p>
          <p>
            {getLocalizedText(uiText.attemptsRemaining, locale)}:{" "}
            {progress.maxAttempts === null
              ? getLocalizedText(uiText.attemptsUnlimited, locale)
              : progress.attemptsRemaining}
          </p>
          <p>
            {getLocalizedText(uiText.checkpointScore, locale)}:{" "}
            {(progress.bestScore * 100).toFixed(0)}%
          </p>
        </div>
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
