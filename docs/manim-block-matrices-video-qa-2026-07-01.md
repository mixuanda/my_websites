# MATH1030 Block Matrices Video QA

Date: 2026-07-01

Scope: Math1030 `3.5 Block matrices`.

Video id: `math1030-block-matrix-partition-product-story`.

## Source Boundary

Reviewed source material:

- `reference/MATH1030/MATH1030-Notes.pdf` §3.5 pp. 57-61.
- `reference/MATH1030/1030gi-n01-01.pdf` pp. 5-6.
- `reference/MATH1030/1030gi-n01-02.pdf` pp. 1-2.
- `reference/MATH1030/1030gi-n01-se0102.pdf` pp. 1 and 4.

Included in the clip:

- horizontal and vertical partition cuts;
- block sizes `m_i` and `p_j`;
- same-partition requirement for blockwise addition;
- scalar multiplication by blocks;
- 2 by 2 block multiplication formula;
- compatibility check for every `A_ik B_kj`;
- brief column-block bridge.

Deferred intentionally:

- solving `AX=B` by columns beyond a light bridge;
- homogeneous systems and null-space geometry;
- invertibility, row equivalence, and inverse computations;
- broader matrix identity and matrix-power exercises.

## Assets

Generated files:

- `public/generated/animations/math1030/block-matrix-partition-product-story-en.mp4`
- `public/generated/animations/math1030/block-matrix-partition-product-story-en.png`
- `public/generated/animations/math1030/block-matrix-partition-product-story-zh-hk.mp4`
- `public/generated/animations/math1030/block-matrix-partition-product-story-zh-hk.png`
- `public/generated/animations/math1030/block-matrix-partition-product-story-zh-cn.mp4`
- `public/generated/animations/math1030/block-matrix-partition-product-story-zh-cn.png`

Media metadata:

| Locale | MP4 size | Poster size | Duration | Dimensions |
| --- | ---: | ---: | ---: | --- |
| EN | 479535 bytes | 77200 bytes | 9.333s | 854 x 480 |
| zh-HK | 461214 bytes | 72928 bytes | 9.333s | 854 x 480 |
| zh-CN | 454331 bytes | 72457 bytes | 9.333s | 854 x 480 |

Poster extraction uses `2.85s`, which lands on the stable same-partition
addition frame. Visual inspection of EN / zh-HK / zh-CN posters showed no
crossfade residue, text overflow, or matrix-label overlap after shortening the
subtitle text.

## Local Verification

Static checks passed:

- `python3 -m py_compile tools/animations/manim/scenes/math1030/block_matrices.py`
- `python3 -m json.tool content/textbook/math1030/matrix-algebra/block-matrices/storyboard.json`
- `bash -n tools/animations/manim/scripts/render_scene.sh`
- `git diff --check`
- `npm run verify:mdx-tables`
- `npx tsc --noEmit --pretty false`
- `npm run lint`
- `npm run check:textbook-content`
- `AUTH_SECRET=local-test-secret npm run build`

Manim render passed:

- `npm run animation:manim:render -- BlockMatrixPartitionProductStoryEn BlockMatrixPartitionProductStoryZhHk BlockMatrixPartitionProductStoryZhCn`

Browser QA through the in-app Browser against
`http://127.0.0.1:3000` passed for:

| Locale | Route | Video count | Video size | Mobile size | Overflow | Console errors |
| --- | --- | ---: | --- | --- | ---: | --- |
| EN | `/en/notes/math1030/matrix-algebra/block-matrices` | 1 | 560 x 315 | 306 x 172 | 0 | 0 |
| zh-HK | `/zh-hk/notes/math1030/matrix-algebra/block-matrices` | 1 | 560 x 315 | 306 x 172 | 0 | 0 |
| zh-CN | `/zh-cn/notes/math1030/matrix-algebra/block-matrices` | 1 | 560 x 315 | 306 x 172 | 0 | 0 |

Each route exposed the expected locale-specific MP4 and PNG:

- `block-matrix-partition-product-story-en`
- `block-matrix-partition-product-story-zh-hk`
- `block-matrix-partition-product-story-zh-cn`

The video card is embedded after the partition-motivation section and before
the worked example. No quick-check, exercise, or reveal-solution block was
reordered.

## Export QA

Local TXT/PDF checks passed for:

- `/api/textbook-export/en/math1030/matrix-algebra/block-matrices`
- `/api/textbook-export/en/math1030/matrix-algebra/block-matrices/pdf`
- `/api/textbook-export/zh-hk/math1030/matrix-algebra/block-matrices`
- `/api/textbook-export/zh-hk/math1030/matrix-algebra/block-matrices/pdf`
- `/api/textbook-export/zh-cn/math1030/matrix-algebra/block-matrices`
- `/api/textbook-export/zh-cn/math1030/matrix-algebra/block-matrices/pdf`

TXT exports contain the localized static video-study sequence markers:

- `[Static video-study sequence] Block partitions and products`
- `[靜態影片學習序列] 分塊與分塊乘積`
- `[静态视频学习序列] 分块与分块乘积`

TXT exports do not leak raw `<video>`, `.mp4`, poster attributes, or the
internal video id. PDF exports returned valid `%PDF` headers.

## Production Verification

Pending. Complete after the branch is pushed and the production deployment for
`www.evanalysis.top` is ready.
