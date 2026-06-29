# Manim QA: Math1030 9.1 Inner Products, Norms, and Angles

Date: 2026-06-29

Branch: `codex/manim`

Component id: `math1030-inner-product-norm-angle-story`

Unit route: `/[locale]/notes/math1030/inner-products/inner-products-norms-and-angles`

## Source Scope

- `reference/MATH1030/MATH1030-Notes.pdf` pp. 209-213 support the standard
  inner product, dot-product examples, linearity / symmetry / positive
  definiteness, norm, norm examples, unit vectors, and normalization.
- `reference/MATH1030/1030gi-n08-01.pdf` pp. 1-2 independently support the
  inner product and norm definitions plus basic norm properties.
- `reference/MATH1030/MATH1030-Notes.pdf` p. 214 / section 9.2 supports the
  angle formula and perpendicular iff zero inner product. The video treats this
  as a short bridge into 9.2.
- Projection subtraction is not treated as 9.1 material. It remains reserved
  for the existing Gram-Schmidt video in 9.3.

## Implementation Result

- Added Manim scene:
  `tools/animations/manim/scenes/math1030/inner_products_norms_angles.py`.
- Added storyboard:
  `content/textbook/math1030/inner-products/inner-products-norms-and-angles/storyboard.json`.
- Added `VideoExplanation` catalog entry with EN, zh-HK, and zh-CN title,
  summary, frame sequence, transcript, conclusion, `videoSrc`, and `posterSrc`.
- Embedded `<VideoExplanation id="math1030-inner-product-norm-angle-story" />`
  in EN, zh-HK, and zh-CN MDX after the angle / orthogonality bridge and before
  the worked angle example.
- Added public assets:
  - `public/generated/animations/math1030/inner-product-norm-angle-story-en.mp4`
  - `public/generated/animations/math1030/inner-product-norm-angle-story-en.png`
  - `public/generated/animations/math1030/inner-product-norm-angle-story-zh-hk.mp4`
  - `public/generated/animations/math1030/inner-product-norm-angle-story-zh-hk.png`
  - `public/generated/animations/math1030/inner-product-norm-angle-story-zh-cn.mp4`
  - `public/generated/animations/math1030/inner-product-norm-angle-story-zh-cn.png`

No widget was added. The roadmap marks this item as Manim-only, and the
source-backed first-pass learning move is a fixed algebra-to-geometry bridge
rather than reader-controlled vector manipulation.

## Render QA

Commands:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/inner_products_norms_angles.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/inner-products/inner-products-norms-and-angles/storyboard.json >/dev/null
MANIM_QUALITY=ql bash tools/animations/manim/scripts/render_scene.sh InnerProductNormAngleStoryEn InnerProductNormAngleStoryZhHk InnerProductNormAngleStoryZhCn
```

Result: pass.

Note: direct execution of `tools/animations/manim/scripts/render_scene.sh`
returned `permission denied` because the script is not executable in this
checkout. Running it through `bash` succeeded and matches the npm script
pattern.

Rendered asset metadata:

| Locale | MP4 | Codec | Size | Duration | Poster |
| --- | --- | --- | --- | --- | --- |
| EN | `inner-product-norm-angle-story-en.mp4` | H.264 | 854x480 | 13.599678s | 854x480 PNG |
| zh-HK | `inner-product-norm-angle-story-zh-hk.mp4` | H.264 | 854x480 | 13.599678s | 854x480 PNG |
| zh-CN | `inner-product-norm-angle-story-zh-cn.mp4` | H.264 | 854x480 | 13.599678s | 854x480 PNG |

Visual inspection:

- EN poster: readable dot-product opening frame.
- zh-CN poster: localized title, subtitle, labels, and frame text render
  correctly.
- zh-HK mid-frame: localized norm frame renders correctly.
- EN / zh-CN stable orthogonality frames: right-angle diagram and zero
  inner-product text render correctly.
- zh-HK stable conclusion frame: previous visual is cleared before conclusion
  remains visible. Earlier transition screenshots showed expected fade overlap,
  not a stable-frame defect.

## Static QA

Commands:

```bash
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
npm run check:textbook-content
```

Result: pass.

Notes:

- `npm run check:textbook-content` exited 0 with existing broader content-depth
  warnings. It checked 243 units and reported required structure present.
- `AUTH_SECRET=local-test-secret npm run build` exited 0. Contentlayer reported
  the existing storyboard JSON document-type warnings and generated 247
  documents; Next compiled, type-checked, and generated static pages
  successfully.

## Browser QA

Browser availability: Browser plugin not available in this session; used
regular Playwright fallback with
`NODE_PATH=/Users/evan/.npm/_npx/420ff84f11983ee5/node_modules`.

Flow under test:

`/[locale]/notes/math1030/inner-products/inner-products-norms-and-angles`
loads -> embedded localized `VideoExplanation` renders -> MP4 metadata loads and
playback advances -> TXT/PDF export degrades the video to static study text.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Playwright result: pass for EN, zh-HK, and zh-CN.

Checks:

| Check | Result |
| --- | --- |
| Page identity | Each localized page returned 200 with the expected page title. |
| Not blank | Each localized body contained the 9.1 heading and localized video title. |
| Framework overlay | No application/runtime overlay text found. |
| Console health | No relevant errors or warnings. Local-only `/_vercel/insights/script.js` 404 responses were ignored. |
| Video source | Each locale used the matching localized MP4 and poster path. |
| Playback proof | Each video advanced to about 1.25s, `readyState=4`, duration 13.599678s. |
| Layout | Desktop, mobile 390px, and dark-mode reload showed no horizontal overflow. |
| Asset HTTP | All six localized MP4/PNG assets returned 200 with expected content types. |

Screenshot evidence was saved outside the repo:

- `/tmp/manim-inner-product-browser-qa/en-desktop.png`
- `/tmp/manim-inner-product-browser-qa/en-mobile.png`
- `/tmp/manim-inner-product-browser-qa/en-dark.png`
- `/tmp/manim-inner-product-browser-qa/zh-hk-desktop.png`
- `/tmp/manim-inner-product-browser-qa/zh-hk-mobile.png`
- `/tmp/manim-inner-product-browser-qa/zh-hk-dark.png`
- `/tmp/manim-inner-product-browser-qa/zh-cn-desktop.png`
- `/tmp/manim-inner-product-browser-qa/zh-cn-mobile.png`
- `/tmp/manim-inner-product-browser-qa/zh-cn-dark.png`

## Export QA

TXT and PDF exports were checked for all three locales.

| Locale | TXT | PDF |
| --- | --- | --- |
| EN | 200, includes `Dot product as a scalar`, no `<video>` or `.mp4` | 200, starts with `%PDF`, 36176 bytes |
| zh-HK | 200, includes `點積作為純量`, no `<video>` or `.mp4` | 200, starts with `%PDF`, 159469 bytes |
| zh-CN | 200, includes `点积作为标量`, no `<video>` or `.mp4` | 200, starts with `%PDF`, 148477 bytes |

## QA Verdict

Pass. Math1030 9.1 now has a source-supported trilingual Manim video with
localized public assets, article-flow embeds, static TXT/PDF fallback, and
browser-verified playback in all three locales.
