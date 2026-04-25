# Exercise, answer, and solution integrity

This document tracks whether quick checks, reveal blocks, proof toggles, and
guided solutions line up with the authored mathematics notes. The goal is to
keep every prompt matched to the correct answer structure and avoid hidden
empty panels or misplaced solution text.

## Latest resume state

As of April 14, 2026, the latest local integrity-related checkpoints are:

- `9085148` `Fix note block prompt rendering`
- `49345a4` `Fix set note reveal integrity`
- `0526751` `Deepen augmented matrix notes`
- `95f3ad7` `Deepen invertible matrix notes`
- `f2c5513` `Deepen notes across math and CSCI units`
- `0d5aaa5` `Deepen MATH1030 notes and assessment flow`

The current local workspace also includes an uncommitted three-language rewrite
of `math1030` units `2.4` and `6.2`, plus `math1090` unit `3.4`. Those
rewrites preserve the visible `QuickCheck` plus following `RevealSolution`
contract instead of hiding answers inside the prompt block.

Every push attempt for those checkpoints failed with the same external error:
`ssh: Could not resolve hostname github.com: Temporary failure in name
resolution`.

The next resume point is to keep exercise integrity coupled to the next
assessment pass, especially the WeBWorK-inspired preview / submit workflow and
the larger MATH1030 problem inventory now sitting under the thinner public
units.

April 24, 2026 QA update:

- representative MATH1090 `4.5`-`5.3` and higher MATH1030 chapters were scanned
  for `QuickCheck` / `RevealSolution` parity; the audited files keep paired
  counts and no broken related-note route survived the pass;
- localized related-note labels were repaired where zh-HK / zh-CN pages still
  showed English section titles;
- the next integrity check should remain export-focused: confirm every revealed
  solution appears immediately after the matching prompt in sampled TXT and PDF
  exports.
- the new CSCI2520 units were authored with the visible prompt plus immediate
  `RevealSolution` pattern; each new note has paired quick checks and guided
  exercise solutions in EN, zh-HK, and zh-CN.
- the latest MATH1090 number-system pass added EN / zh-HK / zh-CN quick checks
  for integer subtraction, integer multiplication, Euclidean-algorithm gcd
  invariance, and rational multiplication well-definedness; each prompt is
  immediately followed by its matching `RevealSolution`, and the problem bank
  now includes checkpoint questions for the `3.3` and `3.4` units.
- the April 25 MATH1030 gap pass added paired quick checks and guided exercise
  solutions to `4.2 Set language and solution sets` and `6.7 Matrix subspaces,
  bases, and dimension`; it also added checkpoint questions for the new /
  strengthened vector-space units in `src/lib/textbook/problem-bank.ts`.
- the following April 25 pass added paired quick checks and reveal solutions
  to `3.3 Row-operation matrices`, plus checkpoint questions for elementary
  matrices, span nonmembership, dependence relations, and minimal spanning set
  extraction.

### 2026-04-14 checkpoint 8: attempt tracking + richer MATH1030 inventory

This checkpoint kept the same note-shell visual language, but made the
assessment flow behave more like a lightweight WeBWorK model.

- Checkpoint name: attempt tracking + richer MATH1030 inventory
- What was inspected:
  the current problem bank, submit and preview routes, per-problem progress
  needs, and the thin public MATH1030 units most likely to receive the next
  checkpoint expansions
- What was changed:
  Preview and Submit are now structurally separate; problem progress tracks
  attempts used, attempts remaining, best score, and solved state; section
  summary now surfaces weak tags; and the `math1030` problem inventory is much
  larger than before
- What was verified:
  lint and build passed after adding the new problem-progress route and richer
  checkpoint summary flow
- Remaining issues:
  the same model still needs to spread to more units and courses, and the
  targeted MATH1030 notes are deeper but still not yet at the desired reading
  depth floor
- Exact next target:
  keep expanding thin MATH1030 public units while attaching the same Preview /
  Submit and progress model to the next unit family

## Current findings

The latest local pass removed the biggest component-level mismatch in the
textbook exercise blocks.

- `QuickCheck` now renders as a visible prompt card rather than a reveal-style
  toggle.
- Authored note units that use `QuickCheck` for the prompt and
  `RevealSolution` for the answer now match the shared component behavior more
  closely.
- Section checkpoints now advance only on correct answers, so the completion
  state can no longer be faked by submitting every item incorrectly.
- The next integrity risk is broader QA: confirming that export output still
  reads cleanly on the richer rewritten notes and that no localized note drifts
  into mismatched prerequisite or answer labels.

### 2026-04-14 checkpoint 7: preview / submit foundation

This checkpoint moves the Notes assessment layer toward a lightweight
WeBWorK-inspired model without changing the site’s visual language.

- Checkpoint name: preview / submit foundation
- What was inspected:
  `src/components/textbook/AttemptInput.tsx`,
  `src/components/textbook/PracticeQuestion.tsx`,
  `src/components/textbook/FeedbackPanel.tsx`,
  `src/components/textbook/UnitCheckpoint.tsx`,
  `src/app/api/textbook/problems/**`,
  `src/lib/textbook/problem-attempts.ts`,
  `src/lib/textbook/problem-bank.ts`,
  `src/lib/textbook/problem-grading.ts`,
  and `src/lib/textbook/types.ts`
- What was changed:
  Preview and Submit are now separate actions; Preview does not consume an
  attempt; Submit records an attempt; per-problem progress now tracks attempts
  used, attempts remaining, best score, and solved state; checkpoint summaries
  now surface weak tags instead of only a raw completion ratio; and the problem
  inventory is materially larger than before
- What was verified:
  lint and build passed after the new progress route, richer problem metadata,
  and checkpoint-summary UI were added
- Remaining issues:
  the richer problem bank still needs to spread to more public units, and some
  older units still have too little reading depth relative to their new
  checkpoint surface
- Exact next target:
  extend the same preview / submit and progress discipline to the next MATH1030
  unit family while continuing the content-depth pass

### 2026-04-13 checkpoint 6: checkpoint correctness gating + localization

This checkpoint fixed the main false-positive issue in the current assessment
layer and aligned the shared problem UI with the site-level language switcher.

- Checkpoint name: checkpoint correctness gating + localization
- What was inspected:
  `src/components/textbook/AttemptInput.tsx`,
  `src/components/textbook/PracticeQuestion.tsx`,
  `src/components/textbook/FeedbackPanel.tsx`,
  `src/components/textbook/SolutionSteps.tsx`,
  `src/components/textbook/UnitCheckpoint.tsx`,
  `src/lib/textbook/problem-bank.ts`,
  `src/lib/textbook/problem-grading.ts`,
  and the billing / membership routes that surround the Notes entitlement flow
- What was changed:
  section checkpoints now count a problem only after a correct submission; the
  problem bank now carries three-language prompts, choices, hints, and solution
  steps; and the shared answer / feedback / solution controls now localize with
  the note locale
- What was verified:
  the checkpoint completion state is now tied to correctness instead of mere
  submission, and the shared assessment controls no longer hardcode English in
  localized Notes pages
- Files touched:
  shared problem types, grading logic, problem bank entries, assessment
  components, and the localized membership routes that support gated solution
  access
- Remaining issues:
  broader content depth and export QA still need to be carried through the next
  source-backed chapter family
- Exact next target:
  carry the same integrity discipline into the determinant chapter family and
  verify that exported TXT / PDF output still reads cleanly after the richer
  localized checkpoint content

## Checkpoint log

This log records what has been audited and what still needs repair.

### 2026-04-13 checkpoint 1: integrity issue identified during rendering pass

The rendering audit surfaced the structural exercise issue, but this
checkpoint does not yet change the exercise components.

- Checkpoint name: Exercise / reveal mismatch identified
- What was inspected: `src/components/textbook/mdx-blocks.tsx`,
  `src/components/textbook/mdx-components.tsx`, and representative authored
  units under `content/textbook/math1030/**` and
  `content/textbook/math1090/**`
- What was changed: no exercise-block logic changes yet; this checkpoint only
  documented the component/content mismatch clearly so the next cycle can fix
  it without guessing
- What was verified: repository-wide search confirmed that the prevailing
  authored pattern is `QuickCheck` prompt plus visible hint text followed by a
  separate `RevealSolution`
- Files touched: `docs/exercise-solution-integrity.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/reference-coverage.md`,
  `docs/content-parity-checklist.md`
- Remaining issues: `QuickCheck`, `RevealSolution`, and export behavior still
  need to be reconciled with the authored note structure
- Exact next target: replace the reveal-style `QuickCheck` shell with a prompt
  card that keeps the question visible and leaves answer disclosure to
  `RevealSolution`
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: re-open `src/components/textbook/mdx-blocks.tsx` and
  the units surfaced by the `rg "<QuickCheck"` audit

### 2026-04-13 checkpoint 4: make quick checks visible by default

This checkpoint aligned the shared `QuickCheck` component with the dominant
authored content pattern.

- Checkpoint name: make quick checks visible by default
- What was inspected: `src/components/textbook/mdx-blocks.tsx` and the note
  units that already pair `QuickCheck` with a following `RevealSolution`
- What was changed: changed `QuickCheck` from a toggle block to a visible note
  card so the prompt and learner hint are always visible, while answer
  disclosure remains the responsibility of `RevealSolution`
- What was verified: the shared implementation now matches the authored prompt /
  answer structure used across the textbook notes
- Files touched: `src/components/textbook/mdx-blocks.tsx`,
  `docs/exercise-solution-integrity.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/reference-coverage.md`,
  `docs/content-parity-checklist.md`
- Remaining issues: representative export QA and page-level regression checks
  are still needed now that `QuickCheck` no longer toggles open and closed
- Exact next target: verify export behavior and continue with the next
  source-backed MATH1030 unit after the push blocker clears
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: continue from the shared textbook MDX blocks, then
  return to source-backed note expansion

### 2026-04-13 checkpoint 5: new invertibility quick checks

This checkpoint added new quick checks and reveal blocks inside the expanded
invertibility note while keeping the shared prompt / answer contract intact.

- Checkpoint name: Invertibility quick-check expansion
- What was inspected: the three localized `5.1 Invertible matrices` note files
- What was changed: added two new quick checks and matching reveal blocks in
  EN, zh-HK, and zh-CN for preserved column relations and well-defined rank
- What was verified: the prompt / reveal ordering stays aligned in all three
  locales and continues to match the shared `QuickCheck` / `RevealSolution`
  behavior
- Files touched: `content/textbook/math1030/invertibility/invertible-matrices/en.mdx`,
  `content/textbook/math1030/invertibility/invertible-matrices/zh-hk.mdx`,
  `content/textbook/math1030/invertibility/invertible-matrices/zh-cn.mdx`,
  `docs/exercise-solution-integrity.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/reference-coverage.md`,
  `docs/content-parity-checklist.md`
- Remaining issues: representative export QA is still needed once the local
  build can run on a platform-matched dependency set
- Exact next target: keep exercise integrity coupled to the next source-backed
  content expansion instead of deferring it to a later cleanup pass
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: continue with the next MATH1030 source-backed note and
  preserve the same prompt / reveal pairing discipline

Current checkpoint resolution:

- Commit created: yes, `95f3ad7` (`Deepen invertible matrix notes`)
- Push succeeded: no. `git push origin main` failed with
  `ssh: Could not resolve hostname github.com: Temporary failure in name resolution`
- Current resume point: after connectivity is restored, verify representative
  exports and page behavior for the new invertibility quick checks, then keep
  the same integrity discipline in the next source-backed unit

### 2026-04-25 checkpoint 6: MATH1030 unit-level checkpoint coverage

This checkpoint shifted MATH1030 practice from uneven chapter coverage toward
unit-level coverage.

- Checkpoint name: MATH1030 unit-level checkpoint coverage
- What was inspected: `src/lib/textbook/problem-bank.ts`,
  `content/textbook/math1030/**`, `src/components/textbook/PracticeQuestion.tsx`,
  `src/components/textbook/AttemptInput.tsx`, `src/components/textbook/SolutionSteps.tsx`,
  `src/components/textbook/FeedbackPanel.tsx`, and `src/components/Toc.tsx`
- What was changed: added checkpoint problems for previously uncovered
  MATH1030 units: `1.1`, `2.1`, `2.2`, `2.4`, `6.1`, `6.2`, `6.3`, and `6.5`;
  these include fill-in, multiple-choice, and true/false-as-choice formats
- What was verified locally before full build: `rg` counts now show at least
  one `math1030` problem for every public MATH1030 unit
- Integrity note: each new problem includes a localized prompt, hint, answer,
  reveal policy, and solution-step sequence; answer strings were kept compact
  to match the current grader's exact / symbolic normalization
- Remaining issues: later passes should expand from one checkpoint per thin
  unit to fuller chapter-level exercise sets drawn from tutorials, assignments,
  and practice-set PDFs

### 2026-04-25 checkpoint 7: MATH1030 matrix-basics practice expansion

- Checkpoint name: `2.1 Matrix basics` problem-set expansion
- What was inspected: the existing matrix-basics quick checks, the unit-level
  checkpoint problem, and the new matrix-reading interaction
- What was changed: added additional checkpoint questions for reading
  `a_23`, restoring a missing zero coefficient in a coefficient matrix, and
  recognizing when matrix addition is undefined
- Integrity note: each new item has a single unambiguous answer, a localized
  hint, and a short solution sequence tied directly to the article's worked
  examples; true/false is represented as an MCQ to match the current problem
  schema
- Remaining issues: verify the rendered checkpoint card order and answer
  reveal behavior in the browser after the build refresh

### 2026-04-25 checkpoint 8: MATH1030 invertibility practice expansion

- Checkpoint name: `5.1 Invertible matrices` problem-set expansion
- What was inspected: the expanded invertibility theorem dictionary, null-space
  noninvertibility example, inverse-solve example, and existing member
  checkpoint coverage
- What was changed: added checkpoint questions for recognizing that a nonzero
  `Av=0` vector proves non-invertibility and for solving `Ax=b` using a given
  inverse matrix
- Integrity note: both items are multiple choice to avoid fragile vector-input
  parsing; prompts, choices, hints, and solution steps use the shared rich-text
  math renderer path
- Remaining issues: verify the member-gated checkpoint rendering in browser QA
  after the build refresh
