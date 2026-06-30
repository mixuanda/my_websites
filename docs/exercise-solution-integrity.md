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
- the Math1025 expansion pass added paired quick checks and immediate
  `RevealSolution` blocks to `2.1 Mathematical induction`, `3.1 Inequalities
  and absolute value`, and `4.1 Binomial coefficients and expansions` in EN,
  zh-HK, and zh-CN; each unit also includes an exercises section followed by a
  guided-solutions section.
- the April 27 MATH1090 set-language pass added paired quick checks and
  immediate `RevealSolution` blocks to `2.1` and `2.2` in EN, zh-HK, and
  zh-CN; the local structural count is aligned across locales
  (`2.1`: 4 `QuickCheck`, 5 `RevealSolution`; `2.2`: 5 `QuickCheck`,
  12 `RevealSolution`), with the extra reveal blocks belonging to worked
  examples rather than unmatched prompts.
- the same MATH1090 pass added three problem-bank checkpoints for
  inclusion-exclusion, `B^A` function counting, and finite left-inverse logic;
  each checkpoint includes localized hints and solution steps.
- the April 28 MATH1090 Worksheet 3 exercise-parity pass kept the touched
  locales structurally aligned: `2.1` has 5 `QuickCheck` blocks and 6
  `RevealSolution` blocks in EN / zh-HK / zh-CN, and `2.2` has 6 `QuickCheck`
  blocks and 13 `RevealSolution` blocks in EN / zh-HK / zh-CN. The extra
  reveal blocks are worked-example explanations, not unmatched answers.
- the same April 28 pass added two problem-bank checkpoints for the remaining
  Worksheet 3 exercise patterns: the covered-but-not-contained Venn condition
  and the prime-factorization injection `N x N -> N`.
- the following April 28 MATH1090 late-unit checkpoint pass added six localized
  problem-bank checkpoints to later authored units: Dedekind-cut no-maximum,
  epsilon-`N` thresholding, Cauchy internal control, Cantor-Bernstein,
  Cantor's diagonal set, and group left cancellation. These are problem-bank
  additions only; no new `QuickCheck` / `RevealSolution` MDX pairs were added.
- the follow-on April 28 MATH1090 chapter `4`-`6` checkpoint sweep added seven
  localized problem-bank checkpoints for total-order comparability, open
  interval sup / inf, completeness, decimal approximations, the `sqrt(2)` cut,
  a linear delta-epsilon proof, and Cantor set stage counting. These are also
  problem-bank additions only; no new `QuickCheck` / `RevealSolution` MDX pairs
  were added.
- the May 11 checkpoint component pass did not change problem-bank answers or
  grading logic; it changed the shared rendering surface so prompts, choices,
  previews, feedback, and solution steps are larger and standalone short math
  choices render through KaTeX. Representative local MATH1030 checkpoint HTML
  checks found KaTeX output and the expected larger checkpoint classes; TXT /
  PDF export checks for the sampled unit still returned study-material output.
- the May 12 MATH1090 early-unit checkpoint pass added six localized
  problem-bank checkpoints for `1.1`, `1.2`, `1.3`, `3.1`, `3.2`, and `3.5`.
  These are problem-bank-only additions; no MDX `QuickCheck` /
  `RevealSolution` pairs were changed. Local and production preview API checks
  confirmed the six new IDs are readable, parse selected choices, and are
  attached to the expected unit-level checkpoint summaries.
- the May 12 Math1025 chapter 6 checkpoint added the `6.1` complex-number unit
  to the exercise integrity sample. Local tag-count QA confirmed balanced
  quick-check / reveal-solution pairs across EN, zh-HK, and zh-CN. The guided
  exercises and problem-bank checkpoints match the chapter 6 source topics:
  complex division, conjugate / modulus identities, argument and polar form,
  De Moivre identities, triangle inequality, roots of unity, locus equations,
  and complex-geometry criteria. The local grading preview API returned 200
  for the five new checkpoint IDs with the expected normalized answer or choice.
- the May 14 QA pass counted current problem-bank coverage against catalog
  units: Math1090 has checkpoint coverage for all 23 units; Math1030 has
  coverage for 32 of 37 units; Math1025 has coverage for 2 of 7 units; and
  CSCI2520 has coverage for 2 of 9 units. Local grade-preview API checks
  returned 200 for `demo.math1030.rref-pivot-column` and
  `checkpoint.math1025.complex-numbers.divide-by-conjugate`.
- the May 14 remote-only QA pass rechecked the production preview API at
  `www.evanalysis.top`; `demo.math1030.rref-pivot-column` returned 200 with
  the expected selected-choice preview text.
- the May 15 Math1025 chapter 8 polynomial-methods pass adds three localized
  note units with matched in-page `QuickCheck` / `RevealSolution` pairs and
  source-backed guided exercises from Exercises 8.1-8.3. The new problem-bank
  checkpoint IDs are
  `checkpoint.math1025.polynomial-methods.division-remainder`,
  `checkpoint.math1025.polynomial-methods.factor-theorem-parameter`,
  `checkpoint.math1025.polynomial-methods.zero-count`,
  `checkpoint.math1025.polynomial-methods.euclidean-gcd`,
  `checkpoint.math1025.polynomial-methods.irreducible-over-field`,
  `checkpoint.math1025.polynomial-methods.partial-fraction-form`, and
  `checkpoint.math1025.polynomial-methods.vieta-product`. Final preview API
  verification is pending until the local QA pass completes.

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
- The latest checkpoint UI pass preserves existing answer / solution pairing
  while improving readability; no prompt, correct answer, hint, or solution
  ordering was changed.
- The next integrity risk is broader QA: confirming that export output still
  reads cleanly on the richer rewritten notes and that no localized note drifts
  into mismatched prerequisite or answer labels.
- Math1025 `6.1` is now part of that QA sample; exports should be checked for
  expanded answer sections rather than hidden or shifted reveal content.
- The current checkpoint-depth backlog is now explicit: Math1030 still lacks
  problem-bank coverage for five matrix-algebra units, Math1025 lacks
  checkpoint coverage for five of its seven public units, and CSCI2520 lacks
  checkpoint coverage for seven of its nine public units. Future exercise
  passes should use source-backed practice rather than generic filler.

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

### 2026-04-25 checkpoint 9: MATH1030 6.8 basis appendix checks

- Checkpoint name: `6.8 Basis extension and change of basis` exercise
  integrity
- What was inspected: the new quick-check / reveal pairs inside all three
  localized `6.8` pages and the new problem-bank checkpoint entries
- What was changed: added two in-page quick checks and two guided exercises
  per locale, plus checkpoint questions for replacement-theorem counting and
  change-of-basis coordinate conversion
- Integrity note: answer content stays immediately after the matching prompt;
  coordinate-conversion arithmetic uses the same matrix `S` in the article and
  the problem bank, so the public exercise and checkpoint agree
- Remaining issues: verify rendered checkpoint order and member-gated answer
  reveal behavior after build refresh

### 2026-04-25 checkpoint 10: MATH1030 late-chapter checkpoint additions

- Checkpoint name: `8.2`, `9.1`, and `9.3` checkpoint integrity
- What was inspected: the new worked examples for diagonalization order, angle
  computation, and the Gram-Schmidt projection coefficient
- What was changed: added one problem-bank item for each strengthened unit, with
  localized prompts, hints, answer policies, and guided solution steps
- Integrity note: the diagonalization item checks that eigenvalue order follows
  the column order in `S`; the angle item uses the same vectors and answer as
  the public worked example; the Gram-Schmidt item asks only for the first
  projection coefficient to keep the fill-in answer unambiguous
- Remaining issues: verify rendered checkpoint cards and member-gated solution
  reveal behavior after the production build refresh

### 2026-04-25 checkpoint 11: MATH1030 appendix checkpoint additions

- Checkpoint name: `1.2` proof-language and `2.5` REF/RREF existence
  checkpoint integrity
- What was inspected: the new in-page quick checks / reveal pairs for all
  three locales, plus `src/lib/textbook/problem-bank.ts`
- What was changed: added one checkpoint question for contrapositive versus
  converse reading, and one checkpoint question for pivot-column preservation
  during REF-to-RREF cleanup
- Integrity note: both new checkpoint entries are multiple choice to avoid
  fragile symbolic parsing; the correct answers match the in-page quick checks
  and the solution steps remain localized in EN / zh-HK / zh-CN
- Verification: `npm run lint` and `npm run build` passed, representative
  public note routes plus TXT / PDF exports passed local production smoke
  checks, and production smoke checks passed on `www.evanalysis.top` after
  deployment `dpl_5xU7ZhJ1pRJxwxkzGBzqsDNTxoSy`.
- Remaining issues: none for the new multiple-choice checkpoint pair

### 2026-04-25 checkpoint 12: MATH1030 RREF uniqueness checkpoint additions

- Checkpoint name: `5.2 RREF uniqueness and well-defined rank` exercise
  integrity
- What was inspected: the new in-page quick checks / reveal pairs in all three
  localized `5.2` files, plus `src/lib/textbook/problem-bank.ts`
- What was changed: added one multiple-choice checkpoint for the RREF
  uniqueness conclusion and one fill-in checkpoint for reading rank from the
  pivot-column count
- Integrity note: the in-page quick checks place each answer immediately after
  its prompt; the problem-bank fill-in answer is a single integer to avoid
  fragile symbolic parsing
- Verification: `npm run lint` and `npm run build` passed; local browser QA
  confirmed the new checkpoint prompts render on the EN note page
- Remaining issues: broader assignment / tutorial exercise parity remains the
  next MATH1030 practice gap

### 2026-04-25 checkpoint 13: MATH1030 matrix-algebra practice parity

- Checkpoint name: `3.1` matrix multiplication assignment-style practice
  integrity
- What was inspected: `1030efghi-as01.pdf`, `1030efghi-as01as.pdf`,
  `Practice Set 2_Matrix Algebra.pdf`, `Practice Set 2_Solutions.pdf`, the
  localized `3.1` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added paired in-page quick checks / reveal solutions for
  noncommutative expansion, parameter recovery from a partial product, and
  lower-triangular product closure; added one fill-in checkpoint for
  parameter recovery and one multiple-choice checkpoint for noncommuting
  expansion
- Integrity note: the fill-in checkpoint asks for the single scalar `b=6`,
  while the expansion checkpoint is multiple choice to avoid fragile symbolic
  equivalence between `AB` and `BA` terms
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed; local route / export smoke returned 200 for
  representative `3.1` note and export routes; browser QA confirmed the two
  new checkpoint prompts render on the zh-HK note page with no captured console
  errors
- Remaining issues: assignment `as02` / `as03` practice structures still need
  later public checkpoint coverage

### 2026-04-25 checkpoint 14: MATH1030 homogeneous-solution parity

- Checkpoint name: `4.1` particular-solution plus null-space integrity
- What was inspected: `1030efghi-as02.pdf`, `1030efghi-as02as.pdf`, the
  localized `4.1` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added a worked example using one particular solution and
  two null-space directions, added a quick check / reveal pair for the
  `v-u in N(A)` argument, and added one multiple-choice checkpoint for the
  difference of two particular solutions
- Integrity note: the in-page proof and the checkpoint use the same calculation
  `A(v-u)=Av-Au=b-b=0`; the problem remains multiple choice to avoid fragile
  symbolic parsing of vector expressions
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed; local route / export smoke returned 200 for
  representative `4.1` note and export routes; browser QA confirmed the new
  checkpoint prompt renders on the zh-HK note page with no captured console
  errors; production smoke checks passed after deployment
  `dpl_H7y9BXVxtHY62bp2QuNs52ERAxgw`
- Remaining issues: longer `as02` row-operation drill items and `as03`
  invertibility practice remain future exercise-depth targets

### 2026-04-25 checkpoint 15: MATH1030 as03 set-language and cyclic-product parity

- Checkpoint name: `4.2` solution-set intersection and `5.1` cyclic-product
  integrity
- What was inspected: `1030efghi-as03.pdf`, `1030efghi-as03as.pdf`, the
  localized `4.2` and `5.1` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added paired in-page quick checks / reveal solutions for
  the common-solution argument `Ax_0=b` and `Ax_0=c`, and for deriving
  `DABC=I` from `ABCD=I`; added one multiple-choice checkpoint for each
  pattern
- Integrity note: both problem-bank additions are multiple choice to avoid
  fragile symbolic parsing of set expressions and product reorderings; the
  correct choices match the in-page reveal solutions
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed; local route / export smoke returned 200 for
  representative `4.2` and `5.1` note and export routes; browser QA confirmed
  the new checkpoint prompts render on the zh-HK note pages with no captured
  console errors; production smoke checks passed after deployment
  `dpl_9gVqM1iwDGR1vTm3xcFRnLKXtWCP`
- Remaining issues: longer numerical row-reduction and polynomial-identity
  proof exercises from `as03` remain exercise-depth backlog

### 2026-04-26 checkpoint 16: MATH1030 RREF numerical drill parity

- Checkpoint name: `2.3` RREF cleanup and parametric-solution integrity
- What was inspected: `1030efghi-as02.pdf`, `1030efghi-as02as.pdf`, the
  localized `2.3` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added paired in-page quick checks / reveal solutions for
  reading free variables from the long RREF drill, added guided exercises for
  a one-step RREF cleanup and for reading `x_1`, `x_3`, `x_5` from free
  variables, and added one MCQ plus one fill-in checkpoint in the problem bank
- Integrity note: the fill-in checkpoint asks for the single scalar
  `x_5=-5`, avoiding fragile parsing of a full parametric vector; the in-page
  answer blocks stay immediately after their corresponding prompts
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and `git diff --check` passed; local route
  / export smoke returned 200 for representative `2.3` note and export
  routes; browser QA confirmed the new checkpoint prompts render on the zh-HK
  note page with no captured console errors
- Remaining issues: `as03` inverse-by-row-reduction and longer symbolic proof
  exercises remain future exercise-depth targets

### 2026-04-26 checkpoint 17: MATH1030 as03 invertibility-depth parity

- Checkpoint name: `5.1` parameterized inverse and determinant-free proof
  integrity
- What was inspected: `1030efghi-as03.pdf`, `1030efghi-as03as.pdf`, the
  localized `5.1` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added paired in-page quick checks / reveal solutions for
  reading a scalar entry from the `A_alpha^{-1}` formula and for identifying
  `A-I` as the inverse from `A^2x=Ax+x`; added a guided exercise proving
  commutativity from `(A-B)A=I`; added one fill-in checkpoint plus one MCQ in
  the problem bank
- Integrity note: the fill-in checkpoint asks for the single scalar `1`,
  avoiding fragile parsing of a full parameterized inverse matrix; the vector
  identity checkpoint is multiple choice to avoid fragile symbolic parsing of
  matrix-polynomial expressions
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and `git diff --check` passed; local route
  / export smoke on `127.0.0.1:3001` returned 200 for EN / zh-HK / zh-CN
  `5.1` note routes and TXT exports, plus the EN PDF export; browser QA
  confirmed the new checkpoint areas render on the zh-HK note page with no
  captured console errors
- Remaining issues after this pass: the `as03` Q5 / Q6 / Q8 row-reduction
  table material was addressed by checkpoint 18; broader export QA remains
  a future exercise-depth target

### 2026-04-26 checkpoint 18: MATH1030 as03 row-reduction table parity

- Checkpoint name: `5.1` supplied row-reduction table integrity
- What was inspected: `1030efghi-as03.pdf`, `1030efghi-as03as.pdf`, the
  localized `5.1` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added paired in-page quick checks / reveal solutions for
  reading `D=A^{-1}` from `[A | I_p] -> [I_p | D]` and for identifying
  `H=A^{-1}` from a row-operation product; added two MCQ checkpoints for
  those patterns; added worked examples whose stated matrices and vectors
  match the answer-key conclusions for Q5, Q6, and Q8
- Integrity note: both problem-bank additions are multiple choice to avoid
  fragile parsing of full matrix-polynomial expressions; the in-page answer
  blocks stay immediately after their corresponding prompts
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and `git diff --check` passed; local route
  / export smoke on `127.0.0.1:3002` returned 200 for EN / zh-HK / zh-CN
  `5.1` note routes and TXT exports, plus the EN PDF export; browser QA
  confirmed the new checkpoint areas render on the zh-HK and zh-CN note pages
  with no captured console errors
- Remaining issues: broader export QA remains; fully interactive grading of
  complete row-reduction tables is intentionally deferred because it would be
  fragile without a matrix-equivalence parser

### 2026-04-26 checkpoint 19: MATH1030 as02 row-operation product parity

- Checkpoint name: `3.3` row-operation product and reverse-chain integrity
- What was inspected: `1030efghi-as02.pdf`, `1030efghi-as02as.pdf`, the
  localized `3.3` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added a paired in-page quick check / reveal solution for
  the reverse multiplier `K=J^{-1}` after a six-step row-operation chain;
  added one MCQ checkpoint for the same `KJ=I_4` / `JK=I_4` reading
- Integrity note: the problem-bank addition is multiple choice to avoid
  fragile parsing of matrix products; the in-page answer block stays
  immediately after its prompt
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and `git diff --check` passed; local route
  / export smoke on `127.0.0.1:3002` returned 200 for EN / zh-HK / zh-CN
  `3.3` note routes and TXT exports, plus the EN PDF export; browser QA
  confirmed the new checkpoint renders on the zh-HK page, dark mode remains
  coherent, and the language switcher reaches the zh-CN page with no captured
  console errors
- Remaining issues: broader export QA remains; the parameterized `G/H` matrix
  construction from `as02` Q2 is left as optional exercise-depth backlog

### 2026-04-26 checkpoint 20: MATH1030 as02 parameterized row-operation product parity

- Checkpoint name: `3.3` parameterized `G/H` row-operation-product integrity
- What was inspected: `1030efghi-as02.pdf`, `1030efghi-as02as.pdf`, the
  localized `3.3` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added paired in-page quick checks / reveal solutions for
  constructing the parameterized combined multiplier `G` and reversing the
  chain to construct `H=G^{-1}`; added two MCQ checkpoints for the current-row
  entry `alpha_2 beta_1` and the inverse relationship between `G` and `H`
- Integrity note: both problem-bank additions are multiple choice to avoid
  fragile parsing of full symbolic matrices; the in-page answer blocks stay
  immediately after their corresponding prompts
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and local route / export smoke on
  `127.0.0.1:3003` passed; browser DOM QA confirmed the new checkpoint areas
  render on the zh-HK page with no captured console errors; Vercel production
  deployment `dpl_4tDQK1t7oyDTxKNufHNUf3u3jYcZ` reached READY and production
  note / export smoke checks passed
- Remaining issues: broader export QA remains; exhaustive grading of full
  symbolic `5 x 5` matrices is intentionally deferred until there is a robust
  matrix-equivalence parser

### 2026-05-07 checkpoint 21: Math1025 sequence checkpoint integrity

- Checkpoint name: `5.1` sequences, recursion, and series integrity
- What was inspected: `MATH1025_slides_ch5.pdf` extracted text, the new
  localized `5.1` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added paired quick checks / reveal solutions for sequence
  definitions, recursive computation, arithmetic sums, geometric-sum edge
  cases, and the `S_n-rS_n` arithmetic-geometric sum method; added end
  exercises with guided solutions; added five checkpoint problems for an
  even-factor general term, an affine recursive fourth term, the recursion
  theorem, Fibonacci / Binet verification, and the arithmetic-geometric
  finite-sum formula
- Integrity note: the symbolic fill-in for `2^n n!` includes accepted
  equivalent text forms, while the recurrence value is a single scalar and the
  theorem / Fibonacci proof-structure items are multiple choice to avoid
  fragile formula parsing
- Verification: `npm run contentlayer`, `npm run verify:mdx-tables`,
  `npm run lint`, `npx tsc --noEmit --pretty false`, `git diff --check`,
  `AUTH_SECRET=local-test-secret npm run build`, local EN / zh-HK / zh-CN
  route smoke, EN TXT/PDF export smoke, and both new checkpoint preview API
  requests passed
- Remaining issues: broader Math1025 checkpoint density should increase as
  chapters `6` through `11` are authored

### 2026-05-12 checkpoint 22: MATH1030 linear-dependence solution flow

- Checkpoint name: `6.4` warm-up/final exercise ordering and checkpoint
  language cleanup
- What was inspected: EN / zh-HK / zh-CN `6.4 Linear dependence and
  independence`, the generated Contentlayer unit JSON, and the MATH1030
  problem-bank checkpoints attached to the same unit family
- What was changed: renamed the early exercise block to warm-up exercises and
  warm-up solutions, added a final summary after the deeper redundancy /
  null-space / pivot-criterion sections, and kept the final quick checks plus
  guided exercises after that summary. The MATH1030 problem-bank zh-HK text was
  also cleaned so checkpoint hints and solution steps use formal written
  Chinese instead of colloquial Cantonese wording.
- Integrity note: no prompt was moved away from its paired answer. The final
  page still has immediate `QuickCheck` / `RevealSolution` pairings, while
  exports expose those reveal blocks as visible study answers.
- Verification: local production HTML checks confirmed EN / zh-HK / zh-CN
  `6.4` routes render the reordered markers; EN and zh-HK TXT exports include
  warm-up exercises, the redundancy section, final summary, and guided
  solutions; EN PDF export returned `application/pdf`; the free
  `checkpoint.math1030.dependence-zero-vector` preview API returned 200 and
  parsed the zh-HK selected answer.
- Remaining issues: member-gated checkpoint submission was not exercised in
  this pass; only the free preview path was checked to avoid introducing new
  account-state dependencies during QA.

### 2026-05-14 checkpoint 23: Math1025 ch7 integer-methods exercise integrity

- Checkpoint name: `7.1` divisibility / gcd / Diophantine exercise and answer
  pairing
- What was inspected: `MATH1025_slides_ch7.pdf` extracted text pp. 2-35, the
  new EN / zh-HK / zh-CN `7.1` MDX files, and
  `src/lib/textbook/problem-bank.ts`
- What was changed: added paired quick checks / reveal answers for
  divisibility, integer linear combinations, the Euclidean algorithm, and
  Diophantine solvability; added an end exercise set with hidden guided
  solutions; added two checkpoint problems for Euclidean-algorithm last
  remainder and Diophantine solvability
- Integrity note: the end-of-unit solutions are inside `RevealSolution` so the
  public page keeps answers hidden by default while TXT/PDF export can still
  expose them as study material. The checkpoint fill-in is a single integer,
  and the Diophantine solvability item is MCQ to avoid fragile parsing.
- Verification: `npm run contentlayer`, `npm run verify:mdx-tables`,
  `npm run lint`, `npx tsc --noEmit --pretty false`, `git diff --check`,
  `AUTH_SECRET=local-test-secret npm run build`, local EN / zh-HK / zh-CN
  route smoke, EN TXT/PDF export smoke, and both new checkpoint preview API
  requests passed. On `www.evanalysis.top`, both checkpoint preview API
  requests returned 200; EN TXT export included the expected guided solution,
  Euclidean algorithm, and Diophantine markers; EN PDF export returned
  `application/pdf` with a `%PDF` header.
- Remaining issues: chapter 7 now has a follow-up `7.2` exercise and
  checkpoint pass in progress; verify route / export / API behavior before
  closing it.

### 2026-05-15 checkpoint 24: Math1025 ch7 rational / irrational exercise integrity

- Checkpoint name: `7.2` rational / irrational-number exercise and answer
  pairing
- What was inspected: `MATH1025_slides_ch7.pdf` pp. 36-41, the new EN /
  zh-HK / zh-CN `7.2` MDX files, and `src/lib/textbook/problem-bank.ts`
- What was changed: added paired quick checks / reveal answers for rational
  closure, irrational sum/product counterexamples, the reduced-fraction setup
  in the `sqrt(2)` contradiction, and the perfect-square criterion for
  `sqrt(n)`; added an end exercise set with hidden guided solutions; added two
  checkpoint problems for the `sqrt(2)` divisibility step and the perfect-square
  test for `sqrt(n)`
- Integrity note: the end-of-unit solutions are inside `RevealSolution` so the
  public page keeps answers hidden by default while TXT/PDF export can expose
  them as study material. The proof-step checkpoint is fill-in to avoid
  overgrading a full proof, and the perfect-square item is MCQ to avoid fragile
  radical parsing.
- Verification: `npm run contentlayer`, `npm run verify:mdx-tables`,
  `npm run lint`, `npx tsc --noEmit --pretty false`, `git diff --check`,
  `AUTH_SECRET=local-test-secret npm run build`, local EN / zh-HK / zh-CN
  route smoke, EN TXT/PDF export smoke, and both new checkpoint preview API
  requests passed. On `www.evanalysis.top`, both checkpoint preview API
  requests returned 200; EN TXT export included guided-solution,
  perfect-square, and prime-root irrationality markers; EN PDF export returned
  `application/pdf` with a `%PDF` header.

### 2026-06-30 checkpoint 25: MATH1030 9.4 video insertion integrity

- Checkpoint name: `9.4` Cauchy-Schwarz / triangle-inequality video embed
  and export fallback integrity
- What was inspected: the existing EN / zh-HK / zh-CN `9.4` MDX files, the
  new `VideoExplanation` frame sequence, the static TXT / PDF exports, and the
  existing in-page `QuickCheck` / `RevealSolution` pairings.
- What was changed: inserted the localized video explanation after the
  Cauchy-Schwarz proof and before the first numerical worked example; no
  quick-check or reveal-solution content was reordered.
- Integrity note: each locale still keeps the same in-page prompt / answer
  pairings, while export exposes the new video as a static six-frame study
  sequence with no leaked video markup.
- Verification: local Browser DOM checks confirmed the EN / zh-HK / zh-CN
  routes expose the localized video asset and export menu. Local TXT / PDF
  export checks passed for all three locales, including static frame labels
  and absence of `<video>`, `<source>`, `poster=`, or `.mp4` leakage.

### 2026-06-30 checkpoint 26: MATH1030 2.4 video insertion integrity

- Checkpoint name: `2.4` solution-set trichotomy video embed, classifier, and
  export fallback integrity.
- What was inspected: the existing EN / zh-HK / zh-CN `2.4` MDX files, the new
  `VideoExplanation` frame sequence, the existing `solution-set-classifier`,
  static TXT / PDF exports, and the existing in-page quick-check / reveal
  solution placement.
- What was changed: inserted the localized video explanation after the RREF
  reading habit list and before the larger parameterized example; no
  quick-check, exercise, or reveal-solution block was reordered.
- Integrity note: the classifier remains below the video as the interactive
  follow-up. Its unique / infinite / no-solution states were clicked in Browser
  QA and each showed the matching matrix and explanation.
- Verification: local Browser DOM checks confirmed the EN / zh-HK / zh-CN
  routes expose the localized video asset. Local TXT / PDF export checks passed
  for all three locales, including the static video sequence and the existing
  classifier snapshot with no leaked video markup.

### 2026-06-30 checkpoint 27: MATH1030 2.5 video insertion integrity

- Checkpoint name: `2.5` REF / RREF existence video embed, worked examples,
  and export fallback integrity.
- What was inspected: the existing EN / zh-HK / zh-CN `2.5` MDX files, the new
  `VideoExplanation` frame sequence, static TXT / PDF exports, and the existing
  in-page quick-check / reveal-solution placement.
- What was changed: inserted the localized video explanation after the
  pivot-column preservation theorem and before the worked-example section;
  added two static worked examples plus a later-use explanation section before
  common mistakes.
- Integrity note: no quick-check, exercise, or reveal-solution block was moved
  away from its paired prompt. The new worked examples are ordinary article
  blocks and do not introduce hidden answers.
- Verification: local Browser DOM checks confirmed the EN / zh-HK / zh-CN
  routes expose the localized video asset and the new example / later-use
  sections. Local TXT / PDF export checks passed for all three locales,
  including the static video sequence, new examples, and no leaked video
  markup.

### 2026-07-01 checkpoint 28: MATH1030 1.1 video insertion integrity

- Checkpoint name: `1.1` equations / solution-sets video embed, existing
  explorer, and export fallback integrity.
- What was inspected: the existing EN / zh-HK / zh-CN `1.1` MDX files, the new
  `VideoExplanation` frame sequence, the existing
  `system-augmented-matrix-explorer`, static TXT / PDF exports, and the
  existing in-page quick-check / reveal-solution placement.
- What was changed: inserted the localized video explanation after the
  geometric solution-set figure and before the augmented-matrix explorer
  lead-in; no quick-check, exercise, or reveal-solution block was reordered.
- Integrity note: the explorer remains below the video as the interactive
  follow-up. Its `Example 2` state was clicked in Browser QA and showed the
  expected three-equation system and matching augmented matrix.
- Verification: local Browser DOM checks confirmed the EN / zh-HK / zh-CN
  routes expose the localized video assets. Local TXT / PDF export checks
  passed for all three locales, including the static video sequence, the
  existing explorer snapshot, and no leaked video markup.

### 2026-07-01 checkpoint 29: MATH1030 3.1 video insertion integrity

- Checkpoint name: `3.1` matrix entrywise-arithmetic video embed, existing
  matrix-arithmetic lab, and export fallback integrity.
- What was inspected: the existing EN / zh-HK / zh-CN `3.1` MDX files, the new
  `VideoExplanation` frame sequence, the existing `matrix-arithmetic-lab`,
  static TXT / PDF exports, and the existing in-page quick-check / reveal
  solution placement.
- What was changed: inserted the localized video explanation before the
  embedded matrix-arithmetic lab and added a static export snapshot for the
  lab; no quick-check, exercise, or reveal-solution block was reordered.
- Integrity note: the lab remains below the video as the interactive follow-up.
  Browser QA changed scalar `c` from `2` to `3` in all three locales and
  verified the displayed `cA` matrix changed from `[[2,-4],[6,0]]` to
  `[[3,-6],[9,0]]`.
- Verification: local Browser DOM checks confirmed the EN / zh-HK / zh-CN
  routes expose the localized video assets and localized widget snapshot
  titles without showing the raw widget id. Local TXT / PDF export checks
  passed for all three locales, including the static video sequence, the static
  matrix-arithmetic lab snapshot, and no leaked video markup.

### 2026-07-01 checkpoint 30: MATH1030 3.1 matrix multiplication video insertion integrity

- Checkpoint name: `3.1` matrix multiplication / identity video embed, existing
  multiplication visualizer, and export fallback integrity.
- What was inspected: the existing EN / zh-HK / zh-CN `3.1` multiplication MDX
  files, the new `VideoExplanation` frame sequence, the existing
  `matrix-multiplication-visualizer`, static TXT / PDF exports, and the
  existing in-page quick-check / reveal-solution placement.
- What was changed: inserted the localized video explanation after the identity
  matrix paragraph and before the noncommutativity discussion; no quick-check,
  exercise, or reveal-solution block was reordered.
- Integrity note: the visualizer remains below the video as the interactive
  follow-up. Browser QA changed the first matrix input to `5` and verified the
  displayed product calculation updated to `16 = 5*2 + 2*3`.
- Verification: local Browser DOM checks confirmed the EN / zh-HK / zh-CN
  routes expose the localized video assets and the existing visualizer without
  showing the raw widget id. Local TXT / PDF export checks passed for all three
  locales, including the static video sequence, the existing visualizer
  snapshot, and no leaked video markup.
