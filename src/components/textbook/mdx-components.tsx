import type { MDXComponents } from "mdx/types";
import type { Locale } from "@/lib/textbook/types";
import {
  CollapsibleProof,
  CommonMistake,
  Definition,
  LinearSystemGeometryFigure,
  MatrixAnatomyFigure,
  QuickCheck,
  RevealSolution,
  TextbookInlineCode,
  TheoremCard,
  WorkedExample,
} from "./mdx-blocks";
import { InteractiveWidget } from "./interactives";

export function createTextbookMdxComponents(locale: Locale): MDXComponents {
  return {
    CollapsibleProof: (props: { children?: React.ReactNode; title?: string }) => (
      <CollapsibleProof locale={locale} {...props} />
    ),
    CommonMistake: (props: { children?: React.ReactNode; title?: string }) => (
      <CommonMistake locale={locale} {...props} />
    ),
    Definition: (props: { children?: React.ReactNode; title?: string }) => (
      <Definition locale={locale} {...props} />
    ),
    InteractiveWidget: (props: { id: string }) => (
      <InteractiveWidget locale={locale} {...props} />
    ),
    LinearSystemGeometryFigure: () => (
      <LinearSystemGeometryFigure locale={locale} />
    ),
    MatrixAnatomyFigure: () => (
      <MatrixAnatomyFigure locale={locale} />
    ),
    code: (props: { children?: React.ReactNode; className?: string }) => (
      <TextbookInlineCode {...props} />
    ),
    QuickCheck: (props: { children?: React.ReactNode; prompt: string }) => (
      <QuickCheck locale={locale} {...props} />
    ),
    RevealSolution: (props: { children?: React.ReactNode; title?: string }) => (
      <RevealSolution locale={locale} {...props} />
    ),
    TheoremCard: (props: { children?: React.ReactNode; title?: string }) => (
      <TheoremCard locale={locale} {...props} />
    ),
    WorkedExample: (props: { children?: React.ReactNode; title?: string }) => (
      <WorkedExample locale={locale} {...props} />
    ),
  };
}
