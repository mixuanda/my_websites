# Manim Video QA - 2026-05-25

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Scope: MATH1030 `2.3 Gaussian elimination and RREF` localized Manim video
integration.

Typography update: the scene now uses explicit locale fonts:

- English: `Avenir Next`
- Traditional Chinese: `PingFang HK`
- Simplified Chinese: `PingFang SC`

## Assets

Rendered with:

```bash
npm run animation:manim:render
```

Generated public assets:

| Locale | MP4 | Poster |
| --- | --- | --- |
| English | `public/generated/animations/math1030/gaussian-elimination-rref-pivot-story-en.mp4` | `public/generated/animations/math1030/gaussian-elimination-rref-pivot-story-en.png` |
| Traditional Chinese | `public/generated/animations/math1030/gaussian-elimination-rref-pivot-story-zh-hk.mp4` | `public/generated/animations/math1030/gaussian-elimination-rref-pivot-story-zh-hk.png` |
| Simplified Chinese | `public/generated/animations/math1030/gaussian-elimination-rref-pivot-story-zh-cn.mp4` | `public/generated/animations/math1030/gaussian-elimination-rref-pivot-story-zh-cn.png` |

`ffprobe` result for the regenerated font-adjusted videos:

- codec: H.264
- dimensions: 854 x 480
- frame rate: 15 fps
- duration: 16.333 seconds
- size:
  - English: 471,709 bytes
  - Traditional Chinese: 467,790 bytes
  - Simplified Chinese: 464,426 bytes

Poster checks:

- all posters are PNG, 854 x 480;
- English, Traditional Chinese, and Simplified Chinese text renders visibly
  with the explicit locale fonts;
- no tofu boxes or obvious text overflow were observed.

## Static QA

| Check | Result |
| --- | --- |
| `bash -n tools/animations/manim/scripts/render_scene.sh` | Pass |
| `python3 -m py_compile tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py` | Pass |
| `npm run animation:manim:render` | Pass |
| `npm run verify:mdx-tables` | Pass |
| `git diff --check` | Pass |
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

- `http://localhost:3010/en/notes/math1030/matrices/gaussian-elimination-rref`
- `http://localhost:3010/zh-hk/notes/math1030/matrices/gaussian-elimination-rref`
- `http://localhost:3010/zh-cn/notes/math1030/matrices/gaussian-elimination-rref`

| Locale / viewport | Theme | Expected source | Result |
| --- | --- | --- | --- |
| English, 1440 x 1100 | Light | `gaussian-elimination-rref-pivot-story-en.mp4` | Pass |
| Traditional Chinese, 1440 x 1100 | Light | `gaussian-elimination-rref-pivot-story-zh-hk.mp4` | Pass |
| Simplified Chinese, 1440 x 1100 | Light | `gaussian-elimination-rref-pivot-story-zh-cn.mp4` | Pass |
| English, 1440 x 1100 | Dark | `gaussian-elimination-rref-pivot-story-en.mp4` | Pass |
| Traditional Chinese, 390 x 900 | Light | `gaussian-elimination-rref-pivot-story-zh-hk.mp4` | Pass |

For each browser case:

- page identity matched the intended localized note;
- the page had meaningful body content;
- the localized video label was present;
- no framework overlay was present;
- `video > source` matched the locale-specific MP4;
- `poster` matched the locale-specific PNG;
- video metadata loaded with `readyState = 4`;
- video duration was `16.333`;
- playback advanced after starting the video;
- no horizontal overflow was detected;
- relevant console error count was `0`;
- page error count was `0`;
- failed response count was `0`.

Local screenshot evidence was written under:

```text
/tmp/my_websites_manim_video_qa/
```

After the font update, a focused browser pass confirmed that all three locale
videos still load and play from the expected localized MP4 paths. The only 404
observed was the local Vercel Analytics script
`/_vercel/insights/script.js`, not a video, poster, route, or export asset.
Additional screenshot evidence was written under:

```text
/tmp/my_websites_manim_video_font_qa/
```

## Export QA

TXT and PDF exports were checked for all three locales.

| Locale | TXT status | Static video-study sequence present | TXT excludes `.mp4` | PDF status | PDF content type |
| --- | --- | --- | --- | --- | --- |
| English | 200 | Yes | Yes | 200 | `application/pdf` |
| Traditional Chinese | 200 | Yes | Yes | 200 | `application/pdf` |
| Simplified Chinese | 200 | Yes | Yes | 200 | `application/pdf` |

PDF byte sizes:

- English: 44,734 bytes
- Traditional Chinese: 184,822 bytes
- Simplified Chinese: 168,260 bytes

## Remaining Risk

- Production deployment was not tested in this local QA pass.
- Browser coverage is Chromium only.
- The Browser plugin path was unavailable, so the QA fallback used direct
  Playwright instead of in-app Browser tooling.
- Generated video assets are small enough for this pilot, but the project still
  needs a longer-term policy for whether many future videos should stay in Git,
  be generated in CI, or move to external static hosting.
