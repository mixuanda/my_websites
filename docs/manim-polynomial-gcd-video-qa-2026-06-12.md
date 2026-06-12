# Manim Polynomial GCD Video QA - 2026-06-12

## Scope

- Unit: Math1025 `8.2 Polynomial gcds and irreducibility`
- Public video id: `math1025-polynomial-gcd-irreducibility-story`
- Scene source:
  `tools/animations/manim/scenes/math1025/polynomial_gcds.py`
- Storyboard:
  `content/textbook/math1025/polynomial-methods/polynomial-gcds-and-irreducibility/storyboard.json`
- Page embeds:
  - `content/textbook/math1025/polynomial-methods/polynomial-gcds-and-irreducibility/en.mdx`
  - `content/textbook/math1025/polynomial-methods/polynomial-gcds-and-irreducibility/zh-hk.mdx`
  - `content/textbook/math1025/polynomial-methods/polynomial-gcds-and-irreducibility/zh-cn.mdx`
- Mode decision: Manim only. No new widget was added because this unit is
  theorem-led; `docs/interactive-component-behavior.md` keeps 8.2 out of the
  reader-controlled widget category.

## Source Support

The read-only scout and local source inspection found sufficient support in:

- `docs/video-explanation-implementation-roadmap.md`
- `docs/reference-coverage.md`
- `docs/chapter-coverage-map.md`
- `docs/extracted/math1025/MATH1025_slides_ch8.txt`
- current 8.2 localized MDX files

The video covers:

- polynomial gcds as monic representatives of associate common divisors;
- the Euclidean invariant `gcd(f,g)=gcd(g,r)`;
- the source-backed Example 8.2 remainder chain:
  `r1=-6x^2-3x+9`, `r2=-x+1`, then `0`;
- normalization of `-x+1` to `x-1`;
- Bézout back-substitution;
- irreducibility depending on the coefficient field;
- the prime-like divisibility step for irreducible polynomials.

The page-level Bézout display was also corrected in all three locales to add
the source-backed `+ (... )g(x)` term.

## Rendered Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh PolynomialGcdIrreducibilityStoryEn PolynomialGcdIrreducibilityStoryZhHk PolynomialGcdIrreducibilityStoryZhCn
```

Final ffprobe check:

| Locale | MP4 | Codec | Size | Duration |
| --- | --- | --- | --- | --- |
| EN | `public/generated/animations/math1025/polynomial-gcd-irreducibility-story-en.mp4` | H.264, 854x480 | 746983 bytes | 15.865044s |
| zh-HK | `public/generated/animations/math1025/polynomial-gcd-irreducibility-story-zh-hk.mp4` | H.264, 854x480 | 721249 bytes | 15.865000s |
| zh-CN | `public/generated/animations/math1025/polynomial-gcd-irreducibility-story-zh-cn.mp4` | H.264, 854x480 | 714657 bytes | 15.865044s |

Localized posters were generated beside each MP4.

## Visual QA

Frames inspected under `/private/tmp/my_websites_polynomial_gcd_video_qa/`:

- `en-poster-frame-final.png`
- `en-invariant-final.png`
- `zh-hk-chain-final.png`
- `zh-hk-bezout-final.png`
- `zh-cn-field-final.png`
- `en-summary-final.png`
- poster file:
  `public/generated/animations/math1025/polynomial-gcd-irreducibility-story-en.png`

Fixes made after visual QA:

- separated the associate / monic-gcd cards on the poster frame;
- simplified the Euclidean-invariant arrows so they no longer cross text;
- lifted the remainder-chain visual away from the explanatory card;
- narrowed and spaced Bézout coefficient cards to avoid border collisions;
- widened the coefficient-field comparison layout so the `Q/R/C` cards no
  longer touch.

## Static Checks

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1025/polynomial_gcds.py
python3 -m json.tool content/textbook/math1025/polynomial-methods/polynomial-gcds-and-irreducibility/storyboard.json
bash -n tools/animations/manim/scripts/render_scene.sh
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build note: Contentlayer skipped 12 `storyboard.json` files as expected. The
new polynomial-gcd storyboard accounts for the count increasing from 11 to 12.

## Browser And Export QA

Browser plugin was not available, so QA used Playwright fallback. The checkout
did not have Playwright installed in `node_modules`; QA used a temporary
`npx @playwright/test` runner without changing `package.json`.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Final Playwright command:

```bash
NODE_PATH=/Users/evan/.npm/_npx/420ff84f11983ee5/node_modules npx @playwright/test test --config=/private/tmp/polynomial_gcd_pw.config.js --reporter=line
```

Validated pages:

| Surface | Theme / viewport | Result |
| --- | --- | --- |
| `/en/notes/math1025/polynomial-methods/polynomial-gcds-and-irreducibility` | light desktop 1440x1050 | localized title, poster, source, playback, no horizontal overflow |
| `/en/notes/math1025/polynomial-methods/polynomial-gcds-and-irreducibility` | dark desktop 1440x1050 | dark class applied; poster, source, playback, no horizontal overflow |
| `/zh-hk/notes/math1025/polynomial-methods/polynomial-gcds-and-irreducibility` | light mobile 390x900 | localized title, zh-HK poster/source, playback, no horizontal overflow |
| `/zh-cn/notes/math1025/polynomial-methods/polynomial-gcds-and-irreducibility` | light desktop 1280x900 | localized title, zh-CN poster/source, playback, no horizontal overflow |

Playback metrics:

| Surface | Poster | Source | Duration | Playback delta | Intrinsic size |
| --- | --- | --- | --- | --- | --- |
| EN light | `...-en.png` | `...-en.mp4` | 15.865044s | 0.899863s | 854x480 |
| EN dark | `...-en.png` | `...-en.mp4` | 15.865044s | 0.900238s | 854x480 |
| zh-HK mobile | `...-zh-hk.png` | `...-zh-hk.mp4` | 15.865000s | 0.900414s | 854x480 |
| zh-CN light | `...-zh-cn.png` | `...-zh-cn.mp4` | 15.865044s | 0.900139s | 854x480 |

Local console note: `/_vercel/insights/script.js` returns 404 under
`next start`; this is the local Vercel Analytics script and is unrelated to the
video, poster, page route, or export route.

Export checks:

| Locale | TXT | PDF | Static fallback |
| --- | --- | --- | --- |
| EN | 200, 13585 chars | 200, 39387 bytes | video snapshot title present; `x-1` and `ua+vp=1` present; `.mp4` absent |
| zh-HK | 200, 6000 chars | 200, 163888 bytes | video snapshot title present; `x-1` and `ua+vp=1` present; `.mp4` absent |
| zh-CN | 200, 5998 chars | 200, 152313 bytes | video snapshot title present; `x-1` and `ua+vp=1` present; `.mp4` absent |

Screenshots saved by the Playwright script:

- `/private/tmp/my_websites_polynomial_gcd_video_qa/en-light-desktop.png`
- `/private/tmp/my_websites_polynomial_gcd_video_qa/en-dark-desktop.png`
- `/private/tmp/my_websites_polynomial_gcd_video_qa/zh-hk-light-mobile.png`
- `/private/tmp/my_websites_polynomial_gcd_video_qa/zh-cn-light-desktop.png`

## Outcome

Passed. The page remains article-first, the video is localized in all three
language modes, playback works from generated MP4/poster assets, no new widget
was added, the source-backed Bézout formula is corrected, and TXT/PDF exports
degrade the video into static study material rather than linking to MP4 files.
