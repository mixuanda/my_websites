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
- `95f3ad7` `Deepen invertible matrix notes`

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

### 2026-04-13 checkpoint 5: invertibility note expansion

This checkpoint extended an existing note rather than changing the renderer,
but it still needed structural QA because the page gained more theorem blocks,
quick checks, and display math.

- Checkpoint name: Invertibility note expansion
- What was inspected: the three localized `5.1 Invertible matrices` MDX files
  and the extracted MATH1030 reference packets for row-equivalence and RREF
  uniqueness
- What was changed: added new sections on row-equivalence through invertible
  matrices, preserved column relations, uniqueness of RREF, rank, and matching
  quick checks in EN, zh-HK, and zh-CN
- What was verified: diff review confirmed the new sections and block ordering
  are present in all three locales; direct `next build` remains blocked by the
  mixed-platform Contentlayer / esbuild environment and therefore could not be
  used as the final page-render verification step
- Files touched: `content/textbook/math1030/invertibility/invertible-matrices/en.mdx`,
  `content/textbook/math1030/invertibility/invertible-matrices/zh-hk.mdx`,
  `content/textbook/math1030/invertibility/invertible-matrices/zh-cn.mdx`,
  `src/lib/textbook/catalog.ts`,
  `docs/rendering-formatting-qa.md`,
  `docs/reference-coverage.md`,
  `docs/content-parity-checklist.md`,
  `docs/exercise-solution-integrity.md`
- Remaining issues: representative visual QA and export QA still need a
  platform-matched build environment
- Exact next target: move to the next source-backed MATH1030 unit without
  reopening the textbook shell components
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: continue from the next MATH1030 backlog item after
  this `5.1` content checkpoint is committed
  
Current checkpoint resolution:

- Commit created: yes, `95f3ad7` (`Deepen invertible matrix notes`)
- Push succeeded: no. `git push origin main` failed with
  `ssh: Could not resolve hostname github.com: Temporary failure in name resolution`
- Current resume point: once DNS and a platform-matched Node / esbuild setup
  are available, run representative page QA on the expanded `5.1` note and
  continue to the next MATH1030 backlog unit
