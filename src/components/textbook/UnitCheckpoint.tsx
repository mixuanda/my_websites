"use client";

import { useEffect, useMemo, useState } from "react";
import { PracticeQuestion } from "@/components/textbook/PracticeQuestion";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type {
  CheckpointSummary,
  Locale,
  ProblemProgress,
  ProblemSchema,
  ProblemSubmissionResult,
} from "@/lib/textbook/types";

export function UnitCheckpoint({
  locale,
  problems,
  title,
}: {
  locale: Locale;
  problems: ProblemSchema[];
  title: string;
}) {
  const [summary, setSummary] = useState<CheckpointSummary | null>(null);

  useEffect(() => {
    let cancelled = false;
    const sectionId = problems[0]?.unitId;

    async function loadSummary() {
      if (!sectionId) return;

      try {
        const response = await fetch(`/api/textbook/problems/sections/${sectionId}/progress`);
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { summary: CheckpointSummary };
        if (!cancelled) {
          setSummary(data.summary);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, [problems]);

  const progress = useMemo(() => {
    if (!summary || summary.problemCount === 0) {
      return 0;
    }

    return Math.round((summary.masteredCount / summary.problemCount) * 100);
  }, [summary]);

  return (
    <section className="space-y-4 rounded-xl border p-5">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {getLocalizedText(uiText.checkpointRequiresCorrectAnswers, locale)}{" "}
          {getLocalizedText(uiText.checkpointProgressLabel, locale)}: {progress}%.
        </p>
      </div>

      {summary ? (
        <div className="rounded-lg border border-border/60 bg-background/30 p-4 text-sm">
          <p className="font-medium">{getLocalizedText(uiText.checkpointSummary, locale)}</p>
          <div className="mt-2 space-y-1 text-muted-foreground">
            <p>
              {getLocalizedText(uiText.progress, locale)}: {summary.masteredCount}/
              {summary.problemCount}
            </p>
            <p>
              {getLocalizedText(uiText.attemptsUsed, locale)}: {summary.attemptsUsed}
            </p>
            <p>
              {getLocalizedText(uiText.checkpointScore, locale)}:{" "}
              {(summary.averageBestScore * 100).toFixed(0)}%
            </p>
            {summary.weakTags.length > 0 ? (
              <p>
                {getLocalizedText(uiText.weakTopics, locale)}:{" "}
                {summary.weakTags.join(", ")}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {problems.map((problem) => (
        <PracticeQuestion
          key={problem.id}
          locale={locale}
          onSubmitted={({
            summary: nextSummary,
          }: {
            progress: ProblemProgress;
            result: ProblemSubmissionResult;
            summary: CheckpointSummary;
          }) => {
            setSummary(nextSummary);
          }}
          problem={problem}
        />
      ))}

      {summary && summary.masteredCount === summary.problemCount && summary.problemCount > 0 ? (
        <p className="rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
          {getLocalizedText(uiText.checkpointCompleted, locale)}
        </p>
      ) : null}
    </section>
  );
}
