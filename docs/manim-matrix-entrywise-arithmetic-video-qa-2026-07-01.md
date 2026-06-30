# MATH1030 3.1 Matrix Entrywise Arithmetic Video QA

Date: 2026-07-01

Branch: `codex/manim`

Unit: `math1030/matrix-algebra/matrix-addition-scalar-multiplication`

Component id: `math1030-matrix-entrywise-arithmetic-story`

## Source Boundary

- `reference/MATH1030/MATH1030-Notes.pdf` pp. 35-38: matrix equality,
  matrix addition, scalar multiplication, zero matrices, additive inverses,
  subtraction as `A + (-B)`, and entrywise algebraic laws.
- `reference/MATH1030/1030gi-n01-se0102.pdf` pp. 1-3: matrix addition and
  scalar-multiplication practice examples.
- Practice Set 2 questions 1-2: entrywise scalar/addition computations and
  defined / not-defined size checks.

Unsupported material was not added. The clip does not introduce matrix
multiplication, block matrices, arbitrary-size interactive editing, or vector
space axioms beyond the entrywise algebra already supported by the section.

## Implementation

- Added a trilingual storyboard at
  `content/textbook/math1030/matrix-algebra/matrix-addition-scalar-multiplication/storyboard.json`.
- Added Manim scene source at
  `tools/animations/manim/scenes/math1030/matrix_entrywise_arithmetic.py`.
- Added render-script support for:
  - `MatrixEntrywiseArithmeticStoryEn`
  - `MatrixEntrywiseArithmeticStoryZhHk`
  - `MatrixEntrywiseArithmeticStoryZhCn`
- Added localized `VideoExplanation` metadata in
  `src/lib/textbook/video-explanations.ts`.
- Embedded the video in all three localized MDX note pages before the existing
  matrix-arithmetic lab.
- Added a static export snapshot for `matrix-arithmetic-lab` in
  `src/lib/textbook/interactive-snapshots.ts` so TXT / PDF exports no longer
  fall back to the raw widget id.
- Kept `matrix-arithmetic-lab` as the reader-controlled follow-up for changing
  the scalar and comparing `A+B`, `A-B`, and `cA`.

## Assets

Rendered assets:

- `/generated/animations/math1030/matrix-entrywise-arithmetic-story-en.mp4`
- `/generated/animations/math1030/matrix-entrywise-arithmetic-story-en.png`
- `/generated/animations/math1030/matrix-entrywise-arithmetic-story-zh-hk.mp4`
- `/generated/animations/math1030/matrix-entrywise-arithmetic-story-zh-hk.png`
- `/generated/animations/math1030/matrix-entrywise-arithmetic-story-zh-cn.mp4`
- `/generated/animations/math1030/matrix-entrywise-arithmetic-story-zh-cn.png`

Media checks:

- EN / zh-HK / zh-CN mp4: H.264, `854x480`, about `9.333s`.
- EN / zh-HK / zh-CN poster: `854x480`.

Visual frame checks:

- Opening frame: same-size gate is readable and the incompatible-size warning
  stays visually secondary.
- Addition and scalar frames: highlighted entries line up with the displayed
  output cells.
- Subtraction frame: `A-B=A+(-B)` remains legible and does not imply matrix
  multiplication.
- Final frame: zero matrix, additive inverse, and entrywise-law summary are
  readable in EN, zh-HK, and zh-CN. A transition-frame contact sheet briefly
  captured motion overlap, but the settled final frames were inspected and are
  clear.

## Local QA

Static checks passed:

- `python3 -m py_compile tools/animations/manim/scenes/math1030/matrix_entrywise_arithmetic.py`
- `python3 -m json.tool content/textbook/math1030/matrix-algebra/matrix-addition-scalar-multiplication/storyboard.json`
- `bash -n tools/animations/manim/scripts/render_scene.sh`
- `git diff --check`
- `npm run verify:mdx-tables`
- `npx tsc --noEmit --pretty false`
- `npm run lint`
- `npm run check:textbook-content`
- `AUTH_SECRET=local-test-secret npm run build`

Notes:

- `npm run check:textbook-content` returned exit code `0` with the existing
  full-site backlog warnings.
- `npm run build` returned exit code `0`; Contentlayer still warns that
  storyboard JSON files are skipped as non-document sidecars, which matches the
  existing storyboard pattern.

Browser QA against `http://127.0.0.1:3010` passed using system Chrome through
Playwright:

- EN route:
  `/en/notes/math1030/matrix-algebra/matrix-addition-scalar-multiplication`
  - title: `3.1 Matrix addition, subtraction, and scalar multiplication`
  - one `<video>` element
  - poster:
    `/generated/animations/math1030/matrix-entrywise-arithmetic-story-en.png`
  - source:
    `/generated/animations/math1030/matrix-entrywise-arithmetic-story-en.mp4`
  - localized video title present
  - localized widget snapshot title present
  - raw `matrix-arithmetic-lab` id not visible
- zh-HK route:
  `/zh-hk/notes/math1030/matrix-algebra/matrix-addition-scalar-multiplication`
  - title: `3.1 矩陣加法、減法與純量乘法`
  - localized mp4/poster selected
  - localized widget snapshot title present
  - raw `matrix-arithmetic-lab` id not visible
- zh-CN route:
  `/zh-cn/notes/math1030/matrix-algebra/matrix-addition-scalar-multiplication`
  - title: `3.1 矩阵加法、减法与数乘`
  - localized mp4/poster selected
  - localized widget snapshot title present
  - raw `matrix-arithmetic-lab` id not visible
- Existing `matrix-arithmetic-lab` interaction passed in all three locales:
  setting scalar `c` from `2` to `3` changed the displayed `cA` matrix from
  `[[2,-4],[6,0]]` to `[[3,-6],[9,0]]`.
- Mobile viewport `390x844` passed with no horizontal overflow:
  `scrollWidth == clientWidth == 390`; the video element measured `306px`
  wide and remained inside the article column.
- The only ignored network event was the expected unauthenticated
  `/api/user/profile` request returning `401` in local development. No
  actionable console errors or actionable network errors were recorded.
- Screenshot evidence:
  - `/tmp/matrix-entrywise-desktop.png`
  - `/tmp/matrix-entrywise-mobile.png`

Export QA passed:

- TXT export returned files for EN / zh-HK / zh-CN.
- PDF export returned valid `%PDF` files for EN / zh-HK / zh-CN.
- EN / zh-HK / zh-CN TXT exports contain a static video-study sequence and the
  localized video title.
- EN / zh-HK / zh-CN TXT exports contain the static matrix-arithmetic lab
  snapshot and the localized widget title.
- TXT exports contain no raw `<video>`, `.mp4`, or `poster=` leakage.

## Production Status

Ready.

Git and deployment checkpoint:

- Commit pushed to `origin/codex/manim`:
  `4f4fb14d06cc4746af6e89cec4ba0b3f49fe4d9f`.
- `origin/main` was updated from `codex/manim` at the same commit.
- Vercel production deployment:
  `dpl_GcV41rnngjxf6bCMxyWmP4CST8nD`.
- Deployment target: `production`.
- Deployment state: `READY`.
- Production alias verified: `www.evanalysis.top`.

Production checks against `https://www.evanalysis.top` passed:

- EN route returned `200` and includes the `Entrywise matrix arithmetic` video
  explanation card with source
  `/generated/animations/math1030/matrix-entrywise-arithmetic-story-en.mp4`.
- zh-HK route returned localized page HTML pointing to
  `/generated/animations/math1030/matrix-entrywise-arithmetic-story-zh-hk.mp4`.
- zh-CN route returned localized page HTML pointing to
  `/generated/animations/math1030/matrix-entrywise-arithmetic-story-zh-cn.mp4`.
- EN / zh-HK / zh-CN mp4 assets returned `200` with `video/mp4`.
- EN / zh-HK / zh-CN poster assets returned `200` with `image/png`.
- EN / zh-HK / zh-CN TXT exports returned `200`, contained localized static
  video-study sequence and static matrix-arithmetic lab snapshot content, and
  did not leak raw `<video>`, `.mp4`, or `poster=` markup.
- EN / zh-HK / zh-CN PDF exports returned `200` with valid `%PDF` headers.
