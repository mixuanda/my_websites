# Rendering and formatting QA

This document tracks rendering-specific audits for the public Notes section.
Use it to record the exact defect, the files inspected, the verification
method, and the next target so the next run can resume without repeating the
same discovery work.

## Current status

The math plugin chain is present in the repository:
`remark-math` and `rehype-katex` are configured in
`contentlayer.config.ts`, KaTeX CSS is imported in
`src/app/globals.css`, and textbook pages render MDX through
`src/components/Mdx.tsx` and `src/components/textbook/TextbookMdx.tsx`.

The current high-priority render defect was not a missing plugin. It was that
custom note block titles and prompts were plain strings, so inline notation in
props rendered with literal backticks instead of formatted inline math or code.

## Checkpoint log

### 2026-04-13 checkpoint 1: note-block title rendering

This checkpoint repaired the note-block title path used by definitions,
theorems, worked examples, quick checks, reveal blocks, and collapsible proofs.

- Checkpoint name: note-block title rendering
- What was inspected:
  `AGENTS.md`, `contentlayer.config.ts`, `src/app/globals.css`,
  `src/components/Mdx.tsx`, `src/components/textbook/TextbookMdx.tsx`,
  `src/components/textbook/mdx-components.tsx`,
  `src/components/textbook/mdx-blocks.tsx`,
  `src/app/[locale]/notes/[course]/[chapter]/[unit]/page.tsx`,
  and representative note files including
  `content/textbook/math1030/vector-spaces/basis-and-dimension/zh-hk.mdx`.
- What was changed:
  added inline rich-text rendering for block titles and prompts in
  `src/components/textbook/mdx-blocks.tsx`; backtick-delimited segments now
  render as inline math when KaTeX can parse them and fall back to inline code
  otherwise. Fixed one malformed zh-HK prompt string with an extra backtick.
- What was verified:
  inspected the final patch with `git diff`; confirmed the corrected prompt in
  the zh-HK basis note; ran a KaTeX smoke check with
  `node.exe -e "require('./node_modules/katex').renderToString('R^3', ...)"`
  and received `true`.
- Files touched:
  `src/components/textbook/mdx-blocks.tsx`,
  `content/textbook/math1030/vector-spaces/basis-and-dimension/zh-hk.mdx`,
  `docs/rendering-formatting-qa.md`,
  `docs/reference-coverage.md`,
  `docs/exercise-solution-integrity.md`,
  `docs/content-parity-checklist.md`.
- Remaining issues:
  `npm run build` and `npm run build:site` still fail in this shell because the
  environment resolves to the Windows Node toolchain on a WSL UNC path before
  reaching the site build itself. This is an environment blocker for full build
  verification, not yet a confirmed repository code failure.
- Exact next target:
  fix exercise / solution integrity in the MATH1090 set-theory notes, then
  return to broader formatting consistency and export QA.
- Commit created:
  yes. Created as `9085148` with message
  `Fix note block prompt rendering`.
- Push succeeded:
  no. `git push origin main` stalled, and the explicit batch-mode retry failed
  with `ssh: Could not resolve hostname github.com: Temporary failure in name
  resolution`.
- Current resume point:
  continue with checkpoint 2 on the six set-theory files flagged in
  `docs/exercise-solution-integrity.md`.

### 2026-04-13 checkpoint 2: set-theory reveal pairing

This checkpoint did not change the renderer itself, but it removed a content
pattern that made the reveal UI misleading on six pages.

- Checkpoint name: set-theory reveal pairing
- What was inspected:
  the quick-check sections in the six MATH1090 set-theory files flagged in the
  previous audit.
- What was changed:
  moved direct answer text out of `QuickCheck` blocks and into explicit
  `RevealSolution` blocks.
- What was verified:
  re-read the edited note sections and confirmed the reveal UI now matches the
  authored structure in all six files.
- Files touched:
  the six MATH1090 set-theory note files plus the four tracking documents.
- Remaining issues:
  full build verification remains blocked by the shell environment, and broader
  formatting QA still needs a representative pass after the next content edit.
- Exact next target:
  perform a source-backed content-deepening pass on
  `2.2 Augmented matrices and row operations`.
- Commit created:
  pending at the time of this doc update; the checkpoint commit follows this
  documentation step.
- Push succeeded:
  pending at the time of this doc update; push will be retried in batch mode.
- Current resume point:
  commit checkpoint 2, retry push, then continue with the row-operation unit.
