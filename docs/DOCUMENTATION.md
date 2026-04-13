# Documentation

## Current status

The current local session has completed Milestones 1 to 3 and is now inside
Milestone 4 from `docs/PLANS.md`.

Completed and validated so far:

- `math1090` unit `3.4` rewritten in EN, zh-HK, and zh-CN;
- `math1030` unit `2.4` rewritten in EN, zh-HK, and zh-CN;
- `math1030` unit `6.1` rewritten in EN, zh-HK, and zh-CN;
- `math1030` unit `6.3` rewritten in EN, zh-HK, and zh-CN;
- localized Notes landing page now uses a route helper for the archive CTA
  instead of a hardcoded path;
- course typing generalized away from a two-course union;
- internal coverage and QA docs updated;
- local build and lint passed after each completed milestone.

## What changed

- `math1090` `3.4` now explains the quotient construction of `Q`, the
  equivalence relation, well-defined operations, and representative-dependent
  pitfalls at textbook depth.
- `math1030` `2.4` now explains consistency, pivot columns, free variables,
  solution-set classification, and parameterized solution writing at textbook
  depth.
- `math1030` `6.1` now covers the vector-space axioms, standard examples,
  nonstandard operations, the cancellation law, and uniqueness of zero and
  additive inverses.
- `math1030` `6.3` now treats span as a theorem-backed object, connects
  membership in a span to solvability of `Ax = b`, and expands the geometric and
  subspace interpretations substantially.
- localized display math in the rewritten zh-HK and zh-CN files was cleaned so
  KaTeX no longer warns about punctuation inside math mode.
- the internal docs now track future `math1025` coverage explicitly and record
  the missing-reference public policy.

## Decisions made and why

- Keep mathematics under the public Notes frame even though the implementation
  still uses `textbook` internally, because public IA stability is more
  important than an internal namespace rename during active content production.
- Generalize `CourseId` to `string` now, because future-course preparation is
  already a real repository requirement.
- Remove source-process phrasing from public note prose, because the teaching
  pages must read like notes, not like authoring logs.
- Prefer `array`-based augmented-matrix notation over brittle `bmatrix` plus
  literal separator markup, because it is more stable for KaTeX and export.
- Keep the public `/notes` archive link behind a helper rather than a hardcoded
  string, because the localized Notes shell should route through the same helper
  layer as the rest of the note system.

## Known issues

- Several thin public units remain, especially `math1030` `6.2`, `6.4`, and
  the unauthored `math1090` chapter 4 sequence.
- The repo worktree still contains a pre-existing `AGENTS.md` deletion and
  `Agents.md` addition. That rename state was not altered in this run.

## Next milestone

Continue Milestone 4 with the next thin public note, most likely
`math1030` `6.2 Subspaces`, then move into the first Math1090 chapter-4 bridge
note on total order, bounds, and completeness.

## Uncovered reference areas

- `math1090` chapter 4 and later review / appendix material;
- `math1030` chapters 7 to 9;
- all public `math1025` note routes.

## Blockers

- No repository-source blocker for the current milestone.
- `math1010` remains blocked by the absence of a `reference/MATH1010/**` tree
  in the repo.
