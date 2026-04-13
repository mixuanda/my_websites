"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { Locale, ProblemSchema, ProblemSubmission } from "@/lib/textbook/types";

export function AttemptInput({
  disabled,
  locale,
  onSubmit,
  problem,
}: {
  disabled?: boolean;
  locale: Locale;
  onSubmit: (submission: ProblemSubmission) => void;
  problem: ProblemSchema;
}) {
  const [answer, setAnswer] = useState("");
  const [choiceId, setChoiceId] = useState<string>("");

  const canSubmit =
    !disabled &&
    (problem.type === "MCQ" ? Boolean(choiceId) : Boolean(answer.trim()));

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
              <span>{getLocalizedText(choice.text, locale)}</span>
            </label>
          ))}
        </fieldset>
      ) : (
        <Input
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={getLocalizedText(uiText.enterYourAnswer, locale)}
          value={answer}
        />
      )}

      <Button
        disabled={!canSubmit}
        onClick={() => onSubmit(problem.type === "MCQ" ? { choiceId } : { answer })}
        type="button"
      >
        {getLocalizedText(uiText.submitAnswer, locale)}
      </Button>
    </div>
  );
}
