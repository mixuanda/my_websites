"use client";

import Link from "next/link";
import { useState } from "react";
import { AttemptInput } from "@/components/textbook/AttemptInput";
import { FeedbackPanel } from "@/components/textbook/FeedbackPanel";
import { SolutionSteps } from "@/components/textbook/SolutionSteps";
import { Button } from "@/components/ui/button";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import { getMembershipHref } from "@/lib/textbook/routes";
import type {
  Locale,
  ProblemSchema,
  ProblemSubmission,
  ProblemSubmissionResult,
  SectionMastery,
} from "@/lib/textbook/types";

export function PracticeQuestion({
  locale,
  problem,
  onSubmitted,
}: {
  locale: Locale;
  problem: ProblemSchema;
  onSubmitted?: (result: ProblemSubmissionResult) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProblemSubmissionResult | null>(null);
  const [mastery, setMastery] = useState<SectionMastery | undefined>(undefined);
  const [showSolution, setShowSolution] = useState(false);

  const handleSubmit = async (submission: ProblemSubmission) => {
    setLoading(true);
    setShowSolution(false);

    try {
      const response = await fetch("/api/textbook/problems/submit", {
        body: JSON.stringify({
          locale,
          problemId: problem.id,
          submission,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to grade problem");
      }

      const data = (await response.json()) as {
        mastery: SectionMastery;
        result: ProblemSubmissionResult;
      };

      setResult(data.result);
      setMastery(data.mastery);
      onSubmitted?.(data.result);
      if (!data.result.correct) {
        setShowSolution(false);
      }
    } catch (error) {
      console.error(error);
      setResult({
        correct: false,
        hint: getLocalizedText(uiText.gradingRetry, locale),
        normalizedAnswer: "",
        shouldShowSolution: false,
        solutionLocked: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 rounded-lg border p-5">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {getLocalizedText(uiText.skillsLabel, locale)}: {problem.skillTags.join(", ")}
        </p>
        <h3 className="text-base font-semibold">
          {getLocalizedText(problem.prompt, locale)}
        </h3>
      </header>

      <AttemptInput
        disabled={loading}
        locale={locale}
        onSubmit={handleSubmit}
        problem={problem}
      />

      {result ? (
        <FeedbackPanel locale={locale} mastery={mastery} result={result} />
      ) : null}

      {result?.shouldShowSolution ? (
        <div className="space-y-3">
          <Button
            onClick={() => setShowSolution((current) => !current)}
            type="button"
            variant="outline"
          >
            {showSolution
              ? getLocalizedText(uiText.hideFullSolution, locale)
              : getLocalizedText(uiText.showFullSolution, locale)}
          </Button>
          {showSolution ? (
            <SolutionSteps locale={locale} steps={problem.solutionSteps} />
          ) : null}
        </div>
      ) : null}

      {result?.solutionLocked ? (
        <Link
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
          href={getMembershipHref(locale)}
        >
          {getLocalizedText(uiText.upgradeMembership, locale)}
        </Link>
      ) : null}
    </section>
  );
}
