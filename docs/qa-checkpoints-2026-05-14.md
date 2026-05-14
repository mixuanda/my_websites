# QA Checkpoints - 2026-05-14

This document records the live QA checkpoints for the Notes completeness and
quality pass started on 2026-05-14. It is intentionally internal and should not
be surfaced on public note pages.

## Scope

- Inspect the current public Notes architecture, source coverage, theme/i18n
  surfaces, export behavior, exercise/checkpoint integrity, and rendered route
  health.
- Identify unfinished content and QA gaps against `reference/` and the current
  internal tracking documents.
- Keep findings actionable and tied to repo evidence.

## Checkpoint Log

### 2026-05-14 21:12 HKT - Start / repository state

- Branch: `main`, tracking `origin/main`.
- Initial `git status --short --branch` showed no modified files before this
  checkpoint document was created.
- `reference/` is present and contains substantial MATH1090, MATH1030,
  MATH1025, and CSCI2520 source material.
- Current content is MDX-backed under `content/textbook/**` in EN, zh-HK, and
  zh-CN for the active public Notes units.
- Existing internal backlog documents reviewed first:
  - `docs/notes-improvement-tracker.md`
  - `docs/reference-coverage.md`
  - `docs/chapter-coverage-map.md`
- Initial high-level unfinished areas from existing docs:
  - Math1025 chapters 7-11 are still unauthored.
  - Math1025 homework / assessment material is not yet converted into
    study-level exercises.
  - Math1010 has no repository source tree, so only architecture should remain
    prepared.
  - MATH1090 and MATH1030 route-level core coverage is mostly present, but
    broad export/rendering/theme/exercise QA remains active.
  - CSCI2520 has public baseline coverage, but algorithm interaction depth and
    checkpoint depth remain improvement targets.

## Command / QA Results

### 2026-05-14 21:20 HKT - Static structure and build QA

- `npm run contentlayer`: passed, generated 232 Contentlayer documents.
- `npm run verify:mdx-tables`: passed; GFM table parsing and KaTeX inside
  table cells remain wired.
- `npm run lint`: passed.
- `npx tsc --noEmit --pretty false`: passed.
- `AUTH_SECRET=local-test-secret npm run build`: passed; generated 313 static
  pages and retained the public localized Notes routes.
- `npm run check:textbook-content`: passed without hard errors, but reported
  363 warnings. These warnings are currently the strongest automated signal
  that many note units still need depth / theorem / worked-example parity work.

### 2026-05-14 21:27 HKT - Public wording cleanup checkpoint

- Removed source-process wording from public MDX where automated search found
  phrases such as `lecture notes`, `source material`, `worksheet`, `讲义`, or
  `工作纸` used as authoring provenance rather than mathematical content.
- Remaining `worksheet` hit in public content is an example sentence
  (`Please hand in the worksheet.`) used to illustrate that an imperative is
  not a proposition; it is not source tracing.

### 2026-05-14 21:36 HKT - Local route / export / checkpoint QA

- Browser plugin attempt failed with `Browser is not available: iab`; continued
  with local production server, HTTP/DOM checks, Playwright CLI screenshots,
  export routes, and checkpoint preview API checks.
- Installed Playwright Chromium into the user cache for QA screenshots; no
  repository dependency was added.
- Local production server: `AUTH_SECRET=local-test-secret npm run start -- -p
  3000`.
- Representative page screenshots:
  - `/tmp/my_websites-qa-final-math1030-light.png`
  - `/tmp/my_websites-qa-final-math1090-mobile-dark.png`
- Route status checks returned 200 for:
  - `/zh-hk/notes`
  - `/en/notes/math1030/matrices/gaussian-elimination-rref`
  - `/zh-cn/notes/math1025/complex-numbers/complex-number-arithmetic-and-geometry`
- HTML check on the Math1030 sample found the site-level language switcher,
  localized route links, export control text, and KaTeX output.
- TXT export checks returned 200 and included static study snapshots for:
  - `math1030/matrices/gaussian-elimination-rref`
  - `math1090/big-sets/cantor-theorem-continuum-and-choice`
  - `math1025/sequences/sequences-and-recursion`
- PDF export check returned 200 for Math1025 complex numbers:
  `application/pdf`, 184017 bytes, 18 pages.
- Checkpoint grade-preview API checks returned 200 for:
  - `demo.math1030.rref-pivot-column`
  - `checkpoint.math1025.complex-numbers.divide-by-conjugate`
- Export QA found and fixed a zh-HK phrase defect:
  `同一段這裏` -> `同一部分`.
- Export / public prose QA also removed `source formula` / `來源公式` /
  `来源公式` wording from the Math1025 sequences unit and one problem-bank
  preview.
- Re-verified after fixes:
  - `npm run contentlayer`: passed, 232 documents.
  - `npm run verify:mdx-tables`: passed.
  - `npm run lint`: passed.
  - `npx tsc --noEmit --pretty false`: passed.
  - `AUTH_SECRET=local-test-secret npm run build`: passed, 313 static pages.
  - `npm run check:textbook-content`: still passes with 363 warnings.

### 2026-05-14 22:20 HKT - Remote production QA before deploy

- Retried the requested built-in Browser path first; it remained blocked with
  `Browser is not available: iab`.
- Used Microsoft Edge through Computer Use against remote production only; no
  localhost route was used for this checkpoint.
- Edge visual QA confirmed:
  - `https://www.evanalysis.top/zh-hk/notes` loads the public Notes index with
    course cards and the site-level language switcher.
  - `https://www.evanalysis.top/en/notes` and
    `https://www.evanalysis.top/zh-cn/notes` load localized Notes index
    content.
  - `https://www.evanalysis.top/en/notes/math1030/matrices/gaussian-elimination-rref`
    loads the real note page, course sidebar, chapter finder, language links,
    export button, article content, KaTeX-rendered checkpoint math, and section
    mastery checkpoint.
- Remote HTTP route checks returned 200 for:
  - `/zh-hk/notes`
  - `/en/notes`
  - `/zh-cn/notes`
  - `/en/notes/math1030/matrices/gaussian-elimination-rref`
  - `/zh-hk/notes/math1090/big-sets/cantor-theorem-continuum-and-choice`
  - `/en/notes/math1025/sequences/sequences-and-recursion`
  - `/zh-cn/notes/math1025/complex-numbers/complex-number-arithmetic-and-geometry`
- Remote TXT export checks returned 200 and included static study snapshots for:
  - `en/math1030/matrices/gaussian-elimination-rref`
  - `zh-hk/math1090/big-sets/cantor-theorem-continuum-and-choice`
  - `en/math1025/sequences/sequences-and-recursion`
- Remote PDF export returned 200 for the zh-CN Math1025 complex-numbers unit:
  `application/pdf`, 184017 bytes, `%PDF` magic header.
- Remote checkpoint preview API returned 200 for
  `demo.math1030.rref-pivot-column` with the expected preview text.
- Important production gap found: remote TXT exports still contain the pre-fix
  wording `同一段這裏` and `source formula`-style source-process phrasing.
  The current local diff already removes these strings from public content and
  the problem bank, so this is a deployment gap rather than a still-unfixed
  local content defect.

### 2026-05-14 22:28 HKT - Remote production QA after deploy

- Commit `19cfc39` was pushed to `origin/main`.
- Vercel production deployment
  `dpl_NupUD7apH7okJyxvHUf5Cb6vX4aK` reached `Ready`, and
  `https://www.evanalysis.top` resolved to that new production deployment.
- Re-ran the same remote-only HTTP checks against `www.evanalysis.top`:
  - all seven sampled Notes routes returned 200;
  - sampled TXT exports returned 200 and retained static study snapshots;
  - stale wording check returned `no` for `同一段這裏`, `source formula`,
    `來源公式`, and `来源公式`;
  - Math1025 complex-number PDF export returned 200 with `application/pdf`
    and `%PDF` header;
  - `demo.math1030.rref-pivot-column` preview API returned 200 with the
    expected selected-choice preview text.
- Microsoft Edge post-deploy visual QA confirmed the zh-HK Math1090 Cantor /
  choice page loads from `www.evanalysis.top`, with localized course sidebar,
  export control, checkpoint block, and the corrected prose `同一部分`.

### 2026-05-14 23:30 HKT - Math1025 ch7 integer-methods implementation checkpoint

- Gap selected: Math1025 chapter-slide backlog remains the largest
  source-backed unfinished slice. `MATH1025_slides_ch7.pdf` pp. 2-35 was
  chosen because it supports a coherent public Notes unit on divisibility,
  gcd, the Euclidean algorithm, Bezout, prime factorization, and linear
  Diophantine equations.
- Implementation completed so far:
  - added EN / zh-HK / zh-CN MDX for
    `7.1 Divisibility, gcd, and integer equations`;
  - registered a new Math1025 chapter family `integer-methods` in the shared
    catalog;
  - added two free checkpoint problems for Euclidean-algorithm last remainder
    and Diophantine solvability;
  - updated reference coverage, chapter coverage, parity, rendering, exercise,
    and tracker docs.
- Scope intentionally left for later:
  - the rational / irrational-number material in the rest of chapter 7;
  - chapter 8 polynomial arithmetic / gcd / irreducibility;
  - chapter 9-11 vectors and geometry;
  - homework / assessment PDFs as secondary exercise-design support.
- Local verification completed at this checkpoint:
  - `npm run contentlayer` generated 235 documents;
  - `npm run verify:mdx-tables`, `npm run lint`,
    `npx tsc --noEmit --pretty false`, and `git diff --check` passed;
  - `AUTH_SECRET=local-test-secret npm run build` passed and generated 316
    static pages;
  - `CONTENT_CHECK_MAX_WARNINGS=40 npm run check:textbook-content` passed with
    366 backlog warnings and required structure present;
  - local production smoke on `127.0.0.1:3004` returned 200 for EN / zh-HK /
    zh-CN `7.1` note routes;
  - EN TXT export returned 200 and included guided-solution / Euclidean /
    Diophantine markers;
  - EN PDF export returned 200 with `application/pdf` and a `%PDF` header;
  - both new checkpoint preview API requests returned 200.
- Verification still pending after this checkpoint: commit, push, production
  deploy wait, and remote `www.evanalysis.top` verification.

## Unfinished Content And QA Backlog

### Content still not complete

1. Math1025 remains the largest course-content backlog.
   - Current public units: 8 three-language unit families after the new `7.1`
     integer-methods unit.
   - Current source-like files under `reference/MATH1025`: 26.
   - `docs/chapter-coverage-map.md` now marks the first `ch7` integer-methods
     slice as authored; remaining chapter-slide backlog is the later `ch7`
     rational / irrational material, `ch8` polynomials, and `ch9` through
     `ch11` vectors / geometry.
   - Homework and assessment PDFs remain secondary exercise-design backlog.
   - Problem-bank coverage is thin: 3 of 8 Math1025 units currently have
     checkpoint problems.
   - `check:textbook-content` needs to be rerun after the new 24 localized
     Math1025 files are generated.

2. CSCI2520 has a public baseline but is still thin.
   - Current public units: 9 three-language unit families.
   - Current source-like files under `reference/CSCI2520`: 100.
   - `check:textbook-content` reports 63 CSCI2520 issue signals, including
     depth, missing article-shape signals, low theorem count, and low
     worked-example count.
   - Problem-bank coverage is thin: 7 of 9 CSCI2520 units have no checkpoint
     problem.
   - Algorithm units still need code / pseudocode depth and synchronized
     demonstration depth.
   - Public prose still contains several CSCI source-process phrases such as
     `lecture`, `tutorial material`, and `source slides`; these should be
     cleaned in a focused CSCI pass.

3. Math1030 route-level coverage is broad, but depth and checkpoint parity are
   not finished.
   - Current public units: 37 three-language unit families.
   - Problem-bank coverage: 32 of 37 units have checkpoint problems.
   - Units without checkpoint problems:
     `math1030.matrix-algebra.matrix-addition-scalar-multiplication`,
     `math1030.matrix-algebra.matrix-multiplication-and-linear-systems`,
     `math1030.matrix-algebra.transposes-and-symmetric-matrices`,
     `math1030.matrix-algebra.special-matrices`, and
     `math1030.matrix-algebra.block-matrices`.
   - `check:textbook-content` reports 165 Math1030 issue signals, mostly
     depth warnings and worked-example parity warnings.
   - Remaining work is content-depth parity, more computational checkpoint
     coverage, and broader export / rendered QA across higher chapters.

4. Math1090 route-level coverage and checkpoint coverage are strong, but QA is
   still active rather than complete.
   - Current public units: 23 three-language unit families.
   - Problem-bank coverage: all 23 Math1090 units have at least one checkpoint
     problem.
   - `check:textbook-content` still reports 111 Math1090 issue signals, mostly
     depth and theorem / worked-example count warnings.
   - Remaining work is broader rendered/export/theme QA and optional deeper
     practice, not obvious route-level chapter authoring.

5. Math1010 is not authored because the repository has no
   `reference/MATH1010/**` source tree.
   - Architecture should remain future-course ready.
   - Do not fabricate Math1010 content until checked-in source material exists.

### QA still not complete

- Full in-app Browser QA remains blocked because the browser backend was not
  available in this run.
- Console-health checks were not available through the Browser plugin. The
  fallback evidence is local HTTP status, static HTML markers, Playwright CLI
  screenshots, Edge visual remote QA, export responses, and API responses.
- Production verification on `www.evanalysis.top` has started and found that
  current production is healthy at the route / export / API level. The latest
  deployed production checks no longer show the stale export wording found in
  the pre-deploy pass.
