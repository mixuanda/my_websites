# Storyboard Pilot Plan (MATH1030 Matrix Units)

## Pilot scope

High-value units selected for initial rollout:

1. `math1030/matrices/matrix-basics`
2. `math1030/matrices/augmented-matrices-row-operations`
3. `math1030/matrices/gaussian-elimination-rref`

These three units were chosen because they form the procedural foundation for
later matrix algebra, row reduction, and solution-structure topics.

## Metrics to collect

- **Unit completion rate**
  - definition: completed storyboard session / started storyboard session
- **Error reports per 100 sessions**
  - includes notation mismatch, wrong theorem text, wrong locale wording,
    incorrect recap-answer pairing
- **Notation QA pass rate**
  - package-level QA pass ratio for math notation checks
- **Locale QA pass rate**
  - package-level QA pass ratio for locale correctness checks

## Quality thresholds (go/no-go)

Read from `data/storyboard/pilot-thresholds.json`.

Default gate:

- completion rate >= 72%
- error reports <= 4 per 100 sessions
- notation QA pass rate >= 98%
- locale QA pass rate >= 97%

## Decision policy

- If all thresholds pass: expand to next matrix chapter units, then vector-space
  units.
- If any threshold fails: freeze scope, fix content/system causes, rerun pilot.
- No scale-out without passing the quality gate.

## Evaluation command

```bash
npm run storyboard:pilot-evaluate
```
