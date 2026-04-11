import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getUnitHref } from "@/lib/textbook/routes";
import type { Locale, TextbookUnitMeta } from "@/lib/textbook/types";

export function PrerequisiteLink({
  locale,
  unit,
}: {
  locale: Locale;
  unit: TextbookUnitMeta;
}) {
  return (
    <Link
      href={getUnitHref(locale, unit)}
      className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-background/30 px-4 py-3 transition-colors hover:bg-background/50"
    >
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          {unit.unitNumber}
        </p>
        <p className="mt-1 text-sm font-medium leading-6">{unit.title[locale]}</p>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
