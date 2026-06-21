# Manim QA: MATH1030 6.8 Basis Extension And Change Of Basis

Date: 2026-06-21

Branch: `codex/manim`

## Scope

Added a trilingual Manim `VideoExplanation` for
`math1030/vector-spaces/basis-extension-and-change-of-basis`.

Public video id:

- `math1030-basis-extension-change-of-basis-story`

Rendered assets:

- `public/generated/animations/math1030/basis-extension-change-of-basis-story-en.mp4`
- `public/generated/animations/math1030/basis-extension-change-of-basis-story-en.png`
- `public/generated/animations/math1030/basis-extension-change-of-basis-story-zh-hk.mp4`
- `public/generated/animations/math1030/basis-extension-change-of-basis-story-zh-hk.png`
- `public/generated/animations/math1030/basis-extension-change-of-basis-story-zh-cn.mp4`
- `public/generated/animations/math1030/basis-extension-change-of-basis-story-zh-cn.png`

## Source Support

Repository source material supports the clip:

- `reference/MATH1030/1030gi-n05-02r.pdf`: change-of-basis theorem, unique
  invertible `S`, `U=VS`, coordinate relation `b=Sa`, reverse conversion by
  `S^{-1}`, and the square full-space case `S=V^{-1}U`.
- `reference/MATH1030/1030gi-n05-02r.pdf`: proper-subspace plane example with
  `u_1=(2,1,1)^T`, `u_2=(0,-1,1)^T`, `v_1=(1,1,0)^T`,
  `v_2=(1,0,1)^T`, `u_1=v_1+v_2`, `u_2=-v_1+v_2`, and
  `S=[[1,-1],[1,1]]`.
- `reference/MATH1030/1030gi-n05-02q.pdf`: replacement theorem and dimension
  consequences as the surrounding basis-extension context.

The video intentionally stays narrow: it does not introduce diagonalization,
eigenbases, projections, orthogonality, or determinant-based invertibility.

## Implementation

Files updated:

- `tools/animations/manim/scenes/math1030/basis_extension_change_of_basis.py`
- `tools/animations/manim/scripts/render_scene.sh`
- `content/textbook/math1030/vector-spaces/basis-extension-and-change-of-basis/storyboard.json`
- `content/textbook/math1030/vector-spaces/basis-extension-and-change-of-basis/en.mdx`
- `content/textbook/math1030/vector-spaces/basis-extension-and-change-of-basis/zh-hk.mdx`
- `content/textbook/math1030/vector-spaces/basis-extension-and-change-of-basis/zh-cn.mdx`
- `src/lib/textbook/video-explanations.ts`
- `docs/video-explanation-implementation-roadmap.md`
- `docs/video-explanation-opportunity-audit.md`
- `docs/notes-improvement-tracker.md`
- `docs/interactive-component-behavior.md`

No new React widget was added. The source-backed learning move is a fixed
theorem/example bridge: express each `U`-basis vector in the `V`-basis,
package those coordinate columns as `S`, read `U=VS`, convert `[x]_U` into
`[x]_V`, and use `S^{-1}` only for the reverse direction.

## Render QA

Command:

```bash
bash tools/animations/manim/scripts/render_scene.sh BasisExtensionChangeOfBasisStoryEn BasisExtensionChangeOfBasisStoryZhHk BasisExtensionChangeOfBasisStoryZhCn
```

Result:

- English, Traditional Chinese, and Simplified Chinese MP4s rendered.
- Posters regenerated for all three locales.
- Poster checks were reviewed for:
  - `public/generated/animations/math1030/basis-extension-change-of-basis-story-en.png`
  - `public/generated/animations/math1030/basis-extension-change-of-basis-story-zh-hk.png`
  - `public/generated/animations/math1030/basis-extension-change-of-basis-story-zh-cn.png`
- Additional mid-video frames were sampled from the rendered MP4s to check the
  coordinate-conversion and reverse-direction scenes.

Video metadata from browser playback:

- EN: H.264, 854x480, 15 fps, 12.666667 seconds, 524063 bytes.
- zh-HK: H.264, 854x480, 15 fps, 12.666667 seconds, 512706 bytes.
- zh-CN: H.264, 854x480, 15 fps, 12.666667 seconds, 503525 bytes.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/basis_extension_change_of_basis.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/vector-spaces/basis-extension-and-change-of-basis/storyboard.json
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
  "assetRefs": 114,
  "uniqueAssets": 114,
  "videoGroups": 19,
  "missing": [],
  "incomplete": []
}
```

`npm run build` completed successfully. Contentlayer warned that 16 storyboard
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
NODE_PATH=/Users/evan/.npm/_npx/420ff84f11983ee5/node_modules node /private/tmp/basis_extension_change_of_basis_video_qa.mjs
```

The ordinary sandboxed Chromium launch hit the known macOS Mach-port
permission failure, so the same script was rerun with non-sandboxed approval.

Passed scenarios:

- `en-light-desktop`
  - source `/generated/animations/math1030/basis-extension-change-of-basis-story-en.mp4`
  - poster `/generated/animations/math1030/basis-extension-change-of-basis-story-en.png`
  - source 200, poster 200, duration 12.666667, 854x480, playback advanced
    0.948877 seconds, overflow 0.
- `en-dark-desktop`
  - source 200, poster 200, duration 12.666667, 854x480, playback advanced
    0.949667 seconds, overflow 0.
- `zh-hk-light-mobile`
  - source `/generated/animations/math1030/basis-extension-change-of-basis-story-zh-hk.mp4`
  - poster `/generated/animations/math1030/basis-extension-change-of-basis-story-zh-hk.png`
  - source 200, poster 200, duration 12.666667, 854x480, playback advanced
    0.949916 seconds, overflow 0.
- `zh-cn-light-desktop`
  - source `/generated/animations/math1030/basis-extension-change-of-basis-story-zh-cn.mp4`
  - poster `/generated/animations/math1030/basis-extension-change-of-basis-story-zh-cn.png`
  - source 200, poster 200, duration 12.666667, 854x480, playback advanced
    0.950798 seconds, overflow 0.

Screenshots reviewed:

- `/tmp/my_websites_basis_extension_change_of_basis_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_basis_extension_change_of_basis_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_basis_extension_change_of_basis_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_basis_extension_change_of_basis_video_qa/zh-cn-light-desktop-video-block.png`

Export QA:

- EN TXT: 200, 13023 bytes.
- EN PDF: 200, 39311 bytes.
- zh-HK TXT: 200, 11706 bytes.
- zh-HK PDF: 200, 172757 bytes.
- zh-CN TXT: 200, 11688 bytes.
- zh-CN PDF: 200, 160060 bytes.
- Static video-study fallback text present.
- No `.mp4` or raw `<video>` leaked into TXT exports.

## Cleanup

Before commit, remove generated caches:

```bash
git restore .contentlayer/generated
rm -rf tools/animations/manim/.media
rm -rf tools/animations/manim/scenes/math1030/__pycache__
```
