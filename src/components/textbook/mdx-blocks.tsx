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

const linearSystemFigureLabels = {
  caption: {
    en: "Three geometric possibilities for two-variable linear systems",
    "zh-cn": "二元线性方程组的三种几何可能",
    "zh-hk": "二元線性方程組的三種幾何可能",
  },
  unique: {
    en: "one solution",
    "zh-cn": "唯一解",
    "zh-hk": "唯一解",
  },
  none: {
    en: "no solution",
    "zh-cn": "无解",
    "zh-hk": "無解",
  },
  infinite: {
    en: "infinitely many",
    "zh-cn": "无限多解",
    "zh-hk": "無限多解",
  },
  point: {
    en: "intersection point",
    "zh-cn": "交点",
    "zh-hk": "交點",
  },
  parallel: {
    en: "parallel distinct lines",
    "zh-cn": "平行而不同的直线",
    "zh-hk": "平行而不同的直線",
  },
  same: {
    en: "same line",
    "zh-cn": "同一条直线",
    "zh-hk": "同一條直線",
  },
} as const satisfies Record<string, LocalizedText>;

const matrixAnatomyLabels = {
  caption: {
    en: "Matrix anatomy: size, rows, columns, and one named entry",
    "zh-cn": "矩阵结构图：大小、行、列，以及一个指定元素",
    "zh-hk": "矩陣結構圖：大小、行、列，以及一個指定元素",
  },
  row: {
    en: "row 2",
    "zh-cn": "第 2 行",
    "zh-hk": "第 2 行",
  },
  column: {
    en: "column 3",
    "zh-cn": "第 3 列",
    "zh-hk": "第 3 列",
  },
  entry: {
    en: "entry a_23 = 4",
    "zh-cn": "元素 a_23 = 4",
    "zh-hk": "元素 a_23 = 4",
  },
  size: {
    en: "2 rows by 3 columns, so the size is 2 x 3",
    "zh-cn": "2 行、3 列，所以大小是 2 x 3",
    "zh-hk": "2 行、3 列，所以大小是 2 x 3",
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

export function TextbookInlineRichText({ text }: { text: string }) {
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

export function LinearSystemGeometryFigure({ locale }: { locale: Locale }) {
  const panels = [
    {
      id: "unique",
      label: getLocalizedText(linearSystemFigureLabels.unique, locale),
      detail: getLocalizedText(linearSystemFigureLabels.point, locale),
      lines: (
        <>
          <line className="stroke-cyan-500" x1="22" x2="138" y1="112" y2="32" />
          <line className="stroke-emerald-500" x1="22" x2="138" y1="36" y2="114" />
          <circle className="fill-foreground" cx="80" cy="72" r="4" />
        </>
      ),
    },
    {
      id: "none",
      label: getLocalizedText(linearSystemFigureLabels.none, locale),
      detail: getLocalizedText(linearSystemFigureLabels.parallel, locale),
      lines: (
        <>
          <line className="stroke-cyan-500" x1="24" x2="138" y1="96" y2="42" />
          <line className="stroke-emerald-500" x1="18" x2="132" y1="120" y2="66" />
        </>
      ),
    },
    {
      id: "infinite",
      label: getLocalizedText(linearSystemFigureLabels.infinite, locale),
      detail: getLocalizedText(linearSystemFigureLabels.same, locale),
      lines: (
        <>
          <line className="stroke-cyan-500" x1="20" x2="140" y1="112" y2="38" />
          <line className="stroke-emerald-500" strokeDasharray="6 6" x1="20" x2="140" y1="112" y2="38" />
        </>
      ),
    },
  ];

  return (
    <GlassPanel className="my-6 border border-border/70 p-4">
      <figure>
        <figcaption className="mb-4 text-sm font-medium text-muted-foreground">
          {getLocalizedText(linearSystemFigureLabels.caption, locale)}
        </figcaption>
        <div className="grid gap-3 md:grid-cols-3">
          {panels.map((panel) => (
            <div
              className="rounded-lg border border-border/60 bg-background/45 p-3"
              key={panel.id}
            >
              <svg
                aria-hidden="true"
                className="h-36 w-full overflow-visible"
                viewBox="0 0 160 140"
              >
                <line className="stroke-muted-foreground/30" x1="16" x2="146" y1="120" y2="120" />
                <line className="stroke-muted-foreground/30" x1="28" x2="28" y1="16" y2="126" />
                <g className="stroke-2" strokeLinecap="round">
                  {panel.lines}
                </g>
              </svg>
              <p className="text-sm font-semibold">{panel.label}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{panel.detail}</p>
            </div>
          ))}
        </div>
      </figure>
    </GlassPanel>
  );
}

export function MatrixAnatomyFigure({ locale }: { locale: Locale }) {
  const entries = [
    [1, 2, 0],
    [3, -1, 4],
  ];

  return (
    <GlassPanel className="my-6 border border-border/70 p-4">
      <figure>
        <figcaption className="mb-4 text-sm font-medium text-muted-foreground">
          {getLocalizedText(matrixAnatomyLabels.caption, locale)}
        </figcaption>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.75fr)]">
          <svg
            aria-label={getLocalizedText(matrixAnatomyLabels.caption, locale)}
            className="h-auto w-full"
            role="img"
            viewBox="0 0 520 260"
          >
            <rect className="fill-background stroke-border" height="224" rx="14" width="482" x="18" y="18" />
            {entries.map((row, rowIndex) =>
              row.map((value, columnIndex) => {
                const x = 92 + columnIndex * 86;
                const y = 68 + rowIndex * 70;
                const isFocus = rowIndex === 1 && columnIndex === 2;

                return (
                  <g key={`${rowIndex}-${columnIndex}`}>
                    <rect
                      className={cn(
                        "stroke-border",
                        rowIndex === 1 || columnIndex === 2
                          ? "fill-primary/10"
                          : "fill-card/70",
                        isFocus && "fill-emerald-500/20 stroke-emerald-500"
                      )}
                      height="54"
                      rx="8"
                      width="70"
                      x={x}
                      y={y}
                    />
                    <text
                      className="fill-foreground font-mono text-lg"
                      textAnchor="middle"
                      x={x + 35}
                      y={y + 34}
                    >
                      {value}
                    </text>
                  </g>
                );
              })
            )}
            <path className="fill-none stroke-muted-foreground" d="M78 54 C58 72 58 168 78 188" strokeWidth="3" />
            <path className="fill-none stroke-muted-foreground" d="M366 54 C386 72 386 168 366 188" strokeWidth="3" />
            <path className="stroke-cyan-500" d="M58 166 H394" strokeDasharray="7 7" strokeWidth="3" />
            <path className="stroke-emerald-500" d="M299 46 V206" strokeDasharray="7 7" strokeWidth="3" />
            <text className="fill-cyan-700 text-sm font-semibold dark:fill-cyan-300" x="40" y="154">
              {getLocalizedText(matrixAnatomyLabels.row, locale)}
            </text>
            <text className="fill-emerald-700 text-sm font-semibold dark:fill-emerald-300" x="328" y="42">
              {getLocalizedText(matrixAnatomyLabels.column, locale)}
            </text>
            <line className="stroke-emerald-500" strokeWidth="2" x1="322" x2="405" y1="166" y2="214" />
            <text className="fill-foreground text-sm font-semibold" x="330" y="232">
              {getLocalizedText(matrixAnatomyLabels.entry, locale)}
            </text>
          </svg>
          <div className="rounded-lg border border-border/60 bg-background/40 p-4 text-sm leading-7">
            <p className="font-semibold">{getLocalizedText(matrixAnatomyLabels.size, locale)}</p>
            <p className="mt-3 text-muted-foreground">
              {locale === "en"
                ? "The first subscript chooses the row. The second subscript chooses the column."
                : locale === "zh-hk"
                  ? "第一個下標選行，第二個下標選列。"
                  : "第一个下标选行，第二个下标选列。"}
            </p>
          </div>
        </div>
      </figure>
    </GlassPanel>
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
              <TextbookInlineRichText text={title} />
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
              <TextbookInlineRichText text={title} />
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
