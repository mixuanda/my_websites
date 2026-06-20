# Manim QA: MATH1030 6.6 Column Space, Row Space, And Rank

Date: 2026-06-20

Branch: `codex/manim`

## Scope

Added a trilingual Manim `VideoExplanation` for
`math1030/vector-spaces/column-space-row-space-rank`.

Public video id:

- `math1030-column-row-space-rank-story`

Rendered assets:

- `public/generated/animations/math1030/column-row-space-rank-story-en.mp4`
- `public/generated/animations/math1030/column-row-space-rank-story-en.png`
- `public/generated/animations/math1030/column-row-space-rank-story-zh-hk.mp4`
- `public/generated/animations/math1030/column-row-space-rank-story-zh-hk.png`
- `public/generated/animations/math1030/column-row-space-rank-story-zh-cn.mp4`
- `public/generated/animations/math1030/column-row-space-rank-story-zh-cn.png`

## Source Support

Repository source material supports the clip:

- `reference/MATH1030/MATH1030-Notes.pdf`, Section 6.6: column space,
  `C(A)=Span{A_1,...,A_n}`, `C(A)={Ax:x in R^n}`, pivot-column basis
  selection, row space, nonzero RREF rows as row-space basis, and
  `rank(A)=dim C(A)=dim R(A)`.
- `reference/MATH1030/1030gi-n05-04.pdf`: column space, row space, column rank,
  row rank, row-space preservation under row operations, and equality of rank,
  column rank, and row rank.

The video intentionally avoids determinant, SVD, orthogonality of fundamental
subspaces, and rank-nullity, because those are not needed for this narrow 6.6
clip.

## Implementation

Files updated:

- `tools/animations/manim/scenes/math1030/column_row_space_rank.py`
- `tools/animations/manim/scripts/render_scene.sh`
- `content/textbook/math1030/vector-spaces/column-space-row-space-rank/storyboard.json`
- `content/textbook/math1030/vector-spaces/column-space-row-space-rank/en.mdx`
- `content/textbook/math1030/vector-spaces/column-space-row-space-rank/zh-hk.mdx`
- `content/textbook/math1030/vector-spaces/column-space-row-space-rank/zh-cn.mdx`
- `src/lib/textbook/video-explanations.ts`
- `docs/video-explanation-implementation-roadmap.md`
- `docs/video-explanation-opportunity-audit.md`
- `docs/notes-improvement-tracker.md`
- `docs/interactive-component-behavior.md`

No new React widget was added. The page already includes a static map for the
worked example. The Manim clip is a curated static explanation of the same
source-backed rule: RREF gives pivot positions for column-space basis selection,
while nonzero RREF rows give the row-space basis directly.

## Render QA

Command:

```bash
bash tools/animations/manim/scripts/render_scene.sh ColumnRowSpaceRankStoryEn ColumnRowSpaceRankStoryZhHk ColumnRowSpaceRankStoryZhCn
```

Result:

- English, Traditional Chinese, and Simplified Chinese MP4s rendered.
- Posters regenerated for all three locales.
- Visual frame checks:
  - `/tmp/column_row_rank_frames/en-4-4.png`
  - `/tmp/column_row_rank_frames/zh-hk-6-8.png`
  - `/tmp/column_row_rank_frames/zh-cn-9-2.png`

Video metadata:

- EN: H.264, 854x480, 15 fps, 12.133333 seconds, 540987 bytes.
- zh-HK: H.264, 854x480, 15 fps, 12.133333 seconds, 513047 bytes.
- zh-CN: H.264, 854x480, 15 fps, 12.133333 seconds, 497001 bytes.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/column_row_space_rank.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/vector-spaces/column-space-row-space-rank/storyboard.json
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Catalog asset check passed:

```json
{
  "assetRefs": 102,
  "uniqueAssets": 102,
  "videoGroups": 17,
  "missing": [],
  "incomplete": []
}
```

`npm run build` completed successfully. Contentlayer warned that 14 storyboard
JSON files are skipped as non-document files; this is expected for the current
storyboard storage pattern.

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
node /private/tmp/column_row_space_rank_video_qa.mjs
```

The first ordinary Playwright run hit the known macOS Chromium Mach-port
sandbox failure, so the same command was rerun with escalated permissions.

Passed scenarios:

- `en-light-desktop`
  - source `/generated/animations/math1030/column-row-space-rank-story-en.mp4`
  - source 200, poster 200, duration 12.133333, 854x480, playback advanced
    0.902 seconds, overflow 0.
- `en-dark-desktop`
  - source 200, poster 200, duration 12.133333, 854x480, playback advanced
    0.902 seconds, overflow 0.
- `zh-hk-light-mobile`
  - source `/generated/animations/math1030/column-row-space-rank-story-zh-hk.mp4`
  - source 200, poster 200, duration 12.133333, 854x480, playback advanced
    0.901 seconds, overflow 0.
- `zh-cn-light-desktop`
  - source `/generated/animations/math1030/column-row-space-rank-story-zh-cn.mp4`
  - source 200, poster 200, duration 12.133333, 854x480, playback advanced
    0.902 seconds, overflow 0.

Screenshots reviewed:

- `/tmp/my_websites_column_row_space_rank_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_column_row_space_rank_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_column_row_space_rank_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_column_row_space_rank_video_qa/zh-cn-light-desktop-video-block.png`

Export QA:

- EN TXT: 200, 10182 bytes.
- EN PDF: 200, 33534 bytes.
- zh-HK TXT: 200, 9415 bytes.
- zh-HK PDF: 200, 159172 bytes.
- zh-CN TXT: 200, 9486 bytes.
- zh-CN PDF: 200, 145555 bytes.
- Static fallback text present.
- No `.mp4` or raw `<video>` leaked into TXT exports.

## Cleanup

Before commit, remove generated caches:

```bash
git restore .contentlayer/generated
rm -rf tools/animations/manim/.media
rm -rf tools/animations/manim/scenes/math1030/__pycache__
```
