# QA Checkpoints - 2026-05-22

This document records the remote-first QA pass requested on 2026-05-22. It is
internal and should not be surfaced on public note pages.

## Scope

- Prefer production / remote verification over localhost-only checks.
- Inspect the existing uncommitted Notes work before deciding whether to commit.
- Record related problems discovered during QA.
- Update `AGENTS.md` so future substantial work defaults to goal tracking and
  may use agent teams / sub-agents without asking again when scopes are safe.

## Pre-commit Inspection

- Branch at start: `main`, tracking `origin/main`.
- Existing uncommitted work was a coherent Math1025 chapter 8 Notes slice, not
  unrelated local noise:
  - three localized public note units under
    `content/textbook/math1025/polynomial-methods/**`;
  - catalog registration for the `polynomial-methods` chapter family;
  - `math1025-polynomial-division-stepper` plus static export snapshot;
  - seven source-backed checkpoint problems;
  - generated Contentlayer files;
  - coverage, interaction, exercise, and workflow docs.
- Judgment: the content is related to the requested Notes QA. Remote QA of this
  state requires committing and pushing it after the deployment-safety checks
  pass, because `www.evanalysis.top` cannot expose uncommitted local content.

## Deployment-safety Checks

Passed before commit / push:

- `npm run contentlayer`: passed, generated 247 documents.
- `npm run verify:mdx-tables`: passed.
- `npm run lint`: passed.
- `npx tsc --noEmit --pretty false`: passed.
- `git diff --check`: passed.
- `AUTH_SECRET=local-test-secret npm run build`: passed, generated 328 static
  pages.
- `CONTENT_CHECK_MAX_WARNINGS=500 npm run check:textbook-content`: passed with
  required structure present, but reported 381 warnings.

## Findings Recorded Before Remote QA

### F1 - Content-depth backlog remains broad

`npm run check:textbook-content` still reports 381 warnings across the Notes
tree. The script did not find structural errors, but many public units remain
below the current depth proxy or below theorem / worked-example targets. This
is a content backlog, not a build blocker.

### F2 - New Math1025 chapter 8 units need a later depth pass

The newly added Math1025 chapter 8 units are source-backed and structurally
valid, but the content checker flags all three localized unit families as below
the current depth proxy target:

- `8.1 Polynomial arithmetic and division`: EN 1740 / 1800, zh-CN 1147 / 1300,
  zh-HK 1147 / 1300.
- `8.2 Polynomial gcds and irreducibility`: EN 1478 / 1800, zh-CN 1029 / 1300,
  zh-HK 1030 / 1300.
- `8.3 Rational functions, partial fractions, and Vieta formulas`: EN 1081 /
  1800, zh-CN 752 / 1300, zh-HK 753 / 1300.

This should be tracked as a follow-up depth pass rather than silently treated
as fully finished textbook depth.

### F3 - Math1025 source backlog now starts at chapters 9-11

After the chapter 8 polynomial-methods slice, the next source-backed Math1025
chapter backlog is `reference/MATH1025/MATH1025_slides_ch9.pdf` through
`reference/MATH1025/MATH1025_slides_ch11.pdf`, covering vectors and geometry.
Homework and assessment PDFs remain secondary exercise-design support.

## Remote QA Status

Pending until the commit is pushed and the production deployment for
`www.evanalysis.top` reaches Ready.
