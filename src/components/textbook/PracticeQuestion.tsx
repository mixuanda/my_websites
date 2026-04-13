"use client";

import { useState } from "react";
import { AttemptInput } from "@/components/textbook/AttemptInput";
import { FeedbackPanel } from "@/components/textbook/FeedbackPanel";
import { SolutionSteps } from "@/components/textbook/SolutionSteps";
import { Button } from "@/components/ui/button";
import type {
  ProblemSchema,
  ProblemSubmission,
  ProblemSubmissionResult,
  SectionMastery,
} from "@/lib/textbook/types";

export function PracticeQuestion({
  problem,
  onSubmitted,
}: {
  problem: ProblemSchema;
  onSubmitted?: () => void;
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
      onSubmitted?.();
      if (!data.result.correct) {
        setShowSolution(false);
      }
    } catch (error) {
      console.error(error);
      setResult({
        correct: false,
        hint: "We could not grade your answer right now. Please retry.",
        normalizedAnswer: "",
        shouldShowSolution: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 rounded-lg border p-5">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Skills: {problem.skillTags.join(", ")}
        </p>
        <h3 className="text-base font-semibold">{problem.prompt}</h3>
      </header>

      <AttemptInput disabled={loading} onSubmit={handleSubmit} problem={problem} />

      {result ? <FeedbackPanel mastery={mastery} result={result} /> : null}

      {result?.shouldShowSolution ? (
        <div className="space-y-3">
          <Button
            onClick={() => setShowSolution((current) => !current)}
            type="button"
            variant="outline"
          >
            {showSolution ? "Hide full solution" : "Show full step-by-step solution"}
          </Button>
          {showSolution ? <SolutionSteps steps={problem.solutionSteps} /> : null}
        </div>
      ) : null}
    </section>
  );
}
