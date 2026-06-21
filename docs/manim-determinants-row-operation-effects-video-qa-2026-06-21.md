# Manim QA: MATH1030 7.2 Row Operations, Products, And Invertibility

Date: 2026-06-21

Branch: `codex/manim`

## Scope

Added a trilingual Manim `VideoExplanation` for
`math1030/determinants/row-operations-products-and-invertibility`.

Public video id:

- `math1030-determinants-row-operation-effects-story`

Rendered assets:

- `public/generated/animations/math1030/determinants-row-operation-effects-story-en.mp4`
- `public/generated/animations/math1030/determinants-row-operation-effects-story-en.png`
- `public/generated/animations/math1030/determinants-row-operation-effects-story-zh-hk.mp4`
- `public/generated/animations/math1030/determinants-row-operation-effects-story-zh-hk.png`
- `public/generated/animations/math1030/determinants-row-operation-effects-story-zh-cn.mp4`
- `public/generated/animations/math1030/determinants-row-operation-effects-story-zh-cn.png`

## Source Support

Repository source material supports the clip:

- `reference/MATH1030/MATH1030-Notes.pdf`: Theorem 7.2.7 gives the three
  determinant effects of elementary row operations: row swaps change sign,
  scaling one row multiplies the determinant by the same scalar, and row
  replacement preserves the determinant.
- `reference/MATH1030/MATH1030-Notes.pdf`: Example 7.2.2 uses row operations
  to compute a 4-by-4 determinant and models the required bookkeeping.
- `reference/MATH1030/1030gi-n06-02.pdf`: row-operation matrix framing,
  determinant computation by row reduction, a nonzero 3-by-3 determinant
  example, a zero-row singular example, and the algorithmic correction for
  row swaps and row scalings.
- `reference/MATH1030/MATH1030-Notes.pdf`: Theorems 7.2.8, 7.2.9, 7.2.10,
  and 7.2.11 connect elementary matrices, determinant products,
  invertibility, and inverse determinants.

The video intentionally stays within Section 7.2. It does not repeat 7.1
cofactor expansion, minors, checkerboard signs, or zero-branch pruning, and it
does not introduce 7.3 adjugates, Cramer's rule, or transpose/column-operation
material.

## Implementation

Files updated:

- `tools/animations/manim/scenes/math1030/determinants_row_operation_effects.py`
- `tools/animations/manim/scripts/render_scene.sh`
- `content/textbook/math1030/determinants/row-operations-products-and-invertibility/storyboard.json`
- `content/textbook/math1030/determinants/row-operations-products-and-invertibility/en.mdx`
- `content/textbook/math1030/determinants/row-operations-products-and-invertibility/zh-hk.mdx`
- `content/textbook/math1030/determinants/row-operations-products-and-invertibility/zh-cn.mdx`
- `src/lib/textbook/video-explanations.ts`
- `docs/video-explanation-implementation-roadmap.md`
- `docs/video-explanation-opportunity-audit.md`
- `docs/notes-improvement-tracker.md`
- `docs/interactive-component-behavior.md`

No new React widget was added. The source-backed learning move is a fixed
animated ledger: row-operation multipliers, a row-swap sign correction, a
row-replacement triangular computation, a scaling correction, the
elementary-matrix product bridge, and the determinant-invertibility test.

## Render QA

Command:

```bash
bash tools/animations/manim/scripts/render_scene.sh DeterminantsRowOperationEffectsStoryEn DeterminantsRowOperationEffectsStoryZhHk DeterminantsRowOperationEffectsStoryZhCn
```

Result:

- English, Traditional Chinese, and Simplified Chinese MP4s rendered.
- Posters regenerated for all three locales.
- The render script now uses a stable `1.0` second poster timestamp for this
  scene so the public poster does not land on a row-operation transition frame.
- Poster checks were reviewed for:
  - `public/generated/animations/math1030/determinants-row-operation-effects-story-en.png`
  - `public/generated/animations/math1030/determinants-row-operation-effects-story-zh-hk.png`
  - `public/generated/animations/math1030/determinants-row-operation-effects-story-zh-cn.png`
- Additional stable frames were sampled from the rendered MP4s:
  - `/private/tmp/row-op-zh-hk-5p0.png`
  - `/private/tmp/row-op-zh-cn-7p4.png`
  - `/private/tmp/row-op-en-9p5.png`

Video metadata:

- EN: H.264, 854x480, 15 fps, 11.400000 seconds, 604925 bytes.
- zh-HK: H.264, 854x480, 15 fps, 11.400000 seconds, 566987 bytes.
- zh-CN: H.264, 854x480, 15 fps, 11.400000 seconds, 561101 bytes.

Poster sizes after regeneration:

- EN: 89763 bytes.
- zh-HK: 79167 bytes.
- zh-CN: 78374 bytes.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/determinants_row_operation_effects.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/determinants/row-operations-products-and-invertibility/storyboard.json
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
  "assetRefs": 126,
  "uniqueAssets": 126,
  "videoGroups": 21,
  "missing": [],
  "incomplete": []
}
```

`npm run build` completed successfully. Contentlayer warned that 18 storyboard
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
node /private/tmp/row_operation_effects_video_qa.mjs
```

The Browser plugin was not available in this runtime, so Playwright was used
as the browser QA fallback. The ordinary sandboxed Chromium launch hit the
known macOS Mach-port permission failure, so the same script was rerun with
non-sandboxed approval.

Passed scenarios:

- `en-light-desktop`
  - source `/generated/animations/math1030/determinants-row-operation-effects-story-en.mp4`
  - poster `/generated/animations/math1030/determinants-row-operation-effects-story-en.png`
  - page 200, duration 11.4, 854x480, playback advanced to 0.899526 seconds,
    overflow 0.
- `en-dark-desktop`
  - source `/generated/animations/math1030/determinants-row-operation-effects-story-en.mp4`
  - poster `/generated/animations/math1030/determinants-row-operation-effects-story-en.png`
  - page 200, duration 11.4, 854x480, playback advanced to 0.900220 seconds,
    overflow 0.
- `zh-hk-light-mobile`
  - source `/generated/animations/math1030/determinants-row-operation-effects-story-zh-hk.mp4`
  - poster `/generated/animations/math1030/determinants-row-operation-effects-story-zh-hk.png`
  - page 200, duration 11.4, 854x480, playback advanced to 0.899729 seconds,
    overflow 0.
- `zh-cn-light-desktop`
  - source `/generated/animations/math1030/determinants-row-operation-effects-story-zh-cn.mp4`
  - poster `/generated/animations/math1030/determinants-row-operation-effects-story-zh-cn.png`
  - page 200, duration 11.4, 854x480, playback advanced to 0.899926 seconds,
    overflow 0.

Screenshots reviewed:

- `/private/tmp/row-operation-effects-en-light-desktop.png`
- `/private/tmp/row-operation-effects-en-dark-desktop.png`
- `/private/tmp/row-operation-effects-zh-hk-light-mobile.png`
- `/private/tmp/row-operation-effects-zh-cn-light-desktop.png`

The only repeated failed response was
`404 http://localhost:3010/_vercel/insights/script.js`, which is expected when
Vercel Analytics is loaded under local `next start` rather than a Vercel
deployment. It did not block page rendering, video loading, or export checks.

Export QA:

- EN TXT: 200, 10640 bytes.
- EN PDF: 200, 37944 bytes.
- zh-HK TXT: 200, 9638 bytes.
- zh-HK PDF: 200, 167594 bytes.
- zh-CN TXT: 200, 9644 bytes.
- zh-CN PDF: 200, 154890 bytes.
- Static video-study fallback text present.
- No `.mp4` or raw `<video>` leaked into TXT exports.

## Cleanup

Before commit, remove generated caches:

```bash
git restore .contentlayer/generated
rm -rf tools/animations/manim/.media
rm -rf tools/animations/manim/scenes/math1030/__pycache__
```
