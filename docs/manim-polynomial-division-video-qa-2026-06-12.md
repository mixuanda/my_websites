# Manim Polynomial Division Video QA - 2026-06-12

## Scope

- Unit: Math1025 `8.1 Polynomial arithmetic and division`
- Public video id: `math1025-polynomial-division-remainder-story`
- Scene source:
  `tools/animations/manim/scenes/math1025/polynomial_division.py`
- Storyboard:
  `content/textbook/math1025/polynomial-methods/polynomial-arithmetic-and-division/storyboard.json`
- Page embeds:
  - `content/textbook/math1025/polynomial-methods/polynomial-arithmetic-and-division/en.mdx`
  - `content/textbook/math1025/polynomial-methods/polynomial-arithmetic-and-division/zh-hk.mdx`
  - `content/textbook/math1025/polynomial-methods/polynomial-arithmetic-and-division/zh-cn.mdx`
- Existing paired widget:
  `math1025-polynomial-division-stepper`

## Rendered Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh PolynomialDivisionRemainderStoryEn PolynomialDivisionRemainderStoryZhHk PolynomialDivisionRemainderStoryZhCn
```

Final ffprobe check:

| Locale | MP4 | Codec | Size | Duration |
| --- | --- | --- | --- | --- |
| EN | `public/generated/animations/math1025/polynomial-division-remainder-story-en.mp4` | H.264, 854x480 | 633849 bytes | 11.333011s |
| zh-HK | `public/generated/animations/math1025/polynomial-division-remainder-story-zh-hk.mp4` | H.264, 854x480 | 573789 bytes | 11.333333s |
| zh-CN | `public/generated/animations/math1025/polynomial-division-remainder-story-zh-cn.mp4` | H.264, 854x480 | 565395 bytes | 11.333333s |

Localized posters were generated beside each MP4.

## Visual QA

Frames inspected under `/tmp/my_websites_polynomial_division_video_qa/`:

- `en-step1-final.png`
- `zh-hk-example-final.png`
- `zh-hk-final-step-final.png`
- `zh-cn-invariant-final.png`
- `en-summary-final.png`
- poster file:
  `public/generated/animations/math1025/polynomial-division-remainder-story-en.png`

Fixes made after visual QA:

- removed crossing arrows from the example setup frame to keep the quotient and
  remainder slots legible;
- moved quotient / remainder cards rightward in the step frames so their borders
  no longer overlap the formula rows;
- removed a redundant degree-check label from the final step frame;
- shortened the scene-level conclusion text so the summary card stays readable;
- increased the first-frame hold so the shared poster timestamp lands on a
  stable frame instead of a transition frame.

## Static Checks

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1025/polynomial_division.py
python3 -m json.tool content/textbook/math1025/polynomial-methods/polynomial-arithmetic-and-division/storyboard.json
bash -n tools/animations/manim/scripts/render_scene.sh
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build note: Contentlayer skipped 11 `storyboard.json` files as expected. The new
polynomial-division storyboard accounts for the count increasing from 10 to 11.

## Browser And Export QA

Browser plugin was not available, so QA used Playwright fallback. The first
sandboxed Chromium launch failed on macOS Mach port permissions; the same QA
script then passed with the approved non-sandbox command:

```bash
node /private/tmp/polynomial_division_video_qa.mjs
```

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Validated pages:

| Surface | Theme / viewport | Result |
| --- | --- | --- |
| `/en/notes/math1025/polynomial-methods/polynomial-arithmetic-and-division` | light desktop 1440x1050 | localized title, poster, source, playback, stepper click to step 2, no page overflow |
| `/en/notes/math1025/polynomial-methods/polynomial-arithmetic-and-division` | dark desktop 1440x1050 | dark class applied; poster, source, playback, stepper click to step 2 |
| `/zh-hk/notes/math1025/polynomial-methods/polynomial-arithmetic-and-division` | light mobile 390x900 | localized title, zh-HK poster/source, playback, stepper click to step 2, no page overflow |
| `/zh-cn/notes/math1025/polynomial-methods/polynomial-arithmetic-and-division` | light desktop 1280x900 | localized title, zh-CN poster/source, playback, stepper click to step 2 |

Playback metrics:

| Surface | Poster | Source | Duration | Playback delta | Stepper state |
| --- | --- | --- | --- | --- | --- |
| EN light | `...-en.png` | `...-en.mp4` | 11.333011s | 0.899023s | `Step 2/5` |
| EN dark | `...-en.png` | `...-en.mp4` | 11.333011s | 0.899180s | `Step 2/5` |
| zh-HK mobile | `...-zh-hk.png` | `...-zh-hk.mp4` | 11.333333s | 0.899488s | `步驟 2/5` |
| zh-CN light | `...-zh-cn.png` | `...-zh-cn.mp4` | 11.333333s | 0.898524s | `步骤 2/5` |

Local console note: `/_vercel/insights/script.js` returns 404 under `next start`;
this is the local Vercel Analytics script and is unrelated to the video,
poster, page route, stepper, or export route.

Export checks:

| Locale | TXT | PDF | Static fallback |
| --- | --- | --- | --- |
| EN | 200, 15385 chars | 200, 41570 bytes | video snapshot title present; `x^2-x-3` and `x+8` present; `.mp4` absent |
| zh-HK | 200, 6047 chars | 200, 174271 bytes | video snapshot title present; `x^2-x-3` and `x+8` present; `.mp4` absent |
| zh-CN | 200, 6047 chars | 200, 161062 bytes | video snapshot title present; `x^2-x-3` and `x+8` present; `.mp4` absent |

Screenshots saved by the Playwright script:

- `/tmp/my_websites_polynomial_division_video_qa/en-light-desktop.png`
- `/tmp/my_websites_polynomial_division_video_qa/en-dark-desktop.png`
- `/tmp/my_websites_polynomial_division_video_qa/zh-hk-light-mobile.png`
- `/tmp/my_websites_polynomial_division_video_qa/zh-cn-light-desktop.png`

## Outcome

Passed. The page remains article-first, the video is localized in all three
language modes, playback works from generated MP4/poster assets, the existing
polynomial division stepper remains usable immediately after the video, and
TXT/PDF exports degrade the video into static study material rather than
linking to the MP4.
