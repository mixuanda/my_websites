"use client";

import { TextbookInlineRichText } from "@/components/textbook/mdx-blocks";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { Locale, LocalizedText } from "@/lib/textbook/types";

export function SolutionSteps({
  locale,
  steps,
}: {
  locale: Locale;
  steps: LocalizedText[];
}) {
  return (
    <div className="space-y-3 rounded-md border border-border/70 p-4">
      <h4 className="text-base font-semibold leading-7">
        {getLocalizedText(uiText.solutionStepsTitle, locale)}
      </h4>
      <ol className="list-decimal space-y-2 pl-5 text-base leading-7">
        {steps.map((step, index) => (
          <li key={`${index}-${step.en.slice(0, 20)}`}>
            <TextbookInlineRichText text={getLocalizedText(step, locale)} />
          </li>
        ))}
      </ol>
    </div>
  );
}
