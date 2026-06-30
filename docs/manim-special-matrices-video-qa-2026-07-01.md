# Manim QA: MATH1030 3.4 Special Matrices

Date: 2026-07-01
Branch: `codex/manim`
Unit: `math1030/matrix-algebra/special-matrices`
Video id: `math1030-special-matrices-family-recognition-story`

## Scope

Added a trilingual Manim video for MATH1030 3.4 and embedded it in the EN,
zh-HK, and zh-CN `special-matrices` notes after the definitions and before the
existing `matrix-family-checker`.

Source-backed boundary:

- `reference/MATH1030/MATH1030-Notes.pdf` §3.4 pp. 51-56.
- `reference/MATH1030/Practice Set 3_Matrix Algebra and Linear Equation System.pdf`
  questions 9-11.

Included: diagonal matrices, triangular matrices, identity matrices, diagonal
and triangular product closure, elementary matrices from one row operation on
`I`, and the row / column effect of multiplying by an elementary matrix.

Deferred: symmetric / skew-symmetric transpose theory, block matrices,
invertibility consequences, and longer row-operation matrix products.

## Assets

- `public/generated/animations/math1030/special-matrices-family-recognition-story-en.mp4`
- `public/generated/animations/math1030/special-matrices-family-recognition-story-zh-hk.mp4`
- `public/generated/animations/math1030/special-matrices-family-recognition-story-zh-cn.mp4`
- matching localized poster PNG files.

Media check:

- EN MP4: 9.799678s, 434880 bytes.
- zh-HK MP4: 9.799678s, 419727 bytes.
- zh-CN MP4: 9.799678s, 419523 bytes.
- Generated animation directory size after render: `63M`.

Poster QA note: the first render was readable but had dense English text in
the bottom card. The scene text was shortened, the state card enlarged, and
all three locales were re-rendered. Final posters show stable diagonal-product
frames without transition residue.

## Local Verification

| Check | Result |
| --- | --- |
| `python3 -m py_compile tools/animations/manim/scenes/math1030/special_matrices.py` | Pass |
| Storyboard JSON parse | Pass |
| `bash -n tools/animations/manim/scripts/render_scene.sh` | Pass |
| `git diff --check` | Pass |
| `npm run verify:mdx-tables` | Pass |
| `npx tsc --noEmit --pretty false` | Pass |
| `npm run lint` | Pass |
| `npm run check:textbook-content` | Pass with existing global warnings; command exited 0 |
| `AUTH_SECRET=local-test-secret npm run build` | Pass |
| Manim render for EN / zh-HK / zh-CN | Pass |
| In-app Browser EN desktop route | Pass |
| In-app Browser dark mode | Pass |
| In-app Browser zh-CN mobile 390 x 844 | Pass |
| In-app Browser zh-HK asset route | Pass |
| EN / zh-HK / zh-CN TXT export | Pass |
| EN / zh-HK / zh-CN PDF export | Pass |

## Browser QA

Local URL:
`http://127.0.0.1:3000/en/notes/math1030/matrix-algebra/special-matrices`

Browser checks:

- Page identity: `3.4 Special matrices | Evanalysis`.
- Framework overlay: none detected.
- Console errors / warnings: none after route checks.
- Video count: 1.
- EN video source:
  `/generated/animations/math1030/special-matrices-family-recognition-story-en.mp4`.
- EN poster:
  `/generated/animations/math1030/special-matrices-family-recognition-story-en.png`.
- zh-HK video source:
  `/generated/animations/math1030/special-matrices-family-recognition-story-zh-hk.mp4`.
- zh-CN video source:
  `/generated/animations/math1030/special-matrices-family-recognition-story-zh-cn.mp4`.
- Mobile width: `390`; `scrollWidth == clientWidth == 390`.
- Dark mode: `html.dark` active, no horizontal overflow, video visible.

Interaction checks:

- Clicked `Neither` in `matrix-family-checker`; page showed the expected
  "transpose is different, but it is not the negative either" verdict.
- Clicked `Next step` in `row-reduction-stepper`; stepper advanced to the next
  row-operation state and preserved visible step numbers.

Screenshot evidence saved outside the repo:

- `/tmp/special-matrices-video-desktop-en.jpg`
- `/tmp/special-matrices-video-dark-en.jpg`
- `/tmp/special-matrices-mobile-zh-cn.jpg`

## Export QA

TXT/PDF endpoints checked for all three locales:

- `/api/textbook-export/en/math1030/matrix-algebra/special-matrices`
- `/api/textbook-export/zh-hk/math1030/matrix-algebra/special-matrices`
- `/api/textbook-export/zh-cn/math1030/matrix-algebra/special-matrices`
- matching `/pdf` endpoints.

TXT checks confirmed:

- static video-study sequence is present;
- static `matrix-family-checker` snapshot is present;
- static `row-reduction-stepper` snapshot is present;
- no raw `<video>`, `.mp4`, `poster=`, video id, `matrix-family-checker`, or
  `row-reduction-stepper` leaks into exported text.

PDF checks confirmed:

- EN PDF: valid `%PDF`, 7 pages.
- zh-HK PDF: valid `%PDF`, 6 pages.
- zh-CN PDF: valid `%PDF`, 6 pages.

## Follow-Up

The roadmap now moves to `math1030/matrix-algebra/block-matrices`.
