"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Braces, ChartColumnBig, ListChecks, Sigma, StepForward } from "lucide-react";
import { GlassPanel } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInteractiveSnapshot } from "@/lib/textbook/interactive-snapshots";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import type { Locale, LocalizedText } from "@/lib/textbook/types";
import { cn } from "@/lib/utils";

function text(
  en: string,
  zhHk: string,
  zhCn: string
): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

const interactiveLabels = {
  equations: text("System", "方程組", "方程组"),
  focus: text("What to notice", "要留意甚麼", "要留意什么"),
  next: text("Next step", "下一步", "下一步"),
  operation: text("Row operation", "行變換", "行变换"),
  previous: text("Previous step", "上一步", "上一步"),
  readSolution: text("Read the solution", "讀出解", "读出解"),
  reset: text("Reset", "重設", "重置"),
  claim: text("Claim", "命題", "命题"),
  baseCase: text("Base case", "基本情況", "基本情况"),
  inductionHypothesis: text("Induction hypothesis", "歸納假設", "归纳假设"),
  inductionStep: text("Induction step", "歸納步驟", "归纳步骤"),
  conclusion: text("Conclusion", "結論", "结论"),
  selectCase: text("Select a case", "選擇案例", "选择案例"),
  setA: text("Set A", "集合 A", "集合 A"),
  setB: text("Set B", "集合 B", "集合 B"),
  union: text("Union", "聯集", "并集"),
  intersection: text("Intersection", "交集", "交集"),
  difference: text("Difference A \\ B", "差集 A \\ B", "差集 A \\ B"),
  highlightCell: text("Inspect output cell", "查看輸出位置", "查看输出位置"),
  example: text("Example", "例子", "例子"),
  result: text("Result", "結果", "结果"),
  why: text("Why it works", "為甚麼成立", "为什么成立"),
  verdict: text("Verdict", "判斷", "判断"),
  relation: text("Key relation", "關鍵關係", "关键关系"),
} as const;

function MatrixView({
  data,
  highlightCell,
}: {
  data: ReadonlyArray<ReadonlyArray<number>>;
  highlightCell?: [number, number];
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-xl border border-border/60 bg-background/20">
      <table className="border-collapse">
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((value, cellIndex) => {
                const isHighlighted =
                  highlightCell?.[0] === rowIndex && highlightCell?.[1] === cellIndex;

                return (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className={cn(
                      "min-w-12 border border-border/60 px-3 py-2 text-center font-mono text-sm",
                      isHighlighted && "bg-primary/15 text-foreground"
                    )}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InteractiveShell({
  children,
  icon,
  locale,
  widgetId,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  locale: Locale;
  widgetId: string;
}) {
  const snapshot = getInteractiveSnapshot(widgetId, locale);

  return (
    <GlassPanel className="my-6 border border-primary/15 bg-card/80 p-4 md:p-5">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {getLocalizedText(uiText.interactiveMoment, locale)}
          </p>
          <h3 className="mt-2 text-lg font-semibold">
            {snapshot?.title ?? widgetId}
          </h3>
          {snapshot ? (
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {snapshot.summary}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </GlassPanel>
  );
}

function TruthTableBuilder({ locale }: { locale: Locale }) {
  const formulaOptions = [
    { formula: "P → Q", key: "implication" },
    { formula: "P ↔ Q", key: "biconditional" },
    { formula: "¬P ∨ Q", key: "rewrite" },
  ] as const;
  const [selected, setSelected] = useState<(typeof formulaOptions)[number]["key"]>("implication");

  const rows = [
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ];

  const computeValue = (p: boolean, q: boolean) => {
    if (selected === "implication") {
      return !p || q;
    }

    if (selected === "biconditional") {
      return p === q;
    }

    return !p || q;
  };

  return (
    <InteractiveShell icon={<ListChecks className="h-5 w-5" />} locale={locale} widgetId="truth-table-builder">
      <div className="flex flex-wrap gap-2">
        {formulaOptions.map((option) => (
          <Button
            key={option.key}
            onClick={() => setSelected(option.key)}
            size="sm"
            type="button"
            variant={selected === option.key ? "default" : "outline"}
          >
            {option.formula}
          </Button>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="border-b border-border/60 px-3 py-2">P</th>
              <th className="border-b border-border/60 px-3 py-2">Q</th>
              <th className="border-b border-border/60 px-3 py-2">
                {formulaOptions.find((option) => option.key === selected)?.formula}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([p, q], index) => (
              <tr key={`${p}-${q}-${index}`}>
                <td className="border-b border-border/60 px-3 py-2 font-mono">{p ? "T" : "F"}</td>
                <td className="border-b border-border/60 px-3 py-2 font-mono">{q ? "T" : "F"}</td>
                <td className="border-b border-border/60 px-3 py-2 font-mono">
                  {computeValue(p, q) ? "T" : "F"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InteractiveShell>
  );
}

function QuantifierNegationStepper({ locale }: { locale: Locale }) {
  const cases = [
    {
      negated: text(
        "There exists a real number x such that x^2 < 0.",
        "存在一個實數 x，使得 x^2 < 0。",
        "存在一个实数 x，使得 x^2 < 0。"
      ),
      original: text(
        "For every real number x, x^2 >= 0.",
        "對每個實數 x，都有 x^2 >= 0。",
        "对每个实数 x，都有 x^2 >= 0。"
      ),
      steps: [
        text("Start with the outer quantifier: “for every x.”", "先從外層量詞開始：「對每個 x」。", "先从外层量词开始：“对每个 x”。"),
        text("Switch “for every” to “there exists.”", "把「對每個」換成「存在」。", "把“对每个”换成“存在”。"),
        text("Negate the inside claim x^2 >= 0 to x^2 < 0.", "把內部命題 x^2 >= 0 否定成 x^2 < 0。", "把内部命题 x^2 >= 0 否定成 x^2 < 0。"),
      ],
    },
    {
      negated: text(
        "For every integer n, n is not even or n is not divisible by 3.",
        "對每個整數 n，n 不是偶數，或 n 不可被 3 整除。",
        "对每个整数 n，n 不是偶数，或 n 不可被 3 整除。"
      ),
      original: text(
        "There exists an integer n such that n is even and divisible by 3.",
        "存在一個整數 n，使得 n 同時是偶數並可被 3 整除。",
        "存在一个整数 n，使得 n 同时是偶数并可被 3 整除。"
      ),
      steps: [
        text("Start with the outer quantifier: “there exists n.”", "先由外層量詞開始：「存在 n」。", "先由外层量词开始：“存在 n”。"),
        text("Switch “there exists” to “for every.”", "把「存在」換成「對每個」。", "把“存在”换成“对每个”。"),
        text("Negate the inside conjunction with De Morgan’s law.", "用德摩根律否定內部的合取。", "用德摩根律否定内部的合取。"),
      ],
    },
  ] as const;
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(1);
  const current = cases[selected];

  return (
    <InteractiveShell icon={<StepForward className="h-5 w-5" />} locale={locale} widgetId="quantifier-negation-stepper">
      <div className="flex flex-wrap gap-2">
        {cases.map((_, index) => (
          <Button
            key={`case-${index}`}
            onClick={() => {
              setSelected(index);
              setStep(1);
            }}
            size="sm"
            type="button"
            variant={selected === index ? "default" : "outline"}
          >
            {getLocalizedText(interactiveLabels.example, locale)} {index + 1}
          </Button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        <GlassPanel className="bg-card/50">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {getLocalizedText(interactiveLabels.example, locale)}
          </p>
          <p className="mt-2 text-sm leading-7">{getLocalizedText(current.original, locale)}</p>
        </GlassPanel>
        <ol className="space-y-2 text-sm leading-7">
          {current.steps.slice(0, step).map((item, index) => (
            <li key={`step-${index}`} className="rounded-xl border border-border/60 bg-background/20 px-4 py-3">
              {index + 1}. {getLocalizedText(item, locale)}
            </li>
          ))}
        </ol>
        {step === current.steps.length ? (
          <GlassPanel className="border border-emerald-400/40">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.result, locale)}
            </p>
            <p className="mt-2 text-sm leading-7">{getLocalizedText(current.negated, locale)}</p>
          </GlassPanel>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setStep((value) => Math.max(1, value - 1))}
            size="sm"
            type="button"
            variant="outline"
          >
            {getLocalizedText(interactiveLabels.previous, locale)}
          </Button>
          <Button
            onClick={() => setStep((value) => Math.min(current.steps.length, value + 1))}
            size="sm"
            type="button"
          >
            {getLocalizedText(interactiveLabels.next, locale)}
          </Button>
        </div>
      </div>
    </InteractiveShell>
  );
}

function InductionStepper({ locale }: { locale: Locale }) {
  const stages = [
    {
      body: text(
        "Claim: for every natural number n, 0 + n = n.",
        "命題：對每個自然數 n，都有 0 + n = n。",
        "命题：对每个自然数 n，都有 0 + n = n。"
      ),
      title: getLocalizedText(interactiveLabels.claim, locale),
    },
    {
      body: text(
        "Base case: when n = 0, the recursive rule gives 0 + 0 = 0.",
        "基本情況：當 n = 0 時，遞歸規則給出 0 + 0 = 0。",
        "基本情况：当 n = 0 时，递归规则给出 0 + 0 = 0。"
      ),
      title: getLocalizedText(interactiveLabels.baseCase, locale),
    },
    {
      body: text(
        "Induction hypothesis: assume 0 + n = n for a fixed n.",
        "歸納假設：假設對某個固定的 n，有 0 + n = n。",
        "归纳假设：假设对某个固定的 n，有 0 + n = n。"
      ),
      title: getLocalizedText(interactiveLabels.inductionHypothesis, locale),
    },
    {
      body: text(
        "Induction step: 0 + S(n) = S(0 + n) = S(n).",
        "歸納步驟：0 + S(n) = S(0 + n) = S(n)。",
        "归纳步骤：0 + S(n) = S(0 + n) = S(n)。"
      ),
      title: getLocalizedText(interactiveLabels.inductionStep, locale),
    },
    {
      body: text(
        "Conclusion: the claim holds for all natural numbers.",
        "結論：命題對所有自然數都成立。",
        "结论：命题对所有自然数都成立。"
      ),
      title: getLocalizedText(interactiveLabels.conclusion, locale),
    },
  ] as const;
  const [step, setStep] = useState(0);

  return (
    <InteractiveShell icon={<StepForward className="h-5 w-5" />} locale={locale} widgetId="induction-stepper">
      <div className="grid gap-4">
        <GlassPanel className="bg-card/50">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {stages[step].title}
          </p>
          <p className="mt-2 text-sm leading-7">
            {getLocalizedText(stages[step].body, locale)}
          </p>
        </GlassPanel>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setStep((value) => Math.max(0, value - 1))}
            size="sm"
            type="button"
            variant="outline"
          >
            {getLocalizedText(interactiveLabels.previous, locale)}
          </Button>
          <Button
            onClick={() => setStep((value) => Math.min(stages.length - 1, value + 1))}
            size="sm"
            type="button"
          >
            {getLocalizedText(interactiveLabels.next, locale)}
          </Button>
          <Button
            onClick={() => setStep(0)}
            size="sm"
            type="button"
            variant="outline"
          >
            {getLocalizedText(interactiveLabels.reset, locale)}
          </Button>
        </div>
      </div>
    </InteractiveShell>
  );
}

function SubspaceChecker({ locale }: { locale: Locale }) {
  const cases = [
    {
      checks: [
        {
          label: text("Contains 0", "包含 0", "包含 0"),
          note: text(
            "(0, 0) satisfies y = 2x.",
            "(0, 0) 滿足 y = 2x。",
            "(0, 0) 满足 y = 2x。"
          ),
          passes: true,
        },
        {
          label: text("Closed under addition", "對加法封閉", "对加法封闭"),
          note: text(
            "Adding two points on the line keeps you on the same line.",
            "把直線上的兩點相加，仍會留在同一條直線上。",
            "把直线上的两点相加，仍会留在同一条直线上。"
          ),
          passes: true,
        },
        {
          label: text("Closed under scalar multiplication", "對數乘封閉", "对数乘封闭"),
          note: text(
            "Scaling a point on the line still gives y = 2x.",
            "把直線上的點做數乘，仍會滿足 y = 2x。",
            "把直线上的点做数乘，仍会满足 y = 2x。"
          ),
          passes: true,
        },
      ],
      label: text("Line y = 2x", "直線 y = 2x", "直线 y = 2x"),
      verdict: text(
        "This set passes the full subspace test.",
        "這個集合通過完整的子空間測試。",
        "这个集合通过完整的子空间测试。"
      ),
    },
    {
      checks: [
        {
          label: text("Contains 0", "包含 0", "包含 0"),
          note: text(
            "(0, 0) does not satisfy y = 2x + 1.",
            "(0, 0) 不滿足 y = 2x + 1。",
            "(0, 0) 不满足 y = 2x + 1。"
          ),
          passes: false,
        },
        {
          label: text("Closed under addition", "對加法封閉", "对加法封闭"),
          note: text(
            "Even if you test addition, the missing zero vector already blocks subspace status.",
            "就算你再檢查加法，缺少零向量已經足以否定它是子空間。",
            "就算你再检查加法，缺少零向量已经足以否定它是子空间。"
          ),
          passes: false,
        },
        {
          label: text("Closed under scalar multiplication", "對數乘封閉", "对数乘封闭"),
          note: text(
            "Multiplying by 0 would send points to (0, 0), which is outside the set.",
            "若乘上 0，點會被送到 (0, 0)，但它不在集合內。",
            "若乘上 0，点会被送到 (0, 0)，但它不在集合内。"
          ),
          passes: false,
        },
      ],
      label: text("Line y = 2x + 1", "直線 y = 2x + 1", "直线 y = 2x + 1"),
      verdict: text(
        "This set fails immediately because it misses the zero vector.",
        "這個集合一開始就失敗，因為它缺少零向量。",
        "这个集合一开始就失败，因为它缺少零向量。"
      ),
    },
    {
      checks: [
        {
          label: text("Contains 0", "包含 0", "包含 0"),
          note: text(
            "(0, 0, 0) lies in the plane z = 0.",
            "(0, 0, 0) 在平面 z = 0 上。",
            "(0, 0, 0) 在平面 z = 0 上。"
          ),
          passes: true,
        },
        {
          label: text("Closed under addition", "對加法封閉", "对加法封闭"),
          note: text(
            "If both third coordinates are 0, their sum still has third coordinate 0.",
            "若兩個向量的第三座標都是 0，相加後第三座標仍是 0。",
            "若两个向量的第三坐标都是 0，相加后第三坐标仍是 0。"
          ),
          passes: true,
        },
        {
          label: text("Closed under scalar multiplication", "對數乘封閉", "对数乘封闭"),
          note: text(
            "Scaling preserves the third coordinate 0.",
            "數乘會保留第三座標為 0。",
            "数乘会保留第三坐标为 0。"
          ),
          passes: true,
        },
      ],
      label: text("Plane z = 0", "平面 z = 0", "平面 z = 0"),
      verdict: text(
        "This is a standard subspace of R^3.",
        "這是 R^3 的標準子空間。",
        "这是 R^3 的标准子空间。"
      ),
    },
    {
      checks: [
        {
          label: text("Contains 0", "包含 0", "包含 0"),
          note: text(
            "(0, 0) is not on the unit circle.",
            "(0, 0) 不在單位圓上。",
            "(0, 0) 不在单位圆上。"
          ),
          passes: false,
        },
        {
          label: text("Closed under addition", "對加法封閉", "对加法封闭"),
          note: text(
            "Adding two unit vectors usually changes the length.",
            "把兩個單位向量相加，長度通常會改變。",
            "把两个单位向量相加，长度通常会改变。"
          ),
          passes: false,
        },
        {
          label: text("Closed under scalar multiplication", "對數乘封閉", "对数乘封闭"),
          note: text(
            "Multiplying by 2 sends a unit vector outside the circle.",
            "乘上 2 會把單位向量送到圓外。",
            "乘上 2 会把单位向量送到圆外。"
          ),
          passes: false,
        },
      ],
      label: text("Unit circle", "單位圓", "单位圆"),
      verdict: text(
        "This set is geometric, but it is not a subspace.",
        "這個集合有幾何意義，但不是子空間。",
        "这个集合有几何意义，但不是子空间。"
      ),
    },
  ] as const;
  const [selected, setSelected] = useState(0);
  const current = cases[selected];

  return (
    <InteractiveShell icon={<Braces className="h-5 w-5" />} locale={locale} widgetId="subspace-checker">
      <div className="flex flex-wrap gap-2">
        {cases.map((item, index) => (
          <Button
            key={item.label.en}
            onClick={() => setSelected(index)}
            size="sm"
            type="button"
            variant={selected === index ? "default" : "outline"}
          >
            {getLocalizedText(item.label, locale)}
          </Button>
        ))}
      </div>
      <GlassPanel className="mt-4 bg-card/50">
        <p className="text-sm leading-7 text-muted-foreground">
          {getLocalizedText(current.verdict, locale)}
        </p>
      </GlassPanel>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {current.checks.map((check) => (
          <GlassPanel key={check.label.en} className="bg-card/50">
            <p className="text-sm font-semibold">{getLocalizedText(check.label, locale)}</p>
            <p className="mt-2 text-sm font-medium">
              {check.passes
                ? getLocalizedText(text("Passes", "通過", "通过"), locale)
                : getLocalizedText(text("Fails", "失敗", "失败"), locale)}
            </p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {getLocalizedText(check.note, locale)}
            </p>
          </GlassPanel>
        ))}
      </div>
    </InteractiveShell>
  );
}

function SpanExplorer({ locale }: { locale: Locale }) {
  const cases = [
    {
      label: text("Standard basis in R^2", "R^2 的標準基底", "R^2 的标准基底"),
      note: text(
        "Every output vector is built from the horizontal and vertical directions.",
        "每個輸出向量都是由水平與垂直方向組合而成。",
        "每个输出向量都是由水平与垂直方向组合而成。"
      ),
      u: [1, 0] as const,
      v: [0, 1] as const,
    },
    {
      label: text("Two diagonal generators", "兩條對角生成向量", "两条对角生成向量"),
      note: text(
        "These two vectors still span all of R^2 because they point in different directions.",
        "這兩個向量仍會張成整個 R^2，因為它們指向不同方向。",
        "这两个向量仍会张成整个 R^2，因为它们指向不同方向。"
      ),
      u: [1, 1] as const,
      v: [1, -1] as const,
    },
  ] as const;
  const [selected, setSelected] = useState(0);
  const [alpha, setAlpha] = useState(1);
  const [beta, setBeta] = useState(0);
  const current = cases[selected];
  const result = [
    alpha * current.u[0] + beta * current.v[0],
    alpha * current.u[1] + beta * current.v[1],
  ];

  return (
    <InteractiveShell icon={<ArrowLeftRight className="h-5 w-5" />} locale={locale} widgetId="span-explorer">
      <div className="flex flex-wrap gap-2">
        {cases.map((item, index) => (
          <Button
            key={item.label.en}
            onClick={() => setSelected(index)}
            size="sm"
            type="button"
            variant={selected === index ? "default" : "outline"}
          >
            {getLocalizedText(item.label, locale)}
          </Button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">u</p>
          <p className="mt-2 font-mono text-sm">{`(${current.u[0]}, ${current.u[1]})`}</p>
          <p className="mt-4 text-sm font-semibold">v</p>
          <p className="mt-2 font-mono text-sm">{`(${current.v[0]}, ${current.v[1]})`}</p>
        </GlassPanel>
        <GlassPanel className="bg-card/50">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold">α</p>
              <Input
                className="mt-2 font-mono"
                inputMode="numeric"
                onChange={(event) => setAlpha(Number(event.target.value || "0"))}
                type="number"
                value={alpha}
              />
            </div>
            <div>
              <p className="text-sm font-semibold">β</p>
              <Input
                className="mt-2 font-mono"
                inputMode="numeric"
                onChange={(event) => setBeta(Number(event.target.value || "0"))}
                type="number"
                value={beta}
              />
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(interactiveLabels.result, locale)}</p>
          <p className="mt-2 font-mono text-sm">{`αu + βv = (${result[0]}, ${result[1]})`}</p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {getLocalizedText(current.note, locale)}
          </p>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

function IndependenceChecker({ locale }: { locale: Locale }) {
  const cases = [
    {
      explanation: text(
        "The only way to solve c1e1 + c2e2 = 0 is c1 = c2 = 0, so this pair is linearly independent.",
        "解 c1e1 + c2e2 = 0 時，只會得到 c1 = c2 = 0，所以這一對向量線性無關。",
        "解 c1e1 + c2e2 = 0 时，只会得到 c1 = c2 = 0，所以这一对向量线性无关。"
      ),
      label: text("{e1, e2}", "{e1, e2}", "{e1, e2}"),
      relation: text(
        "No nontrivial linear relation appears.",
        "看不見任何非平凡線性關係。",
        "看不见任何非平凡线性关系。"
      ),
      verdict: text("Independent", "線性無關", "线性无关"),
    },
    {
      explanation: text(
        "One vector is already the sum of the other two, so the set contains redundancy.",
        "其中一個向量本身就是另外兩個的和，所以這組向量含有冗餘。",
        "其中一个向量本身就是另外两个的和，所以这组向量含有冗余。"
      ),
      label: text("{u1, u2, u1 + u2}", "{u1, u2, u1 + u2}", "{u1, u2, u1 + u2}"),
      relation: text(
        "u1 + u2 - (u1 + u2) = 0",
        "u1 + u2 - (u1 + u2) = 0",
        "u1 + u2 - (u1 + u2) = 0"
      ),
      verdict: text("Dependent", "線性相依", "线性相依"),
    },
    {
      explanation: text(
        "The second vector is a scalar multiple of the first, so one direction is repeated.",
        "第二個向量是第一個向量的倍數，所以同一個方向被重覆計數。",
        "第二个向量是第一个向量的倍数，所以同一个方向被重复计数。"
      ),
      label: text("{u, 2u}", "{u, 2u}", "{u, 2u}"),
      relation: text(
        "2u - (2u) = 0, so one vector is a multiple of the other.",
        "2u - (2u) = 0，因此其中一個向量是另一個的倍數。",
        "2u - (2u) = 0，因此其中一个向量是另一个的倍数。"
      ),
      verdict: text("Dependent", "線性相依", "线性相依"),
    },
    {
      explanation: text(
        "Any set containing the zero vector is automatically dependent.",
        "任何包含零向量的集合都會自動線性相依。",
        "任何包含零向量的集合都会自动线性相依。"
      ),
      label: text("{0, u}", "{0, u}", "{0, u}"),
      relation: text(
        "1·0 + 0·u = 0 is already a nontrivial relation.",
        "1·0 + 0·u = 0 已經是一個非平凡關係。",
        "1·0 + 0·u = 0 已经是一个非平凡关系。"
      ),
      verdict: text("Dependent", "線性相依", "线性相依"),
    },
  ] as const;
  const [selected, setSelected] = useState(0);
  const current = cases[selected];

  return (
    <InteractiveShell icon={<ListChecks className="h-5 w-5" />} locale={locale} widgetId="independence-checker">
      <div className="flex flex-wrap gap-2">
        {cases.map((item, index) => (
          <Button
            key={item.label.en}
            onClick={() => setSelected(index)}
            size="sm"
            type="button"
            variant={selected === index ? "default" : "outline"}
          >
            {getLocalizedText(item.label, locale)}
          </Button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(interactiveLabels.verdict, locale)}</p>
          <p className="mt-2 text-sm">{getLocalizedText(current.verdict, locale)}</p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {getLocalizedText(current.explanation, locale)}
          </p>
        </GlassPanel>
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(interactiveLabels.relation, locale)}</p>
          <p className="mt-2 font-mono text-sm">{getLocalizedText(current.relation, locale)}</p>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

function SetOperationExplorer({ locale }: { locale: Locale }) {
  const universe = [1, 2, 3, 4, 5];
  const [setA, setSetA] = useState<number[]>([1, 2, 4]);
  const [setB, setSetB] = useState<number[]>([2, 3, 4]);

  const toggle = (
    value: number,
    current: number[],
    setter: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    setter((items) =>
      items.includes(value)
        ? items.filter((item) => item !== value)
        : [...items, value].sort((left, right) => left - right)
    );
  };

  const union = universe.filter((value) => setA.includes(value) || setB.includes(value));
  const intersection = universe.filter((value) => setA.includes(value) && setB.includes(value));
  const difference = universe.filter((value) => setA.includes(value) && !setB.includes(value));

  return (
    <InteractiveShell icon={<Braces className="h-5 w-5" />} locale={locale} widgetId="set-operation-explorer">
      <div className="grid gap-4 md:grid-cols-2">
        {[{
          current: setA,
          label: getLocalizedText(interactiveLabels.setA, locale),
          setter: setSetA,
        }, {
          current: setB,
          label: getLocalizedText(interactiveLabels.setB, locale),
          setter: setSetB,
        }].map((group) => (
          <GlassPanel key={group.label} className="bg-card/50">
            <p className="text-sm font-semibold">{group.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {universe.map((value) => (
                <Button
                  key={`${group.label}-${value}`}
                  onClick={() => toggle(value, group.current, group.setter)}
                  size="sm"
                  type="button"
                  variant={group.current.includes(value) ? "default" : "outline"}
                >
                  {value}
                </Button>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[
          {
            label: getLocalizedText(interactiveLabels.union, locale),
            values: union,
          },
          {
            label: getLocalizedText(interactiveLabels.intersection, locale),
            values: intersection,
          },
          {
            label: getLocalizedText(interactiveLabels.difference, locale),
            values: difference,
          },
        ].map((result) => (
          <GlassPanel key={result.label} className="bg-card/50">
            <p className="text-sm font-semibold">{result.label}</p>
            <p className="mt-3 font-mono text-sm">
              {`{${result.values.join(", ")}}`}
            </p>
          </GlassPanel>
        ))}
      </div>
    </InteractiveShell>
  );
}

function SystemAugmentedMatrixExplorer({ locale }: { locale: Locale }) {
  const systems = [
    {
      equations: ["x + 2y = 5", "3x - y = 4"],
      matrix: [[1, 2, 5], [3, -1, 4]],
    },
    {
      equations: ["x - y + z = 2", "2x + y - z = 1", "y + z = 3"],
      matrix: [[1, -1, 1, 2], [2, 1, -1, 1], [0, 1, 1, 3]],
    },
  ];
  const [selected, setSelected] = useState(0);
  const current = systems[selected];

  return (
    <InteractiveShell icon={<ArrowLeftRight className="h-5 w-5" />} locale={locale} widgetId="system-augmented-matrix-explorer">
      <div className="flex flex-wrap gap-2">
        {systems.map((_, index) => (
          <Button
            key={`system-${index}`}
            onClick={() => setSelected(index)}
            size="sm"
            type="button"
            variant={selected === index ? "default" : "outline"}
          >
            {getLocalizedText(interactiveLabels.example, locale)} {index + 1}
          </Button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">
            {getLocalizedText(interactiveLabels.equations, locale)}
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-7">
            {current.equations.map((equation) => (
              <li key={equation}>{equation}</li>
            ))}
          </ol>
        </GlassPanel>
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(interactiveLabels.result, locale)}</p>
          <div className="mt-3 overflow-x-auto">
            <MatrixView
              data={current.matrix}
            />
          </div>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

const rowReductionSteps = [
  {
    explanation: text(
      "Start with the augmented matrix. The first pivot should help us clear the entries underneath it.",
      "先由增廣矩陣開始。第一個主元的工作，是幫我們把它下面的元素清掉。",
      "先由增广矩阵开始。第一个主元的工作，是帮我们把它下面的元素清掉。"
    ),
    focus: text(
      "Column 1 already has a convenient pivot 1 in the first row, so we do not need a row swap.",
      "第 1 列的第一行已經有方便的主元 1，所以暫時不用換行。",
      "第 1 列的第一行已经有方便的主元 1，所以暂时不用换行。"
    ),
    highlightCell: [0, 0] as [number, number],
    matrix: [
      [1, 2, 2, 4],
      [1, 3, 3, 5],
      [2, 6, 5, 6],
    ],
    operation: text("Choose the first pivot in column 1.", "先在第 1 列選主元。", "先在第 1 列选主元。"),
  },
  {
    explanation: text(
      "Clear everything below the first pivot so the first column starts to look like echelon form.",
      "把第一個主元下面的元素全部清掉，令第一列開始有階梯形的樣子。",
      "把第一个主元下面的元素全部清掉，让第一列开始有阶梯形的样子。"
    ),
    focus: text(
      "After this step, column 1 has the shape we want: one pivot on top and zeros below it.",
      "做完後，第 1 列便有我們想要的形狀：上面一個主元，下面全是 0。",
      "做完后，第 1 列便有我们想要的形状：上面一个主元，下面全是 0。"
    ),
    highlightCell: [1, 1] as [number, number],
    matrix: [
      [1, 2, 2, 4],
      [0, 1, 1, 1],
      [0, 2, 1, -2],
    ],
    operation: text(
      "Apply R2 ← R2 − R1 and R3 ← R3 − 2R1.",
      "做 R2 ← R2 − R1，再做 R3 ← R3 − 2R1。",
      "做 R2 ← R2 − R1，再做 R3 ← R3 − 2R1。"
    ),
  },
  {
    explanation: text(
      "Move to the smaller submatrix on the bottom right and repeat the same idea in column 2.",
      "把視線移到右下角較小的子矩陣，然後在第 2 列重複同樣想法。",
      "把视线移到右下角较小的子矩阵，然后在第 2 列重复同样想法。"
    ),
    focus: text(
      "The second row now gives the next pivot. Once the 2 underneath disappears, the triangular structure is visible.",
      "第二行現在提供下一個主元。下面那個 2 消失後，三角形結構就清楚了。",
      "第二行现在提供下一个主元。下面那个 2 消失后，三角形结构就清楚了。"
    ),
    highlightCell: [2, 2] as [number, number],
    matrix: [
      [1, 2, 2, 4],
      [0, 1, 1, 1],
      [0, 0, -1, -4],
    ],
    operation: text("Apply R3 ← R3 − 2R2.", "做 R3 ← R3 − 2R2。", "做 R3 ← R3 − 2R2。"),
  },
  {
    explanation: text(
      "Turn the last pivot into a 1, then clear the entries above it so column 3 becomes a pivot column of an RREF matrix.",
      "把最後一個主元變成 1，然後清掉它上面的元素，令第 3 列成為 RREF 的主元列。",
      "把最后一个主元变成 1，然后清掉它上面的元素，让第 3 列成为 RREF 的主元列。"
    ),
    focus: text(
      "This is the moment when Gaussian elimination becomes Gauss-Jordan elimination: we are clearing above a pivot, not only below it.",
      "這一步正是從 Gaussian elimination 走向 Gauss-Jordan elimination：現在要清的是主元上方，而不只是下方。",
      "这一步正是从 Gaussian elimination 走向 Gauss-Jordan elimination：现在要清的是主元上方，而不只是下方。"
    ),
    highlightCell: [2, 2] as [number, number],
    matrix: [
      [1, 2, 0, -4],
      [0, 1, 0, -3],
      [0, 0, 1, 4],
    ],
    operation: text(
      "Apply R3 ← −R3, then R1 ← R1 − 2R3 and R2 ← R2 − R3.",
      "先做 R3 ← −R3，再做 R1 ← R1 − 2R3 及 R2 ← R2 − R3。",
      "先做 R3 ← −R3，再做 R1 ← R1 − 2R3 及 R2 ← R2 − R3。"
    ),
  },
  {
    explanation: text(
      "Clear the last entry above the second pivot. Now every pivot column has one leading 1 and zeros everywhere else.",
      "把第二個主元上方最後一個元素也清掉。此時每個主元列都有一個 leading 1，而其他位置全是 0。",
      "把第二个主元上方最后一个元素也清掉。此时每个主元列都有一个 leading 1，而其他位置全是 0。"
    ),
    focus: text(
      "The finished RREF is not just tidy. It lets you read x, y, and z directly from the last column.",
      "完成後的 RREF 不只是整齊，而是讓你可以直接從最後一列讀出 x、y、z。",
      "完成后的 RREF 不只是整齐，而是让你可以直接从最后一列读出 x、y、z。"
    ),
    highlightCell: [1, 1] as [number, number],
    matrix: [
      [1, 0, 0, 2],
      [0, 1, 0, -3],
      [0, 0, 1, 4],
    ],
    operation: text("Apply R1 ← R1 − 2R2.", "做 R1 ← R1 − 2R2。", "做 R1 ← R1 − 2R2。"),
    readout: text("x = 2, y = -3, z = 4.", "x = 2，y = -3，z = 4。", "x = 2，y = -3，z = 4。"),
  },
];

function RowReductionStepper({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const current = rowReductionSteps[step];

  return (
    <InteractiveShell icon={<StepForward className="h-5 w-5" />} locale={locale} widgetId="row-reduction-stepper">
      <div className="flex flex-wrap gap-2">
        {rowReductionSteps.map((_, index) => (
          <Button
            key={`step-${index}`}
            onClick={() => setStep(index)}
            size="sm"
            type="button"
            variant={step === index ? "default" : "outline"}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div className="overflow-x-auto">
          <MatrixView data={current.matrix} highlightCell={current.highlightCell} />
        </div>
        <div className="space-y-3">
          <GlassPanel className="bg-card/50">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.operation, locale)}
            </p>
            <p className="mt-2 text-sm leading-7">
              {getLocalizedText(current.operation, locale)}
            </p>
          </GlassPanel>
          <GlassPanel className="bg-card/50">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.focus, locale)}
            </p>
            <p className="mt-2 text-sm leading-7">
              {getLocalizedText(current.focus, locale)}
            </p>
          </GlassPanel>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {getLocalizedText(current.explanation, locale)}
      </p>
      {current.readout ? (
        <GlassPanel className="mt-4 border border-emerald-400/35 bg-card/55">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {getLocalizedText(interactiveLabels.readSolution, locale)}
          </p>
          <p className="mt-2 text-sm leading-7">{getLocalizedText(current.readout, locale)}</p>
        </GlassPanel>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          size="sm"
          type="button"
          variant="outline"
        >
          {getLocalizedText(interactiveLabels.previous, locale)}
        </Button>
        <Button
          onClick={() => setStep((value) => Math.min(rowReductionSteps.length - 1, value + 1))}
          size="sm"
          type="button"
        >
          {getLocalizedText(interactiveLabels.next, locale)}
        </Button>
        <Button
          onClick={() => setStep(0)}
          size="sm"
          type="button"
          variant="ghost"
        >
          {getLocalizedText(interactiveLabels.reset, locale)}
        </Button>
      </div>
    </InteractiveShell>
  );
}

function MatrixMultiplicationVisualizer({ locale }: { locale: Locale }) {
  const [left, setLeft] = useState<number[][]>([
    [1, 2],
    [0, 1],
  ]);
  const [right, setRight] = useState<number[][]>([
    [2, 1],
    [3, 4],
  ]);
  const [cell, setCell] = useState<[number, number]>([0, 0]);

  const product = useMemo(
    () => [
      [
        left[0][0] * right[0][0] + left[0][1] * right[1][0],
        left[0][0] * right[0][1] + left[0][1] * right[1][1],
      ],
      [
        left[1][0] * right[0][0] + left[1][1] * right[1][0],
        left[1][0] * right[0][1] + left[1][1] * right[1][1],
      ],
    ],
    [left, right]
  );

  const explanation = `${product[cell[0]][cell[1]]} = ${left[cell[0]][0]}×${right[0][cell[1]]} + ${left[cell[0]][1]}×${right[1][cell[1]]}`;

  return (
    <InteractiveShell icon={<ChartColumnBig className="h-5 w-5" />} locale={locale} widgetId="matrix-multiplication-visualizer">
      <div className="grid gap-4 lg:grid-cols-3">
        {[left, right].map((matrix, matrixIndex) => (
          <GlassPanel key={`matrix-${matrixIndex}`} className="bg-card/50">
            <div className="grid gap-2">
              {matrix.map((row, rowIndex) => (
                <div key={`row-${matrixIndex}-${rowIndex}`} className="grid grid-cols-2 gap-2">
                  {row.map((value, cellIndex) => (
                    <Input
                      key={`input-${matrixIndex}-${rowIndex}-${cellIndex}`}
                      className="text-center font-mono"
                      inputMode="numeric"
                      onChange={(event) => {
                        const nextValue = Number(event.target.value || "0");
                        const setter = matrixIndex === 0 ? setLeft : setRight;
                        setter((previous) =>
                          previous.map((oldRow, oldRowIndex) =>
                            oldRowIndex === rowIndex
                              ? oldRow.map((oldCell, oldCellIndex) =>
                                  oldCellIndex === cellIndex ? nextValue : oldCell
                                )
                              : oldRow
                          )
                        );
                      }}
                      type="number"
                      value={value}
                    />
                  ))}
                </div>
              ))}
            </div>
          </GlassPanel>
        ))}
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(interactiveLabels.result, locale)}</p>
          <div className="mt-3">
            <MatrixView data={product} highlightCell={cell} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              [0, 0],
              [0, 1],
              [1, 0],
              [1, 1],
            ].map((value) => (
              <Button
                key={`cell-${value[0]}-${value[1]}`}
                onClick={() => setCell([value[0], value[1]])}
                size="sm"
                type="button"
                variant={cell[0] === value[0] && cell[1] === value[1] ? "default" : "outline"}
              >
                c{value[0] + 1}
                {value[1] + 1}
              </Button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {explanation}
          </p>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

function SolutionSetClassifier({ locale }: { locale: Locale }) {
  const cases = [
    {
      explanation: text(
        "Every variable is a pivot variable, so the system has one solution.",
        "每個變量都是主元變量，因此方程組有唯一解。",
        "每个变量都是主元变量，因此方程组有唯一解。"
      ),
      id: "unique",
      matrix: [[1, 0, 0, 2], [0, 1, 0, -1], [0, 0, 1, 3]],
      title: text("Unique solution", "唯一解", "唯一解"),
    },
    {
      explanation: text(
        "The third variable is free, so the solution set is infinite.",
        "第三個變量是自由變量，因此解集有無限多個元素。",
        "第三个变量是自由变量，因此解集有无限多个元素。"
      ),
      id: "infinite",
      matrix: [[1, 0, 2, 5], [0, 1, -1, 3], [0, 0, 0, 0]],
      title: text("Infinitely many solutions", "無限多解", "无限多解"),
    },
    {
      explanation: text(
        "The last row says 0 = 1, so the system is inconsistent.",
        "最後一行表示 0 = 1，因此方程組不相容。",
        "最后一行表示 0 = 1，因此方程组不相容。"
      ),
      id: "none",
      matrix: [[1, 0, -2, 1], [0, 1, 3, 4], [0, 0, 0, 1]],
      title: text("No solution", "無解", "无解"),
    },
  ] as const;
  const [selected, setSelected] = useState<(typeof cases)[number]["id"]>(
    cases[0].id
  );
  const current = cases.find((item) => item.id === selected) ?? cases[0];

  return (
    <InteractiveShell icon={<ListChecks className="h-5 w-5" />} locale={locale} widgetId="solution-set-classifier">
      <div className="flex flex-wrap gap-2">
        {cases.map((item) => (
          <Button
            key={item.id}
            onClick={() => setSelected(item.id)}
            size="sm"
            type="button"
            variant={selected === item.id ? "default" : "outline"}
          >
            {getLocalizedText(item.title, locale)}
          </Button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
        <MatrixView data={current.matrix} />
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(interactiveLabels.why, locale)}</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {getLocalizedText(current.explanation, locale)}
          </p>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

const invertibilitySteps = [
  {
    explanation: text(
      "Start from [A | I]. If A is invertible, row reduction will turn the left block into I.",
      "由 [A | I] 開始。若 A 可逆，行化簡會把左邊化成 I。",
      "由 [A | I] 开始。若 A 可逆，行化简会把左边化成 I。"
    ),
    matrix: [
      [1, 2, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 0],
      [2, 3, 4, 0, 0, 1],
    ],
  },
  {
    explanation: text(
      "Use R3 - 2R1 to clear the first column below the pivot.",
      "用 R3 - 2R1 消去第一列主元下方的元素。",
      "用 R3 - 2R1 消去第一列主元下方的元素。"
    ),
    matrix: [
      [1, 2, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 0],
      [0, -1, 2, -2, 0, 1],
    ],
  },
  {
    explanation: text(
      "Continue until the left block becomes the identity matrix.",
      "繼續化簡，直到左邊變成單位矩陣。",
      "继续化简，直到左边变成单位矩阵。"
    ),
    matrix: [
      [1, 0, 0, 5, -1, -1],
      [0, 1, 0, -2, 2, -1],
      [0, 0, 1, 1, -1, 1],
    ],
  },
];

function InvertibilityRowReductionDemo({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const current = invertibilitySteps[step];

  return (
    <InteractiveShell icon={<Sigma className="h-5 w-5" />} locale={locale} widgetId="invertibility-row-reduction-demo">
      <p className="text-sm leading-7 text-muted-foreground">
        {getLocalizedText(current.explanation, locale)}
      </p>
      <div className="mt-4 overflow-x-auto">
        <MatrixView data={current.matrix} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          size="sm"
          type="button"
          variant="outline"
        >
          {getLocalizedText(interactiveLabels.previous, locale)}
        </Button>
        <Button
          onClick={() => setStep((value) => Math.min(invertibilitySteps.length - 1, value + 1))}
          size="sm"
          type="button"
        >
          {getLocalizedText(interactiveLabels.next, locale)}
        </Button>
      </div>
    </InteractiveShell>
  );
}

const adtOperationSteps = [
  {
    op: text("push(10)", "push(10)", "push(10)"),
    queue: text("queue: []", "queue: []", "queue: []"),
    stack: text("stack: [10]", "stack: [10]", "stack: [10]"),
    note: text("Top now points to 10.", "頂端現為 10。", "栈顶现为 10。"),
  },
  {
    op: text("push(20)", "push(20)", "push(20)"),
    queue: text("queue: []", "queue: []", "queue: []"),
    stack: text("stack: [10, 20]", "stack: [10, 20]", "stack: [10, 20]"),
    note: text("Newest element becomes top.", "最新元素成為頂端。", "最新元素成为栈顶。"),
  },
  {
    op: text("enqueue(3), enqueue(5)", "enqueue(3), enqueue(5)", "enqueue(3), enqueue(5)"),
    queue: text("queue: [3, 5]", "queue: [3, 5]", "queue: [3, 5]"),
    stack: text("stack: [10, 20]", "stack: [10, 20]", "stack: [10, 20]"),
    note: text("Queue inserts at rear, preserving arrival order.", "Queue 由尾端加入，保留到達次序。", "Queue 由尾端加入，保留到达次序。"),
  },
  {
    op: text("pop(), dequeue()", "pop(), dequeue()", "pop(), dequeue()"),
    queue: text("queue: [5] (returned 3)", "queue: [5]（回傳 3）", "queue: [5]（返回 3）"),
    stack: text("stack: [10] (returned 20)", "stack: [10]（回傳 20）", "stack: [10]（返回 20）"),
    note: text("Same call style, different ADT semantics.", "同樣是操作呼叫，但語義按不同 ADT 生效。", "同样是操作调用，但语义按不同 ADT 生效。"),
  },
];

function AdtStackQueueStepper({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const current = adtOperationSteps[step];

  return (
    <InteractiveShell icon={<ListChecks className="h-5 w-5" />} locale={locale} widgetId="adt-stack-queue-stepper">
      <div className="space-y-2 text-sm">
        <p><strong>{getLocalizedText(interactiveLabels.operation, locale)}:</strong> {getLocalizedText(current.op, locale)}</p>
        <p>{getLocalizedText(current.stack, locale)}</p>
        <p>{getLocalizedText(current.queue, locale)}</p>
        <p className="text-muted-foreground">{getLocalizedText(current.note, locale)}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={() => setStep((s) => Math.max(0, s - 1))} size="sm" variant="outline">
          {getLocalizedText(interactiveLabels.previous, locale)}
        </Button>
        <Button onClick={() => setStep((s) => Math.min(adtOperationSteps.length - 1, s + 1))} size="sm">
          {getLocalizedText(interactiveLabels.next, locale)}
        </Button>
      </div>
    </InteractiveShell>
  );
}

function ComplexityGrowthComparator({ locale }: { locale: Locale }) {
  const [nText, setNText] = useState("16");
  const n = Math.max(1, Number.parseInt(nText, 10) || 1);
  const log2n = Math.log2(n);
  const rows = [
    { name: "O(1)", value: 1 },
    { name: "O(log n)", value: log2n },
    { name: "O(n)", value: n },
    { name: "O(n log n)", value: n * log2n },
    { name: "O(n^2)", value: n * n },
  ];

  return (
    <InteractiveShell icon={<ChartColumnBig className="h-5 w-5" />} locale={locale} widgetId="complexity-growth-comparator">
      <label className="text-sm">
        n:
        <Input className="mt-2 w-40" value={nText} onChange={(event) => setNText(event.target.value)} />
      </label>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[320px] text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-1 pr-4">Class</th>
              <th className="py-1">Value at n={n}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-border/40">
                <td className="py-1 pr-4 font-medium">{row.name}</td>
                <td className="py-1">{row.value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InteractiveShell>
  );
}

const interactiveComponents = {
  "adt-stack-queue-stepper": AdtStackQueueStepper,
  "complexity-growth-comparator": ComplexityGrowthComparator,
  "independence-checker": IndependenceChecker,
  "invertibility-row-reduction-demo": InvertibilityRowReductionDemo,
  "induction-stepper": InductionStepper,
  "matrix-multiplication-visualizer": MatrixMultiplicationVisualizer,
  "quantifier-negation-stepper": QuantifierNegationStepper,
  "row-reduction-stepper": RowReductionStepper,
  "set-operation-explorer": SetOperationExplorer,
  "solution-set-classifier": SolutionSetClassifier,
  "span-explorer": SpanExplorer,
  "subspace-checker": SubspaceChecker,
  "system-augmented-matrix-explorer": SystemAugmentedMatrixExplorer,
  "truth-table-builder": TruthTableBuilder,
};

export function InteractiveWidget({
  id,
  locale,
}: {
  id: keyof typeof interactiveComponents | string;
  locale: Locale;
}) {
  const Component =
    interactiveComponents[id as keyof typeof interactiveComponents];

  if (!Component) {
    return null;
  }

  return <Component locale={locale} />;
}
