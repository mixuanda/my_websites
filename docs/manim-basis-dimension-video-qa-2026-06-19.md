# Manim Basis And Dimension Video QA - 2026-06-19

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Unit: `content/textbook/math1030/vector-spaces/basis-and-dimension`

Public video id: `math1030-basis-dimension-just-right-story`

## Scope

This pass adds a trilingual Manim `VideoExplanation` to MATH1030 `6.5 Basis and
dimension`. The video focuses on the source-supported idea that a basis is an
exactly-enough list: spanning gives reach, linear independence removes
redundancy, dimension records the stable size of a basis, and the
two-of-three criterion can finish basis arguments once the count matches.

The video is embedded immediately after the basis definition. The existing
`span-explorer` remains the reader-controlled follow-up, and the later
`independence-checker` remains available for dependence patterns.

## Source Support Checked

- `reference/MATH1030/1030gi-n05-01.pdf`: basis for `R^n`, standard bases,
  spanning plus linear independence, and unique coefficient representation.
- `reference/MATH1030/1030gi-n05-02.pdf`: basis and dimension for subspaces of
  column vectors, same-size-bases theorem, and dimension as the number of
  vectors in any basis.
- `reference/MATH1030/1030gi-n05-03.pdf`: pivot columns from an original
  generating list select a minimal spanning set, and rank gives the dimension
  of the span.
- `reference/MATH1030/1030gi-n05-05.pdf`: necessary and sufficient conditions
  for basis formation in terms of dimension, span, and linear independence.
- Current MDX unit already states the basis definition, dimension definition,
  two-of-three criterion, null-space basis test, pivot-column extraction rule,
  and common mistakes about dimension.

Boundaries kept out of the clip:

- It does not claim equal dimension alone makes two subspaces equal; containment
  is needed for that theorem.
- It does not use RREF pivot columns themselves as basis vectors; that belongs
  to the later pivot-extraction discussion.
- It does not turn this clip into a full change-of-basis or rank-nullity proof.

## Files Added Or Updated

- Added Manim scene:
  `tools/animations/manim/scenes/math1030/basis_dimension.py`
- Added storyboard:
  `content/textbook/math1030/vector-spaces/basis-and-dimension/storyboard.json`
- Updated render registry:
  `tools/animations/manim/scripts/render_scene.sh`
- Updated public video catalog:
  `src/lib/textbook/video-explanations.ts`
- Embedded the video in:
  - `content/textbook/math1030/vector-spaces/basis-and-dimension/en.mdx`
  - `content/textbook/math1030/vector-spaces/basis-and-dimension/zh-hk.mdx`
  - `content/textbook/math1030/vector-spaces/basis-and-dimension/zh-cn.mdx`
- Updated internal tracking:
  - `docs/video-explanation-implementation-roadmap.md`
  - `docs/video-explanation-opportunity-audit.md`
  - `docs/notes-improvement-tracker.md`
  - `docs/interactive-component-behavior.md`

## Rendered Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh BasisDimensionJustRightStoryEn BasisDimensionJustRightStoryZhHk BasisDimensionJustRightStoryZhCn
```

Generated assets:

- `public/generated/animations/math1030/basis-dimension-just-right-story-en.mp4`
- `public/generated/animations/math1030/basis-dimension-just-right-story-en.png`
- `public/generated/animations/math1030/basis-dimension-just-right-story-zh-hk.mp4`
- `public/generated/animations/math1030/basis-dimension-just-right-story-zh-hk.png`
- `public/generated/animations/math1030/basis-dimension-just-right-story-zh-cn.mp4`
- `public/generated/animations/math1030/basis-dimension-just-right-story-zh-cn.png`

Video metadata:

| Locale | Codec | Size | FPS | Duration | File size |
| --- | --- | --- | --- | --- | --- |
| EN | H.264 | 854x480 | 15 | 15.600s | 603 KiB |
| zh-HK | H.264 | 854x480 | 15 | 15.600s | 625 KiB |
| zh-CN | H.264 | 854x480 | 15 | 15.600s | 594 KiB |

## Visual QA

Inspected generated posters and extracted frames.

Local evidence files:

- `/tmp/my_websites_basis_dimension_video_qa/en-poster.png`
- `/tmp/my_websites_basis_dimension_video_qa/en-span-frame.png`
- `/tmp/my_websites_basis_dimension_video_qa/en-basis-stable-frame.png`
- `/tmp/my_websites_basis_dimension_video_qa/zh-hk-dimension-stable-frame.png`
- `/tmp/my_websites_basis_dimension_video_qa/zh-cn-shortcut-frame.png`
- `/tmp/my_websites_basis_dimension_video_qa/zh-cn-r3-frame.png`
- `/tmp/my_websites_basis_dimension_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_basis_dimension_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_basis_dimension_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_basis_dimension_video_qa/zh-cn-light-desktop-video-block.png`

Result:

- EN, zh-HK, and zh-CN visible video text is localized.
- The span frame shows a target reached by a coefficient combination.
- The redundancy frame and basis frame stay within the source-supported
  spanning-plus-independence story.
- The dimension frame shows two different-looking bases with the same count.
- The shortcut frame states the two-of-three criterion.
- The R3 frame connects three pivot columns with the `dim(R^3)=3` shortcut.
- Desktop light, desktop dark, and mobile screenshots show no visible clipping,
  page-level horizontal overflow, or framework overlay.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/basis_dimension.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/vector-spaces/basis-and-dimension/storyboard.json
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
npm run check:textbook-content
```

Build note:

- `contentlayer2 build` warns that the current storyboard JSON files are
  skipped because they are not Contentlayer document types. This is the current
  storyboard storage pattern and did not block the build.
- `npm run check:textbook-content` exited 0 and reported the existing
  repository-wide content depth / article-shape warnings. It checked 243 units
  and confirmed required structure was present.

Full video registry check:

```json
{
  "assetRefs": 96,
  "uniqueAssets": 96,
  "videoGroups": 16,
  "missing": [],
  "incomplete": []
}
```

## Browser QA

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Routes checked:

- `/en/notes/math1030/vector-spaces/basis-and-dimension`
- `/zh-hk/notes/math1030/vector-spaces/basis-and-dimension`
- `/zh-cn/notes/math1030/vector-spaces/basis-and-dimension`

Page QA result:

| Locale / viewport | Theme | Video readyState | Duration | Playback advance | Widget present | Overflow |
| --- | --- | --- | --- | --- | --- | --- |
| EN desktop 1440x1100 | light | 4 | 15.6s | +0.900s | yes | 0 |
| EN desktop 1440x1100 | dark | 4 | 15.6s | +0.901s | yes | 0 |
| zh-HK mobile 390x900 | light | 4 | 15.6s | +0.900s | yes | 0 |
| zh-CN desktop 1440x1100 | light | 4 | 15.6s | +0.901s | yes | 0 |

Additional checks:

- Localized video title was present in all checked locales.
- `videoSrc` and `posterSrc` resolved to the correct locale-specific assets.
- `span-explorer` remained present after the embedded video.
- No page errors and no request errors in the passing Playwright run.
- Sandboxed Chromium first failed on macOS Mach port permissions; the same
  local-only Playwright script passed with approved escalation.

## Export QA

TXT and PDF exports were checked through local API routes.

| Locale | TXT status | PDF status | PDF size | Static video fallback | Widget snapshot | MP4 path leaked |
| --- | --- | --- | --- | --- | --- | --- |
| EN | 200 | 200 | 50,221 bytes | yes | yes | no |
| zh-HK | 200 | 200 | 197,839 bytes | yes | yes | no |
| zh-CN | 200 | 200 | 183,606 bytes | yes | yes | no |

TXT export checks:

- Includes localized video title.
- Includes localized static frame text.
- Includes the static `span-explorer` snapshot.
- Does not include `.mp4`.

## Cleanup

- Restored `.contentlayer/generated` after build.
- Removed Manim scene `__pycache__`.
- Stopped the local server after QA.
