"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Braces, ChartColumnBig, ListChecks, Sigma, StepForward } from "lucide-react";
import { GlassPanel } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextbookInlineRichText } from "@/components/textbook/mdx-blocks";
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
  codeSample: text("Code sample", "程式範例", "程序示例"),
  tryItYourself: text("Try it yourself", "自己試一試", "自己试一试"),
  stackMode: text("Stack", "Stack", "Stack"),
  queueMode: text("Queue", "Queue", "Queue"),
  commands: text("Commands", "指令", "指令"),
  currentState: text("Current state", "目前狀態", "当前状态"),
  returnedValue: text("Returned value", "回傳值", "返回值"),
  finalState: text("Final state", "最後狀態", "最终状态"),
  noReturn: text("No returned value", "沒有回傳值", "没有返回值"),
  parseError: text("Parsing error", "解析錯誤", "解析错误"),
  chooseAlgorithm: text("Choose an algorithm shape", "選擇演算法形狀", "选择算法形状"),
  growthClass: text("Growth class", "增長級別", "增长级别"),
  estimatedCost: text("Estimated primitive steps", "估計基本步數", "估计基本步数"),
  interpretation: text("Interpretation", "如何理解", "如何理解"),
  step: text("Step", "步驟", "步骤"),
  lowerBound: text("Lower bound", "下界近似", "下界近似"),
  upperBound: text("Upper bound", "上界近似", "上界近似"),
  intervalWidth: text("Interval width", "區間寬度", "区间宽度"),
  candidateLimit: text("Candidate limit L", "候選極限 L", "候选极限 L"),
  epsilonValue: text("Epsilon ε", "Epsilon ε", "Epsilon ε"),
  tailIndex: text("Tail index N", "尾部起點 N", "尾部起点 N"),
  termIndex: text("Term index n", "項序 n", "项序 n"),
  termValue: text("Term x_n", "數列項 x_n", "数列项 x_n"),
  bandCheck: text("Band check |x_n - L| < ε", "帶內測試 |x_n - L| < ε", "带内测试 |x_n - L| < ε"),
  yes: text("Yes", "是", "是"),
  no: text("No", "否", "否"),
  pointsTo: text("Points to", "指向", "指向"),
  storedValue: text("Stored value", "儲存值", "储存值"),
  bucketCount: text("Bucket count", "Bucket 數量", "Bucket 数量"),
  keys: text("Keys", "Keys", "Keys"),
  bucketIndex: text("Bucket index", "Bucket 編號", "Bucket 编号"),
  collisionCount: text("Collision count", "Collision 數量", "Collision 数量"),
  answer: text("Answer", "答案", "答案"),
  task: text("Task", "任務", "任务"),
  reveal: text("Show reasoning", "顯示思路", "显示思路"),
} as const;

function MatrixView({
  data,
  highlightCell,
  highlightColumn,
  highlightRow,
}: {
  data: ReadonlyArray<ReadonlyArray<number>>;
  highlightCell?: [number, number];
  highlightColumn?: number;
  highlightRow?: number;
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
                const isContextHighlighted =
                  highlightRow === rowIndex || highlightColumn === cellIndex;

                return (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className={cn(
                      "min-w-12 border border-border/60 px-3 py-2 text-center font-mono text-sm",
                      isContextHighlighted && "bg-primary/10 text-foreground",
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

function CodeSample({
  code,
  locale,
}: {
  code: LocalizedText;
  locale: Locale;
}) {
  return (
    <GlassPanel className="border border-border/60 bg-background/30 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {getLocalizedText(interactiveLabels.codeSample, locale)}
      </p>
      <pre className="overflow-x-auto rounded-lg bg-slate-950/90 p-4 font-mono text-xs leading-6 text-slate-100">
        <code>{getLocalizedText(code, locale)}</code>
      </pre>
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

function naturalInput(value: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.max(0, Math.trunc(parsed));
}

function IntegerEquivalenceExplorer({ locale }: { locale: Locale }) {
  const [a, setA] = useState(2);
  const [b, setB] = useState(5);
  const [shift, setShift] = useState(3);
  const [targetA, setTargetA] = useState(4);
  const [targetB, setTargetB] = useState(7);
  const shiftedA = a + shift;
  const shiftedB = b + shift;
  const classValue = a - b;
  const targetValue = targetA - targetB;
  const targetEquivalent = a + targetB === b + targetA;

  const labels = {
    chosenPair: text("Chosen representative", "已選代表元", "已选代表元"),
    shiftedPair: text("Shifted representative", "平移後代表元", "平移后代表元"),
    targetPair: text("Test another pair", "測試另一個對子", "测试另一个对子"),
    formalDifference: text("Formal difference", "形式差值", "形式差值"),
    equivalenceTest: text("Equivalence test", "等價測試", "等价测试"),
    sameClass: text("Same class", "同一等價類", "同一等价类"),
    differentClass: text("Different class", "不同等價類", "不同等价类"),
    sign: text("Sign of the class", "等價類的符號", "等价类的符号"),
    positive: text("positive", "正", "正"),
    negative: text("negative", "負", "负"),
    zero: text("zero", "零", "零"),
  } as const;

  const sign =
    classValue > 0
      ? labels.positive
      : classValue < 0
        ? labels.negative
        : labels.zero;

  return (
    <InteractiveShell icon={<Braces className="h-5 w-5" />} locale={locale} widgetId="integer-equivalence-explorer">
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(labels.chosenPair, locale)}</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Input
              aria-label="a"
              inputMode="numeric"
              min={0}
              onChange={(event) => setA(naturalInput(event.target.value))}
              type="number"
              value={a}
            />
            <Input
              aria-label="b"
              inputMode="numeric"
              min={0}
              onChange={(event) => setB(naturalInput(event.target.value))}
              type="number"
              value={b}
            />
          </div>
          <p className="mt-3 font-mono text-sm">{`(${a}, ${b})`}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {getLocalizedText(labels.formalDifference, locale)}:{" "}
            <span className="whitespace-nowrap font-mono">{a} - {b} = {classValue}</span>
          </p>
        </GlassPanel>

        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(labels.shiftedPair, locale)}</p>
          <Input
            aria-label="shift"
            className="mt-3"
            inputMode="numeric"
            min={0}
            onChange={(event) => setShift(naturalInput(event.target.value))}
            type="number"
            value={shift}
          />
          <p className="mt-3 font-mono text-sm">{`(${a}, ${b}) -> (${shiftedA}, ${shiftedB})`}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            <span className="whitespace-nowrap font-mono">{shiftedA} - {shiftedB} = {shiftedA - shiftedB}</span>
          </p>
        </GlassPanel>

        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(labels.targetPair, locale)}</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Input
              aria-label="target a"
              inputMode="numeric"
              min={0}
              onChange={(event) => setTargetA(naturalInput(event.target.value))}
              type="number"
              value={targetA}
            />
            <Input
              aria-label="target b"
              inputMode="numeric"
              min={0}
              onChange={(event) => setTargetB(naturalInput(event.target.value))}
              type="number"
              value={targetB}
            />
          </div>
          <p className="mt-3 font-mono text-sm">{`(${targetA}, ${targetB})`}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {getLocalizedText(labels.formalDifference, locale)}:{" "}
            <span className="whitespace-nowrap font-mono">{targetA} - {targetB} = {targetValue}</span>
          </p>
        </GlassPanel>
      </div>

      <GlassPanel className="mt-4 border border-border/60 bg-background/30 p-4">
        <p className="text-sm font-semibold">{getLocalizedText(labels.equivalenceTest, locale)}</p>
        <p className="mt-2 whitespace-nowrap font-mono text-sm">
          {`${a} + ${targetB} ${targetEquivalent ? "=" : "≠"} ${b} + ${targetA}`}
        </p>
        <p className={cn("mt-2 text-sm font-medium", targetEquivalent ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400")}>
          {getLocalizedText(targetEquivalent ? labels.sameClass : labels.differentClass, locale)}
        </p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {getLocalizedText(labels.sign, locale)}: {getLocalizedText(sign, locale)}
        </p>
      </GlassPanel>
    </InteractiveShell>
  );
}

function RationalRepresentativeLab({ locale }: { locale: Locale }) {
  const leftOptions = [
    { label: "(1, 2)", p: 1, q: 2 },
    { label: "(2, 4)", p: 2, q: 4 },
    { label: "(-1, -2)", p: -1, q: -2 },
  ] as const;
  const rightOptions = [
    { label: "(1, 3)", p: 1, q: 3 },
    { label: "(2, 6)", p: 2, q: 6 },
    { label: "(-1, -3)", p: -1, q: -3 },
  ] as const;
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const left = leftOptions[leftIndex];
  const right = rightOptions[rightIndex];
  const rawCrossDifference = left.p * right.q - right.p * left.q;
  const denominatorSignCorrection = right.q * left.q;
  const correctedValue = rawCrossDifference * denominatorSignCorrection;
  const rules = [
    {
      expression: `${left.p} > ${right.p}`,
      label: text("Numerator-only rule: p > m", "只看分子：p > m", "只看分子：p > m"),
      value: left.p > right.p,
    },
    {
      expression: `${left.p}·${right.q} - ${right.p}·${left.q} = ${rawCrossDifference}`,
      label: text("Raw cross-difference: pn - mq > 0", "原始交叉差：pn - mq > 0", "原始交叉差：pn - mq > 0"),
      value: rawCrossDifference > 0,
    },
    {
      expression: `(${rawCrossDifference})·(${denominatorSignCorrection}) = ${correctedValue}`,
      label: text("Sign-corrected test: (pn - mq)nq > 0", "修正分母符號：(pn - mq)nq > 0", "修正分母符号：(pn - mq)nq > 0"),
      value: correctedValue > 0,
    },
  ] as const;
  const labels = {
    left: text("Represent 1/2 as", "把 1/2 表示為", "把 1/2 表示为"),
    right: text("Represent 1/3 as", "把 1/3 表示為", "把 1/3 表示为"),
    expected: text("The rational comparison itself is fixed: 1/2 > 1/3.", "有理數本身的比較固定不變：1/2 > 1/3。", "有理数本身的比较固定不变：1/2 > 1/3。"),
    trueValue: text("true", "真", "真"),
    falseValue: text("false", "假", "假"),
  } as const;

  return (
    <InteractiveShell icon={<ListChecks className="h-5 w-5" />} locale={locale} widgetId="rational-representative-lab">
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(labels.left, locale)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {leftOptions.map((option, index) => (
              <Button
                key={option.label}
                onClick={() => setLeftIndex(index)}
                size="sm"
                type="button"
                variant={leftIndex === index ? "default" : "outline"}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="bg-card/50">
          <p className="text-sm font-semibold">{getLocalizedText(labels.right, locale)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {rightOptions.map((option, index) => (
              <Button
                key={option.label}
                onClick={() => setRightIndex(index)}
                size="sm"
                type="button"
                variant={rightIndex === index ? "default" : "outline"}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="mt-4 border border-border/60 bg-background/30 p-4">
        <p className="text-sm leading-7 text-muted-foreground">
          {getLocalizedText(labels.expected, locale)}
        </p>
      </GlassPanel>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {rules.map((rule) => (
          <GlassPanel key={rule.label.en} className="bg-card/50">
            <p className="text-sm font-semibold">{getLocalizedText(rule.label, locale)}</p>
            <p className="mt-2 font-mono text-sm">{rule.expression}</p>
            <p className={cn("mt-2 text-sm font-medium", rule.value ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400")}>
              {getLocalizedText(rule.value ? labels.trueValue : labels.falseValue, locale)}
            </p>
          </GlassPanel>
        ))}
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

const matrixReadingTasks: Array<{
  answer: LocalizedText;
  focus: LocalizedText;
  highlightCell?: [number, number];
  highlightColumn?: number;
  highlightRow?: number;
  prompt: LocalizedText;
}> = [
  {
    answer: text(
      "The matrix has 2 rows and 3 columns, so its size is `2 x 3`.",
      "矩陣有 2 行 3 列，所以大小是 `2 x 3`。",
      "矩阵有 2 行 3 列，所以大小是 `2 x 3`。"
    ),
    focus: text(
      "Count rows first. Count columns second. Do not reverse the order.",
      "先數行，再數列。不要把順序倒轉。",
      "先数行，再数列。不要把顺序倒转。"
    ),
    prompt: text(
      "What is the size of this matrix?",
      "這個矩陣的大小是多少？",
      "这个矩阵的大小是多少？"
    ),
  },
  {
    answer: text(
      "`a_23 = 4`, because row 2 and column 3 meet at the entry `4`.",
      "`a_23 = 4`，因為第 2 行與第 3 列交會的位置是 `4`。",
      "`a_23 = 4`，因为第 2 行与第 3 列交会的位置是 `4`。"
    ),
    focus: text(
      "The first subscript names the row. The second subscript names the column.",
      "第一個下標表示行，第二個下標表示列。",
      "第一个下标表示行，第二个下标表示列。"
    ),
    highlightCell: [1, 2] as [number, number],
    highlightColumn: 2,
    highlightRow: 1,
    prompt: text(
      "Find the entry `a_23`.",
      "找出元素 `a_23`。",
      "找出元素 `a_23`。"
    ),
  },
  {
    answer: text(
      "Column 2 contains the coefficients of `x_2`: `2` in the first equation and `-1` in the second equation.",
      "第 2 列收集 `x_2` 的係數：第一條方程是 `2`，第二條方程是 `-1`。",
      "第 2 列收集 `x_2` 的系数：第一条方程是 `2`，第二条方程是 `-1`。"
    ),
    focus: text(
      "The variable order is `(x_1,x_2,x_3)`, so column 2 belongs to `x_2`.",
      "變量次序是 `(x_1,x_2,x_3)`，所以第 2 列屬於 `x_2`。",
      "变量次序是 `(x_1,x_2,x_3)`，所以第 2 列属于 `x_2`。"
    ),
    highlightColumn: 1,
    prompt: text(
      "If the variable order is `(x_1,x_2,x_3)`, which numbers are the coefficients of `x_2`?",
      "若變量次序是 `(x_1,x_2,x_3)`，哪些數字是 `x_2` 的係數？",
      "若变量次序是 `(x_1,x_2,x_3)`，哪些数字是 `x_2` 的系数？"
    ),
  },
  {
    answer: text(
      "Row 1 records `1x_1 + 2x_2 + 0x_3`. In a coefficient matrix, one equation becomes one row.",
      "第 1 行記錄 `1x_1 + 2x_2 + 0x_3`。在係數矩陣中，一條方程變成一行。",
      "第 1 行记录 `1x_1 + 2x_2 + 0x_3`。在系数矩阵中，一条方程变成一行。"
    ),
    focus: text(
      "Read across a row when you want one equation.",
      "想讀一條方程時，要橫向讀一整行。",
      "想读一条方程时，要横向读一整行。"
    ),
    highlightRow: 0,
    prompt: text(
      "What does the first row record if this is a coefficient matrix?",
      "若這是一個係數矩陣，第一行記錄了甚麼？",
      "若这是一个系数矩阵，第一行记录了什么？"
    ),
  },
];

function MatrixReadingTrainer({ locale }: { locale: Locale }) {
  const [taskIndex, setTaskIndex] = useState(0);
  const [showReasoning, setShowReasoning] = useState(false);
  const current = matrixReadingTasks[taskIndex];

  return (
    <InteractiveShell icon={<ListChecks className="h-5 w-5" />} locale={locale} widgetId="matrix-reading-trainer">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,1.1fr)]">
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <MatrixView
              data={[[1, 2, 0], [3, -1, 4]]}
              highlightCell={current.highlightCell}
              highlightColumn={current.highlightColumn}
              highlightRow={current.highlightRow}
            />
          </div>
          <GlassPanel className="bg-card/50">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.focus, locale)}
            </p>
            <p className="mt-2 text-sm leading-7">
              <TextbookInlineRichText text={getLocalizedText(current.focus, locale)} />
            </p>
          </GlassPanel>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {matrixReadingTasks.map((_, index) => (
              <Button
                key={`matrix-reading-task-${index}`}
                onClick={() => {
                  setTaskIndex(index);
                  setShowReasoning(false);
                }}
                size="sm"
                type="button"
                variant={taskIndex === index ? "default" : "outline"}
              >
                {getLocalizedText(interactiveLabels.task, locale)} {index + 1}
              </Button>
            ))}
          </div>
          <GlassPanel className="bg-card/50">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.tryItYourself, locale)}
            </p>
            <p className="mt-2 text-sm leading-7">
              <TextbookInlineRichText text={getLocalizedText(current.prompt, locale)} />
            </p>
          </GlassPanel>
          <Button
            onClick={() => setShowReasoning((value) => !value)}
            size="sm"
            type="button"
            variant="outline"
          >
            {getLocalizedText(interactiveLabels.reveal, locale)}
          </Button>
          {showReasoning ? (
            <GlassPanel className="border border-emerald-400/35 bg-card/55">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                {getLocalizedText(interactiveLabels.answer, locale)}
              </p>
              <p className="mt-2 text-sm leading-7">
                <TextbookInlineRichText text={getLocalizedText(current.answer, locale)} />
              </p>
            </GlassPanel>
          ) : null}
        </div>
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

type AdtMode = "stack" | "queue";

const adtCodeSamples: Record<AdtMode, LocalizedText> = {
  stack: text(
    [
      "typedef struct {",
      "  int data[100];",
      "  int top;",
      "} Stack;",
      "",
      "void push(Stack *s, int x) {",
      "  s->data[++(s->top)] = x;",
      "}",
      "",
      "int pop(Stack *s) {",
      "  return s->data[(s->top)--];",
      "}",
    ].join("\n"),
    [
      "typedef struct {",
      "  int data[100];",
      "  int top;",
      "} Stack;",
      "",
      "void push(Stack *s, int x) {",
      "  s->data[++(s->top)] = x;",
      "}",
      "",
      "int pop(Stack *s) {",
      "  return s->data[(s->top)--];",
      "}",
    ].join("\n"),
    [
      "typedef struct {",
      "  int data[100];",
      "  int top;",
      "} Stack;",
      "",
      "void push(Stack *s, int x) {",
      "  s->data[++(s->top)] = x;",
      "}",
      "",
      "int pop(Stack *s) {",
      "  return s->data[(s->top)--];",
      "}",
    ].join("\n")
  ),
  queue: text(
    [
      "typedef struct {",
      "  int data[100];",
      "  int front, rear;",
      "} Queue;",
      "",
      "void enqueue(Queue *q, int x) {",
      "  q->data[(q->rear)++] = x;",
      "}",
      "",
      "int dequeue(Queue *q) {",
      "  return q->data[(q->front)++];",
      "}",
    ].join("\n"),
    [
      "typedef struct {",
      "  int data[100];",
      "  int front, rear;",
      "} Queue;",
      "",
      "void enqueue(Queue *q, int x) {",
      "  q->data[(q->rear)++] = x;",
      "}",
      "",
      "int dequeue(Queue *q) {",
      "  return q->data[(q->front)++];",
      "}",
    ].join("\n"),
    [
      "typedef struct {",
      "  int data[100];",
      "  int front, rear;",
      "} Queue;",
      "",
      "void enqueue(Queue *q, int x) {",
      "  q->data[(q->rear)++] = x;",
      "}",
      "",
      "int dequeue(Queue *q) {",
      "  return q->data[(q->front)++];",
      "}",
    ].join("\n")
  ),
};

const adtTryItCopy: Record<AdtMode, LocalizedText> = {
  stack: text(
    "push 10\npush 20\ntop\npop\npush 7",
    "push 10\npush 20\ntop\npop\npush 7",
    "push 10\npush 20\ntop\npop\npush 7"
  ),
  queue: text(
    "enqueue 3\nenqueue 5\nfront\ndequeue\nenqueue 8",
    "enqueue 3\nenqueue 5\nfront\ndequeue\nenqueue 8",
    "enqueue 3\nenqueue 5\nfront\ndequeue\nenqueue 8"
  ),
};

function runAdtOperations(mode: AdtMode, commandsText: string) {
  const state: number[] = [];
  const trace: Array<{
    command: string;
    error?: string;
    returned?: number | null;
    state: number[];
  }> = [];

  for (const rawLine of commandsText.split("\n")) {
    const command = rawLine.trim();
    if (!command) continue;

    const parts = command.split(/\s+/);
    const op = parts[0]?.toLowerCase();
    const value = parts[1] ? Number(parts[1]) : null;

    if (mode === "stack") {
      if (op === "push" && value !== null && Number.isFinite(value)) {
        state.push(value);
        trace.push({ command, returned: null, state: [...state] });
        continue;
      }
      if (op === "pop") {
        if (!state.length) {
          trace.push({ command, error: "empty stack", state: [...state] });
        } else {
          const returned = state.pop() ?? null;
          trace.push({ command, returned, state: [...state] });
        }
        continue;
      }
      if (op === "top") {
        if (!state.length) {
          trace.push({ command, error: "empty stack", state: [...state] });
        } else {
          trace.push({ command, returned: state[state.length - 1], state: [...state] });
        }
        continue;
      }
    }

    if (mode === "queue") {
      if (op === "enqueue" && value !== null && Number.isFinite(value)) {
        state.push(value);
        trace.push({ command, returned: null, state: [...state] });
        continue;
      }
      if (op === "dequeue") {
        if (!state.length) {
          trace.push({ command, error: "empty queue", state: [...state] });
        } else {
          const returned = state.shift() ?? null;
          trace.push({ command, returned, state: [...state] });
        }
        continue;
      }
      if (op === "front") {
        if (!state.length) {
          trace.push({ command, error: "empty queue", state: [...state] });
        } else {
          trace.push({ command, returned: state[0], state: [...state] });
        }
        continue;
      }
    }

    trace.push({
      command,
      error: mode === "stack" ? "expected push/pop/top" : "expected enqueue/dequeue/front",
      state: [...state],
    });
  }

  return trace;
}

function PointerStateTracer({ locale }: { locale: Locale }) {
  const [firstText, setFirstText] = useState("5");
  const [secondText, setSecondText] = useState("15");
  const first = Number.parseInt(firstText, 10) || 0;
  const second = Number.parseInt(secondText, 10) || 0;

  const steps = useMemo(() => {
    const states = [];
    let firstvalue = first;
    let secondvalue = second;
    let p1 = "unassigned";
    let p2 = "unassigned";

    states.push({
      code: "int firstvalue = ...; int secondvalue = ...; int *p1, *p2;",
      explanation: text(
        "Two integers exist, but neither pointer holds a valid address yet.",
        "兩個整數已存在，但兩個 pointer 仍未持有合法地址。",
        "两个整数已存在，但两个 pointer 仍未持有合法地址。"
      ),
      firstvalue,
      p1,
      p2,
      secondvalue,
    });

    p1 = "&firstvalue";
    states.push({
      code: "p1 = &firstvalue;",
      explanation: text(
        "p1 now stores the address of firstvalue.",
        "p1 現在儲存 firstvalue 的地址。",
        "p1 现在保存 firstvalue 的地址。"
      ),
      firstvalue,
      p1,
      p2,
      secondvalue,
    });

    p2 = "&secondvalue";
    states.push({
      code: "p2 = &secondvalue;",
      explanation: text(
        "p2 now stores the address of secondvalue.",
        "p2 現在儲存 secondvalue 的地址。",
        "p2 现在保存 secondvalue 的地址。"
      ),
      firstvalue,
      p1,
      p2,
      secondvalue,
    });

    firstvalue = 10;
    states.push({
      code: "*p1 = 10;",
      explanation: text(
        "Writing through p1 changes firstvalue because p1 points there.",
        "經 p1 寫入會改變 firstvalue，因為 p1 正指向它。",
        "经 p1 写入会改变 firstvalue，因为 p1 正指向它。"
      ),
      firstvalue,
      p1,
      p2,
      secondvalue,
    });

    secondvalue = firstvalue;
    states.push({
      code: "*p2 = *p1;",
      explanation: text(
        "This copies the pointed-to value, not the address.",
        "這一步複製的是值，不是地址。",
        "这一步复制的是值，不是地址。"
      ),
      firstvalue,
      p1,
      p2,
      secondvalue,
    });

    p1 = p2;
    states.push({
      code: "p1 = p2;",
      explanation: text(
        "Now both pointers store the same address.",
        "現在兩個 pointer 儲存同一個地址。",
        "现在两个 pointer 保存同一个地址。"
      ),
      firstvalue,
      p1,
      p2,
      secondvalue,
    });

    secondvalue = 20;
    states.push({
      code: "*p1 = 20;",
      explanation: text(
        "Because p1 was redirected, the final write changes secondvalue.",
        "由於 p1 已被重定向，最後一次寫入改變的是 secondvalue。",
        "由于 p1 已被重定向，最后一次写入改变的是 secondvalue。"
      ),
      firstvalue,
      p1,
      p2,
      secondvalue,
    });

    return states;
  }, [first, second]);

  const [stepIndex, setStepIndex] = useState(0);
  const current = steps[stepIndex];

  return (
    <InteractiveShell icon={<StepForward className="h-5 w-5" />} locale={locale} widgetId="pointer-state-tracer">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <label className="text-sm font-medium">
            firstvalue
            <Input className="mt-2" onChange={(event) => setFirstText(event.target.value)} value={firstText} />
          </label>
          <label className="mt-4 block text-sm font-medium">
            secondvalue
            <Input className="mt-2" onChange={(event) => setSecondText(event.target.value)} value={secondText} />
          </label>
        </GlassPanel>
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {getLocalizedText(interactiveLabels.step, locale)} {stepIndex + 1}
          </p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950/90 p-4 font-mono text-xs leading-6 text-slate-100">
            <code>{current.code}</code>
          </pre>
          <div className="mt-4 grid gap-2 text-sm">
            <p>firstvalue = {current.firstvalue}</p>
            <p>secondvalue = {current.secondvalue}</p>
            <p>p1 {getLocalizedText(interactiveLabels.pointsTo, locale)} {current.p1}</p>
            <p>p2 {getLocalizedText(interactiveLabels.pointsTo, locale)} {current.p2}</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {getLocalizedText(current.explanation, locale)}
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => setStepIndex((value) => Math.max(0, value - 1))} size="sm" variant="outline">
              {getLocalizedText(interactiveLabels.previous, locale)}
            </Button>
            <Button onClick={() => setStepIndex((value) => Math.min(steps.length - 1, value + 1))} size="sm">
              {getLocalizedText(interactiveLabels.next, locale)}
            </Button>
          </div>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

function hashKeySimple(key: string, bucketCount: number) {
  const total = Array.from(key).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return total % bucketCount;
}

function HashBucketLab({ locale }: { locale: Locale }) {
  const [bucketCountText, setBucketCountText] = useState("7");
  const [keysText, setKeysText] = useState("cat,dog,cow,cod");
  const bucketCount = Math.max(1, Number.parseInt(bucketCountText, 10) || 1);
  const keys = keysText
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const rows = keys.map((key) => ({
    bucket: hashKeySimple(key, bucketCount),
    key,
  }));
  const buckets = Array.from({ length: bucketCount }, (_, index) => ({
    index,
    keys: rows.filter((row) => row.bucket === index).map((row) => row.key),
  }));
  const collisionCount = buckets.reduce(
    (sum, bucket) => sum + Math.max(bucket.keys.length - 1, 0),
    0
  );

  return (
    <InteractiveShell icon={<Braces className="h-5 w-5" />} locale={locale} widgetId="hash-bucket-lab">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <label className="text-sm font-medium">
            {getLocalizedText(interactiveLabels.bucketCount, locale)}
            <Input className="mt-2" onChange={(event) => setBucketCountText(event.target.value)} value={bucketCountText} />
          </label>
          <label className="mt-4 block text-sm font-medium">
            {getLocalizedText(interactiveLabels.keys, locale)}
            <textarea
              className="mt-2 min-h-28 w-full rounded-lg border border-border/60 bg-background/70 p-3 font-mono text-sm"
              onChange={(event) => setKeysText(event.target.value)}
              value={keysText}
            />
          </label>
          <p className="mt-4 text-sm text-muted-foreground">
            {getLocalizedText(interactiveLabels.collisionCount, locale)}: {collisionCount}
          </p>
        </GlassPanel>
        <div className="grid gap-4">
          <GlassPanel className="border border-border/60 bg-background/30 p-4">
            <div className="overflow-x-auto">
              <table className="min-w-[320px] text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-1 pr-4">{getLocalizedText(interactiveLabels.keys, locale)}</th>
                    <th className="py-1">{getLocalizedText(interactiveLabels.bucketIndex, locale)}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.key}-${row.bucket}`} className="border-t border-border/40">
                      <td className="py-1 pr-4 font-mono">{row.key}</td>
                      <td className="py-1">{row.bucket}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
          <div className="grid gap-3 md:grid-cols-2">
            {buckets.map((bucket) => (
              <GlassPanel key={`bucket-${bucket.index}`} className="border border-border/60 bg-background/30 p-4">
                <p className="text-sm font-semibold">
                  {getLocalizedText(interactiveLabels.bucketIndex, locale)} {bucket.index}
                </p>
                <p className="mt-2 font-mono text-sm">
                  {bucket.keys.length ? bucket.keys.join(" → ") : "∅"}
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}

function AdtStackQueueStepper({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<AdtMode>("stack");
  const [commandsText, setCommandsText] = useState(
    getLocalizedText(adtTryItCopy.stack, locale)
  );
  const current = adtOperationSteps[step];
  const trace = useMemo(
    () => runAdtOperations(mode, commandsText),
    [commandsText, mode]
  );

  return (
    <InteractiveShell icon={<ListChecks className="h-5 w-5" />} locale={locale} widgetId="adt-stack-queue-stepper">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            setMode("stack");
            setCommandsText(getLocalizedText(adtTryItCopy.stack, locale));
          }}
          size="sm"
          type="button"
          variant={mode === "stack" ? "default" : "outline"}
        >
          {getLocalizedText(interactiveLabels.stackMode, locale)}
        </Button>
        <Button
          onClick={() => {
            setMode("queue");
            setCommandsText(getLocalizedText(adtTryItCopy.queue, locale));
          }}
          size="sm"
          type="button"
          variant={mode === "queue" ? "default" : "outline"}
        >
          {getLocalizedText(interactiveLabels.queueMode, locale)}
        </Button>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <CodeSample code={adtCodeSamples[mode]} locale={locale} />
          <GlassPanel className="border border-border/60 bg-background/30 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.tryItYourself, locale)}
            </p>
            <label className="text-sm font-medium">
              {getLocalizedText(interactiveLabels.commands, locale)}
            </label>
            <textarea
              className="mt-2 min-h-44 w-full rounded-lg border border-border/60 bg-background/70 p-3 font-mono text-sm"
              onChange={(event) => setCommandsText(event.target.value)}
              value={commandsText}
            />
          </GlassPanel>
        </div>

        <div className="space-y-4">
          <GlassPanel className="border border-border/60 bg-background/30 p-4">
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
          </GlassPanel>

          <GlassPanel className="border border-border/60 bg-background/30 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.tryItYourself, locale)}
            </p>
            <div className="space-y-3">
              {trace.map((row, index) => (
                <div key={`${row.command}-${index}`} className="rounded-lg border border-border/40 p-3 text-sm">
                  <p className="font-mono">{row.command}</p>
                  <p className="mt-1">
                    <strong>{getLocalizedText(interactiveLabels.currentState, locale)}:</strong>{" "}
                    [{row.state.join(", ")}]
                  </p>
                  <p className="mt-1">
                    <strong>{row.error ? getLocalizedText(interactiveLabels.parseError, locale) : getLocalizedText(interactiveLabels.returnedValue, locale)}:</strong>{" "}
                    {row.error ?? (row.returned ?? getLocalizedText(interactiveLabels.noReturn, locale))}
                  </p>
                </div>
              ))}
              <p className="text-sm text-muted-foreground">
                <strong>{getLocalizedText(interactiveLabels.finalState, locale)}:</strong>{" "}
                [{trace[trace.length - 1]?.state.join(", ") ?? ""}]
              </p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </InteractiveShell>
  );
}

const complexityCodeExamples = [
  {
    code: text(
      ["for (int i = 0; i < n; ++i) {", "  visit(a[i]);", "}"].join("\n"),
      ["for (int i = 0; i < n; ++i) {", "  visit(a[i]);", "}"].join("\n"),
      ["for (int i = 0; i < n; ++i) {", "  visit(a[i]);", "}"].join("\n")
    ),
    growth: "O(n)",
    id: "linear",
    label: text("Single scan", "單次掃描", "单次扫描"),
    note: text(
      "One loop touches each item once, so the dominant cost scales linearly with n.",
      "只有一個迴圈逐項走過資料，主導成本會與 n 成正比。",
      "只有一个循环逐项走过数据，主导成本会与 n 成正比。"
    ),
    value: (n: number) => n,
  },
  {
    code: text(
      [
        "for (int i = 0; i < n; ++i) {",
        "  for (int j = 0; j < n; ++j) {",
        "    compare(a[i], a[j]);",
        "  }",
        "}",
      ].join("\n"),
      [
        "for (int i = 0; i < n; ++i) {",
        "  for (int j = 0; j < n; ++j) {",
        "    compare(a[i], a[j]);",
        "  }",
        "}",
      ].join("\n"),
      [
        "for (int i = 0; i < n; ++i) {",
        "  for (int j = 0; j < n; ++j) {",
        "    compare(a[i], a[j]);",
        "  }",
        "}",
      ].join("\n")
    ),
    growth: "O(n^2)",
    id: "quadratic",
    label: text("Nested double loop", "雙重巢狀迴圈", "双重嵌套循环"),
    note: text(
      "Each outer-loop pass triggers a full inner scan, so the work multiplies to n^2.",
      "外層每跑一次，都會重新完成整個內層掃描，因此總工作量乘成 n^2。",
      "外层每跑一次，都会重新完成整个内层扫描，因此总工作量乘成 n^2。"
    ),
    value: (n: number) => n * n,
  },
  {
    code: text(
      [
        "int i = n;",
        "while (i > 1) {",
        "  i /= 2;",
        "}",
      ].join("\n"),
      [
        "int i = n;",
        "while (i > 1) {",
        "  i /= 2;",
        "}",
      ].join("\n"),
      [
        "int i = n;",
        "while (i > 1) {",
        "  i /= 2;",
        "}",
      ].join("\n")
    ),
    growth: "O(log n)",
    id: "logarithmic",
    label: text("Halving loop", "對半縮減迴圈", "对半缩减循环"),
    note: text(
      "The loop does not remove one item at a time. It cuts the remaining problem roughly in half each step.",
      "這個迴圈不是每次只少一個，而是每步都把剩餘問題約減半。",
      "这个循环不是每次只少一个，而是每步都把剩余问题约减半。"
    ),
    value: (n: number) => Math.max(1, Math.log2(n)),
  },
  {
    code: text(
      [
        "for (int width = 1; width < n; width *= 2) {",
        "  for (int i = 0; i < n; i += 2 * width) {",
        "    merge_block(i, width);",
        "  }",
        "}",
      ].join("\n"),
      [
        "for (int width = 1; width < n; width *= 2) {",
        "  for (int i = 0; i < n; i += 2 * width) {",
        "    merge_block(i, width);",
        "  }",
        "}",
      ].join("\n"),
      [
        "for (int width = 1; width < n; width *= 2) {",
        "  for (int i = 0; i < n; i += 2 * width) {",
        "    merge_block(i, width);",
        "  }",
        "}",
      ].join("\n")
    ),
    growth: "O(n log n)",
    id: "nlogn",
    label: text("Merge-style pass structure", "類 merge 的分層掃描", "类 merge 的分层扫描"),
    note: text(
      "There are about log n rounds, and each round still touches a linear amount of data.",
      "大約有 log n 輪，而每一輪仍然會處理線性數量的資料。",
      "大约有 log n 轮，而每一轮仍然会处理线性数量的数据。"
    ),
    value: (n: number) => n * Math.max(1, Math.log2(n)),
  },
] as const;

function ComplexityGrowthComparator({ locale }: { locale: Locale }) {
  const [nText, setNText] = useState("16");
  const [selectedId, setSelectedId] = useState<(typeof complexityCodeExamples)[number]["id"]>("nlogn");
  const n = Math.max(1, Number.parseInt(nText, 10) || 1);
  const log2n = Math.log2(n);
  const rows = [
    { name: "O(1)", value: 1 },
    { name: "O(log n)", value: log2n },
    { name: "O(n)", value: n },
    { name: "O(n log n)", value: n * log2n },
    { name: "O(n^2)", value: n * n },
  ];
  const selectedExample =
    complexityCodeExamples.find((item) => item.id === selectedId) ??
    complexityCodeExamples[0];

  return (
    <InteractiveShell icon={<ChartColumnBig className="h-5 w-5" />} locale={locale} widgetId="complexity-growth-comparator">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <p className="text-sm font-medium">
            {getLocalizedText(interactiveLabels.chooseAlgorithm, locale)}
          </p>
          <div className="flex flex-wrap gap-2">
            {complexityCodeExamples.map((example) => (
              <Button
                key={example.id}
                onClick={() => setSelectedId(example.id)}
                size="sm"
                type="button"
                variant={selectedId === example.id ? "default" : "outline"}
              >
                {getLocalizedText(example.label, locale)}
              </Button>
            ))}
          </div>
          <CodeSample code={selectedExample.code} locale={locale} />
          <label className="text-sm font-medium">
            n
            <Input className="mt-2 w-40" value={nText} onChange={(event) => setNText(event.target.value)} />
          </label>
          <GlassPanel className="border border-border/60 bg-background/30 p-4 text-sm">
            <p>
              <strong>{getLocalizedText(interactiveLabels.growthClass, locale)}:</strong>{" "}
              {selectedExample.growth}
            </p>
            <p className="mt-2">
              <strong>{getLocalizedText(interactiveLabels.estimatedCost, locale)}:</strong>{" "}
              {selectedExample.value(n).toFixed(2)}
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong>{getLocalizedText(interactiveLabels.interpretation, locale)}:</strong>{" "}
              {getLocalizedText(selectedExample.note, locale)}
            </p>
          </GlassPanel>
        </div>

        <div className="overflow-x-auto">
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
      </div>
    </InteractiveShell>
  );
}

function formatDecimal(value: number, digits = 3) {
  return value.toFixed(digits).replace(/\.?0+$/, "");
}

function percentWithin(value: number, min: number, max: number) {
  if (max <= min) {
    return 50;
  }

  return ((value - min) / (max - min)) * 100;
}

function IntervalStrip({
  center,
  innerMax,
  innerMin,
  label,
  max,
  min,
  point,
  pointLabel,
}: {
  center: number;
  innerMax: number;
  innerMin: number;
  label: string;
  max: number;
  min: number;
  point: number;
  pointLabel: string;
}) {
  const rangeLeft = percentWithin(innerMin, min, max);
  const rangeRight = percentWithin(innerMax, min, max);
  const centerPct = percentWithin(center, min, max);
  const pointPct = percentWithin(point, min, max);

  return (
    <GlassPanel className="border border-border/60 bg-background/30 p-4">
      <p className="text-sm font-medium">{label}</p>
      <div className="relative mt-4 h-16 overflow-hidden rounded-xl border border-border/50 bg-background/60 px-4">
        <div className="absolute inset-x-4 top-8 h-px bg-border/70" />
        <div
          className="absolute top-[26px] h-5 rounded-full bg-primary/15"
          style={{
            left: `calc(${rangeLeft}% + 1rem)`,
            width: `calc(${Math.max(rangeRight - rangeLeft, 0)}% - 0rem)`,
          }}
        />
        <div
          className="absolute top-3 h-10 border-l border-primary/80"
          style={{ left: `calc(${centerPct}% + 1rem)` }}
        />
        <div
          className="absolute top-[19px] h-4 w-4 -translate-x-1/2 rounded-full border border-amber-500 bg-amber-500/20"
          style={{ left: `calc(${pointPct}% + 1rem)` }}
        />
        <p
          className="absolute top-0 -translate-x-1/2 text-[11px] font-mono text-primary"
          style={{ left: `calc(${centerPct}% + 1rem)` }}
        >
          {formatDecimal(center)}
        </p>
        <p
          className="absolute bottom-1 -translate-x-1/2 text-[11px] font-mono text-amber-700 dark:text-amber-300"
          style={{ left: `calc(${pointPct}% + 1rem)` }}
        >
          {pointLabel}
        </p>
      </div>
    </GlassPanel>
  );
}

function DedekindCutExplorer({ locale }: { locale: Locale }) {
  const targets = [
    {
      boundary: text("3/2", "3/2", "3/2"),
      id: "rational",
      label: text("Rational cut at 3/2", "3/2 的有理 cut", "3/2 的有理 cut"),
      note: text(
        "Because 3/2 is itself rational, the right side B has a minimum element 3/2. This is exactly what a rational cut looks like.",
        "因為 3/2 本身就是有理數，所以右側 B 有最小元 3/2。這正是有理 cut 的樣子。",
        "因为 3/2 本身就是有理数，所以右侧 B 有最小元 3/2。这正是有理 cut 的样子。"
      ),
      predicate: text("q >= 3/2", "q >= 3/2", "q >= 3/2"),
      value: 1.5,
    },
    {
      boundary: text("sqrt(2)", "sqrt(2)", "sqrt(2)"),
      id: "sqrt2",
      label: text("Irrational boundary at sqrt(2)", "sqrt(2) 的無理邊界", "sqrt(2) 的无理边界"),
      note: text(
        "No rational equals sqrt(2), so the rationals to the right never start with a smallest one. This is the signature of an irrational cut.",
        "沒有任何有理數等於 sqrt(2)，所以右側有理數永遠不會從某個最小元開始。這正是無理 cut 的特徵。",
        "没有任何有理数等于 sqrt(2)，所以右侧有理数永远不会从某个最小元开始。这正是无理 cut 的特征。"
      ),
      predicate: text("q > sqrt(2)", "q > sqrt(2)", "q > sqrt(2)"),
      value: Math.SQRT2,
    },
  ] as const;
  const sampleRationals = [
    { label: "1", value: 1 },
    { label: "6/5", value: 6 / 5 },
    { label: "7/5", value: 7 / 5 },
    { label: "10/7", value: 10 / 7 },
    { label: "3/2", value: 3 / 2 },
    { label: "8/5", value: 8 / 5 },
    { label: "17/10", value: 17 / 10 },
  ] as const;
  const [selectedId, setSelectedId] = useState<(typeof targets)[number]["id"]>("sqrt2");
  const selectedTarget =
    targets.find((target) => target.id === selectedId) ?? targets[0];
  const leftSet = sampleRationals.filter((value) => value.value < selectedTarget.value);
  const rightSet = sampleRationals.filter((value) => value.value >= selectedTarget.value);
  const numberLineMin = 0.95;
  const numberLineMax = 1.75;

  return (
    <InteractiveShell icon={<ArrowLeftRight className="h-5 w-5" />} locale={locale} widgetId="dedekind-cut-explorer">
      <div className="flex flex-wrap gap-2">
        {targets.map((target) => (
          <Button
            key={target.id}
            onClick={() => setSelectedId(target.id)}
            size="sm"
            type="button"
            variant={selectedId === target.id ? "default" : "outline"}
          >
            {getLocalizedText(target.label, locale)}
          </Button>
        ))}
      </div>

      <GlassPanel className="mt-4 border border-border/60 bg-background/30 p-4">
        <p className="text-sm text-muted-foreground">
          {getLocalizedText(interactiveLabels.focus, locale)}
        </p>
        <p className="mt-2 text-sm leading-7">
          {getLocalizedText(selectedTarget.note, locale)}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <p className="rounded-xl border border-border/50 bg-background/60 p-3 font-mono text-sm">
            A = {"{ q ∈ Q | q < "}
            {getLocalizedText(selectedTarget.boundary, locale)}
            {" }"}
          </p>
          <p className="rounded-xl border border-border/50 bg-background/60 p-3 font-mono text-sm">
            B = {"{ q ∈ Q | "}
            {getLocalizedText(selectedTarget.predicate, locale)}
            {" }"}
          </p>
        </div>
      </GlassPanel>

      <div className="relative mt-5 h-28 overflow-hidden rounded-xl border border-border/60 bg-background/30 px-4">
        <div className="absolute inset-x-4 top-12 h-px bg-border/70" />
        {sampleRationals.map((value) => {
          const isLeft = value.value < selectedTarget.value;
          const position = percentWithin(value.value, numberLineMin, numberLineMax);

          return (
            <div
              key={value.label}
              className="absolute top-8 -translate-x-1/2 text-center"
              style={{ left: `calc(${position}% + 1rem)` }}
            >
              <div
                className={cn(
                  "mx-auto h-3 w-3 rounded-full border",
                  isLeft
                    ? "border-emerald-600 bg-emerald-500/20"
                    : "border-amber-600 bg-amber-500/20"
                )}
              />
              <p className="mt-2 text-xs font-mono">{value.label}</p>
              <p className="text-[11px] text-muted-foreground">{isLeft ? "A" : "B"}</p>
            </div>
          );
        })}
        <div
          className="absolute top-3 h-14 border-l border-primary/80"
          style={{
            left: `calc(${percentWithin(selectedTarget.value, numberLineMin, numberLineMax)}% + 1rem)`,
          }}
        />
        <p
          className="absolute top-1 -translate-x-1/2 text-xs font-semibold text-primary"
          style={{
            left: `calc(${percentWithin(selectedTarget.value, numberLineMin, numberLineMax)}% + 1rem)`,
          }}
        >
          {getLocalizedText(selectedTarget.boundary, locale)}
        </p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <p className="text-sm font-semibold">
            {getLocalizedText(interactiveLabels.setA, locale)}
          </p>
          <p className="mt-2 font-mono text-sm">
            {leftSet.map((value) => value.label).join(", ")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {selectedId === "sqrt2"
              ? getLocalizedText(
                  text(
                    "Every displayed element is strictly left of sqrt(2), and more rationals can always be inserted still closer to the boundary.",
                    "每個顯示出的元素都嚴格落在 sqrt(2) 左邊，而且永遠可以再插入更靠近邊界的有理數。",
                    "每个显示出的元素都严格落在 sqrt(2) 左边，而且永远可以再插入更靠近边界的有理数。"
                  ),
                  locale
                )
              : getLocalizedText(
                  text(
                    "Even for a rational cut, A still has no maximum because 3/2 itself stays on the right side.",
                    "即使是有理 cut，A 仍然沒有最大元，因為 3/2 本身留在右側。",
                    "即使是有理 cut，A 仍然没有最大元，因为 3/2 本身留在右侧。"
                  ),
                  locale
                )}
          </p>
        </GlassPanel>
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <p className="text-sm font-semibold">
            {getLocalizedText(interactiveLabels.setB, locale)}
          </p>
          <p className="mt-2 font-mono text-sm">
            {rightSet.length ? rightSet.map((value) => value.label).join(", ") : "∅"}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {getLocalizedText(selectedTarget.note, locale)}
          </p>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

function DecimalApproximationBuilder({ locale }: { locale: Locale }) {
  const examples = [
    {
      digits: "435290",
      id: "source-decimal",
      label: text("10.435290...", "10.435290...", "10.435290..."),
      note: text(
        "This mirrors the lecture-note example: each extra digit produces a tighter lower and upper rational fence.",
        "這對應講義中的例子：每多一個數位，就得到更緊的上下有理圍欄。",
        "这对应讲义中的例子：每多一个数位，就得到更紧的上下有理围栏。"
      ),
      whole: 10,
    },
    {
      digits: "414213",
      id: "sqrt2",
      label: text("sqrt(2) ≈ 1.414213...", "sqrt(2) ≈ 1.414213...", "sqrt(2) ≈ 1.414213..."),
      note: text(
        "Using sqrt(2) makes the link to irrational numbers explicit: no finite decimal stage reaches the exact number, but the intervals keep shrinking around it.",
        "用 sqrt(2) 這個例子，可以直接看見無理數：沒有任何有限小數階段會到達它本身，但區間會一直收窄包住它。",
        "用 sqrt(2) 这个例子，可以直接看见无理数：没有任何有限小数阶段会到达它本身，但区间会一直收窄包住它。"
      ),
      whole: 1,
    },
  ] as const;
  const [selectedId, setSelectedId] = useState<(typeof examples)[number]["id"]>("sqrt2");
  const [depth, setDepth] = useState(3);
  const selectedExample =
    examples.find((example) => example.id === selectedId) ?? examples[0];
  const maxDepth = Math.min(5, selectedExample.digits.length);
  const currentDepth = Math.min(depth, maxDepth);

  const rows = Array.from({ length: currentDepth + 1 }, (_, index) => {
    if (index === 0) {
      return {
        depth: 0,
        lower: selectedExample.whole,
        upper: selectedExample.whole + 1,
      };
    }

    const prefix = selectedExample.digits.slice(0, index);
    const nextPrefix = String(Number.parseInt(prefix, 10) + 1).padStart(index, "0");

    return {
      depth: index,
      lower: Number(`${selectedExample.whole}.${prefix}`),
      upper: Number(`${selectedExample.whole}.${nextPrefix}`),
    };
  });
  const current = rows[rows.length - 1];
  const baseMin = selectedExample.whole;
  const baseMax = selectedExample.whole + 1;

  return (
    <InteractiveShell icon={<StepForward className="h-5 w-5" />} locale={locale} widgetId="decimal-approximation-builder">
      <div className="flex flex-wrap gap-2">
        {examples.map((example) => (
          <Button
            key={example.id}
            onClick={() => {
              setSelectedId(example.id);
              setDepth(3);
            }}
            size="sm"
            type="button"
            variant={selectedId === example.id ? "default" : "outline"}
          >
            {getLocalizedText(example.label, locale)}
          </Button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          onClick={() => setDepth((value) => Math.max(0, value - 1))}
          size="sm"
          type="button"
          variant="outline"
        >
          {getLocalizedText(interactiveLabels.previous, locale)}
        </Button>
        <Button
          onClick={() => setDepth((value) => Math.min(maxDepth, value + 1))}
          size="sm"
          type="button"
        >
          {getLocalizedText(interactiveLabels.next, locale)}
        </Button>
      </div>

      <GlassPanel className="mt-4 border border-border/60 bg-background/30 p-4">
        <p className="text-sm leading-7 text-muted-foreground">
          {getLocalizedText(selectedExample.note, locale)}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border/50 bg-background/60 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.step, locale)}
            </p>
            <p className="mt-2 text-lg font-semibold">{currentDepth}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/60 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.lowerBound, locale)}
            </p>
            <p className="mt-2 font-mono text-lg">{formatDecimal(current.lower, currentDepth + 1)}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/60 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.upperBound, locale)}
            </p>
            <p className="mt-2 font-mono text-lg">{formatDecimal(current.upper, currentDepth + 1)}</p>
          </div>
        </div>
      </GlassPanel>

      <div className="mt-5 space-y-3">
        {rows.map((row) => {
          const left = percentWithin(row.lower, baseMin, baseMax);
          const right = percentWithin(row.upper, baseMin, baseMax);
          const isCurrent = row.depth === currentDepth;

          return (
            <GlassPanel
              key={`decimal-row-${row.depth}`}
              className={cn(
                "border border-border/60 bg-background/30 p-4",
                isCurrent && "border-primary/40"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <p className="font-semibold">
                  {getLocalizedText(interactiveLabels.step, locale)} {row.depth}
                </p>
                <p className="font-mono">
                  {formatDecimal(row.lower, row.depth + 1)} &lt; x &lt; {formatDecimal(row.upper, row.depth + 1)}
                </p>
              </div>
              <div className="relative mt-4 h-6 overflow-hidden rounded-full bg-background/60">
                <div
                  className={cn(
                    "absolute top-1 h-4 rounded-full",
                    isCurrent ? "bg-primary/50" : "bg-primary/20"
                  )}
                  style={{
                    left: `${left}%`,
                    width: `${Math.max(right - left, 1)}%`,
                  }}
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {getLocalizedText(interactiveLabels.intervalWidth, locale)} ={" "}
                {formatDecimal(row.upper - row.lower, row.depth + 2)}
              </p>
            </GlassPanel>
          );
        })}
      </div>
    </InteractiveShell>
  );
}

function SequenceLimitExplorer({ locale }: { locale: Locale }) {
  const epsilonOptions = [0.5, 0.2, 0.1, 0.05] as const;
  const sequences = [
    {
      candidate: 0,
      hasLimit: true,
      id: "one-over-n",
      label: text("1/n tends to 0", "1/n 趨向 0", "1/n 趋向 0"),
      note: text(
        "The terms shrink steadily, so once you choose epsilon you can eventually trap every later term inside the band around 0.",
        "各項穩定縮小，所以一旦選定 epsilon，到了某個位置之後，所有後面的項都會落在 0 周圍的帶內。",
        "各项稳定缩小，所以一旦选定 epsilon，到了某个位置之后，所有后面的项都会落在 0 周围的带内。"
      ),
      term: (n: number) => 1 / n,
    },
    {
      candidate: 5 / 3,
      hasLimit: true,
      id: "rational-ratio",
      label: text("(5n+2)/(3n-7) tends to 5/3", "(5n+2)/(3n-7) 趨向 5/3", "(5n+2)/(3n-7) 趋向 5/3"),
      note: text(
        "This example is less obvious term by term, but the same epsilon-N logic applies: the tail eventually sits inside every band around 5/3.",
        "這個例子逐項看起來較不直觀，但 epsilon-N 的邏輯完全相同：尾部最終會落入 5/3 周圍的每一條帶。",
        "这个例子逐项看起来较不直观，但 epsilon-N 的逻辑完全相同：尾部最终会落入 5/3 周围的每一条带。"
      ),
      term: (n: number) => (5 * n + 2) / (3 * n - 7),
    },
    {
      candidate: 0,
      hasLimit: false,
      id: "alternating",
      label: text("(-1)^n does not settle down", "(-1)^n 不會安定下來", "(-1)^n 不会安定下来"),
      note: text(
        "Odd and even terms keep jumping between -1 and 1, so no single number can capture the whole tail.",
        "奇數項和偶數項會一直在 -1 與 1 之間跳動，所以不存在一個單一數字可以抓住整條尾部。",
        "奇数项和偶数项会一直在 -1 与 1 之间跳动，所以不存在一个单一数字可以抓住整条尾部。"
      ),
      term: (n: number) => (n % 2 === 0 ? 1 : -1),
    },
  ] as const;
  const [selectedId, setSelectedId] = useState<(typeof sequences)[number]["id"]>("one-over-n");
  const [epsilon, setEpsilon] = useState<(typeof epsilonOptions)[number]>(0.2);
  const selectedSequence =
    sequences.find((sequence) => sequence.id === selectedId) ?? sequences[0];
  const rows = Array.from({ length: 12 }, (_, index) => {
    const n = index + 1;
    const value = selectedSequence.term(n);

    return {
      inside: Math.abs(value - selectedSequence.candidate) < epsilon,
      n,
      value,
    };
  });
  const firstGoodN = (() => {
    for (let candidateN = 0; candidateN <= 60; candidateN += 1) {
      let okay = true;

      for (let n = candidateN + 1; n <= 60; n += 1) {
        if (Math.abs(selectedSequence.term(n) - selectedSequence.candidate) >= epsilon) {
          okay = false;
          break;
        }
      }

      if (okay) {
        return candidateN;
      }
    }

    return null;
  })();

  return (
    <InteractiveShell icon={<ChartColumnBig className="h-5 w-5" />} locale={locale} widgetId="sequence-limit-explorer">
      <div className="flex flex-wrap gap-2">
        {sequences.map((sequence) => (
          <Button
            key={sequence.id}
            onClick={() => setSelectedId(sequence.id)}
            size="sm"
            type="button"
            variant={selectedId === sequence.id ? "default" : "outline"}
          >
            {getLocalizedText(sequence.label, locale)}
          </Button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {epsilonOptions.map((option) => (
          <Button
            key={`epsilon-${option}`}
            onClick={() => setEpsilon(option)}
            size="sm"
            type="button"
            variant={epsilon === option ? "default" : "outline"}
          >
            ε = {option}
          </Button>
        ))}
      </div>

      <GlassPanel className="mt-4 border border-border/60 bg-background/30 p-4">
        <p className="text-sm leading-7 text-muted-foreground">
          {getLocalizedText(selectedSequence.note, locale)}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border/50 bg-background/60 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.candidateLimit, locale)}
            </p>
            <p className="mt-2 font-mono text-lg">{formatDecimal(selectedSequence.candidate)}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/60 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.epsilonValue, locale)}
            </p>
            <p className="mt-2 font-mono text-lg">{epsilon}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/60 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {getLocalizedText(interactiveLabels.tailIndex, locale)}
            </p>
            <p className="mt-2 text-lg font-semibold">
              {firstGoodN === null ? "—" : firstGoodN}
            </p>
          </div>
        </div>
      </GlassPanel>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-[420px] text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="border-b border-border/50 py-2 pr-4">
                {getLocalizedText(interactiveLabels.termIndex, locale)}
              </th>
              <th className="border-b border-border/50 py-2 pr-4">
                {getLocalizedText(interactiveLabels.termValue, locale)}
              </th>
              <th className="border-b border-border/50 py-2">
                {getLocalizedText(interactiveLabels.bandCheck, locale)}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`sequence-row-${row.n}`} className="border-b border-border/30">
                <td className="py-2 pr-4 font-mono">{row.n}</td>
                <td className="py-2 pr-4 font-mono">{formatDecimal(row.value, 4)}</td>
                <td className="py-2">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                      row.inside
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                        : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                    )}
                  >
                    {row.inside
                      ? getLocalizedText(interactiveLabels.yes, locale)
                      : getLocalizedText(interactiveLabels.no, locale)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GlassPanel className="mt-4 border border-border/60 bg-background/30 p-4 text-sm">
        <p>
          <strong>{getLocalizedText(interactiveLabels.verdict, locale)}:</strong>{" "}
          {firstGoodN === null
            ? getLocalizedText(
                text(
                  "Within the first 60 terms, no tail stays inside the chosen epsilon-band. That matches the idea that this example does not converge to the displayed candidate limit.",
                  "在前 60 項裡，沒有任何一段尾部會一直留在所選 epsilon 帶內。這和這個例子不收斂到當前候選極限的直覺一致。",
                  "在前 60 项里，没有任何一段尾部会一直留在所选 epsilon 带内。这和这个例子不收敛到当前候选极限的直觉一致。"
                ),
                locale
              )
            : getLocalizedText(
                text(
                  `Starting after N = ${firstGoodN}, every checked term stays inside the band around L.`,
                  `從 N = ${firstGoodN} 之後開始，每個被檢查的項都留在 L 周圍的帶內。`,
                  `从 N = ${firstGoodN} 之后开始，每个被检查的项都留在 L 周围的带内。`
                ),
                locale
              )}
        </p>
      </GlassPanel>
    </InteractiveShell>
  );
}

function DeltaEpsilonLimitExplorer({ locale }: { locale: Locale }) {
  const epsilonOptions = [1, 0.5, 0.25, 0.1] as const;
  const examples = [
    {
      a: 3,
      deltaFor: (epsilon: number) => epsilon / 2,
      evaluate: (x: number) => 2 * x + 1,
      id: "linear",
      label: text("2x + 1 near x = 3", "2x + 1 在 x = 3 附近", "2x + 1 在 x = 3 附近"),
      limit: 7,
      sampleXs: [2.4, 2.8, 3.12, 3.4],
    },
    {
      a: 2,
      deltaFor: (epsilon: number) => epsilon,
      evaluate: (x: number) => (x * x - 4) / (x - 2),
      id: "hole",
      label: text("((x^2 - 4)/(x - 2)) near x = 2", "((x^2 - 4)/(x - 2)) 在 x = 2 附近", "((x^2 - 4)/(x - 2)) 在 x = 2 附近"),
      limit: 4,
      sampleXs: [1.5, 1.9, 2.1, 2.45],
    },
  ] as const;
  const [selectedId, setSelectedId] = useState<(typeof examples)[number]["id"]>("linear");
  const [epsilon, setEpsilon] = useState<(typeof epsilonOptions)[number]>(0.5);
  const selectedExample =
    examples.find((example) => example.id === selectedId) ?? examples[0];
  const [sampleIndex, setSampleIndex] = useState(1);
  const delta = selectedExample.deltaFor(epsilon);
  const sampleX =
    selectedExample.sampleXs[Math.min(sampleIndex, selectedExample.sampleXs.length - 1)] ??
    selectedExample.sampleXs[0];
  const sampleY = selectedExample.evaluate(sampleX);
  const xCondition = Math.abs(sampleX - selectedExample.a) > 0 && Math.abs(sampleX - selectedExample.a) < delta;
  const yCondition = Math.abs(sampleY - selectedExample.limit) < epsilon;
  const xMin = selectedExample.a - 1.2;
  const xMax = selectedExample.a + 1.2;
  const yMin = selectedExample.limit - 2.5;
  const yMax = selectedExample.limit + 2.5;

  return (
    <InteractiveShell icon={<Sigma className="h-5 w-5" />} locale={locale} widgetId="delta-epsilon-limit-explorer">
      <div className="flex flex-wrap gap-2">
        {examples.map((example) => (
          <Button
            key={example.id}
            onClick={() => {
              setSelectedId(example.id);
              setSampleIndex(1);
            }}
            size="sm"
            type="button"
            variant={selectedId === example.id ? "default" : "outline"}
          >
            {getLocalizedText(example.label, locale)}
          </Button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {epsilonOptions.map((option) => (
          <Button
            key={`delta-epsilon-${option}`}
            onClick={() => setEpsilon(option)}
            size="sm"
            type="button"
            variant={epsilon === option ? "default" : "outline"}
          >
            ε = {option}
          </Button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {selectedExample.sampleXs.map((value, index) => (
          <Button
            key={`sample-x-${value}`}
            onClick={() => setSampleIndex(index)}
            size="sm"
            type="button"
            variant={sampleX === value ? "default" : "outline"}
          >
            x = {formatDecimal(value, 2)}
          </Button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <IntervalStrip
          center={selectedExample.a}
          innerMax={selectedExample.a + delta}
          innerMin={selectedExample.a - delta}
          label={getLocalizedText(
            text(
              `0 < |x - a| < δ, with δ = ${formatDecimal(delta, 3)}`,
              `0 < |x - a| < δ，其中 δ = ${formatDecimal(delta, 3)}`,
              `0 < |x - a| < δ，其中 δ = ${formatDecimal(delta, 3)}`
            ),
            locale
          )}
          max={xMax}
          min={xMin}
          point={sampleX}
          pointLabel={`x = ${formatDecimal(sampleX, 2)}`}
        />
        <IntervalStrip
          center={selectedExample.limit}
          innerMax={selectedExample.limit + epsilon}
          innerMin={selectedExample.limit - epsilon}
          label={getLocalizedText(
            text(
              `|f(x) - L| < ε, with ε = ${epsilon}`,
              `|f(x) - L| < ε，其中 ε = ${epsilon}`,
              `|f(x) - L| < ε，其中 ε = ${epsilon}`
            ),
            locale
          )}
          max={yMax}
          min={yMin}
          point={sampleY}
          pointLabel={`f(x) = ${formatDecimal(sampleY, 2)}`}
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <GlassPanel className="border border-border/60 bg-background/30 p-4 text-sm">
          <p>
            <strong>0 &lt; |x - a| &lt; δ</strong>
          </p>
          <p className="mt-2 font-mono">
            |{formatDecimal(sampleX, 3)} - {formatDecimal(selectedExample.a, 3)}| ={" "}
            {formatDecimal(Math.abs(sampleX - selectedExample.a), 3)}
          </p>
          <p className="mt-2 text-muted-foreground">
            {xCondition
              ? getLocalizedText(
                  text("The chosen x really lies inside the delta-neighbourhood.", "所選 x 的確落在 delta 鄰域內。", "所选 x 的确落在 delta 邻域内。"),
                  locale
                )
              : getLocalizedText(
                  text("This x is outside the allowed delta-neighbourhood, so the implication says nothing yet.", "這個 x 不在允許的 delta 鄰域內，所以蘊含式暫時不能告訴我們任何事。", "这个 x 不在允许的 delta 邻域内，所以蕴含式暂时不能告诉我们任何事。"),
                  locale
                )}
          </p>
        </GlassPanel>
        <GlassPanel className="border border-border/60 bg-background/30 p-4 text-sm">
          <p>
            <strong>|f(x) - L| &lt; ε</strong>
          </p>
          <p className="mt-2 font-mono">
            |{formatDecimal(sampleY, 3)} - {formatDecimal(selectedExample.limit, 3)}| ={" "}
            {formatDecimal(Math.abs(sampleY - selectedExample.limit), 3)}
          </p>
          <p className="mt-2 text-muted-foreground">
            {yCondition
              ? getLocalizedText(
                  text("The function value lands inside the epsilon-band around L.", "函數值落在 L 周圍的 epsilon 帶內。", "函数值落在 L 周围的 epsilon 带内。"),
                  locale
                )
              : getLocalizedText(
                  text("The function value is still outside the epsilon-band, so this sample does not yet certify the limit condition.", "函數值仍然在 epsilon 帶外，所以這個樣本還不能驗證極限定義。", "函数值仍然在 epsilon 带外，所以这个样本还不能验证极限定义。"),
                  locale
                )}
          </p>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

function CardinalityComparisonLab({ locale }: { locale: Locale }) {
  const cases = [
    {
      id: "finite-bijection",
      label: text("Three objects vs three labels", "三個物件對三個標籤", "三个物件对三个标签"),
      relation: text("|X| = |Y|", "|X| = |Y|", "|X| = |Y|"),
      map: text("a -> 1, b -> 2, c -> 3", "a -> 1, b -> 2, c -> 3", "a -> 1, b -> 2, c -> 3"),
      why: text(
        "Every element of X is used once and every element of Y is hit once, so the displayed function is a bijection.",
        "X 的每個元素都用了一次，Y 的每個元素亦被命中一次，所以這個函數是雙射。",
        "X 的每个元素都用了一次，Y 的每个元素也被命中一次，所以这个函数是双射。"
      ),
    },
    {
      id: "injection-only",
      label: text("A proper injection", "真正的單射例子", "真正的单射例子"),
      relation: text("|{0,1,2}| <= |{0,1,2,3}|", "|{0,1,2}| <= |{0,1,2,3}|", "|{0,1,2}| <= |{0,1,2,3}|"),
      map: text("0 -> 0, 1 -> 1, 2 -> 2", "0 -> 0, 1 -> 1, 2 -> 2", "0 -> 0, 1 -> 1, 2 -> 2"),
      why: text(
        "The map is injective, but 3 is not hit. This proves <=, not equality.",
        "這個映射是單射，但 3 沒有被命中。它證明的是 <=，不是相等。",
        "这个映射是单射，但 3 没有被命中。它证明的是 <=，不是相等。"
      ),
    },
    {
      id: "integers-countable",
      label: text("Enumerating Z", "枚舉 Z", "枚举 Z"),
      relation: text("|N| = |Z|", "|N| = |Z|", "|N| = |Z|"),
      map: text("0, 1, -1, 2, -2, 3, -3, ...", "0, 1, -1, 2, -2, 3, -3, ...", "0, 1, -1, 2, -2, 3, -3, ..."),
      why: text(
        "A single sequence can list every integer exactly once, so Z is countable.",
        "一條序列可以把每個整數恰好列出一次，所以 Z 是可數的。",
        "一条序列可以把每个整数恰好列出一次，所以 Z 是可数的。"
      ),
    },
    {
      id: "positive-rationals",
      label: text("Diagonal scan of positive rationals", "正有理數的對角掃描", "正有理数的对角扫描"),
      relation: text("|N| = |Q^+|", "|N| = |Q^+|", "|N| = |Q^+|"),
      map: text("1/1, 1/2, 2/1, 1/3, 3/1, 1/4, 2/3, 3/2, 4/1, ...", "1/1, 1/2, 2/1, 1/3, 3/1, 1/4, 2/3, 3/2, 4/1, ...", "1/1, 1/2, 2/1, 1/3, 3/1, 1/4, 2/3, 3/2, 4/1, ..."),
      why: text(
        "Scanning by p+q reaches every positive rational; reduced duplicates can be skipped without losing countability.",
        "按 p+q 掃描會到達每個正有理數；遇到未約分的重複項可跳過，不會影響可數性。",
        "按 p+q 扫描会到达每个正有理数；遇到未约分的重复项可跳过，不会影响可数性。"
      ),
    },
  ] as const;
  const [selected, setSelected] = useState<(typeof cases)[number]["id"]>("finite-bijection");
  const current = cases.find((item) => item.id === selected) ?? cases[0];

  return (
    <InteractiveShell icon={<ArrowLeftRight className="h-5 w-5" />} locale={locale} widgetId="cardinality-comparison-lab">
      <div className="flex flex-wrap gap-2">
        {cases.map((item) => (
          <Button
            key={item.id}
            onClick={() => setSelected(item.id)}
            size="sm"
            type="button"
            variant={selected === item.id ? "default" : "outline"}
          >
            {getLocalizedText(item.label, locale)}
          </Button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {getLocalizedText(interactiveLabels.relation, locale)}
          </p>
          <p className="mt-3 font-mono text-lg">{getLocalizedText(current.relation, locale)}</p>
        </GlassPanel>
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {getLocalizedText(interactiveLabels.pointsTo, locale)}
          </p>
          <p className="mt-3 font-mono text-sm leading-7">{getLocalizedText(current.map, locale)}</p>
        </GlassPanel>
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {getLocalizedText(interactiveLabels.why, locale)}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {getLocalizedText(current.why, locale)}
          </p>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

function CantorDiagonalLab({ locale }: { locale: Locale }) {
  const rows = [
    { index: 0, values: [0, 2, 4] },
    { index: 1, values: [0, 1, 3, 5] },
    { index: 2, values: [2, 3] },
    { index: 3, values: [0, 4] },
    { index: 4, values: [1, 4, 5] },
    { index: 5, values: [] },
  ] as const;
  const diagonal = rows.map((row) => ({
    index: row.index,
    inListedSet: (row.values as readonly number[]).includes(row.index),
    inDiagonalSet: !(row.values as readonly number[]).includes(row.index),
  }));
  const diagonalSet = diagonal
    .filter((row) => row.inDiagonalSet)
    .map((row) => row.index)
    .join(", ");

  return (
    <InteractiveShell icon={<ListChecks className="h-5 w-5" />} locale={locale} widgetId="cantor-diagonal-lab">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="border-b border-border/50 py-2 pr-4">n</th>
                  <th className="border-b border-border/50 py-2 pr-4">f(n)</th>
                  <th className="border-b border-border/50 py-2 pr-4">n in f(n)?</th>
                  <th className="border-b border-border/50 py-2">n in T?</th>
                </tr>
              </thead>
              <tbody>
                {diagonal.map((row) => {
                  const source = rows[row.index];
                  return (
                    <tr key={`cantor-row-${row.index}`} className="border-b border-border/30">
                      <td className="py-2 pr-4 font-mono">{row.index}</td>
                      <td className="py-2 pr-4 font-mono">{`{${source.values.join(", ")}}`}</td>
                      <td className="py-2 pr-4">{row.inListedSet ? getLocalizedText(interactiveLabels.yes, locale) : getLocalizedText(interactiveLabels.no, locale)}</td>
                      <td className="py-2">{row.inDiagonalSet ? getLocalizedText(interactiveLabels.yes, locale) : getLocalizedText(interactiveLabels.no, locale)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassPanel>
        <GlassPanel className="border border-border/60 bg-background/30 p-4">
          <p className="text-sm font-semibold">
            T = {"{"}{diagonalSet}{"}"}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {getLocalizedText(
              text(
                "This finite table only illustrates the rule. In the proof, T = {n in N : n notin f(n)} differs from every listed f(n) exactly at row n, so no list can contain all subsets of N.",
                "這張有限表只示範規則。正式證明中，T = {n in N : n notin f(n)} 會在第 n 行恰好不同於 f(n)，所以任何列表都不可能包含 N 的所有子集。",
                "这张有限表只示范规则。正式证明中，T = {n in N : n notin f(n)} 会在第 n 行恰好不同于 f(n)，所以任何列表都不可能包含 N 的所有子集。"
              ),
              locale
            )}
          </p>
        </GlassPanel>
      </div>
    </InteractiveShell>
  );
}

function CantorSetStageViewer({ locale }: { locale: Locale }) {
  const stages = [
    { intervals: [[0, 1]], label: "C_0", removed: "0" },
    { intervals: [[0, 1 / 3], [2 / 3, 1]], label: "C_1", removed: "1/3" },
    { intervals: [[0, 1 / 9], [2 / 9, 1 / 3], [2 / 3, 7 / 9], [8 / 9, 1]], label: "C_2", removed: "1/3 + 2/9" },
    {
      intervals: [
        [0, 1 / 27],
        [2 / 27, 1 / 9],
        [2 / 9, 7 / 27],
        [8 / 27, 1 / 3],
        [2 / 3, 19 / 27],
        [20 / 27, 7 / 9],
        [8 / 9, 25 / 27],
        [26 / 27, 1],
      ],
      label: "C_3",
      removed: "1/3 + 2/9 + 4/27",
    },
  ] as const;
  const [stage, setStage] = useState(0);
  const current = stages[stage];

  return (
    <InteractiveShell icon={<Braces className="h-5 w-5" />} locale={locale} widgetId="cantor-set-stage-viewer">
      <div className="flex flex-wrap gap-2">
        {stages.map((item, index) => (
          <Button
            key={item.label}
            onClick={() => setStage(index)}
            size="sm"
            type="button"
            variant={stage === index ? "default" : "outline"}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <GlassPanel className="mt-5 border border-border/60 bg-background/30 p-4">
        <div className="relative h-16 rounded-xl border border-border/50 bg-background/70">
          {current.intervals.map(([start, end], index) => (
            <div
              key={`${current.label}-${index}`}
              className="absolute top-5 h-6 rounded bg-primary/65"
              style={{
                left: `${start * 100}%`,
                width: `${(end - start) * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Stage</p>
            <p className="mt-2 font-mono">{current.label}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {getLocalizedText(text("Remaining intervals", "剩餘區間", "剩余区间"), locale)}
            </p>
            <p className="mt-2 font-mono">{current.intervals.length}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {getLocalizedText(text("Removed length so far", "已移除長度", "已移除长度"), locale)}
            </p>
            <p className="mt-2 font-mono">{current.removed}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {getLocalizedText(
            text(
              "The limit set keeps exactly those points that can be written in ternary using only the digits 0 and 2.",
              "極限集合保留的正是可以只用三進制數字 0 與 2 表示的點。",
              "极限集合保留的正是可以只用三进制数字 0 与 2 表示的点。"
            ),
            locale
          )}
        </p>
      </GlassPanel>
    </InteractiveShell>
  );
}

function MonoidGroupLawChecker({ locale }: { locale: Locale }) {
  const cases = [
    {
      id: "z-plus",
      label: text("(Z,+)", "(Z,+)", "(Z,+)"),
      checks: [
        { label: text("Associative", "結合律", "结合律"), passes: true, note: text("(a+b)+c = a+(b+c).", "(a+b)+c = a+(b+c)。", "(a+b)+c = a+(b+c)。") },
        { label: text("Identity", "單位元", "单位元"), passes: true, note: text("0 is the identity.", "0 是單位元。", "0 是单位元。") },
        { label: text("Inverse", "逆元", "逆元"), passes: true, note: text("The inverse of a is -a.", "a 的逆元是 -a。", "a 的逆元是 -a。") },
      ],
      verdict: text("This is a group.", "這是一個群。", "这是一个群。"),
    },
    {
      id: "n-plus",
      label: text("(N,+)", "(N,+)", "(N,+)"),
      checks: [
        { label: text("Associative", "結合律", "结合律"), passes: true, note: text("Addition is associative.", "加法有結合律。", "加法有结合律。") },
        { label: text("Identity", "單位元", "单位元"), passes: true, note: text("0 is the identity.", "0 是單位元。", "0 是单位元。") },
        { label: text("Inverse", "逆元", "逆元"), passes: false, note: text("1 has no natural-number additive inverse.", "1 沒有自然數加法逆元。", "1 没有自然数加法逆元。") },
      ],
      verdict: text("This is a monoid, but not a group.", "這是一個 monoid，但不是群。", "这是一个 monoid，但不是群。"),
    },
    {
      id: "z-minus",
      label: text("(Z,-)", "(Z,-)", "(Z,-)"),
      checks: [
        { label: text("Associative", "結合律", "结合律"), passes: false, note: text("(3-2)-1 = 0, but 3-(2-1) = 2.", "(3-2)-1 = 0，但 3-(2-1) = 2。", "(3-2)-1 = 0，但 3-(2-1) = 2。") },
        { label: text("Identity", "單位元", "单位元"), passes: false, note: text("0 is a right identity, but not a two-sided identity.", "0 是右單位元，但不是雙邊單位元。", "0 是右单位元，但不是双边单位元。") },
        { label: text("Inverse", "逆元", "逆元"), passes: false, note: text("Without a monoid identity, the group question already fails.", "沒有 monoid 單位元，群結構已經失敗。", "没有 monoid 单位元，群结构已经失败。") },
      ],
      verdict: text("This is not a monoid.", "這不是 monoid。", "这不是 monoid。"),
    },
    {
      id: "boolean-plus",
      label: text("(B,+ mod 2)", "(B,+ mod 2)", "(B,+ mod 2)"),
      checks: [
        { label: text("Associative", "結合律", "结合律"), passes: true, note: text("The two-element addition table is associative.", "二元素加法表滿足結合律。", "二元素加法表满足结合律。") },
        { label: text("Identity", "單位元", "单位元"), passes: true, note: text("0 is the identity.", "0 是單位元。", "0 是单位元。") },
        { label: text("Inverse", "逆元", "逆元"), passes: true, note: text("Each element is its own inverse.", "每個元素都是自己的逆元。", "每个元素都是自己的逆元。") },
      ],
      verdict: text("This is a group.", "這是一個群。", "这是一个群。"),
    },
  ] as const;
  const [selected, setSelected] = useState<(typeof cases)[number]["id"]>("z-plus");
  const current = cases.find((item) => item.id === selected) ?? cases[0];

  return (
    <InteractiveShell icon={<Sigma className="h-5 w-5" />} locale={locale} widgetId="monoid-group-law-checker">
      <div className="flex flex-wrap gap-2">
        {cases.map((item) => (
          <Button
            key={item.id}
            onClick={() => setSelected(item.id)}
            size="sm"
            type="button"
            variant={selected === item.id ? "default" : "outline"}
          >
            {getLocalizedText(item.label, locale)}
          </Button>
        ))}
      </div>
      <GlassPanel className="mt-4 border border-border/60 bg-background/30 p-4">
        <p className="text-sm font-semibold">{getLocalizedText(current.verdict, locale)}</p>
      </GlassPanel>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {current.checks.map((check) => (
          <GlassPanel key={check.label.en} className="border border-border/60 bg-background/30 p-4">
            <p className="text-sm font-semibold">{getLocalizedText(check.label, locale)}</p>
            <p className={cn("mt-2 text-sm font-medium", check.passes ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400")}>
              {check.passes ? getLocalizedText(interactiveLabels.yes, locale) : getLocalizedText(interactiveLabels.no, locale)}
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

const interactiveComponents = {
  "adt-stack-queue-stepper": AdtStackQueueStepper,
  "cantor-diagonal-lab": CantorDiagonalLab,
  "cantor-set-stage-viewer": CantorSetStageViewer,
  "cardinality-comparison-lab": CardinalityComparisonLab,
  "complexity-growth-comparator": ComplexityGrowthComparator,
  "decimal-approximation-builder": DecimalApproximationBuilder,
  "dedekind-cut-explorer": DedekindCutExplorer,
  "delta-epsilon-limit-explorer": DeltaEpsilonLimitExplorer,
  "hash-bucket-lab": HashBucketLab,
  "independence-checker": IndependenceChecker,
  "invertibility-row-reduction-demo": InvertibilityRowReductionDemo,
  "induction-stepper": InductionStepper,
  "integer-equivalence-explorer": IntegerEquivalenceExplorer,
  "matrix-reading-trainer": MatrixReadingTrainer,
  "matrix-multiplication-visualizer": MatrixMultiplicationVisualizer,
  "monoid-group-law-checker": MonoidGroupLawChecker,
  "pointer-state-tracer": PointerStateTracer,
  "quantifier-negation-stepper": QuantifierNegationStepper,
  "rational-representative-lab": RationalRepresentativeLab,
  "row-reduction-stepper": RowReductionStepper,
  "sequence-limit-explorer": SequenceLimitExplorer,
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
