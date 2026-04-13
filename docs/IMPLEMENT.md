# Implement

This is the active runbook for the current local session.

## Execution rule

Work must continue milestone by milestone in the same session. Do not stop
after a single completed milestone if another milestone in `docs/PLANS.md` is
already ready and not blocked.

## Required loop

For each milestone:

1. inspect the current implementation and the relevant `reference/` sources;
2. implement the note, architecture, or QA change locally in the checked-out
   repository;
3. validate immediately;
4. fix every failure immediately;
5. update the internal docs;
6. continue to the next ready milestone.

## Validation rule

Use the repo-local commands listed in `docs/PLANS.md`. If any command fails:

- do not move to the next milestone;
- fix the issue in the same session;
- rerun validation until it passes.

## When work may stop

Only stop when one of the following is true:

- the global stopping rule from the repo instructions is satisfied;
- a real blocker is reached;
- approval or sandbox limits genuinely prevent the next required action;
- a necessary source file is not present in the repository.

## Current execution state

- Milestone 1 is complete and validated.
- Milestone 2 is complete and validated.
- Milestone 3 is complete and validated.
- Milestone 4 is in progress.
- `math1030` `6.2 Subspaces` is now rewritten and validated in EN, zh-HK, and
  zh-CN.
- The next execution target is the first Math1090 chapter-4 bridge note from
  the April 10 lecture packet and the review materials.
