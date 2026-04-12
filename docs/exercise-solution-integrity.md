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
  yes for the audit trail. The current audit state was captured in commit
  `9085148` with message `Fix note block prompt rendering`. The repair itself
  still belongs to the next checkpoint.
- Push succeeded:
  no. `git push origin main` stalled, and the explicit batch-mode retry failed
  with `ssh: Could not resolve hostname github.com: Temporary failure in name
  resolution`.
- Current resume point:
  start with the three `set-operations` files, then normalize the three
  `functions-relations` files in the same checkpoint.

### 2026-04-13 checkpoint 2: normalize set-theory quick checks

This checkpoint removed the known answer drift in the MATH1090 set-theory
notes and restored the intended prompt-plus-reveal structure in all three
languages.

- Checkpoint name: normalize set-theory quick checks
- What was inspected:
  all six flagged set-theory note files and the resulting diffs after the edit.
- What was changed:
  rewrote each flagged `QuickCheck` so it now contains only guidance or a hint,
  then added a following `RevealSolution` with the actual answer.
- What was verified:
  re-read the edited blocks in EN, zh-HK, and zh-CN; confirmed each question
  now has a matching reveal block immediately after it; confirmed no answer text
  remains directly inside those six `QuickCheck` blocks.
- Files touched:
  `content/textbook/math1090/sets/set-operations/en.mdx`,
  `content/textbook/math1090/sets/set-operations/zh-hk.mdx`,
  `content/textbook/math1090/sets/set-operations/zh-cn.mdx`,
  `content/textbook/math1090/sets/functions-relations/en.mdx`,
  `content/textbook/math1090/sets/functions-relations/zh-hk.mdx`,
  `content/textbook/math1090/sets/functions-relations/zh-cn.mdx`,
  `docs/exercise-solution-integrity.md`,
  `docs/reference-coverage.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/content-parity-checklist.md`.
- Remaining issues:
  broader exercise QA still needs a wider pass across other chapters, but the
  known set-theory drift is now resolved.
- Exact next target:
  deepen one of the thinnest source-backed MATH1030 units using the repository
  reference PDFs, starting with `2.2 Augmented matrices and row operations`.
- Commit created:
  yes. Created as `49345a4` with message
  `Fix set note reveal integrity`.
- Push succeeded:
  no. The batch-mode retry failed with
  `ssh: Could not resolve hostname github.com: Temporary failure in name
  resolution`.
- Current resume point:
  commit the six-file exercise fix, retry push, then open the MATH1030 row
  operation references for the next content pass.

### 2026-04-13 checkpoint 3: exercise structure in MATH1030 unit 2.2

This checkpoint added new quick checks and guided solutions while keeping the
prompt / reveal pairing intact.

- Checkpoint name: exercise structure in MATH1030 unit 2.2
- What was inspected:
  the rewritten EN, zh-HK, and zh-CN versions of
  `augmented-matrices-row-operations`.
- What was changed:
  added paired `QuickCheck` and `RevealSolution` blocks for conceptual checks
  and guided exercises in all three locales.
- What was verified:
  each new prompt is followed by the correct solution block, and the three
  locales keep the same exercise order and answer structure.
- Files touched:
  the three localized `2.2` note files,
  `src/components/textbook/mdx-blocks.tsx`,
  `src/components/textbook/mdx-components.tsx`,
  and the four tracking documents.
- Remaining issues:
  wider exercise QA is still needed across more MATH1030 and MATH1090 units.
- Exact next target:
  carry the same prompt / reveal audit into the next deepened unit rather than
  waiting for a later cleanup pass.
- Commit created:
  pending at the time of this doc update; the checkpoint commit follows this
  documentation step.
- Push succeeded:
  pending at the time of this doc update; push will be retried in batch mode.
- Current resume point:
  commit the `2.2` content expansion and keep exercise integrity coupled to the
  next content rewrite.
