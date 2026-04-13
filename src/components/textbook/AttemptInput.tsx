"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProblemSchema, ProblemSubmission } from "@/lib/textbook/types";

export function AttemptInput({
  disabled,
  onSubmit,
  problem,
}: {
  disabled?: boolean;
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
              <span>{choice.text}</span>
            </label>
          ))}
        </fieldset>
      ) : (
        <Input
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Enter your answer"
          value={answer}
        />
      )}

      <Button
        disabled={!canSubmit}
        onClick={() => onSubmit(problem.type === "MCQ" ? { choiceId } : { answer })}
        type="button"
      >
        Submit answer
      </Button>
    </div>
  );
}
