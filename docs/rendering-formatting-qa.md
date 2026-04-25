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

The current local workspace also includes an uncommitted formatting pass that
replaces the brittle augmented-matrix markup in `math1030` unit `2.4` with
`array`-based display math and removes public source-process phrasing from the
rewritten `math1090` unit `3.4`. The same local pass also cleaned the rewritten
`math1030` `6.1`, `6.2`, and `6.3` localized files so they no longer leave
Chinese punctuation inside display-math blocks, and it repaired English-only
prerequisite-link labels in the zh-HK and zh-CN `6.6` note.

Every push attempt for those checkpoints failed with the same external error:
`ssh: Could not resolve hostname github.com: Temporary failure in name
resolution`.

The next resume point is the first Math1090 chapter-4 note plus representative
export / theme QA on the richer chapter-6 Math1030 notes, while keeping the
inline-math renderer and export output aligned with the newer `2.4`, `6.1`,
`6.2`, and `6.3` notation cleanup.

April 24, 2026 QA update:

- corrected the zh-HK public route text in related-note links from
  `/zh-hk/這些筆記/**` back to `/zh-hk/notes/**`;
- verified all authored `/[locale]/notes/[course]/[chapter]/[unit]` links in
  `content/textbook/**` point to existing note units;
- removed public authoring-source phrasing from audited math note prose so the
  rendered pages read as clean course notes instead of process commentary.
- added five CSCI2520 note units in EN, zh-HK, and zh-CN; the new files use
  existing `Definition`, `TheoremCard`, `WorkedExample`, `QuickCheck`, and
  `RevealSolution` blocks without introducing new component types.
- `npm run contentlayer` passed after the CSCI2520 expansion and regenerated
  181 documents.
- the latest MATH1090 `3.3` / `3.4` pass rendered new interactive widgets,
  theorem/proof blocks, and added exercises in EN, zh-HK, and zh-CN; export
  checks confirmed the new widgets degrade into static study snapshots in TXT,
  and PDF export routes returned `application/pdf`.
- the April 25 MATH1030 gap pass added EN / zh-HK / zh-CN units for `4.2` and
  `6.7`, expanded `6.5`, and inserted one static SVG diagram into `6.6`; these
  pages use existing MDX block types and should be included in the next export
  and visual QA sample.
- the next April 25 pass added `3.3 Row-operation matrices` and algorithmic
  expansions to `6.3`, `6.4`, and `6.5`, again using existing theorem,
  proof, worked-example, quick-check, and reveal-solution block types.
- the Math1025 expansion pass added three EN / zh-HK / zh-CN unit families
  using existing `Definition`, `TheoremCard`, `CollapsibleProof`,
  `WorkedExample`, `CommonMistake`, `QuickCheck`, and `RevealSolution` blocks;
  `npm run contentlayer` regenerated 202 documents after the new files and
  catalog metadata landed, and `npm run build` completed successfully with the
  new Math1025 routes included.

## Current findings

The current rendering pass confirmed that the repository already wires
`remark-math`, `rehype-katex`, KaTeX CSS, and the textbook MDX renderer
together. The remaining defects are not missing-package issues. They are
component- and authoring-shape issues inside the existing Notes stack.

- Textbook note bodies contain many backticked notation fragments such as `Q`,
  `R^3`, `A^{-1}`, `Ax = b`, and `sqrt(2)`.
- The shared renderer now promotes obvious mathematical notation in both block
  titles and textbook body code spans.
- The current remaining rendering risk is representative export QA and
  cross-locale content drift, not missing math infrastructure.

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

### 2026-04-25 checkpoint 6: MATH1030 TOC and checkpoint math rendering

- Checkpoint name: MATH1030 TOC and checkpoint math rendering
- What was inspected: the shared note TOC, MATH1030 note pages, and checkpoint
  prompt / answer rendering components
- What was changed: `Toc` now defaults to `h2` / `h3` article headings and no
  longer collects `h4` titles from definition, theorem, example, proof,
  quick-check, or solution cards; checkpoint prompts, choices, preview text,
  hints, correct-answer previews, and solution steps now render inline math
  through the shared textbook rich-text renderer
- Visual note: `math1030` `1.1` now embeds a compact geometric line-system
  figure for unique / none / infinitely-many solution types across EN, zh-HK,
  and zh-CN
- Remaining issues: browser QA should confirm the simplified TOC on a long
  MATH1030 page and the rendered checkpoint math on a representative free page
  plus a representative member-gated page

### 2026-04-25 checkpoint 7: MATH1030 2.1 complete-section structure

- Checkpoint name: MATH1030 `2.1 Matrix basics` structure and figure pass
- What was inspected: the localized matrix-basics MDX files, the shared MDX
  block registry, the matrix interactive registry, the static interactive
  export snapshots, and the checkpoint problem bank
- What was changed: the note now follows a fuller course-section shape with
  prerequisite preparation, matrix anatomy figure, guided matrix-reading
  interaction, textbook examples, a beginner-facing problem-solving routine,
  and a larger checkpoint set
- Rendering note: the added figure is a shared MDX block rather than a
  locale-specific image, so labels localize through the same EN / zh-HK /
  zh-CN component path and export can still degrade the interaction separately
- Remaining issues: run browser QA on EN, zh-HK, and zh-CN pages after the
  contentlayer and production build refresh

### 2026-04-25 checkpoint 8: MATH1030 5.1 single-chapter expansion

- Checkpoint name: MATH1030 `5.1 Invertible matrices` single-chapter depth pass
- What was inspected: the one-unit `invertibility` chapter, the localized
  invertible-matrices MDX files, the existing row-reduction interactions, and
  the checkpoint problem bank
- What was changed: added a prerequisite section, one-sided inverse warning,
  theorem-dictionary workflow, null-space proof of non-invertibility,
  inverse-solve worked example, and a problem-solving routine before the
  row-reduction example
- Rendering note: the new material uses existing theorem, mistake, example,
  quick-check, and reveal blocks only; no new visual component was needed
- Remaining issues: run member-page browser QA and export checks after
  contentlayer and production build refresh

### 2026-04-25 checkpoint 9: MATH1030 6.8 basis appendix unit

- Checkpoint name: `6.8 Basis extension and change of basis` appendix-depth
  pass
- What was inspected: the optional basis-existence, replacement-theorem, and
  change-of-basis PDFs plus the existing vector-space chapter pages
- What was changed: added a new three-language unit using existing theorem,
  example, mistake, quick-check, and reveal blocks only; no new renderer or
  interactive component was required
- Rendering note: the page contains dense display math around `U=VS` and
  `[x]_V=S[x]_U`; contentlayer and production build should be rerun before the
  checkpoint is considered deployed
- Remaining issues: run member-page route and TXT/PDF export checks after the
  generated content refresh

### 2026-04-25 checkpoint 10: MATH1030 late-chapter static calculation blocks

- Checkpoint name: `8.2`, `9.1`, and `9.3` worked-example formatting pass
- What was inspected: the three localized MDX files for diagonalization, inner
  products / angles, and Gram-Schmidt orthogonalization
- What was changed: added display-math-heavy worked examples and a markdown
  table that intentionally degrades well into TXT / PDF exports
- Rendering note: no new MDX block type was introduced; the pass uses existing
  `WorkedExample` blocks, display math, inline math, and a standard markdown
  table so the shared renderer remains the only formatting surface
- Remaining issues: rerun contentlayer and the production build, then verify
  representative public routes plus TXT / PDF exports for the new examples

### 2026-04-25 checkpoint 11: MATH1030 proof appendix rendering

- Checkpoint name: `1.2` proof-language and `2.5` REF/RREF existence rendering
  pass
- What was inspected: pending MATH1030 appendix references, the existing MDX
  block registry, the catalog source-ref map, and checkpoint problem rendering
  requirements
- What was changed: added two new three-locale note families using existing
  `Definition`, `TheoremCard`, `WorkedExample`, `CommonMistake`, `QuickCheck`,
  and `RevealSolution` blocks only; no new visual or interactive component was
  introduced
- Rendering note: both pages intentionally use article-first prose and display
  math / block matrices that should degrade cleanly into TXT and PDF exports;
  source-tracing remains internal through the catalog and coverage docs
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, local
  production route / TXT / PDF export smoke checks, Vercel deployment
  `dpl_5xU7ZhJ1pRJxwxkzGBzqsDNTxoSy`, and production smoke checks on
  `www.evanalysis.top` passed after the final MDX terminology pass.
- Remaining issues: none for this MATH1030 appendix rendering pass
