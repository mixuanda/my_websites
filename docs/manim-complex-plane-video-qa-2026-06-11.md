# Manim Complex Plane Video QA - 2026-06-11

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Unit:
`content/textbook/math1025/complex-numbers/complex-number-arithmetic-and-geometry`

Public video id: `math1025-complex-plane-arithmetic-story`

## Scope

This pass adds the first Math1025 trilingual Manim `VideoExplanation` to
MATH1025 `6.1 Complex numbers, polar form, and geometry`. The clip focuses on
the source-backed first visual story for the unit:

- complex numbers as points / vectors in the complex plane;
- addition as vector addition;
- modulus and argument as length and direction;
- polar form as the same vector recorded by length and angle;
- multiplication as length scaling and angle addition.

The video is embedded immediately after the polar multiplication formula and
before the division formula. This keeps the clip attached to the exact
transition from rectangular arithmetic to polar multiplication.

## Source Support Checked

- The current MDX unit covers complex numbers as ordered pairs, arithmetic,
  complex-plane geometry, conjugates, modulus, argument, polar form,
  multiplication as rotation / scaling, division, De Moivre, roots, and later
  complex-plane geometry.
- Read-only explorer verification found the strongest first-clip support in
  `reference/MATH1025/MATH1025_slides_ch6(3).pdf`.
- Extracted source evidence:
  - `docs/extracted/math1025/MATH1025_slides_ch63.txt`, page 4: ordered-pair
    construction and arithmetic.
  - page 9: complex plane / Argand diagram.
  - pages 10-12: conjugate and modulus.
  - pages 16-18: argument and polar form.
  - pages 19-21: addition visualization and multiplication as rotation /
    scaling.
- Roots of unity, general complex roots, ratio geometry, and later
  transformation topics are source-supported but intentionally deferred to
  later clips so this first video stays focused.

## Files Added Or Updated

- Added Manim scene:
  `tools/animations/manim/scenes/math1025/complex_numbers.py`
- Added storyboard:
  `content/textbook/math1025/complex-numbers/complex-number-arithmetic-and-geometry/storyboard.json`
- Updated render registry:
  `tools/animations/manim/scripts/render_scene.sh`
- Updated public video catalog:
  `src/lib/textbook/video-explanations.ts`
- Embedded the video in:
  - `content/textbook/math1025/complex-numbers/complex-number-arithmetic-and-geometry/en.mdx`
  - `content/textbook/math1025/complex-numbers/complex-number-arithmetic-and-geometry/zh-hk.mdx`
  - `content/textbook/math1025/complex-numbers/complex-number-arithmetic-and-geometry/zh-cn.mdx`

## Rendered Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh ComplexPlaneArithmeticStoryEn ComplexPlaneArithmeticStoryZhHk ComplexPlaneArithmeticStoryZhCn
```

Generated assets:

- `public/generated/animations/math1025/complex-plane-arithmetic-story-en.mp4`
- `public/generated/animations/math1025/complex-plane-arithmetic-story-en.png`
- `public/generated/animations/math1025/complex-plane-arithmetic-story-zh-hk.mp4`
- `public/generated/animations/math1025/complex-plane-arithmetic-story-zh-hk.png`
- `public/generated/animations/math1025/complex-plane-arithmetic-story-zh-cn.mp4`
- `public/generated/animations/math1025/complex-plane-arithmetic-story-zh-cn.png`

Video metadata:

| Locale | Codec | Size | FPS | Duration | File size |
| --- | --- | --- | --- | --- | --- |
| EN | H.264 | 854x480 | ~15 | 11.999s | 520,641 bytes |
| zh-HK | H.264 | 854x480 | 15 | 12.000s | 472,335 bytes |
| zh-CN | H.264 | 854x480 | ~15 | 11.999s | 469,002 bytes |

## Visual QA

Inspected generated poster and extracted frames from the rendered MP4s.

Local evidence files:

- `/tmp/my_websites_complex_plane_video_qa/en-poster-frame-rerender.png`
- `/tmp/my_websites_complex_plane_video_qa/en-addition-frame-final.png`
- `/tmp/my_websites_complex_plane_video_qa/zh-hk-polar-frame-rerender.png`
- `/tmp/my_websites_complex_plane_video_qa/zh-cn-length-frame-final.png`
- `/tmp/my_websites_complex_plane_video_qa/zh-cn-angle-frame-final.png`
- `/tmp/my_websites_complex_plane_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_complex_plane_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_complex_plane_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_complex_plane_video_qa/zh-cn-light-desktop-video-block.png`

Result:

- EN, zh-HK, and zh-CN visible video text is localized.
- The poster frame is stable.
- The first render had a crowded axis-label area in the addition frame; the
  scene was adjusted to hide axis labels in addition / multiplication frames,
  and the final extracted frames are readable.
- Complex-plane point, addition, polar form, product length, and product angle
  frames are readable at 854x480.
- Desktop light, desktop dark, and mobile screenshots show no visible clipping,
  framework overlay, or page-level horizontal overflow.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1025/complex_numbers.py
python3 -m json.tool content/textbook/math1025/complex-numbers/complex-number-arithmetic-and-geometry/storyboard.json
bash -n tools/animations/manim/scripts/render_scene.sh
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build note:

- `contentlayer2 build` warns that the seven current storyboard JSON files are
  skipped because they are not Contentlayer document types. This matches the
  current storyboard storage pattern and did not block the build.

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

- `/en/notes/math1025/complex-numbers/complex-number-arithmetic-and-geometry`
- `/zh-hk/notes/math1025/complex-numbers/complex-number-arithmetic-and-geometry`
- `/zh-cn/notes/math1025/complex-numbers/complex-number-arithmetic-and-geometry`

Page QA result:

| Locale / viewport | Theme | Video readyState | Duration | Playback advance | Overflow |
| --- | --- | --- | --- | --- | --- |
| EN desktop 1280x900 | light | 4 | 11.999s | +0.899s | 0 |
| EN desktop 1280x900 | dark | 4 | 11.999s | +0.899s | 0 |
| zh-HK mobile 390x900 | light | 4 | 12.000s | +0.900s | 0 |
| zh-CN desktop 1280x900 | light | 4 | 11.999s | +0.900s | 0 |

Additional checks:

- Localized page title and localized video title were present in all checked
  locales.
- `videoSrc` and `posterSrc` resolved to the correct locale-specific assets.
- No framework error overlay.
- No page errors or relevant console errors.

## Export QA

TXT and PDF exports were checked through the local API routes.

| Locale | TXT status | PDF status | PDF size | Static video fallback | MP4 path leaked |
| --- | --- | --- | --- | --- | --- |
| EN | 200 | 200 | 66,954 bytes | yes | no |
| zh-HK | 200 | 200 | 205,770 bytes | yes | no |
| zh-CN | 200 | 200 | 190,488 bytes | yes | no |

TXT export checks:

- Includes localized video title.
- Includes localized static frame text.
- Does not include `.mp4`.

PDF checks:

- Returns 200 with non-trivial byte size in all three locales.
- Does not include raw `.mp4` asset paths.

## Cleanup

- Restored `.contentlayer/generated` after build.
- Removed Manim scene `__pycache__`.
- Stopped the local server after QA.
