# Manim Function Map Video QA - 2026-06-11

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Unit:
`content/textbook/math1090/sets/functions-relations`

Public video id: `math1090-function-map-properties-story`

## Scope

This pass adds the first non-Math1030 trilingual Manim `VideoExplanation` to
MATH1090 `2.2 Functions and relations`. The video focuses on the finite arrow
diagram behind function definitions: domain, target, graph, image, preimage,
injective, surjective, and composition.

The video is embedded after the injective / surjective / bijective equivalent
formulations and before the inverse-function theorem. This keeps the video as
a bridge between vocabulary and inverse-function consequences.

## Source Support Checked

- Current MDX unit defines functions as special relations and covers domain,
  target, graph, image, preimage, composition, injective, surjective, bijective,
  inverse functions, and left / right inverses.
- Read-only explorer verification found support in:
  - `reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf`, sections 2.4 and
    2.7, pages 23-27.
  - `reference/MATH1090/MATH1090_midterm_review_notes_final.tex`, lines
    1353-1399 and 1695-1728.
  - `reference/MATH1090/MATH1090_Worksheet3.pdf`, page 1.
- `docs/reference-coverage.md` marks the February 27 notes and Worksheet 3 as
  incorporated support for functions / relations.
- `docs/chapter-coverage-map.md` marks Math1090 chapter 2 as source-backed.

## Files Added Or Updated

- Added Manim scene:
  `tools/animations/manim/scenes/math1090/functions_relations.py`
- Added storyboard:
  `content/textbook/math1090/sets/functions-relations/storyboard.json`
- Updated render registry with course-aware output:
  `tools/animations/manim/scripts/render_scene.sh`
- Updated public video catalog:
  `src/lib/textbook/video-explanations.ts`
- Embedded the video in:
  - `content/textbook/math1090/sets/functions-relations/en.mdx`
  - `content/textbook/math1090/sets/functions-relations/zh-hk.mdx`
  - `content/textbook/math1090/sets/functions-relations/zh-cn.mdx`

## Rendered Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh FunctionMapPropertiesStoryEn FunctionMapPropertiesStoryZhHk FunctionMapPropertiesStoryZhCn
```

Generated assets:

- `public/generated/animations/math1090/function-map-properties-story-en.mp4`
- `public/generated/animations/math1090/function-map-properties-story-en.png`
- `public/generated/animations/math1090/function-map-properties-story-zh-hk.mp4`
- `public/generated/animations/math1090/function-map-properties-story-zh-hk.png`
- `public/generated/animations/math1090/function-map-properties-story-zh-cn.mp4`
- `public/generated/animations/math1090/function-map-properties-story-zh-cn.png`

Video metadata:

| Locale | Codec | Size | FPS | Duration | File size |
| --- | --- | --- | --- | --- | --- |
| EN | H.264 | 854x480 | ~15 | 11.999s | 562,594 bytes |
| zh-HK | H.264 | 854x480 | 15 | 12.000s | 545,939 bytes |
| zh-CN | H.264 | 854x480 | ~15 | 11.999s | 541,719 bytes |

## Visual QA

Inspected generated poster and extracted frames from the rendered MP4s.

Local evidence files:

- `/tmp/my_websites_function_map_video_qa/en-poster-frame-rerender.png`
- `/tmp/my_websites_function_map_video_qa/zh-hk-image-preimage-frame-rerender.png`
- `/tmp/my_websites_function_map_video_qa/zh-cn-injective-frame-rerender.png`
- `/tmp/my_websites_function_map_video_qa/en-surjective-frame.png`
- `/tmp/my_websites_function_map_video_qa/zh-cn-composition-frame.png`
- `/tmp/my_websites_function_map_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_function_map_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_function_map_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_function_map_video_qa/zh-cn-light-desktop-video-block.png`

Result:

- EN, zh-HK, and zh-CN visible video text is localized.
- The poster frame is stable and no longer catches a transition frame.
- Domain / target, graph, image / preimage, injective collision, surjective
  coverage, and composition frames are readable.
- Desktop light, desktop dark, and mobile screenshots show no visible clipping,
  overlap, framework overlay, or page-level horizontal overflow.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/augmented_matrices.py tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py tools/animations/manim/scenes/math1030/gram_schmidt.py tools/animations/manim/scenes/math1030/linear_combinations_span.py tools/animations/manim/scenes/math1030/linear_dependence_independence.py tools/animations/manim/scenes/math1030/matrix_basics.py tools/animations/manim/scenes/math1030/matrix_multiplication_linear_systems.py tools/animations/manim/scenes/math1030/row_operation_matrices.py tools/animations/manim/scenes/math1090/functions_relations.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1090/sets/functions-relations/storyboard.json
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build note:

- `contentlayer2 build` warns that the six current storyboard JSON files are
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

- `/en/notes/math1090/sets/functions-relations`
- `/zh-hk/notes/math1090/sets/functions-relations`
- `/zh-cn/notes/math1090/sets/functions-relations`

Page QA result:

| Locale / viewport | Theme | Video readyState | Duration | Playback advance | Overflow |
| --- | --- | --- | --- | --- | --- |
| EN desktop 1440x1100 | light | 4 | 11.999s | +0.899s | 0 |
| EN desktop 1440x1100 | dark | 4 | 11.999s | +0.898s | 0 |
| zh-HK mobile 390x900 | light | 4 | 12.000s | +0.899s | 0 |
| zh-CN desktop 1440x1100 | light | 4 | 11.999s | +0.899s | 0 |

Additional checks:

- Localized page title, inserted section heading, and video title were present
  in all checked locales.
- `videoSrc` and `posterSrc` resolved to the correct locale-specific assets.
- No framework error overlay.
- No page errors.
- The local run logged Next RSC prefetch aborts, video range aborts after
  verified playback / context close, and a local Vercel analytics 404. These
  did not affect page identity, video loading, playback, screenshots, or export
  responses, and are not function-map video failures.

## Export QA

TXT and PDF exports were checked through the local API routes.

| Locale | TXT status | PDF status | PDF size | Static video fallback | MP4 path leaked |
| --- | --- | --- | --- | --- | --- |
| EN | 200 | 200 | 55,548 bytes | yes | no |
| zh-HK | 200 | 200 | 203,054 bytes | yes | no |
| zh-CN | 200 | 200 | 189,075 bytes | yes | no |

TXT export checks:

- Includes localized video title.
- Includes localized static frame text.
- Does not include `.mp4`.

## Cleanup

- Restored `.contentlayer/generated` after build.
- Removed Manim scene `__pycache__`.
- Stopped the local server after QA.
