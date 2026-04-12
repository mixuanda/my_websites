"use client";

import katex from "katex";
import { Fragment, useMemo, useState } from "react";
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

const fileLikePattern = /\.[A-Za-z0-9]{2,4}\b|[/#]/;
const mathIndicatorPattern =
  /\\[A-Za-z]+|[_^=+\-*/<>≤≥→∨∧¬∈∉⊆⊂⊇⊃≈≠×÷∩∪∅]/;
const shortMathPattern =
  /^(?:[A-Z]|[A-Z]_[A-Za-z0-9{}]+|[A-Z]\^[A-Za-z0-9{}]+|sqrt\(.+\)|sup\(.+\)|inf\(.+\)|diag\(.+\)|Span\{.+\}|I_[A-Za-z0-9{}]+)$/;

function normalizeInlineMath(expression: string) {
  let normalized = expression.trim();

  normalized = normalized.replace(/^sqrt\((.+)\)$/u, "\\sqrt{$1}");
  normalized = normalized.replace(/^sup\((.+)\)$/u, "\\sup($1)");
  normalized = normalized.replace(/^inf\((.+)\)$/u, "\\inf($1)");
  normalized = normalized.replace(
    /^diag\((.+)\)$/u,
    "\\operatorname{diag}($1)"
  );
  normalized = normalized.replace(
    /^Span\{(.+)\}$/u,
    "\\operatorname{Span}\\{$1\\}"
  );

  return normalized;
}

function shouldRenderAsMath(expression: string) {
  const trimmed = expression.trim();

  if (!trimmed || trimmed.includes("\n") || fileLikePattern.test(trimmed)) {
    return false;
  }

  if (/[A-Za-z]{4,}\s+[A-Za-z]{4,}/u.test(trimmed) && !mathIndicatorPattern.test(trimmed)) {
    return false;
  }

  return mathIndicatorPattern.test(trimmed) || shortMathPattern.test(trimmed);
}

function renderInlineMath(expression: string) {
  try {
    return katex.renderToString(normalizeInlineMath(expression), {
      displayMode: false,
      strict: "ignore",
      throwOnError: true,
    });
  } catch {
    return null;
  }
}

function InlineRichText({ text }: { text: string }) {
  const nodes = useMemo(() => {
    const parts: React.ReactNode[] = [];
    const matcher = /(`([^`]+)`)|(\$([^$]+)\$)/g;
    let cursor = 0;
    let key = 0;
    let match: RegExpExecArray | null;

    while ((match = matcher.exec(text)) !== null) {
      const [rawMatch, codeMatch, codeValue, mathMatch, mathValue] = match;
      const startIndex = match.index;

      if (startIndex > cursor) {
        parts.push(
          <Fragment key={`text-${key}`}>
            {text.slice(cursor, startIndex)}
          </Fragment>
        );
        key += 1;
      }

      const rawValue = codeValue ?? mathValue ?? "";
      const renderedMath =
        mathMatch || shouldRenderAsMath(rawValue)
          ? renderInlineMath(rawValue)
          : null;

      if (renderedMath) {
        parts.push(
          <span
            key={`math-${key}`}
            className="inline-katex-rich align-middle [&_.katex]:text-[1em]"
            dangerouslySetInnerHTML={{ __html: renderedMath }}
          />
        );
      } else if (codeMatch) {
        parts.push(
          <code
            key={`code-${key}`}
            className="rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[0.9em]"
          >
            {rawValue}
          </code>
        );
      } else if (mathMatch) {
        parts.push(
          <Fragment key={`fallback-${key}`}>
            {rawMatch}
          </Fragment>
        );
      }

      key += 1;
      cursor = startIndex + rawMatch.length;
    }

    if (cursor < text.length) {
      parts.push(
        <Fragment key={`text-${key}`}>
          {text.slice(cursor)}
        </Fragment>
      );
    }

    return parts;
  }, [text]);

  return <>{nodes}</>;
}

function getInlineChildrenText(children: React.ReactNode) {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    const values = children
      .map((child) => {
        if (typeof child === "string" || typeof child === "number") {
          return String(child);
        }

        return null;
      })
      .filter((value): value is string => value !== null);

    return values.length === children.length ? values.join("") : null;
  }

  return null;
}

export function TextbookInlineCode({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const content = getInlineChildrenText(children);
  const renderedMath =
    !className && content && shouldRenderAsMath(content)
      ? renderInlineMath(content)
      : null;

  if (renderedMath) {
    return (
      <span
        className={cn("inline-katex-rich align-middle [&_.katex]:text-[1em]", className)}
        dangerouslySetInnerHTML={{ __html: renderedMath }}
      />
    );
  }

  return (
    <code className={cn("rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[0.9em]", className)}>
      {children}
    </code>
  );
}

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
          {title ? (
            <h4 className="mt-1 text-lg font-semibold leading-7">
              <InlineRichText text={title} />
            </h4>
          ) : null}
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
    <GlassPanel className="my-6 border border-border/60 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {label}
          </p>
          {title ? (
            <h4 className="mt-1 text-lg font-semibold leading-7">
              <InlineRichText text={title} />
            </h4>
          ) : null}
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
    <BlockFrame
      accentClassName="border-sky-400/70"
      icon={<CircleCheck className="h-5 w-5" />}
      label={getLocalizedText(blockLabels.quickCheck, locale)}
      title={prompt}
    >
      {children}
    </BlockFrame>
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
