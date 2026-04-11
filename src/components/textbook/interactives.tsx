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
  next: text("Next step", "下一步", "下一步"),
  previous: text("Previous step", "上一步", "上一步"),
  reset: text("Reset", "重設", "重置"),
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
      "Start with the augmented matrix of the system.",
      "先由方程組的增廣矩陣開始。",
      "先由方程组的增广矩阵开始。"
    ),
    matrix: [[1, 2, -1, 3], [2, 5, 1, 8], [0, 1, 2, 4]],
  },
  {
    explanation: text(
      "Use R2 - 2R1 to clear the entry below the first pivot.",
      "用 R2 - 2R1 消去第一個主元下方的元素。",
      "用 R2 - 2R1 消去第一个主元下方的元素。"
    ),
    matrix: [[1, 2, -1, 3], [0, 1, 3, 2], [0, 1, 2, 4]],
  },
  {
    explanation: text(
      "Use R3 - R2 to create a pivot in the third row.",
      "再用 R3 - R2 在第三行製造主元。",
      "再用 R3 - R2 在第三行制造主元。"
    ),
    matrix: [[1, 2, -1, 3], [0, 1, 3, 2], [0, 0, -1, 2]],
  },
  {
    explanation: text(
      "Back-substitute to read the solution directly from the triangular form.",
      "最後回代，就可直接從三角形形式讀出解。",
      "最后回代，就可直接从三角形形式读出解。"
    ),
    matrix: [[1, 0, -7, -1], [0, 1, 3, 2], [0, 0, -1, 2]],
  },
];

function RowReductionStepper({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const current = rowReductionSteps[step];

  return (
    <InteractiveShell icon={<StepForward className="h-5 w-5" />} locale={locale} widgetId="row-reduction-stepper">
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
          onClick={() => setStep((value) => Math.min(rowReductionSteps.length - 1, value + 1))}
          size="sm"
          type="button"
        >
          {getLocalizedText(interactiveLabels.next, locale)}
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

const interactiveComponents = {
  "invertibility-row-reduction-demo": InvertibilityRowReductionDemo,
  "matrix-multiplication-visualizer": MatrixMultiplicationVisualizer,
  "quantifier-negation-stepper": QuantifierNegationStepper,
  "row-reduction-stepper": RowReductionStepper,
  "set-operation-explorer": SetOperationExplorer,
  "solution-set-classifier": SolutionSetClassifier,
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
