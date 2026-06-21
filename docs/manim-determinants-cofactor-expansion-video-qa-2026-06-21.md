# Manim QA: MATH1030 7.1 Determinants And Cofactor Expansion

Date: 2026-06-21

Branch: `codex/manim`

## Scope

Added a trilingual Manim `VideoExplanation` for
`math1030/determinants/determinants-and-cofactor-expansion`.

Public video id:

- `math1030-determinants-cofactor-expansion-story`

Rendered assets:

- `public/generated/animations/math1030/determinants-cofactor-expansion-story-en.mp4`
- `public/generated/animations/math1030/determinants-cofactor-expansion-story-en.png`
- `public/generated/animations/math1030/determinants-cofactor-expansion-story-zh-hk.mp4`
- `public/generated/animations/math1030/determinants-cofactor-expansion-story-zh-hk.png`
- `public/generated/animations/math1030/determinants-cofactor-expansion-story-zh-cn.mp4`
- `public/generated/animations/math1030/determinants-cofactor-expansion-story-zh-cn.png`

## Source Support

Repository source material supports the clip:

- `reference/MATH1030/MATH1030-Notes.pdf`: determinant motivation,
  2-by-2 determinant, minor/cofactor notation, cofactor expansion along the
  first row, expansion along any row or column, zero-pruning strategy, zero
  row/column theorem, and triangular determinant product.
- `reference/MATH1030/MATH1030-Notes.pdf`: examples 7.1.1 and 7.1.2,
  including the 3-by-3 matrix
  `[[3, 2, -1], [4, 1, 6], [-3, -1, 2]]` with determinant `-27`.
- `reference/MATH1030/1030gi-n06-01.pdf`: submatrix deletion, inductive
  determinant definition, arbitrary-row expansion theorem, zero row/column
  result, one-nonzero row/column collapse, and triangular determinant theorem.

The video intentionally stays narrow. It does not introduce determinant row
operation rules, multiplicativity, adjugates, Cramer's rule, eigenvalues, or
geometric area/volume interpretations.

## Implementation

Files updated:

- `tools/animations/manim/scenes/math1030/determinants_cofactor_expansion.py`
- `tools/animations/manim/scripts/render_scene.sh`
- `content/textbook/math1030/determinants/determinants-and-cofactor-expansion/storyboard.json`
- `content/textbook/math1030/determinants/determinants-and-cofactor-expansion/en.mdx`
- `content/textbook/math1030/determinants/determinants-and-cofactor-expansion/zh-hk.mdx`
- `content/textbook/math1030/determinants/determinants-and-cofactor-expansion/zh-cn.mdx`
- `src/lib/textbook/video-explanations.ts`
- `docs/video-explanation-implementation-roadmap.md`
- `docs/video-explanation-opportunity-audit.md`
- `docs/notes-improvement-tracker.md`
- `docs/interactive-component-behavior.md`

No new React widget was added. The source-backed learning move is a fixed
animated proof/computation path: delete one row and one column, attach the
checkerboard sign, expand into signed branches, prune zero branches, collapse
one-nonzero rows/columns, and recognize triangular diagonal products.

## Render QA

Command:

```bash
bash tools/animations/manim/scripts/render_scene.sh DeterminantsCofactorExpansionStoryEn DeterminantsCofactorExpansionStoryZhHk DeterminantsCofactorExpansionStoryZhCn
```

Result:

- English, Traditional Chinese, and Simplified Chinese MP4s rendered.
- Posters regenerated for all three locales.
- Poster checks were reviewed for:
  - `public/generated/animations/math1030/determinants-cofactor-expansion-story-en.png`
  - `public/generated/animations/math1030/determinants-cofactor-expansion-story-zh-hk.png`
  - `public/generated/animations/math1030/determinants-cofactor-expansion-story-zh-cn.png`
- Additional stable frames were sampled from the rendered MP4s:
  - `/private/tmp/determinants-cofactor-en-3p8s.png`
  - `/private/tmp/determinants-cofactor-zh-hk-7p5s.png`
  - `/private/tmp/determinants-cofactor-zh-cn-11p2s.png`

Video metadata from browser playback:

- EN: H.264, 854x480, 15 fps, 14.266667 seconds, 587887 bytes.
- zh-HK: H.264, 854x480, 15 fps, 14.266667 seconds, 542110 bytes.
- zh-CN: H.264, 854x480, 15 fps, 14.266667 seconds, 532260 bytes.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/determinants_cofactor_expansion.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/determinants/determinants-and-cofactor-expansion/storyboard.json
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
npm run check:textbook-content
```

Catalog asset check passed:

```json
{
  "assetRefs": 120,
  "uniqueAssets": 120,
  "videoGroups": 20,
  "missing": [],
  "incomplete": []
}
```

`npm run build` completed successfully. Contentlayer warned that 17 storyboard
JSON files are skipped as non-document files; this is expected for the current
storyboard storage pattern after adding this new storyboard.

`npm run check:textbook-content` exited 0 and checked 243 units with required
structure present. It still reports 379 existing repository-wide depth and
article-shape warnings.

## Browser And Export QA

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Playwright command:

```bash
NODE_PATH=/Users/evan/.npm/_npx/420ff84f11983ee5/node_modules node /private/tmp/determinants_cofactor_video_qa.mjs
```

The Browser plugin was not available in this runtime, so Playwright was used
as the browser QA fallback. The ordinary sandboxed Chromium launch hit the
known macOS Mach-port permission failure, so the same script was rerun with
non-sandboxed approval.

Passed scenarios:

- `en-light-desktop`
  - source `/generated/animations/math1030/determinants-cofactor-expansion-story-en.mp4`
  - poster `/generated/animations/math1030/determinants-cofactor-expansion-story-en.png`
  - source 200, poster 200, duration 14.266667, 854x480, playback advanced
    0.945510 seconds, overflow 0.
- `en-dark-desktop`
  - source 200, poster 200, duration 14.266667, 854x480, playback advanced
    0.948495 seconds, overflow 0.
- `zh-hk-light-mobile`
  - source `/generated/animations/math1030/determinants-cofactor-expansion-story-zh-hk.mp4`
  - poster `/generated/animations/math1030/determinants-cofactor-expansion-story-zh-hk.png`
  - source 200, poster 200, duration 14.266667, 854x480, playback advanced
    0.947725 seconds, overflow 0.
- `zh-cn-light-desktop`
  - source `/generated/animations/math1030/determinants-cofactor-expansion-story-zh-cn.mp4`
  - poster `/generated/animations/math1030/determinants-cofactor-expansion-story-zh-cn.png`
  - source 200, poster 200, duration 14.266667, 854x480, playback advanced
    0.949324 seconds, overflow 0.

Screenshots reviewed:

- `/tmp/my_websites_determinants_cofactor_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_determinants_cofactor_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_determinants_cofactor_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_determinants_cofactor_video_qa/zh-cn-light-desktop-video-block.png`

Export QA:

- EN TXT: 200, 11944 bytes.
- EN PDF: 200, 40120 bytes.
- zh-HK TXT: 200, 11002 bytes.
- zh-HK PDF: 200, 175581 bytes.
- zh-CN TXT: 200, 11002 bytes.
- zh-CN PDF: 200, 161653 bytes.
- Static video-study fallback text present.
- No `.mp4` or raw `<video>` leaked into TXT exports.

## Cleanup

Before commit, remove generated caches:

```bash
git restore .contentlayer/generated
rm -rf tools/animations/manim/.media
rm -rf tools/animations/manim/scenes/math1030/__pycache__
```
