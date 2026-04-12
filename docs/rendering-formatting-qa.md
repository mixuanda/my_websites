# Rendering and formatting QA

This document records rendering-specific audits for the public Notes section.
Use it to track problems in the MDX pipeline, KaTeX display, spacing, and
block-level note formatting without exposing internal authoring detail on the
site itself.

## Latest resume state

As of April 13, 2026, the latest local rendering-related checkpoints are:

- `9085148` `Fix note block prompt rendering`
- `49345a4` `Fix set note reveal integrity`
- `0526751` `Deepen augmented matrix notes`

Every push attempt for those checkpoints failed with the same external error:
`ssh: Could not resolve hostname github.com: Temporary failure in name
resolution`.

The next resume point is a representative formatting and content pass on
`2.3 Gaussian elimination and RREF`, while keeping the textbook inline-math
renderer and note-block behavior aligned.

## Current findings

The current rendering pass confirmed that the repository already wires
`remark-math`, `rehype-katex`, KaTeX CSS, and the textbook MDX renderer
together. The remaining defects are not missing-package issues. They are
component- and authoring-shape issues inside the existing Notes stack.

- Textbook note bodies contain many backticked notation fragments such as `Q`,
  `R^3`, `A^{-1}`, `Ax = b`, and `sqrt(2)`.
- The shared renderer now promotes obvious mathematical notation in both block
  titles and textbook body code spans.
- The current remaining rendering risk is interaction shape and representative
  export QA, not missing math infrastructure.

## Checkpoint log

This log keeps the implementation state resumable across runs.

### 2026-04-13 checkpoint 1: rendering pipeline and inline notation

This checkpoint focused on textbook-only rendering rather than content
expansion.

- Checkpoint name: Rendering pipeline and inline textbook notation
- What was inspected: `AGENTS.md`, `contentlayer.config.ts`,
  `src/app/globals.css`, `src/components/Mdx.tsx`,
  `src/components/textbook/TextbookMdx.tsx`,
  `src/components/textbook/mdx-components.tsx`,
  `src/components/textbook/mdx-blocks.tsx`,
  `src/app/[locale]/notes/[course]/[chapter]/[unit]/page.tsx`,
  representative `content/textbook/**` units, and representative
  `reference/MATH1030/**` and `reference/MATH1090/**` sources
- What was changed: added a textbook-only inline-code renderer that promotes
  obvious mathematical notation to KaTeX while leaving filenames and plain
  language as code text; tightened the same heuristic for title and prompt rich
  text so non-math backticks do not get pushed through KaTeX
- What was verified: manual diff review of the textbook MDX component layer;
  attempted direct `next build` and TypeScript verification through the
  available Windows Node binary because no Linux `node` executable is present
  in WSL for this repository
- Files touched: `src/components/textbook/mdx-blocks.tsx`,
  `src/components/textbook/mdx-components.tsx`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`,
  `docs/reference-coverage.md`,
  `docs/content-parity-checklist.md`
- Remaining issues: `QuickCheck` still uses a reveal-style shell even though
  many authored units use it as a visible prompt plus hint block followed by a
  separate `RevealSolution`
- Exact next target: checkpoint 2, exercise / answer / reveal integrity in the
  textbook MDX blocks and representative authored units
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: start from `src/components/textbook/mdx-blocks.tsx`
  and the representative units that currently pair `QuickCheck` with a
  following `RevealSolution`

### 2026-04-13 checkpoint 4: visible quick-check prompts

This checkpoint adjusted the shared note-block rendering so quick-check prompts
behave like visible textbook callouts rather than collapsible panels.

- Checkpoint name: visible quick-check prompts
- What was inspected: `src/components/textbook/mdx-blocks.tsx` and the current
  authored usage of `QuickCheck` and `RevealSolution`
- What was changed: `QuickCheck` now uses a visible `BlockFrame` instead of the
  shared toggle shell
- What was verified: the change matches the authored pattern where the prompt
  and hint are visible and the answer lives in `RevealSolution`
- Files touched: `src/components/textbook/mdx-blocks.tsx`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`,
  `docs/reference-coverage.md`,
  `docs/content-parity-checklist.md`
- Remaining issues: representative page QA and export QA still need a wider pass
- Exact next target: verify export behavior for visible quick checks once the
  environment blocker on build and push clears
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: continue from the shared note-block renderer before
  deepening the next source-backed note
