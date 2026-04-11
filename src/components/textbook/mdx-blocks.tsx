"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, CircleAlert, CircleCheck, Lightbulb, Sigma } from "lucide-react";
import { GlassPanel } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLocalizedText } from "@/lib/textbook/i18n";
import type { Locale, LocalizedText } from "@/lib/textbook/types";

const blockLabels = {
  definition: {
    en: "Definition",
    "zh-cn": "定义",
    "zh-hk": "定義",
  },
  example: {
    en: "Worked example",
    "zh-cn": "例题",
    "zh-hk": "例題",
  },
  mistake: {
    en: "Common mistake",
    "zh-cn": "常见错误",
    "zh-hk": "常見錯誤",
  },
  proof: {
    en: "Proof",
    "zh-cn": "证明",
    "zh-hk": "證明",
  },
  quickCheck: {
    en: "Quick check",
    "zh-cn": "快速检查",
    "zh-hk": "快速檢查",
  },
  reveal: {
    en: "Reveal",
    "zh-cn": "显示答案",
    "zh-hk": "顯示答案",
  },
  solution: {
    en: "Solution",
    "zh-cn": "解答",
    "zh-hk": "解答",
  },
  theorem: {
    en: "Theorem",
    "zh-cn": "定理",
    "zh-hk": "定理",
  },
} as const satisfies Record<string, LocalizedText>;

function BlockFrame({
  accentClassName,
  children,
  icon,
  label,
  title,
}: {
  accentClassName: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  label: string;
  title?: string;
}) {
  return (
    <GlassPanel className={cn("my-6 border-l-4 p-5", accentClassName)}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-primary">{icon}</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {label}
          </p>
          {title ? <h4 className="mt-1 text-lg font-semibold">{title}</h4> : null}
          <div className="mt-3 space-y-3 text-sm leading-7 text-foreground/95">
            {children}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

export function Definition({
  children,
  locale,
  title,
}: {
  children?: React.ReactNode;
  locale: Locale;
  title?: string;
}) {
  return (
    <BlockFrame
      accentClassName="border-cyan-400/70"
      icon={<Lightbulb className="h-5 w-5" />}
      label={getLocalizedText(blockLabels.definition, locale)}
      title={title}
    >
      {children}
    </BlockFrame>
  );
}

export function TheoremCard({
  children,
  locale,
  title,
}: {
  children?: React.ReactNode;
  locale: Locale;
  title?: string;
}) {
  return (
    <BlockFrame
      accentClassName="border-violet-400/70"
      icon={<Sigma className="h-5 w-5" />}
      label={getLocalizedText(blockLabels.theorem, locale)}
      title={title}
    >
      {children}
    </BlockFrame>
  );
}

export function WorkedExample({
  children,
  locale,
  title,
}: {
  children?: React.ReactNode;
  locale: Locale;
  title?: string;
}) {
  return (
    <BlockFrame
      accentClassName="border-emerald-400/70"
      icon={<CircleCheck className="h-5 w-5" />}
      label={getLocalizedText(blockLabels.example, locale)}
      title={title}
    >
      {children}
    </BlockFrame>
  );
}

export function CommonMistake({
  children,
  locale,
  title,
}: {
  children?: React.ReactNode;
  locale: Locale;
  title?: string;
}) {
  return (
    <BlockFrame
      accentClassName="border-amber-400/80"
      icon={<CircleAlert className="h-5 w-5" />}
      label={getLocalizedText(blockLabels.mistake, locale)}
      title={title}
    >
      {children}
    </BlockFrame>
  );
}

function ToggleBlock({
  buttonLabel,
  children,
  locale,
  title,
  type,
}: {
  buttonLabel: LocalizedText;
  children?: React.ReactNode;
  locale: Locale;
  title?: string;
  type: keyof typeof blockLabels;
}) {
  const [open, setOpen] = useState(false);
  const label = useMemo(() => getLocalizedText(blockLabels[type], locale), [locale, type]);

  return (
    <GlassPanel className="my-6 border border-white/10 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {label}
          </p>
          {title ? <h4 className="mt-1 text-lg font-semibold">{title}</h4> : null}
        </div>
        <Button
          onClick={() => setOpen((value) => !value)}
          size="sm"
          type="button"
          variant="outline"
        >
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {getLocalizedText(buttonLabel, locale)}
        </Button>
      </div>
      {open ? (
        <div className="mt-4 space-y-3 text-sm leading-7 text-foreground/95">
          {children}
        </div>
      ) : null}
    </GlassPanel>
  );
}

export function QuickCheck({
  children,
  locale,
  prompt,
}: {
  children?: React.ReactNode;
  locale: Locale;
  prompt: string;
}) {
  return (
    <ToggleBlock
      buttonLabel={blockLabels.reveal}
      locale={locale}
      title={prompt}
      type="quickCheck"
    >
      {children}
    </ToggleBlock>
  );
}

export function RevealSolution({
  children,
  locale,
  title,
}: {
  children?: React.ReactNode;
  locale: Locale;
  title?: string;
}) {
  return (
    <ToggleBlock
      buttonLabel={blockLabels.reveal}
      locale={locale}
      title={title ?? getLocalizedText(blockLabels.solution, locale)}
      type="solution"
    >
      {children}
    </ToggleBlock>
  );
}

export function CollapsibleProof({
  children,
  locale,
  title,
}: {
  children?: React.ReactNode;
  locale: Locale;
  title?: string;
}) {
  return (
    <ToggleBlock
      buttonLabel={blockLabels.reveal}
      locale={locale}
      title={title ?? getLocalizedText(blockLabels.proof, locale)}
      type="proof"
    >
      {children}
    </ToggleBlock>
  );
}
