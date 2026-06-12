# Manim Rational/Irrational Root Video QA - 2026-06-12

## Scope

- Unit: Math1025 `7.2 Rational and irrational numbers`
- Public video id: `math1025-rational-irrational-root-proof-story`
- Scene source:
  `tools/animations/manim/scenes/math1025/rational_irrational_roots.py`
- Storyboard:
  `content/textbook/math1025/integer-methods/rational-and-irrational-numbers/storyboard.json`
- Page embeds:
  - `content/textbook/math1025/integer-methods/rational-and-irrational-numbers/en.mdx`
  - `content/textbook/math1025/integer-methods/rational-and-irrational-numbers/zh-hk.mdx`
  - `content/textbook/math1025/integer-methods/rational-and-irrational-numbers/zh-cn.mdx`

## Rendered Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh RationalIrrationalRootProofStoryEn RationalIrrationalRootProofStoryZhHk RationalIrrationalRootProofStoryZhCn
```

Final ffprobe check:

| Locale | MP4 | Codec | Size | Duration |
| --- | --- | --- | --- | --- |
| EN | `public/generated/animations/math1025/rational-irrational-root-proof-story-en.mp4` | H.264, 854x480 | 582752 bytes | 10.999678s |
| zh-HK | `public/generated/animations/math1025/rational-irrational-root-proof-story-zh-hk.mp4` | H.264, 854x480 | 572958 bytes | 10.999678s |
| zh-CN | `public/generated/animations/math1025/rational-irrational-root-proof-story-zh-cn.mp4` | H.264, 854x480 | 557425 bytes | 10.999678s |

Localized posters were generated beside each MP4.

## Visual QA

Frames inspected under `/tmp/my_websites_rational_irrational_video_qa/`:

- `en-start.png`
- `en-lowest-fixed.png`
- `en-square.png`
- `zh-hk-substitute-final-pass.png`
- `zh-hk-contradiction-final-pass.png`
- `zh-cn-root-test-final-final.png`
- `zh-cn-summary-final-final.png`

Fixes made after visual QA:

- removed low-value numerator/denominator micro-labels from the lowest-terms
  frame because they crowded the `gcd(a,b)=1` line;
- shortened the final Manim conclusion in all locales so the bottom summary card
  remains readable;
- compressed and raised the final perfect-square example chips so they no
  longer overlap the bottom explanation card;
- retimed screenshots to stable frame intervals rather than transition frames.

## Static Checks

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1025/rational_irrational_roots.py
python3 -m json.tool content/textbook/math1025/integer-methods/rational-and-irrational-numbers/storyboard.json
bash -n tools/animations/manim/scripts/render_scene.sh
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build note: Contentlayer skipped 10 `storyboard.json` files as expected. The
new rational/irrational storyboard accounts for the count increasing from 9 to
10.

## Browser And Export QA

Browser plugin was not available, so QA used Playwright 1.60.0 fallback. The
first sandboxed Chromium launch failed on macOS Mach port permissions; the same
QA script then passed with the approved non-sandbox command:

```bash
node /private/tmp/rational_irrational_video_qa.mjs
```

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Validated pages:

| Surface | Theme / viewport | Result |
| --- | --- | --- |
| `/en/notes/math1025/integer-methods/rational-and-irrational-numbers` | light desktop 1440x1050 | video title, poster, source, playback, no page overflow |
| `/en/notes/math1025/integer-methods/rational-and-irrational-numbers` | dark desktop 1440x1050 | dark class applied; video title, poster, source, playback |
| `/zh-hk/notes/math1025/integer-methods/rational-and-irrational-numbers` | light mobile 390x900 | localized title, poster, source, playback, no page overflow |
| `/zh-cn/notes/math1025/integer-methods/rational-and-irrational-numbers` | light desktop 1280x900 | localized title, poster, source, playback |

Playback metrics:

| Surface | Poster | Source | Duration | Playback delta |
| --- | --- | --- | --- | --- |
| EN light | `...-en.png` | `...-en.mp4` | 10.999678s | 0.899352s |
| EN dark | `...-en.png` | `...-en.mp4` | 10.999678s | 0.904244s |
| zh-HK mobile | `...-zh-hk.png` | `...-zh-hk.mp4` | 10.999678s | 0.902939s |
| zh-CN light | `...-zh-cn.png` | `...-zh-cn.mp4` | 10.999678s | 0.903220s |

Local console note: `/_vercel/insights/script.js` returns 404 under `next start`;
this is the local Vercel Analytics script and is unrelated to the video,
poster, page route, or export route.

Export checks:

| Locale | TXT | PDF | Static fallback |
| --- | --- | --- | --- |
| EN | 200, 15045 chars | 200, 42962 bytes | snapshot present; `.mp4` absent |
| zh-HK | 200, 6547 chars | 200, 156435 bytes | snapshot present; `.mp4` absent |
| zh-CN | 200, 6550 chars | 200, 146385 bytes | snapshot present; `.mp4` absent |

Screenshots saved by the Playwright script:

- `/tmp/my_websites_rational_irrational_video_qa/en-light-desktop.png`
- `/tmp/my_websites_rational_irrational_video_qa/en-dark-desktop.png`
- `/tmp/my_websites_rational_irrational_video_qa/zh-hk-light-mobile.png`
- `/tmp/my_websites_rational_irrational_video_qa/zh-cn-light-desktop.png`

## Outcome

Passed. The page remains article-first, the video is localized in all three
language modes, playback works from generated MP4/poster assets, and TXT/PDF
exports degrade the video into static study material rather than linking to the
MP4.
