# Manim Gram-Schmidt Video QA - 2026-06-10

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Scope: MATH1030 `9.3 Gram-Schmidt orthogonalization` localized Manim video
integration.

Public component id: `math1030-gram-schmidt-projection-story`

## Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh GramSchmidtProjectionStoryEn GramSchmidtProjectionStoryZhHk GramSchmidtProjectionStoryZhCn
```

Generated public assets:

| Locale | MP4 | Poster |
| --- | --- | --- |
| English | `public/generated/animations/math1030/gram-schmidt-projection-story-en.mp4` | `public/generated/animations/math1030/gram-schmidt-projection-story-en.png` |
| Traditional Chinese | `public/generated/animations/math1030/gram-schmidt-projection-story-zh-hk.mp4` | `public/generated/animations/math1030/gram-schmidt-projection-story-zh-hk.png` |
| Simplified Chinese | `public/generated/animations/math1030/gram-schmidt-projection-story-zh-cn.mp4` | `public/generated/animations/math1030/gram-schmidt-projection-story-zh-cn.png` |

`ffprobe` result after localizing all visible card labels:

| Locale | Codec | Dimensions | Frame rate | Duration | Size |
| --- | --- | --- | --- | --- | --- |
| English | H.264 | 854 x 480 | 15 fps | 15.666667 seconds | 576,162 bytes |
| Traditional Chinese | H.264 | 854 x 480 | 15 fps | 15.666667 seconds | 588,250 bytes |
| Simplified Chinese | H.264 | 854 x 480 | 15 fps | 15.666667 seconds | 577,438 bytes |

Poster / frame checks:

- all posters are PNG, 854 x 480;
- English, Traditional Chinese, and Simplified Chinese posters render with the
  current locale fonts;
- Traditional Chinese and Simplified Chinese scene cards no longer contain the
  English-only labels `not yet orthogonal`, `projection coefficient`, or
  `coefficients`;
- mid-frame checks confirmed the `w_2` projection subtraction, `w_3`
  two-direction subtraction, and final span / normalization frames are readable;
- no tofu boxes or obvious text overflow were observed in inspected posters or
  extracted frames.

Local visual evidence:

```text
/tmp/my_websites_gram_schmidt_video_qa/
```

Important files:

- `zh-hk-w2-frame.png`
- `zh-cn-w3-frame.png`
- `en-normalize-frame.png`
- `en-video-light.png`
- `en-video-dark.png`
- `zh-hk-video-mobile.png`

## Static QA

| Check | Result |
| --- | --- |
| `python3 -m py_compile tools/animations/manim/scenes/math1030/gram_schmidt.py tools/animations/manim/scenes/math1030/augmented_matrices.py tools/animations/manim/scenes/math1030/matrix_basics.py tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py` | Pass |
| `bash -n tools/animations/manim/scripts/render_scene.sh` | Pass |
| `python3 -m json.tool content/textbook/math1030/inner-products/gram-schmidt-orthogonalization/storyboard.json` | Pass |
| `git diff --check` | Pass |
| `npm run verify:mdx-tables` | Pass |
| `npx tsc --noEmit --pretty false` | Pass |
| `npm run lint` | Pass |
| `AUTH_SECRET=local-test-secret npm run build` | Pass |

Build note: Contentlayer reports the new `storyboard.json` as an unknown
document and skips it. This matches the current storyboard storage pattern and
does not block the build. Generated `.contentlayer` churn was restored after
the build.

## Browser QA

Browser plugin availability: not available in this session. QA used Playwright
1.60.0 from the local npx cache with Chromium.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Routes tested:

- `http://localhost:3010/en/notes/math1030/inner-products/gram-schmidt-orthogonalization`
- `http://localhost:3010/zh-hk/notes/math1030/inner-products/gram-schmidt-orthogonalization`
- `http://localhost:3010/zh-cn/notes/math1030/inner-products/gram-schmidt-orthogonalization`

| Locale / viewport | Theme | Expected source | Result |
| --- | --- | --- | --- |
| English, 1440 x 1100 | Light | `gram-schmidt-projection-story-en.mp4` | Pass |
| Traditional Chinese, 1440 x 1100 | Light | `gram-schmidt-projection-story-zh-hk.mp4` | Pass |
| Simplified Chinese, 1440 x 1100 | Light | `gram-schmidt-projection-story-zh-cn.mp4` | Pass |
| English, 1440 x 1100 | Dark | `gram-schmidt-projection-story-en.mp4` | Pass |
| Traditional Chinese, 390 x 900 | Light | `gram-schmidt-projection-story-zh-hk.mp4` | Pass |

For each browser case:

- page identity matched the intended localized note;
- the page had meaningful body content;
- the localized video title was present;
- no framework overlay was present;
- `video > source` matched the locale-specific MP4;
- `poster` matched the locale-specific PNG;
- `aria-label` matched the localized title;
- video metadata loaded with `readyState = 4`;
- video duration was `15.667` seconds;
- playback advanced after starting the video;
- the static Gram-Schmidt table remained present after the video;
- table wrappers retained internal horizontal scrolling where needed;
- no page-level horizontal overflow remained after the MDX wrapper fix;
- page error count was `0`;
- relevant failed response count was `0`.

The only console issue observed was the generic local 404 message associated
with the Vercel Analytics script. No note route, video, poster, table, or export
request failed.

## Overflow Fix From QA

Initial mobile QA found page-level horizontal overflow on the zh-HK route. The
cause was wide MDX content inside the article, especially the static
Gram-Schmidt table. The table already had its own scroll wrapper, but the MDX
root still contributed to `documentElement.scrollWidth`.

Fix applied:

- added `overflow-x-hidden` to the shared MDX root wrapper in
  `src/components/Mdx.tsx`;
- verified that the page-level overflow became `0`;
- verified that the table wrapper still reports `overflow-x: auto` and retains
  a larger `scrollWidth` than `clientWidth` on mobile.

## Export QA

TXT and PDF exports were checked for all three locales.

| Locale | TXT status | Static video-study sequence present | TXT excludes `.mp4` | PDF status | PDF content type | PDF size |
| --- | --- | --- | --- | --- | --- | --- |
| English | 200 | Yes | Yes | 200 | `application/pdf` | 36,729 bytes |
| Traditional Chinese | 200 | Yes | Yes | 200 | `application/pdf` | 156,112 bytes |
| Simplified Chinese | 200 | Yes | Yes | 200 | `application/pdf` | 146,578 bytes |

## Remaining Risk

- Production deployment was not tested in this local QA pass.
- Browser coverage is Chromium only.
- The Browser plugin path was unavailable, so QA used direct Playwright.
- Headless Chromium screenshots do not reliably paint the current MP4 frame;
  video correctness was verified through source/poster metadata, duration, and
  playback progress, with separate poster and extracted-frame inspection for
  visual quality.
- The Manim render registry is still a shell case registry. It should be
  generalized before adding substantial non-Math1030 video assets.
