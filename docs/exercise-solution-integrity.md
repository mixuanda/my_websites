# Exercise, answer, and solution integrity

This document tracks whether quick checks, reveal blocks, proof toggles, and
guided solutions line up with the authored mathematics notes. The goal is to
keep every prompt matched to the correct answer structure and avoid hidden
empty panels or misplaced solution text.

## Latest resume state

As of April 13, 2026, the latest local integrity-related checkpoints are:

- `9085148` `Fix note block prompt rendering`
- `49345a4` `Fix set note reveal integrity`
- `0526751` `Deepen augmented matrix notes`
- `95f3ad7` `Deepen invertible matrix notes`

Every push attempt for those checkpoints failed with the same external error:
`ssh: Could not resolve hostname github.com: Temporary failure in name
resolution`.

The next resume point is to keep exercise integrity coupled to the next content
rewrite, starting with the next MATH1030 unit that is expanded from the
reference PDFs.

## Current findings

The latest local pass removed the biggest component-level mismatch in the
textbook exercise blocks.

- `QuickCheck` now renders as a visible prompt card rather than a reveal-style
  toggle.
- Authored note units that use `QuickCheck` for the prompt and
  `RevealSolution` for the answer now match the shared component behavior more
  closely.
- The next integrity risk is broader QA: confirming that existing units do not
  rely on the old toggle interaction and that export output still reads cleanly.

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
