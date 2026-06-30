# MATH1030 3.1 Matrix Multiplication / Identity Video QA

Date: 2026-07-01

Branch: `codex/manim`

Unit: `math1030/matrix-algebra/matrix-multiplication-and-identity`

Component id: `math1030-matrix-multiplication-identity-story`

## Source Boundary

- `reference/MATH1030/1030gi-n01-02.pdf` pp. 1-4: matrix product size
  compatibility, row-by-column product entries, examples, and the identity
  matrix role.
- `reference/MATH1030/MATH1030-Notes.pdf` pp. 39-46: definition of matrix
  multiplication, product dimensions, identity matrices, noncommutativity, and
  product laws.
- `reference/MATH1030/MATH1030-Notes.pdf` pp. 52-53: identity matrices in the
  invertibility setup.
- Practice Set 2 and Practice Set 2 solutions: compatible / incompatible
  products, row-column computations, noncommutative warnings, and product
  practice.

Unsupported material was not added. The clip does not repeat the later `Ax=b`
systems video, does not introduce inverse algorithms or elementary matrices,
and does not imply commutativity, cancellation, zero-product rules, or scalar
polynomial shortcuts for matrix products.

## Implementation

- Added a trilingual storyboard at
  `content/textbook/math1030/matrix-algebra/matrix-multiplication-and-identity/storyboard.json`.
- Added Manim scene source at
  `tools/animations/manim/scenes/math1030/matrix_multiplication_identity.py`.
- Added render-script support for:
  - `MatrixMultiplicationIdentityStoryEn`
  - `MatrixMultiplicationIdentityStoryZhHk`
  - `MatrixMultiplicationIdentityStoryZhCn`
- Added localized `VideoExplanation` metadata in
  `src/lib/textbook/video-explanations.ts`.
- Embedded the video in all three localized MDX note pages after the identity
  matrix paragraph and before the noncommutativity discussion.
- Kept `matrix-multiplication-visualizer` as the reader-controlled follow-up
  for changing input entries and inspecting product calculations.

## Assets

Rendered assets:

- `/generated/animations/math1030/matrix-multiplication-identity-story-en.mp4`
- `/generated/animations/math1030/matrix-multiplication-identity-story-en.png`
- `/generated/animations/math1030/matrix-multiplication-identity-story-zh-hk.mp4`
- `/generated/animations/math1030/matrix-multiplication-identity-story-zh-hk.png`
- `/generated/animations/math1030/matrix-multiplication-identity-story-zh-cn.mp4`
- `/generated/animations/math1030/matrix-multiplication-identity-story-zh-cn.png`

Media checks:

- EN / zh-HK / zh-CN mp4: H.264, `854x480`, about `9.333s`.
- EN / zh-HK / zh-CN poster: `854x480`.

Visual frame checks:

- Opening frame: the product-size gate is readable and the incompatible-size
  warning stays secondary.
- Dot-product frame: the highlighted row and column align with the displayed
  `c_11` computation.
- Product frame: the repeated row-column rule fills the output matrix without
  suggesting entrywise multiplication.
- Identity frames: right and left identity multiplication are shown as
  column-selection and row-selection mechanisms.
- Final frame: the order warning is readable in EN, zh-HK, and zh-CN.

## Local QA

Static checks passed:

- `python3 -m py_compile tools/animations/manim/scenes/math1030/matrix_multiplication_identity.py`
- `python3 -m json.tool content/textbook/math1030/matrix-algebra/matrix-multiplication-and-identity/storyboard.json`
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
CDP / Playwright fallback:

- Browser availability: the in-app Browser skill was available, but the
  Browser object was disconnected in this local thread. The fallback path used
  system Chrome headless through CDP, matching the frontend QA fallback policy.
- EN route:
  `/en/notes/math1030/matrix-algebra/matrix-multiplication-and-identity`
  - title: `3.1 Matrix multiplication and identity matrices`
  - one `<video>` element
  - poster:
    `/generated/animations/math1030/matrix-multiplication-identity-story-en.png`
  - source:
    `/generated/animations/math1030/matrix-multiplication-identity-story-en.mp4`
  - localized video title present
  - existing multiplication visualizer present
  - raw `matrix-multiplication-visualizer` id not visible
- zh-HK route:
  `/zh-hk/notes/math1030/matrix-algebra/matrix-multiplication-and-identity`
  - localized mp4/poster selected
  - localized video title present
  - existing multiplication visualizer present
  - raw `matrix-multiplication-visualizer` id not visible
- zh-CN route:
  `/zh-cn/notes/math1030/matrix-algebra/matrix-multiplication-and-identity`
  - localized mp4/poster selected
  - localized video title present
  - existing multiplication visualizer present
  - raw `matrix-multiplication-visualizer` id not visible
- Existing `matrix-multiplication-visualizer` interaction passed: setting the
  first matrix input to `5` updated the displayed product calculation to
  `16 = 5*2 + 2*3`.
- Mobile viewport `390x844` passed with no horizontal overflow:
  `scrollWidth == clientWidth == 390`; the video element measured `306px`
  wide and remained inside the article column.
- Dark mode passed: the route rendered with `html.dark`, a dark color scheme,
  the video card, and the existing widget visible.
- The only ignored local network event was `/_vercel/insights/script.js`
  returning `404` under `next start`; this is local-only analytics script noise.
- Screenshot evidence:
  - `/tmp/matrix-multiplication-identity-desktop.png`
  - `/tmp/matrix-multiplication-identity-mobile.png`
  - `/tmp/matrix-multiplication-identity-dark.png`

Export QA passed:

- TXT export returned files for EN / zh-HK / zh-CN.
- PDF export returned valid `%PDF` files for EN / zh-HK / zh-CN.
- EN / zh-HK / zh-CN TXT exports contain a static video-study sequence and the
  localized video title.
- EN / zh-HK / zh-CN TXT exports contain the existing multiplication visualizer
  static snapshot and title.
- TXT exports contain no raw `<video>`, `.mp4`, or `poster=` leakage.

## Production Status

Pending. This checkpoint will be updated after the branch is pushed, merged to
`main`, and the production deployment for `www.evanalysis.top` reaches `READY`.
