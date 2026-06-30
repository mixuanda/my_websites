# Manim QA: Math1030 9.2 Orthogonal Sets and Orthonormal Bases

Date: 2026-06-30

Branch: `codex/manim`

Component id: `math1030-orthogonal-sets-orthonormal-bases-story`

Unit route:
`/[locale]/notes/math1030/inner-products/orthogonal-sets-and-orthonormal-bases`

## Source Scope

- `reference/MATH1030/MATH1030-Notes.pdf` pp. 214-220 support the
  zero-inner-product orthogonality test, the orthogonal set definition, the
  pairwise examples, automatic independence, the coefficient formula
  `alpha_i=<v,v_i>/||v_i||^2`, orthogonal bases, orthonormal sets / bases,
  normalization, and the orthonormal coordinate formula.
- Projection subtraction, closest-point projection, least-squares language,
  and orthogonal complements were intentionally excluded from this 9.2 video.
  Projection subtraction remains in the existing 9.3 Gram-Schmidt video.

## Implementation Result

- Added Manim scene:
  `tools/animations/manim/scenes/math1030/orthogonal_sets_orthonormal_bases.py`.
- Added storyboard:
  `content/textbook/math1030/inner-products/orthogonal-sets-and-orthonormal-bases/storyboard.json`.
- Added `VideoExplanation` catalog entry with EN, zh-HK, and zh-CN title,
  summary, frame sequence, transcript, conclusion, `videoSrc`, and `posterSrc`.
- Embedded
  `<VideoExplanation id="math1030-orthogonal-sets-orthonormal-bases-story" />`
  in EN, zh-HK, and zh-CN MDX after the coefficient formula and before the
  coordinate-reading worked example.
- Added public assets:
  - `public/generated/animations/math1030/orthogonal-sets-orthonormal-bases-story-en.mp4`
  - `public/generated/animations/math1030/orthogonal-sets-orthonormal-bases-story-en.png`
  - `public/generated/animations/math1030/orthogonal-sets-orthonormal-bases-story-zh-hk.mp4`
  - `public/generated/animations/math1030/orthogonal-sets-orthonormal-bases-story-zh-hk.png`
  - `public/generated/animations/math1030/orthogonal-sets-orthonormal-bases-story-zh-cn.mp4`
  - `public/generated/animations/math1030/orthogonal-sets-orthonormal-bases-story-zh-cn.png`

No widget was added. No existing widget directly covers orthogonal coordinate
reading, and the source-backed learning move is a fixed coefficient-isolation
sequence rather than reader-controlled vector manipulation.

## Render QA

Commands:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/orthogonal_sets_orthonormal_bases.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/inner-products/orthogonal-sets-and-orthonormal-bases/storyboard.json >/dev/null
MANIM_QUALITY=ql bash tools/animations/manim/scripts/render_scene.sh OrthogonalSetsOrthonormalBasesStoryEn OrthogonalSetsOrthonormalBasesStoryZhHk OrthogonalSetsOrthonormalBasesStoryZhCn
```

Result: pass.

Rendered asset metadata:

| Locale | MP4 | Codec | Size | Duration | Poster |
| --- | --- | --- | --- | --- | --- |
| EN | `orthogonal-sets-orthonormal-bases-story-en.mp4` | H.264 | 854x480 | 13.600000s | 854x480 PNG |
| zh-HK | `orthogonal-sets-orthonormal-bases-story-zh-hk.mp4` | H.264 | 854x480 | 13.599678s | 854x480 PNG |
| zh-CN | `orthogonal-sets-orthonormal-bases-story-zh-cn.mp4` | H.264 | 854x480 | 13.599678s | 854x480 PNG |

Visual inspection:

- EN stable coordinate-reading frame: vector cards, coefficient formula, and
  final expansion render legibly.
- zh-HK stable normalization frame: localized title/subtitle and vector-norm
  cards render legibly without overflow.
- zh-CN stable orthonormal-formula frame: localized conclusion text, formula
  cards, and denominator-free formula render legibly.
- A first mid-video frame at `6.5s` caught a transition and showed expected
  fade overlap. Stable-frame extraction at `2.1s`, `4.0s`, `5.6s`, `7.3s`,
  `9.0s`, and `11.0s` confirmed the steady states are clean.

## Static QA

Commands:

```bash
git diff --check
npm run verify:mdx-tables
npm run check:textbook-content
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Result: pass.

Notes:

- `npm run check:textbook-content` exited 0 with the existing broader
  content-depth warnings. It reported 379 warnings and required structure
  present across 243 checked units.
- `AUTH_SECRET=local-test-secret npm run build` exited 0. Contentlayer reported
  the existing storyboard JSON document-type warnings and generated 247
  documents; Next compiled, type-checked, and generated 328 static pages.

## Browser And Export QA

Flow under test:

`/[locale]/notes/math1030/inner-products/orthogonal-sets-and-orthonormal-bases`
loads -> embedded localized `VideoExplanation` renders -> MP4/poster assets are
resolved by locale -> export menu opens -> TXT/PDF exports degrade the video
to static study text.

Browser path:

- Browser plugin was available and used for page identity, DOM presence,
  console logs, video metadata, and export-menu interaction.
- Browser screenshot capability failed twice with
  `Timed out running CDP command "Page.captureScreenshot" for tab 1`.
- Visual screenshot evidence therefore used Playwright against the system
  Chrome channel, without downloading Playwright browsers.

Browser checks:

| Check | Result |
| --- | --- |
| EN page identity | Pass: title `9.2 Orthogonal sets and orthonormal bases | Evanalysis` |
| Not blank | Pass: DOM includes `From orthogonal set to orthonormal coordinate formula` |
| Framework overlay | Pass: no Next / application error overlay in DOM |
| Console health | Pass in Browser logs. System Chrome screenshot pass only saw local `/_vercel/insights/script.js` 404, unrelated to note/video assets. |
| Video metadata | Pass: video has controls, `preload="metadata"`, localized `poster`, localized mp4 source, and duration about 13.6s |
| Interaction proof | Pass: `Export this note` button opened an active menu with PDF options |
| Desktop visual | Pass: 1280x720 screenshot shows the video block and poster with no overflow |
| Mobile visual | Pass: 390x844 zh-CN screenshot shows the video block scaled to mobile width with no horizontal overflow |

Local route and asset checks:

| Locale | Page | Expected video refs |
| --- | --- | --- |
| EN | 200 | `orthogonal-sets-orthonormal-bases-story-en.mp4`, `orthogonal-sets-orthonormal-bases-story-en.png` |
| zh-HK | 200 | `orthogonal-sets-orthonormal-bases-story-zh-hk.mp4`, `orthogonal-sets-orthonormal-bases-story-zh-hk.png` |
| zh-CN | 200 | `orthogonal-sets-orthonormal-bases-story-zh-cn.mp4`, `orthogonal-sets-orthonormal-bases-story-zh-cn.png` |

Local asset checks:

| Asset | HTTP | Content type |
| --- | --- | --- |
| EN mp4 | 200 | `video/mp4` |
| EN png | 200 | `image/png` |
| zh-HK mp4 | 200 | `video/mp4` |
| zh-HK png | 200 | `image/png` |
| zh-CN mp4 | 200 | `video/mp4` |
| zh-CN png | 200 | `image/png` |

Export checks:

| Locale | TXT | Static video fallback | Media leakage | PDF |
| --- | --- | --- | --- | --- |
| EN | 200 | yes | no `.mp4`, `<video>`, or `poster=` leakage | 200 `application/pdf` |
| zh-HK | 200 | yes | no `.mp4`, `<video>`, or `poster=` leakage | 200 `application/pdf` |
| zh-CN | 200 | yes | no `.mp4`, `<video>`, or `poster=` leakage | 200 `application/pdf` |

## Production QA

Completed after `codex/manim` was pushed, `origin/main` was merged into
`codex/manim`, and `main` was fast-forwarded to merge commit `2b3b649`.

Production polling initially saw the previous deployment: pages returned 200
but did not include the new video refs, and the new assets returned 404. The
deployment switched over on polling attempt 9.

Production route and asset checks:

| Locale | Page | Expected video refs |
| --- | --- | --- |
| EN | 200 | `orthogonal-sets-orthonormal-bases-story-en.mp4`, `orthogonal-sets-orthonormal-bases-story-en.png` |
| zh-HK | 200 | `orthogonal-sets-orthonormal-bases-story-zh-hk.mp4`, `orthogonal-sets-orthonormal-bases-story-zh-hk.png` |
| zh-CN | 200 | `orthogonal-sets-orthonormal-bases-story-zh-cn.mp4`, `orthogonal-sets-orthonormal-bases-story-zh-cn.png` |

| Asset | HTTP | Content type | Bytes |
| --- | --- | --- | --- |
| EN mp4 | 200 | `video/mp4` | 683884 |
| EN png | 200 | `image/png` | 108334 |
| zh-HK mp4 | 200 | `video/mp4` | 618925 |
| zh-HK png | 200 | `image/png` | 91541 |
| zh-CN mp4 | 200 | `video/mp4` | 615995 |
| zh-CN png | 200 | `image/png` | 90303 |
