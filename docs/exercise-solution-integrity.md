# Exercise and solution integrity

This document tracks audits of quick checks, reveal blocks, and guided-solution
components in the public Notes section. Record the exact mismatch, the affected
files, and the next repair target so answer drift does not reappear later.

## Current status

The component wiring itself is internally consistent:
`src/components/textbook/mdx-components.tsx` passes the expected props into
`QuickCheck`, `RevealSolution`, and `CollapsibleProof`, and
`src/components/textbook/mdx-blocks.tsx` renders all three through the same
toggle shell.

The current integrity risk is content-structure drift. A small group of notes
places the answer directly inside `QuickCheck` instead of separating the prompt
from the reveal block.

## Checkpoint log

### 2026-04-13 pre-checkpoint 2 audit: set-theory answer drift

This audit collected the first concrete exercise-integrity issues that need a
dedicated follow-up checkpoint.

- Checkpoint name: set-theory answer drift audit
- What was inspected:
  `AGENTS.md`, `src/components/textbook/mdx-blocks.tsx`,
  `src/components/textbook/mdx-components.tsx`,
  `src/components/textbook/TextbookMdx.tsx`,
  and representative textbook units with quick checks and reveal blocks.
- What was changed:
  no exercise blocks were rewritten yet in this audit step.
- What was verified:
  confirmed that the component API is not the source of the mismatch; the issue
  is in authored content structure.
- Files touched:
  `docs/exercise-solution-integrity.md`,
  `docs/reference-coverage.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/content-parity-checklist.md`.
- Remaining issues:
  the following six files place answers directly inside `QuickCheck`:
  `content/textbook/math1090/sets/set-operations/en.mdx`,
  `content/textbook/math1090/sets/set-operations/zh-hk.mdx`,
  `content/textbook/math1090/sets/set-operations/zh-cn.mdx`,
  `content/textbook/math1090/sets/functions-relations/en.mdx`,
  `content/textbook/math1090/sets/functions-relations/zh-hk.mdx`,
  `content/textbook/math1090/sets/functions-relations/zh-cn.mdx`.
- Exact next target:
  move each embedded answer into a following `RevealSolution` block so the
  prompt, reveal logic, export behavior, and later audits stay aligned.
- Commit created:
  pending at the time of this doc update; the next checkpoint commit will
  include the repair once the six files are normalized.
- Push succeeded:
  pending at the time of this doc update.
- Current resume point:
  start with the three `set-operations` files, then normalize the three
  `functions-relations` files in the same checkpoint.
