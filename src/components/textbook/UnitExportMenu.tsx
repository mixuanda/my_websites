"use client";

import { Download, FileText, FileType2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { CourseId, Locale } from "@/lib/textbook/types";

interface UnitExportMenuProps {
  chapter: string;
  course: CourseId;
  locale: Locale;
  unit: string;
}

export function UnitExportMenu({
  chapter,
  course,
  locale,
  unit,
}: UnitExportMenuProps) {
  const txtHref = `/api/textbook-export/${locale}/${course}/${chapter}/${unit}`;
  const pdfHref = `${txtHref}/pdf`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4" />
          {getLocalizedText(uiText.studyExport, locale)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <a href={txtHref}>
            <FileText className="h-4 w-4" />
            {getLocalizedText(uiText.studyExportTxt, locale)}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={pdfHref}>
            <FileType2 className="h-4 w-4" />
            {getLocalizedText(uiText.studyExportPdf, locale)}
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
