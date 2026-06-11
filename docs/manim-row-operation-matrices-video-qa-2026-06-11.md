# Manim Row-Operation Matrices Video QA - 2026-06-11

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Unit:
`content/textbook/math1030/matrix-algebra/row-operation-matrices`

Public video id: `math1030-row-operation-matrix-left-multiply-story`

## Scope

This pass adds a trilingual Manim `VideoExplanation` to MATH1030 `3.3
Row-operation matrices`. The video focuses on the source-supported theorem
that if a row operation `rho` is first applied to `I_p`, the resulting
elementary matrix performs the same row operation on any compatible matrix by
left multiplication.

The unit has no existing interactive widget. The video is embedded after the
three basic row-operation matrix examples and before the theorem that a
sequence of row operations becomes a matrix product, so it acts as a visual
bridge from one elementary matrix to ordered products and inverses.

## Source Support Checked

- Current MDX unit defines row-operation matrices as `E_rho = rho(I_p)`.
- Current MDX unit states and explains `rho(A)=E_rho A`.
- Current MDX unit works through row addition, row scaling, and row swap
  examples before moving to products of row-operation matrices.
- Catalog metadata lists repository references for this unit:
  - `reference/MATH1030/1030gi-n01-08.pdf`
  - `reference/MATH1030/1030gi-n01-se0708.pdf`
  - `reference/MATH1030/1030efghi-as02.pdf`
  - `reference/MATH1030/1030efghi-as02as.pdf`
  - `reference/MATH1030/Practice Set 3_Matrix Algebra and Linear Equation System.pdf`

## Files Added Or Updated

- Added Manim scene:
  `tools/animations/manim/scenes/math1030/row_operation_matrices.py`
- Added storyboard:
  `content/textbook/math1030/matrix-algebra/row-operation-matrices/storyboard.json`
- Updated render registry:
  `tools/animations/manim/scripts/render_scene.sh`
- Updated public video catalog:
  `src/lib/textbook/video-explanations.ts`
- Embedded the video in:
  - `content/textbook/math1030/matrix-algebra/row-operation-matrices/en.mdx`
  - `content/textbook/math1030/matrix-algebra/row-operation-matrices/zh-hk.mdx`
  - `content/textbook/math1030/matrix-algebra/row-operation-matrices/zh-cn.mdx`

## Rendered Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh RowOperationMatrixLeftMultiplyStoryEn RowOperationMatrixLeftMultiplyStoryZhHk RowOperationMatrixLeftMultiplyStoryZhCn
```

Generated assets:

- `public/generated/animations/math1030/row-operation-matrix-left-multiply-story-en.mp4`
- `public/generated/animations/math1030/row-operation-matrix-left-multiply-story-en.png`
- `public/generated/animations/math1030/row-operation-matrix-left-multiply-story-zh-hk.mp4`
- `public/generated/animations/math1030/row-operation-matrix-left-multiply-story-zh-hk.png`
- `public/generated/animations/math1030/row-operation-matrix-left-multiply-story-zh-cn.mp4`
- `public/generated/animations/math1030/row-operation-matrix-left-multiply-story-zh-cn.png`

Video metadata:

| Locale | Codec | Size | FPS | Duration | File size |
| --- | --- | --- | --- | --- | --- |
| EN | H.264 | 854x480 | 15 | 15.600s | 536,954 bytes |
| zh-HK | H.264 | 854x480 | 15 | 15.600s | 561,359 bytes |
| zh-CN | H.264 | 854x480 | 15 | 15.600s | 556,079 bytes |

## Visual QA

Inspected generated poster and extracted frames from the rendered MP4s.

Local evidence files:

- `/tmp/my_websites_row_operation_video_qa/en-poster-frame.png`
- `/tmp/my_websites_row_operation_video_qa/zh-cn-left-multiply-frame.png`
- `/tmp/my_websites_row_operation_video_qa/en-sequence-clear-frame.png`
- `/tmp/my_websites_row_operation_video_qa/zh-hk-inverse-frame.png`
- `/tmp/my_websites_row_operation_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_row_operation_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_row_operation_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_row_operation_video_qa/zh-cn-light-desktop-video-block.png`

Result:

- EN, zh-HK, and zh-CN visible text is localized.
- Row-operation notation was adjusted from code-style strings such as
  `E_rho^{-1}` and `R2 <- R2 - 3R1` to reader-facing symbols such as
  `Eρ⁻¹` and `R₂ ← R₂ − 3R₁`.
- The left-multiplication frame highlights the changed row of `Eρ A`.
- The product-order frame shows `A₃ = E₂ E₁ A₁` with `E₁` closest to `A₁`.
- The inverse frame shows the reverse row addition and the identity result.
- Desktop light, desktop dark, and mobile screenshots show no visible
  clipping, overlap, or page-level horizontal overflow.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/augmented_matrices.py tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py tools/animations/manim/scenes/math1030/gram_schmidt.py tools/animations/manim/scenes/math1030/matrix_basics.py tools/animations/manim/scenes/math1030/matrix_multiplication_linear_systems.py tools/animations/manim/scenes/math1030/row_operation_matrices.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/matrix-algebra/row-operation-matrices/storyboard.json
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build note:

- `contentlayer2 build` warns that the three current storyboard JSON files are
  skipped because they are not Contentlayer document types. This is the current
  storyboard storage pattern and did not block the build.

## Browser QA

The in-app browser was unavailable in this session, so QA used cached
Playwright 1.60.0 and Chromium. The first sandboxed Chromium launch failed on
macOS Mach port permissions, then the same local-only script passed with
approved escalation.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Routes checked:

- `/en/notes/math1030/matrix-algebra/row-operation-matrices`
- `/zh-hk/notes/math1030/matrix-algebra/row-operation-matrices`
- `/zh-cn/notes/math1030/matrix-algebra/row-operation-matrices`

Page QA result:

| Locale / viewport | Theme | Video readyState | Duration | Playback advance | Overflow |
| --- | --- | --- | --- | --- | --- |
| EN desktop 1440x1100 | light | 4 | 15.6s | +0.882s | 0 |
| EN desktop 1440x1100 | dark | 4 | 15.6s | +0.899s | 0 |
| zh-HK mobile 390x900 | light | 4 | 15.6s | +0.898s | 0 |
| zh-CN desktop 1440x1100 | light | 4 | 15.6s | +0.898s | 0 |

Additional checks:

- Localized video title and inserted section heading were present in all
  checked locales.
- `videoSrc` and `posterSrc` resolved to the correct locale-specific assets.
- No framework error overlay.
- No page errors.
- The local run logged Next RSC prefetch/navigation aborts and a local Vercel
  analytics 404. These did not affect page identity, video loading, playback,
  or export responses, and are not row-operation video failures.

## Export QA

TXT and PDF exports were checked through the local API routes.

| Locale | TXT status | PDF status | PDF size | Static video fallback | MP4 path leaked |
| --- | --- | --- | --- | --- | --- |
| EN | 200 | 200 | 44,968 bytes | yes | no |
| zh-HK | 200 | 200 | 169,572 bytes | yes | no |
| zh-CN | 200 | 200 | 157,737 bytes | yes | no |

TXT export checks:

- Includes localized video title.
- Includes localized static frame text.
- Does not include `.mp4`.

## Cleanup

- Restored `.contentlayer/generated` after build.
- Removed Manim scene `__pycache__`.
- Stopped the local server after QA.
