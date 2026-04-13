"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AttemptInput } from "@/components/textbook/AttemptInput";
import { FeedbackPanel } from "@/components/textbook/FeedbackPanel";
import { SolutionSteps } from "@/components/textbook/SolutionSteps";
import { Button } from "@/components/ui/button";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import { getMembershipHref } from "@/lib/textbook/routes";
import type {
  CheckpointSummary,
  Locale,
  ProblemPreviewResult,
  ProblemProgress,
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
  onSubmitted?: (payload: {
    progress: ProblemProgress;
    result: ProblemSubmissionResult;
    summary: CheckpointSummary;
  }) => void;
}) {
  const [preview, setPreview] = useState<ProblemPreviewResult | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [progress, setProgress] = useState<ProblemProgress | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [result, setResult] = useState<ProblemSubmissionResult | null>(null);
  const [mastery, setMastery] = useState<SectionMastery | undefined>(undefined);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      try {
        const response = await fetch(`/api/textbook/problems/${problem.id}/progress`);
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as { progress: ProblemProgress };
        if (!cancelled) {
          setProgress(data.progress);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [problem.id]);

  const handlePreview = async (submission: ProblemSubmission) => {
    setPreviewLoading(true);

    try {
      const response = await fetch("/api/textbook/problems/grade", {
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
        throw new Error("Failed to preview problem");
      }

      const data = (await response.json()) as { preview: ProblemPreviewResult };
      setPreview(data.preview);
    } catch (error) {
      console.error(error);
      setPreview({
        normalizedAnswer: "",
        parsedSuccessfully: false,
        previewText: getLocalizedText(uiText.previewRetry, locale),
      });
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleSubmit = async (submission: ProblemSubmission) => {
    setSubmitLoading(true);
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

      if (response.status === 409) {
        const data = (await response.json()) as {
          error?: string;
          problemProgress?: ProblemProgress;
          result?: ProblemSubmissionResult;
        };
        setProgress(data.problemProgress ?? progress);
        setResult({
          correct: data.result?.correct ?? false,
          correctAnswerPreview: data.result?.correctAnswerPreview,
          hint: data.error ?? getLocalizedText(uiText.attemptsExhausted, locale),
          normalizedAnswer: "",
          shouldShowSolution: data.result?.shouldShowSolution ?? false,
          solutionLocked: data.result?.solutionLocked ?? false,
          showCorrectAnswer: data.result?.showCorrectAnswer ?? false,
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to submit problem");
      }

      const data = (await response.json()) as {
        problemProgress: ProblemProgress;
        mastery: SectionMastery;
        result: ProblemSubmissionResult;
        summary: CheckpointSummary;
      };

      setResult(data.result);
      setMastery(data.mastery);
      setProgress(data.problemProgress);
      onSubmitted?.({
        progress: data.problemProgress,
        result: data.result,
        summary: data.summary,
      });
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
        showCorrectAnswer: false,
      });
    } finally {
      setSubmitLoading(false);
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
        locale={locale}
        onPreview={handlePreview}
        onSubmit={handleSubmit}
        preview={preview}
        previewLoading={previewLoading}
        progress={progress}
        problem={problem}
        submitLoading={submitLoading}
      />

      {result ? (
        <FeedbackPanel
          locale={locale}
          mastery={mastery}
          progress={progress}
          result={result}
        />
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
