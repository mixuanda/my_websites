# Manim Augmented Matrices Video QA - 2026-05-25

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Scope: MATH1030 `2.2 Augmented matrices and row operations` localized Manim
video integration.

Public component id: `math1030-augmented-matrix-row-operation-safety`

## Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh AugmentedMatrixRowOperationSafetyEn AugmentedMatrixRowOperationSafetyZhHk AugmentedMatrixRowOperationSafetyZhCn
```

Generated public assets:

| Locale | MP4 | Poster |
| --- | --- | --- |
| English | `public/generated/animations/math1030/augmented-matrix-row-operation-safety-en.mp4` | `public/generated/animations/math1030/augmented-matrix-row-operation-safety-en.png` |
| Traditional Chinese | `public/generated/animations/math1030/augmented-matrix-row-operation-safety-zh-hk.mp4` | `public/generated/animations/math1030/augmented-matrix-row-operation-safety-zh-hk.png` |
| Simplified Chinese | `public/generated/animations/math1030/augmented-matrix-row-operation-safety-zh-cn.mp4` | `public/generated/animations/math1030/augmented-matrix-row-operation-safety-zh-cn.png` |

`ffprobe` result after the poster-direction fix:

| Locale | Codec | Dimensions | Frame rate | Duration | Size |
| --- | --- | --- | --- | --- | --- |
| English | H.264 | 854 x 480 | 15 fps | 16.000 seconds | 565,931 bytes |
| Traditional Chinese | H.264 | 854 x 480 | 15 fps | 16.000 seconds | 550,142 bytes |
| Simplified Chinese | H.264 | 854 x 480 | 15 fps | 16.000 seconds | 543,977 bytes |

Poster checks:

- all posters are PNG, 854 x 480;
- English, Traditional Chinese, and Simplified Chinese visible text renders
  with the current locale font settings;
- the first-frame transition now reads left-to-right from equations to
  augmented matrix;
- no tofu boxes or obvious text overflow were observed.

## Static QA

| Check | Result |
| --- | --- |
| `python3 -m py_compile tools/animations/manim/scenes/math1030/augmented_matrices.py tools/animations/manim/scenes/math1030/matrix_basics.py tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py` | Pass |
| `bash -n tools/animations/manim/scripts/render_scene.sh` | Pass |
| `node -e "JSON.parse(require('fs').readFileSync('content/textbook/math1030/matrices/augmented-matrices-row-operations/storyboard.json','utf8'))"` | Pass |
| `git diff --check` | Pass |
| `npm run verify:mdx-tables` | Pass |
| `npx tsc --noEmit --pretty false` | Pass |
| `npm run lint` | Pass |
| `AUTH_SECRET=local-test-secret npm run build` | Pass |

Generated `.contentlayer` churn from the build was restored after the build.

## Browser QA

Browser plugin availability: not available in this session. QA used Playwright
1.60.0 from the local npx cache with Chromium.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Routes tested:

- `http://localhost:3010/en/notes/math1030/matrices/augmented-matrices-row-operations`
- `http://localhost:3010/zh-hk/notes/math1030/matrices/augmented-matrices-row-operations`
- `http://localhost:3010/zh-cn/notes/math1030/matrices/augmented-matrices-row-operations`

| Locale / viewport | Theme | Expected source | Result |
| --- | --- | --- | --- |
| English, 1440 x 1100 | Light | `augmented-matrix-row-operation-safety-en.mp4` | Pass |
| Traditional Chinese, 1440 x 1100 | Light | `augmented-matrix-row-operation-safety-zh-hk.mp4` | Pass |
| Simplified Chinese, 1440 x 1100 | Light | `augmented-matrix-row-operation-safety-zh-cn.mp4` | Pass |
| English, 1440 x 1100 | Dark | `augmented-matrix-row-operation-safety-en.mp4` | Pass |
| Traditional Chinese, 390 x 900 | Light | `augmented-matrix-row-operation-safety-zh-hk.mp4` | Pass |

For each browser case:

- page identity matched the intended localized note;
- the page had meaningful body content;
- the localized video label and title were present;
- no framework overlay was present;
- `video > source` matched the locale-specific MP4;
- `poster` matched the locale-specific PNG;
- `aria-label` matched the localized title;
- video metadata loaded with `readyState = 4`;
- video duration was `16.000`;
- playback advanced after starting the video;
- the existing `system-augmented-matrix-explorer` widget remained present;
- clicking `Example 2` / `例子 2` changed the widget to the second system;
- no horizontal overflow was detected;
- page error count was `0`;
- relevant failed response count was `0`.

The only 404 observed was the local Vercel Analytics script
`/_vercel/insights/script.js`, not a video, poster, route, widget, or export
asset. Chromium also emitted the corresponding generic console message
`Failed to load resource: the server responded with a status of 404`.

Local screenshot evidence was written under:

```text
/tmp/my_websites_augmented_matrices_video_qa/
```

Important screenshots:

- `en-video-light.png`: English note with embedded video.
- `zh-hk-video-mobile.png`: mobile-width Traditional Chinese note with
  embedded video.
- `en-desktop-light.png`: existing widget after switching to Example 2.
- `en-desktop-dark.png`: dark-mode widget after switching to Example 2.
- `zh-hk-mobile-light.png`: mobile-width Traditional Chinese widget after
  switching to Example 2.

## Export QA

TXT and PDF exports were checked for all three locales.

| Locale | TXT status | Static video-study sequence present | TXT excludes `.mp4` | PDF status | PDF content type | PDF size |
| --- | --- | --- | --- | --- | --- | --- |
| English | 200 | Yes | Yes | 200 | `application/pdf` | 38,945 bytes |
| Traditional Chinese | 200 | Yes | Yes | 200 | `application/pdf` | 176,708 bytes |
| Simplified Chinese | 200 | Yes | Yes | 200 | `application/pdf` | 164,462 bytes |

## Remaining Risk

- Production deployment was not tested in this local QA pass.
- Browser coverage is Chromium only.
- The Browser plugin path was unavailable, so the QA fallback used direct
  Playwright instead of in-app Browser tooling.
- The Manim render registry is still a simple shell case registry. It is
  adequate for the current Math1030 pilots, but should be generalized before
  adding substantial non-Math1030 video assets.
