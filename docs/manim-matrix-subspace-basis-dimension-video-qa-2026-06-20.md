# Manim QA: MATH1030 6.7 Matrix Subspaces, Basis, And Dimension

Date: 2026-06-20

Branch: `codex/manim`

## Scope

Added a trilingual Manim `VideoExplanation` for
`math1030/vector-spaces/matrix-subspaces-basis-dimension`.

Public video id:

- `math1030-matrix-subspace-basis-dimension-story`

Rendered assets:

- `public/generated/animations/math1030/matrix-subspace-basis-dimension-story-en.mp4`
- `public/generated/animations/math1030/matrix-subspace-basis-dimension-story-en.png`
- `public/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-hk.mp4`
- `public/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-hk.png`
- `public/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-cn.mp4`
- `public/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-cn.png`

## Source Support

Repository source material supports the clip:

- `reference/MATH1030/1030gi-n05-07.pdf`, Section 5.7: basis and dimension
  for subspaces of matrices of the same size; matrix span; standard matrix
  units; bases for full matrix spaces, diagonal / upper triangular / symmetric
  / skew-symmetric matrix subspaces; vectorization as a bookkeeping dictionary;
  and dimension as the size of a basis.
- `reference/MATH1030/MATH1030-Notes.pdf`: transpose, symmetric and
  skew-symmetric matrices, upper triangular matrices, matrix spaces as vector
  spaces, and dimension.

The video intentionally stays narrow: it does not repeat the earlier basis /
dimension or rank clips, and it avoids determinant, invertibility,
orthogonality, rank-nullity, and SVD.

## Implementation

Files updated:

- `tools/animations/manim/scenes/math1030/matrix_subspaces_basis_dimension.py`
- `tools/animations/manim/scripts/render_scene.sh`
- `content/textbook/math1030/vector-spaces/matrix-subspaces-basis-dimension/storyboard.json`
- `content/textbook/math1030/vector-spaces/matrix-subspaces-basis-dimension/en.mdx`
- `content/textbook/math1030/vector-spaces/matrix-subspaces-basis-dimension/zh-hk.mdx`
- `content/textbook/math1030/vector-spaces/matrix-subspaces-basis-dimension/zh-cn.mdx`
- `src/lib/textbook/video-explanations.ts`
- `docs/video-explanation-implementation-roadmap.md`
- `docs/video-explanation-opportunity-audit.md`
- `docs/notes-improvement-tracker.md`
- `docs/interactive-component-behavior.md`

No new React widget was added. The source-backed learning move is recognizing
fixed-size matrices as vectors, identifying free parameters in constrained
matrix families, and splitting a general matrix into fixed basis matrices.
That sequence is clearer as article prose plus a curated video than as a
reader-controlled state tool.

## Render QA

Command:

```bash
bash tools/animations/manim/scripts/render_scene.sh MatrixSubspaceBasisDimensionStoryEn MatrixSubspaceBasisDimensionStoryZhHk MatrixSubspaceBasisDimensionStoryZhCn
```

Result:

- English, Traditional Chinese, and Simplified Chinese MP4s rendered.
- Posters regenerated for all three locales.
- Poster checks were reviewed for:
  - `public/generated/animations/math1030/matrix-subspace-basis-dimension-story-en.png`
  - `public/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-hk.png`
  - `public/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-cn.png`

Video metadata:

- EN: H.264, 854x480, 15 fps, 12.666344 seconds, 568210 bytes.
- zh-HK: H.264, 854x480, 15 fps, 12.666667 seconds, 604473 bytes.
- zh-CN: H.264, 854x480, 15 fps, 12.666667 seconds, 583694 bytes.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/matrix_subspaces_basis_dimension.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/vector-spaces/matrix-subspaces-basis-dimension/storyboard.json
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
  "assetRefs": 108,
  "uniqueAssets": 108,
  "videoGroups": 18,
  "missing": [],
  "incomplete": []
}
```

`npm run build` completed successfully. Contentlayer warned that 15 storyboard
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
NODE_PATH=/Users/evan/.npm/_npx/420ff84f11983ee5/node_modules node /private/tmp/matrix_subspace_video_qa.mjs
```

The ordinary sandboxed Chromium launch hit the known macOS Mach-port
permission failure, so the same script was rerun with non-sandboxed approval.

Passed scenarios:

- `en-light-desktop`
  - source `/generated/animations/math1030/matrix-subspace-basis-dimension-story-en.mp4`
  - poster `/generated/animations/math1030/matrix-subspace-basis-dimension-story-en.png`
  - source 200, poster 200, duration 12.666344, 854x480, playback advanced
    0.948 seconds, overflow 0.
- `en-dark-desktop`
  - source 200, poster 200, duration 12.666344, 854x480, playback advanced
    0.951 seconds, overflow 0.
- `zh-hk-light-mobile`
  - source `/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-hk.mp4`
  - poster `/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-hk.png`
  - source 200, poster 200, duration 12.666667, 854x480, playback advanced
    0.950 seconds, overflow 0.
- `zh-cn-light-desktop`
  - source `/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-cn.mp4`
  - poster `/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-cn.png`
  - source 200, poster 200, duration 12.666667, 854x480, playback advanced
    0.950 seconds, overflow 0.

Screenshots reviewed:

- `/tmp/my_websites_matrix_subspace_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_matrix_subspace_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_matrix_subspace_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_matrix_subspace_video_qa/zh-cn-light-desktop-video-block.png`

Export QA:

- EN TXT: 200, 8974 bytes.
- EN PDF: 200, 31914 bytes.
- zh-HK TXT: 200, 8253 bytes.
- zh-HK PDF: 200, 146662 bytes.
- zh-CN TXT: 200, 8184 bytes.
- zh-CN PDF: 200, 136383 bytes.
- Static video-study fallback text present.
- No `.mp4` or raw `<video>` leaked into TXT exports.

## Cleanup

Before commit, remove generated caches:

```bash
git restore .contentlayer/generated
rm -rf tools/animations/manim/.media
rm -rf tools/animations/manim/scenes/math1030/__pycache__
```
