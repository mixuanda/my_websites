"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextbookInlineRichText } from "@/components/textbook/mdx-blocks";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type {
  Locale,
  ProblemPreviewResult,
  ProblemProgress,
  ProblemSchema,
  ProblemSubmission,
} from "@/lib/textbook/types";

function formatAttemptsRemaining(progress: ProblemProgress | null, locale: Locale) {
  if (!progress) {
    return getLocalizedText(uiText.attemptsUnlimited, locale);
  }

  if (progress.maxAttempts === null) {
    return getLocalizedText(uiText.attemptsUnlimited, locale);
  }

  return `${progress.attemptsRemaining}`;
}

export function AttemptInput({
  locale,
  preview,
  previewLoading,
  progress,
  submitLoading,
  onPreview,
  onSubmit,
  problem,
}: {
  locale: Locale;
  preview: ProblemPreviewResult | null;
  previewLoading: boolean;
  progress: ProblemProgress | null;
  submitLoading: boolean;
  onPreview: (submission: ProblemSubmission) => void;
  onSubmit: (submission: ProblemSubmission) => void;
  problem: ProblemSchema;
}) {
  const [answer, setAnswer] = useState("");
  const [choiceId, setChoiceId] = useState<string>("");

  const submissionReady =
    problem.type === "MCQ" ? Boolean(choiceId) : Boolean(answer.trim());
  const canPreview = submissionReady && !previewLoading;
  const canSubmit =
    submissionReady &&
    !submitLoading &&
    !(
      progress?.maxAttempts !== null &&
      (progress?.attemptsRemaining ?? 1) <= 0
    );

  return (
    <div className="space-y-4">
      {problem.type === "MCQ" ? (
        <fieldset className="space-y-2">
          {problem.choices.map((choice) => (
            <label
              key={choice.id}
              className="flex items-start gap-2 rounded-md border p-3 text-sm"
            >
              <input
                checked={choiceId === choice.id}
                name={`problem-${problem.id}`}
                onChange={() => setChoiceId(choice.id)}
                type="radio"
                value={choice.id}
              />
              <span>
                <TextbookInlineRichText text={getLocalizedText(choice.text, locale)} />
              </span>
            </label>
          ))}
        </fieldset>
      ) : (
        <Input
          className="font-mono"
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={getLocalizedText(uiText.enterYourAnswer, locale)}
          value={answer}
        />
      )}

      <div className="space-y-2 text-xs text-muted-foreground">
        <p>
          {getLocalizedText(uiText.attemptsUsed, locale)}: {progress?.attemptsUsed ?? 0}
        </p>
        <p>
          {getLocalizedText(uiText.attemptsRemaining, locale)}:{" "}
          {formatAttemptsRemaining(progress, locale)}
        </p>
        <p>{getLocalizedText(uiText.previewDoesNotCount, locale)}</p>
        <p>{getLocalizedText(uiText.submitConsumesAttempt, locale)}</p>
        {problem.syntaxGuidance ? (
          <p>
            {getLocalizedText(uiText.syntaxGuidance, locale)}:{" "}
            <TextbookInlineRichText text={getLocalizedText(problem.syntaxGuidance, locale)} />
          </p>
        ) : null}
        {problem.previewExamples?.length ? (
          <ul className="list-disc pl-5">
            {problem.previewExamples.map((example) => (
              <li key={example.en}>
                <TextbookInlineRichText text={getLocalizedText(example, locale)} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {preview ? (
        <div className="rounded-md border border-primary/25 bg-primary/5 p-4 text-sm">
          <p className="font-medium">{getLocalizedText(uiText.previewAnswer, locale)}</p>
          {preview.previewText ? (
            <p className="mt-2">
              {getLocalizedText(uiText.previewNormalizedAs, locale)}:{" "}
              <TextbookInlineRichText text={preview.previewText} />
            </p>
          ) : null}
          {preview.syntaxGuidance ? (
            <p className="mt-2 text-muted-foreground">
              {getLocalizedText(uiText.syntaxGuidance, locale)}:{" "}
              <TextbookInlineRichText text={preview.syntaxGuidance} />
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button
          disabled={!canPreview}
          onClick={() =>
            onPreview(problem.type === "MCQ" ? { choiceId } : { answer })
          }
          type="button"
          variant="outline"
        >
          {previewLoading
            ? getLocalizedText(uiText.loading, locale)
            : getLocalizedText(uiText.previewAnswer, locale)}
        </Button>
        <Button
          disabled={!canSubmit || submitLoading}
          onClick={() => onSubmit(problem.type === "MCQ" ? { choiceId } : { answer })}
          type="button"
        >
          {submitLoading
            ? getLocalizedText(uiText.loading, locale)
            : getLocalizedText(uiText.submitAnswer, locale)}
        </Button>
      </div>
    </div>
  );
}
