"use client";

import { BookOpenText, Languages, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { Locale, LocalizedGlossaryEntry } from "@/lib/textbook/types";

export function GlossaryPopover({
  entry,
  locale,
}: {
  entry: LocalizedGlossaryEntry;
  locale: Locale;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="justify-start text-left" size="sm" variant="outline">
          <BookOpenText className="h-4 w-4" />
          {entry.displayTerm}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80 bg-card/95 p-3 backdrop-blur-xl">
        <DropdownMenuLabel className="px-0 text-base font-semibold">
          {entry.displayTerm}
        </DropdownMenuLabel>
        <p className="text-sm leading-7 text-foreground/95">
          {entry.displayDefinition}
        </p>
        {entry.notationNote ? (
          <div className="mt-3 rounded-xl border border-white/10 bg-background/40 p-3 text-sm leading-7">
            <p className="font-medium">{getLocalizedText(uiText.notationNote, locale)}</p>
            <p className="mt-1 text-muted-foreground">{entry.notationNote}</p>
          </div>
        ) : null}
        {entry.cantoneseNote || entry.putonghuaNote || entry.englishPronunciationNote ? (
          <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-background/40 p-3 text-sm leading-7">
            {entry.cantoneseNote ? (
              <div>
                <p className="flex items-center gap-2 font-medium">
                  <Languages className="h-4 w-4" />
                  {getLocalizedText(uiText.cantoneseNote, locale)}
                </p>
                <p className="mt-1 text-muted-foreground">{entry.cantoneseNote}</p>
              </div>
            ) : null}
            {entry.putonghuaNote ? (
              <div>
                <p className="flex items-center gap-2 font-medium">
                  <Languages className="h-4 w-4" />
                  {getLocalizedText(uiText.putonghuaNote, locale)}
                </p>
                <p className="mt-1 text-muted-foreground">{entry.putonghuaNote}</p>
              </div>
            ) : null}
            {entry.englishPronunciationNote ? (
              <div>
                <p className="flex items-center gap-2 font-medium">
                  <Volume2 className="h-4 w-4" />
                  {getLocalizedText(uiText.englishPronunciation, locale)}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {entry.englishPronunciationNote}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
        <DropdownMenuSeparator className="my-3" />
        <div className="space-y-1 text-xs leading-6 text-muted-foreground">
          <p className="font-semibold uppercase tracking-[0.24em]">
            {getLocalizedText(uiText.sourceTrail, locale)}
          </p>
          {entry.sourceRefs.map((source) => (
            <p key={`${source.file}-${source.pages ?? ""}`}>
              {source.file}
              {source.pages ? ` (${source.pages})` : ""}
              {source.note ? ` — ${source.note}` : ""}
            </p>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
