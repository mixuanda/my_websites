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

## Full-site remote QA - 2026-05-22

### Scope and environment

- Target: production `https://www.evanalysis.top`, tested remote-first.
- Initial production baseline: `dpl_EoeSCHfXkB4yp4fJ1fZbED1oUGFe`.
- Final verified production deployment after fixes:
  `dpl_3wf7pbKsNhqbSDCmj4HhyfAohYEL`.
- Browser path: Browser plugin was not available, so deep interaction coverage
  used Playwright Chromium fallback.
- Temporary evidence directory outside the repository:
  `/tmp/my-websites-full-qa-2026-05-22/`.

### Sitemap and route coverage

The full production sitemap contained 259 public URLs:

- root/static: 4;
- `en`: 86;
- `zh-hk`: 86;
- `zh-cn`: 86;
- `csci2520`: 30;
- `math1025`: 39;
- `math1030`: 114;
- `math1090`: 72.

After the production fixes below, the full remote crawl returned 259 / 259
successful public sitemap URLs. The rerun found no framework overlays and no
HTML error root on sitemap pages. The final spot check of
`/en/notes/math1030/matrix-algebra/transpose-and-special-matrices` returned
`200 text/html; charset=utf-8`.

Negative-path checks behaved as expected:

- preview-only public surfaces such as `/about`, `/blog`, `/projects`,
  `/notes/membership`, and `/admin` returned 404 in production;
- protected preview/development surfaces such as `/diary`, `/settings`, and
  `/premium/*` redirected to `/login?callbackUrl=...` and did not expose
  protected content;
- localized legacy `/courses` paths redirected to the localized Notes index and
  resolved with 200. This is acceptable as compatibility behavior unless the
  production-surface policy later requires hard 404s.

### Export coverage

Remote TXT export succeeded for all 243 public unit pages:

- `csci2520`: 27 / 27;
- `math1025`: 36 / 36;
- `math1030`: 111 / 111;
- `math1090`: 69 / 69.

Remote PDF export also succeeded for all 243 public unit pages. Each checked
response returned status 200, `application/pdf`, and a `%PDF` header. The
slowest observed examples were still within the normal production range, with a
maximum around 6.4 seconds during this run.

### API and interaction coverage

The remote API smoke suite verified expected production behavior for:

- grade request with missing payload: 400;
- missing problem preview/grade path: 404;
- progress path with missing problem: 404;
- missing section progress: 200 with empty progress data;
- billing status on production public surface: 404;
- admin system status on production public surface: 404.

Deep Playwright interaction coverage verified these representative flows:

- desktop Notes course navigation, language switching to `zh-HK`, dark mode,
  and high-contrast mode;
- Math1030 transpose/special-matrices page render, export dropdown, TXT/PDF
  actions, and checkpoint preview;
- Math1090 truth-table interaction using the biconditional choice;
- Math1030 matrix multiplication visualizer input editing and explanation
  output;
- Math1030 augmented-system explorer example switching;
- CSCI2520 pointer tracer through the final step, including the final pointer
  write state;
- mobile zh-HK Notes menu in dark mode.

### Issues found and fixed

#### P0 - Math1030 transpose page returned 500 in production

Initial sitemap crawling found all three localized versions of
`/notes/math1030/matrix-algebra/transpose-and-special-matrices` returning 500.
Vercel logs showed:

`Expected component ProofSketch to be defined: you likely forgot to import, pass, or provide it.`

Fix:

- mapped `ProofSketch` to `CollapsibleProof` in
  `src/components/textbook/mdx-components.tsx`;
- local `npm run lint`: passed;
- local `npm run build`: passed;
- commit: `2a38c8f` (`Fix textbook proof sketch rendering`);
- post-fix deployment: `dpl_8jUozsExRbpD5wug6oHxkP16g2fb`;
- post-fix remote crawl: 259 / 259 public sitemap URLs OK.

#### P2 - Mobile menu dialog lacked an accessible description

Playwright console/a11y monitoring surfaced the Radix warning:

`Missing Description or aria-describedby={undefined} for {DialogContent}.`

Fix:

- added localized, screen-reader-only `SheetDescription` content in
  `src/components/glass/GlassSidebar.tsx`;
- local `npm run lint`: passed;
- local `npm run build`: passed;
- commit: `f807a4e` (`Add mobile menu dialog description`);
- final deployment: `dpl_3wf7pbKsNhqbSDCmj4HhyfAohYEL`;
- final mobile zh-HK dark-menu rerun passed with no console events, page
  errors, or bad responses.

### Final production verification

Final checks against `dpl_3wf7pbKsNhqbSDCmj4HhyfAohYEL` confirmed:

- `www.evanalysis.top` points to the Ready production deployment;
- the Math1030 transpose/special-matrices route returns 200;
- Vercel error logs for the final deployment returned no logs in the checked
  window;
- the final mobile menu interaction rerun passed without the prior dialog
  description warning.

### Remaining observations

No blocking production QA failures remain from this full-site pass.

Non-blocking items to keep visible:

- the localized legacy `/courses` redirects are compatible with the current
  Notes framing, but can be hardened if strict hidden-surface behavior is later
  desired;
- protected preview/development surfaces currently redirect to login rather than
  hard-404ing, which is content-safe but should remain an intentional policy;
- this QA pass verified routes, exports, API behavior, interaction behavior,
  deployment health, and obvious runtime/rendering failures. It did not attempt
  to re-author every note or close the broader content-depth backlog already
  tracked by `npm run check:textbook-content`;
- the Math1025 chapters 9-11 source-backed backlog remains the next content
  authoring target after QA closeout.
