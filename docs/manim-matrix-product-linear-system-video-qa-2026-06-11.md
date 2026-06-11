# Manim Matrix Product / Linear System Video QA - 2026-06-11

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Unit:
`content/textbook/math1030/matrix-algebra/matrix-multiplication-and-linear-systems`

Public video id: `math1030-matrix-product-linear-system-story`

## Scope

This pass adds a trilingual Manim `VideoExplanation` to MATH1030 `3.2 Matrix
multiplication and linear systems`. The video focuses on the source-supported
transition from row-by-column multiplication to the compact matrix equation
`Ax=b` as a stack of linear equations.

The existing `matrix-multiplication-visualizer` remains in the article before
the worked example. The new video is embedded later, immediately after the
symbolic `Ax` expansion and before the theorem about product order, so it acts
as a conceptual bridge instead of replacing reader-controlled practice.

## Source Support Checked

- Current MDX unit already defines matrix multiplication by row-column pairing.
- Current MDX unit already expands a symbolic `2 x 3` matrix times a `3 x 1`
  vector into two row expressions.
- Catalog metadata lists repository references for this unit:
  - `reference/MATH1030/MATH1030-Notes.pdf`, section 3.2.
  - `reference/MATH1030/1030gi-n01-se0102.pdf`, questions 8 to 11.
  - `reference/MATH1030/Practice Set 2_Matrix Algebra.pdf`, questions 2 to 4.
  - `reference/MATH1030/Practice Set 3_Matrix Algebra and Linear Equation System.pdf`,
    questions 1 to 3.

## Files Added Or Updated

- Added Manim scene:
  `tools/animations/manim/scenes/math1030/matrix_multiplication_linear_systems.py`
- Added storyboard:
  `content/textbook/math1030/matrix-algebra/matrix-multiplication-and-linear-systems/storyboard.json`
- Updated render registry:
  `tools/animations/manim/scripts/render_scene.sh`
- Updated public video catalog:
  `src/lib/textbook/video-explanations.ts`
- Embedded the video in:
  - `content/textbook/math1030/matrix-algebra/matrix-multiplication-and-linear-systems/en.mdx`
  - `content/textbook/math1030/matrix-algebra/matrix-multiplication-and-linear-systems/zh-hk.mdx`
  - `content/textbook/math1030/matrix-algebra/matrix-multiplication-and-linear-systems/zh-cn.mdx`

## Rendered Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh MatrixProductLinearSystemStoryEn MatrixProductLinearSystemStoryZhHk MatrixProductLinearSystemStoryZhCn
```

Generated assets:

- `public/generated/animations/math1030/matrix-product-linear-system-story-en.mp4`
- `public/generated/animations/math1030/matrix-product-linear-system-story-en.png`
- `public/generated/animations/math1030/matrix-product-linear-system-story-zh-hk.mp4`
- `public/generated/animations/math1030/matrix-product-linear-system-story-zh-hk.png`
- `public/generated/animations/math1030/matrix-product-linear-system-story-zh-cn.mp4`
- `public/generated/animations/math1030/matrix-product-linear-system-story-zh-cn.png`

Poster timestamp was moved from 1.5s to 2.25s in the render script because the
old timestamp caught the first scene during fade-in. The three posters above
were regenerated from the stable 2.25s frame.

Video metadata:

| Locale | Codec | Size | FPS | Duration | File size |
| --- | --- | --- | --- | --- | --- |
| EN | H.264 | 854x480 | 15 | 15.600s | 602,724 bytes |
| zh-HK | H.264 | 854x480 | 15 | 15.600s | 628,377 bytes |
| zh-CN | H.264 | 854x480 | 15 | 15.600s | 638,892 bytes |

## Visual QA

Inspected generated poster and extracted frames from the rendered MP4s.

Local evidence files:

- `/tmp/my_websites_matrix_product_video_qa/en-poster-frame.png`
- `/tmp/my_websites_matrix_product_video_qa/zh-hk-row1-clear-frame.png`
- `/tmp/my_websites_matrix_product_video_qa/zh-cn-system-clear-frame.png`
- `/tmp/my_websites_matrix_product_video_qa/en-ab-clear-frame.png`
- `/tmp/my_websites_matrix_product_video_qa/en-video-block-light.png`
- `/tmp/my_websites_matrix_product_video_qa/en-video-block-dark.png`
- `/tmp/my_websites_matrix_product_video_qa/zh-hk-video-block-mobile.png`

Result:

- EN, zh-HK, and zh-CN visible text is localized.
- Formula cards remain readable after replacing ambiguous `x` multiplication
  signs with `*`.
- The final `AB` frame uses `B=[u v]` and `AB=[A*u A*v]`, avoiding the earlier
  misleading scalar-looking `A*b1` notation.
- Mobile zh-HK screenshot shows no page-level horizontal overflow.
- Headless screenshots paint the poster and native video controls. Playback was
  verified separately through the video element metadata and current-time
  advance.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/augmented_matrices.py tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py tools/animations/manim/scenes/math1030/gram_schmidt.py tools/animations/manim/scenes/math1030/matrix_basics.py tools/animations/manim/scenes/math1030/matrix_multiplication_linear_systems.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/matrix-algebra/matrix-multiplication-and-linear-systems/storyboard.json
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build note:

- `contentlayer2 build` warns that both storyboard JSON files are skipped
  because they are not Contentlayer document types. This is the current
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

- `/en/notes/math1030/matrix-algebra/matrix-multiplication-and-linear-systems`
- `/zh-hk/notes/math1030/matrix-algebra/matrix-multiplication-and-linear-systems`
- `/zh-cn/notes/math1030/matrix-algebra/matrix-multiplication-and-linear-systems`

Page QA result:

| Locale / viewport | Theme | Video readyState | Duration | Playback advance | Widget inputs | Overflow |
| --- | --- | --- | --- | --- | --- | --- |
| EN desktop 1440x1100 | light | 4 | 15.6s | +0.799s | 8 | 0 |
| EN desktop 1440x1100 | dark | 4 | 15.6s | +0.800s | 8 | 0 |
| zh-HK mobile 390x900 | light | 4 | 15.6s | +0.801s | 8 | 0 |
| zh-CN desktop 1440x1100 | light | 4 | 15.6s | +0.800s | 8 | 0 |

Additional checks:

- Localized video title and inserted section heading were present in all
  checked locales.
- `videoSrc` and `posterSrc` resolved to the correct locale-specific assets.
- Existing `matrix-multiplication-visualizer` remained present.
- Changing the first number input to `5` updated the active product explanation
  to `16 = 5×2 + 2×3`.
- No page errors.
- No relevant failed responses.

## Export QA

TXT and PDF exports were checked through the local API routes.

| Locale | TXT status | PDF status | PDF size | Static video fallback | MP4 path leaked |
| --- | --- | --- | --- | --- | --- |
| EN | 200 | 200 | 30,324 bytes | yes | no |
| zh-HK | 200 | 200 | 152,718 bytes | yes | no |
| zh-CN | 200 | 200 | 142,688 bytes | yes | no |

TXT export checks:

- Includes localized video title.
- Includes localized static frame text.
- Does not include `.mp4`.

## Cleanup

- Restored `.contentlayer/generated` after build.
- Removed Manim scene `__pycache__`.
- Stopped the local server after QA.
