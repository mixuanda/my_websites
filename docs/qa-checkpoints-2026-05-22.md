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

### Production deployment

- Commit under test: `c604156` (`Add Math1025 polynomial notes and QA rules`).
- Production deployment: `dpl_B5yi1wnZcRAmcfgWdVFDG1ANkcwS`.
- `npx vercel inspect https://www.evanalysis.top --wait --timeout 5m`
  confirmed `www.evanalysis.top` aliases to the Ready production deployment.
- `npx vercel logs dpl_B5yi1wnZcRAmcfgWdVFDG1ANkcwS --no-follow --since 20m
  --level error --limit 20`: no error logs found.
- Follow-up fix commit: `147db3a` (`Fix Math1025 Vieta checkpoint rendering`).
- Follow-up production deployment:
  `dpl_AHZkEPRnukp9TUAUHFpHHPcSJxoe`, also confirmed Ready through
  `www.evanalysis.top`.

### Remote route, export, and API checks

Remote checks against `https://www.evanalysis.top` returned 200 for:

- `/en/notes`, `/zh-hk/notes`, `/zh-cn/notes`;
- `/en/notes/math1025`, `/zh-hk/notes/math1025`,
  `/zh-cn/notes/math1025`;
- EN / zh-HK / zh-CN `8.1 Polynomial arithmetic and division`;
- EN `8.2 Polynomial gcds and irreducibility`;
- EN `8.3 Rational functions, partial fractions, and Vieta formulas`;
- TXT exports for EN / zh-HK `8.1` and EN `8.3`;
- EN `8.1` PDF export, with `application/pdf` and `%PDF` header.

Remote checkpoint preview API checks returned 200 and parsed successfully for
all seven new Math1025 chapter 8 checkpoint IDs:

- `checkpoint.math1025.polynomial-methods.division-remainder`
- `checkpoint.math1025.polynomial-methods.factor-theorem-parameter`
- `checkpoint.math1025.polynomial-methods.zero-count`
- `checkpoint.math1025.polynomial-methods.euclidean-gcd`
- `checkpoint.math1025.polynomial-methods.irreducible-over-field`
- `checkpoint.math1025.polynomial-methods.partial-fraction-form`
- `checkpoint.math1025.polynomial-methods.vieta-product`

### Deep interaction checks

Remote Playwright browser automation on `www.evanalysis.top` verified:

- EN desktop `8.1` page identity, heading, stepper, checkpoint section, and no
  framework overlay or console errors;
- zh-HK mobile dark-mode `8.1` page identity, heading, stepper, checkpoint
  section, and no framework overlay or console errors;
- the polynomial long-division stepper advances from step 1 through step 5,
  disables Previous on step 1, disables Next on step 5, and moves back to step
  4 with Previous;
- `8.1` checkpoint Preview enables after fill-in input, normalizes `x+8` as
  `8+x`, previews `-7/3`, and previews the MCQ selected choice;
- `8.1` checkpoint Submit API returned 200 for `x+8`, marked the answer
  correct, updated progress, and exposed the full solution button in the
  rendered page;
- `8.2` checkpoint preview accepted `x-1` and displayed the normalized gcd
  preview, and the correct irreducibility MCQ choice preview rendered;
- `8.3` checkpoint preview rendered the correct partial-fraction form and
  accepted the Vieta product answer `3`.

Screenshots captured outside the repo:

- `/tmp/my-websites-remote-en-desktop.png`
- `/tmp/my-websites-remote-zh-hk-mobile-dark.png`
- `/tmp/my-websites-deep-8-1-after-submit.png`
- `/tmp/my-websites-deep-8-3-after-previews.png`

### Additional issue found during deep QA

Deep visual QA found that the `8.3` Vieta checkpoint prompt displayed the
alpha-product blank as raw TeX-style code in the rendered prompt. Root cause:
the prompt used a backticked expression with `____`, which failed the inline
math renderer's KaTeX path and fell back to code text. Fix: rewrite the prompt
in `src/lib/textbook/problem-bank.ts` to use explicit `$...$` inline math and
`\\square` for the blank.

Follow-up remote verification on deployment
`dpl_AHZkEPRnukp9TUAUHFpHHPcSJxoe` confirmed:

- `www.evanalysis.top` points to the fixed Ready deployment;
- the rendered `8.3` prompt visually shows Greek alpha notation and a square
  blank instead of raw `\\alpha...=____` text;
- remote HTML no longer contains the raw `\\alpha_1\\alpha_2\\alpha_3=____`
  blank marker;
- the Vieta checkpoint preview API accepts answer `3` and returns normalized
  preview text `3`;
- `npx vercel logs dpl_AHZkEPRnukp9TUAUHFpHHPcSJxoe --no-follow --since 10m
  --level error --limit 20`: no error logs found.
