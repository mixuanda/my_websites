# QA Checkpoints - 2026-05-15

This document records the live checkpoints for the Math1025 `7.2` rational /
irrational-number supplement. It is internal and should not be surfaced on
public note pages.

## Scope

- Continue from the previous Math1025 chapter 7 checkpoint instead of
  restarting repository reconnaissance.
- Finish the remaining source-backed `MATH1025_slides_ch7.pdf` material after
  `7.1`.
- Keep the public page under Notes, article-first, and export-friendly.
- Verify locally and on `www.evanalysis.top` before closing the round.

## Checkpoint Log

### 2026-05-15 00:05 HKT - Start / repository state

- Branch: `main`, tracking `origin/main`.
- Initial `git status --short --branch` for this continuation showed existing
  local edits in `src/lib/textbook/catalog.ts`, `src/lib/textbook/problem-bank.ts`,
  and the new `content/textbook/math1025/integer-methods/rational-and-irrational-numbers/`
  directory.
- Previous internal docs still identified the later chapter 7 rational /
  irrational-number material as unfinished; this checkpoint advances that
  boundary to chapter 8 after implementation.

### 2026-05-15 00:15 HKT - Implementation checkpoint

- Added three localized MDX files for `7.2 Rational and irrational numbers`
  under the existing Math1025 integer-methods chapter family.
- Registered the new unit in `src/lib/textbook/catalog.ts` with source refs to
  `reference/MATH1025/MATH1025_slides_ch7.pdf` pp. 36-41.
- Added two shared problem-bank checkpoints:
  `checkpoint.math1025.integer-methods.sqrt2-contradiction-step` and
  `checkpoint.math1025.integer-methods.sqrt-perfect-square-test`.
- Updated internal coverage and QA records so the current checkpoint clearly
  shows implementation completed locally and verification still pending.

## Command / QA Results

### 2026-05-15 00:31 HKT - Local verification

- `npm run contentlayer`: passed, generated 238 Contentlayer documents.
- `npm run verify:mdx-tables`: passed.
- `npm run lint`: passed.
- `npx tsc --noEmit --pretty false`: passed.
- `git diff --check`: passed.
- `AUTH_SECRET=local-test-secret npm run build`: passed and generated 319
  static pages.
- `CONTENT_CHECK_MAX_WARNINGS=40 npm run check:textbook-content`: passed with
  372 backlog warnings and required structure present.
- Local production smoke on `127.0.0.1:3005` returned 200 for:
  - `/en/notes/math1025/integer-methods/rational-and-irrational-numbers`
  - `/zh-hk/notes/math1025/integer-methods/rational-and-irrational-numbers`
  - `/zh-cn/notes/math1025/integer-methods/rational-and-irrational-numbers`
- Local EN TXT export returned 200 and included guided-solution, perfect-square,
  and prime-root irrationality markers.
- Local EN PDF export returned 200 with `application/pdf` and a `%PDF` header.
- Local preview API checks returned 200 for:
  - `checkpoint.math1025.integer-methods.sqrt2-contradiction-step` with
    normalized answer `a`
  - `checkpoint.math1025.integer-methods.sqrt-perfect-square-test` with
    normalized choice `a`

### Pending

- commit and push
- Vercel production deploy wait
- remote `www.evanalysis.top` EN / zh-HK / zh-CN route checks
- remote EN TXT/PDF export checks
- remote preview API checks for both new checkpoint problems
- remote browser-style page verification without Chrome

## Unfinished Content And QA Backlog

- Math1025 chapter 7 is now implemented locally through `7.2` and has passed
  local verification, but it is not complete for the round until production
  deployment and `www.evanalysis.top` verification pass.
- Math1025 chapter 8 polynomial methods remains the next primary source-backed
  chapter-slide backlog after this round.
- Math1025 chapters 9-11 remain pending vectors / geometry backlog.
- Homework and assessment PDFs remain secondary exercise-design support after
  baseline chapter notes exist.
