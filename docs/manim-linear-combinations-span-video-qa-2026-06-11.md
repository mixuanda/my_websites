# Manim Linear Combinations And Span Video QA - 2026-06-11

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Unit:
`content/textbook/math1030/vector-spaces/linear-combinations-and-span`

Public video id: `math1030-linear-combination-span-sweep-story`

## Scope

This pass adds a trilingual Manim `VideoExplanation` to MATH1030 `6.3 Linear
combinations and span`. The video focuses on the source-supported idea that a
span is the full output set obtained by varying the coefficients in a linear
combination.

The video is embedded after the formal span definition and before the standard
geometric examples, so it gives a short visual bridge from algebraic
coefficient language to the line, plane, membership, and missed-target cases
used later in the article. The existing `span-explorer` interaction remains
the reader-controlled follow-up.

## Source Support Checked

- Current MDX unit defines linear combinations and coefficient variables.
- Current MDX unit explains membership in a span through a system `Ax=b`.
- Current MDX unit states the span definition and standard geometric examples.
- Current MDX unit proves that a span is a subspace.
- Catalog metadata lists repository references for this unit:
  - `reference/MATH1030/MATH1030-Notes.pdf`
  - `reference/MATH1030/1030gi-n01-05.pdf`
  - `reference/MATH1030/1030gi-n02-05.pdf`
  - `reference/MATH1030/1030gi-n05-03.pdf`
  - `reference/MATH1030/math1030_assignment4_review_solutions.pdf`

## Files Added Or Updated

- Added Manim scene:
  `tools/animations/manim/scenes/math1030/linear_combinations_span.py`
- Added storyboard:
  `content/textbook/math1030/vector-spaces/linear-combinations-and-span/storyboard.json`
- Updated render registry:
  `tools/animations/manim/scripts/render_scene.sh`
- Updated public video catalog:
  `src/lib/textbook/video-explanations.ts`
- Embedded the video in:
  - `content/textbook/math1030/vector-spaces/linear-combinations-and-span/en.mdx`
  - `content/textbook/math1030/vector-spaces/linear-combinations-and-span/zh-hk.mdx`
  - `content/textbook/math1030/vector-spaces/linear-combinations-and-span/zh-cn.mdx`

## Rendered Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh LinearCombinationSpanSweepStoryEn LinearCombinationSpanSweepStoryZhHk LinearCombinationSpanSweepStoryZhCn
```

Generated assets:

- `public/generated/animations/math1030/linear-combination-span-sweep-story-en.mp4`
- `public/generated/animations/math1030/linear-combination-span-sweep-story-en.png`
- `public/generated/animations/math1030/linear-combination-span-sweep-story-zh-hk.mp4`
- `public/generated/animations/math1030/linear-combination-span-sweep-story-zh-hk.png`
- `public/generated/animations/math1030/linear-combination-span-sweep-story-zh-cn.mp4`
- `public/generated/animations/math1030/linear-combination-span-sweep-story-zh-cn.png`

Video metadata:

| Locale | Codec | Size | FPS | Duration | File size |
| --- | --- | --- | --- | --- | --- |
| EN | H.264 | 854x480 | 15 | 15.600s | 497,239 bytes |
| zh-HK | H.264 | 854x480 | 15 | 15.600s | 513,047 bytes |
| zh-CN | H.264 | 854x480 | 15 | 15.600s | 498,782 bytes |

## Visual QA

Inspected generated poster and extracted frames from the rendered MP4s.

Local evidence files:

- `/tmp/my_websites_span_video_qa/en-poster-frame.png`
- `/tmp/my_websites_span_video_qa/zh-hk-line-frame.png`
- `/tmp/my_websites_span_video_qa/zh-cn-plane-clear-frame.png`
- `/tmp/my_websites_span_video_qa/en-membership-clear-frame.png`
- `/tmp/my_websites_span_video_qa/en-miss-clear-frame.png`
- `/tmp/my_websites_span_video_qa/zh-hk-recap-clear-frame.png`
- `/tmp/my_websites_span_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_span_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_span_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_span_video_qa/zh-cn-light-desktop-video-block.png`
- `/tmp/my_websites_span_video_qa/en-light-desktop-span-widget-viewport.png`
- `/tmp/my_websites_span_video_qa/zh-hk-light-mobile-span-widget-viewport.png`

Result:

- EN, zh-HK, and zh-CN visible video text is localized.
- The title frame is readable in all checked locales.
- The one-generator frame shows coefficient values sweeping a line.
- The two-generator frame shows nonparallel vectors sweeping a plane region.
- The membership frame connects span membership to solving for coefficients.
- The collinear-generator frame shows an off-line target that cannot be
  reached.
- Desktop light, desktop dark, and mobile screenshots show no visible clipping,
  overlap, or page-level horizontal overflow.
- The existing `span-explorer` widget updates after entering coefficient values
  `3` and `-2`, producing the displayed result `(3, -2)`.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/augmented_matrices.py tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py tools/animations/manim/scenes/math1030/gram_schmidt.py tools/animations/manim/scenes/math1030/linear_combinations_span.py tools/animations/manim/scenes/math1030/matrix_basics.py tools/animations/manim/scenes/math1030/matrix_multiplication_linear_systems.py tools/animations/manim/scenes/math1030/row_operation_matrices.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/vector-spaces/linear-combinations-and-span/storyboard.json
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build note:

- `contentlayer2 build` warns that the current storyboard JSON files are
  skipped because they are not Contentlayer document types. This is the current
  storyboard storage pattern and did not block the build.

## Browser QA

The in-app browser was unavailable in this session, so QA used cached
Playwright 1.60.0 and Chromium. The first sandboxed Chromium launch failed on
macOS Mach port permissions, then the same local-only scripts passed with
approved escalation.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Routes checked:

- `/en/notes/math1030/vector-spaces/linear-combinations-and-span`
- `/zh-hk/notes/math1030/vector-spaces/linear-combinations-and-span`
- `/zh-cn/notes/math1030/vector-spaces/linear-combinations-and-span`

Page QA result:

| Locale / viewport | Theme | Video readyState | Duration | Playback advance | Widget update | Overflow |
| --- | --- | --- | --- | --- | --- | --- |
| EN desktop 1440x1100 | light | 4 | 15.6s | +0.897s | yes | 0 |
| EN desktop 1440x1100 | dark | 4 | 15.6s | +0.900s | yes | 0 |
| zh-HK mobile 390x900 | light | 4 | 15.6s | +0.899s | yes | 0 |
| zh-CN desktop 1440x1100 | light | 4 | 15.6s | +0.901s | yes | 0 |

Additional checks:

- Localized video title and inserted section heading were present in all
  checked locales.
- `videoSrc` and `posterSrc` resolved to the correct locale-specific assets.
- The `span-explorer` retained two numeric inputs and updated the displayed
  output when values changed.
- No framework error overlay.
- No page errors.
- The local run logged Next RSC request aborts and a local Vercel analytics
  404. These did not affect page identity, video loading, playback, widget
  update, or export responses, and are not span video failures.

## Export QA

TXT and PDF exports were checked through the local API routes.

| Locale | TXT status | PDF status | PDF size | Static video fallback | Widget snapshot | MP4 path leaked |
| --- | --- | --- | --- | --- | --- | --- |
| EN | 200 | 200 | 39,778 bytes | yes | yes | no |
| zh-HK | 200 | 200 | 170,608 bytes | yes | yes | no |
| zh-CN | 200 | 200 | 159,519 bytes | yes | yes | no |

TXT export checks:

- Includes localized video title.
- Includes localized static frame text.
- Includes the static `span-explorer` snapshot.
- Does not include `.mp4`.

## Cleanup

- Restored `.contentlayer/generated` after build.
- Removed Manim scene `__pycache__`.
- Stopped the local server after QA.
