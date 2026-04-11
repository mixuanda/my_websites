"use client";

import { useEffect, useState } from "react";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import { TEXTBOOK_PROGRESS_STORAGE_KEY } from "@/lib/textbook/storage";
import type { Locale } from "@/lib/textbook/types";

function readProgress(unitId: string) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const raw = window.localStorage.getItem(TEXTBOOK_PROGRESS_STORAGE_KEY);

    if (!raw) {
      return false;
    }

    const parsed = JSON.parse(raw) as Record<string, boolean>;
    return Boolean(parsed[unitId]);
  } catch {
    return false;
  }
}

export function UnitProgressToggle({
  locale,
  unitId,
}: {
  locale: Locale;
  unitId: string;
}) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(readProgress(unitId));
  }, [unitId]);

  return (
    <Button
      onClick={() => {
        const nextValue = !completed;
        setCompleted(nextValue);

        try {
          const raw = window.localStorage.getItem(TEXTBOOK_PROGRESS_STORAGE_KEY);
          const parsed = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
          parsed[unitId] = nextValue;
          window.localStorage.setItem(
            TEXTBOOK_PROGRESS_STORAGE_KEY,
            JSON.stringify(parsed)
          );
        } catch {
          // Ignore storage write failures and keep the local UI state.
        }
      }}
      size="sm"
      type="button"
      variant={completed ? "default" : "outline"}
    >
      <CheckCheck className="h-4 w-4" />
      {completed
        ? getLocalizedText(uiText.markedComplete, locale)
        : getLocalizedText(uiText.markComplete, locale)}
    </Button>
  );
}
