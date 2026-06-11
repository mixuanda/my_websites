# Manim Workstream Checkpoint - 2026-05-25

Branch: `codex/manim`

Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

Purpose: protect the main-thread context for the long-running video explanation
workstream. Use this as the first resume anchor before reopening broad chat
history.

## Current Constraints

- Keep all Manim-related work on `codex/manim`.
- Public Notes pages must stay article-first; videos are embedded supporting
  figures, not standalone course portals.
- Every public video entry must have English, Traditional Chinese, and
  Simplified Chinese copy and assets.
- TXT/PDF exports must degrade videos into static study sequences.
- Browser plugin is not available in this session; QA is using Playwright
  fallback with the reason recorded.
- Restore `.contentlayer/generated/**` after builds when it is generator churn.

## Completed VideoExplanation Units

| Unit | Component id | QA record |
| --- | --- | --- |
| Math1030 `2.3 Gaussian elimination and RREF` | `math1030-gaussian-elimination-rref-pivot-story` | `docs/manim-video-qa-2026-05-25.md` |
| Math1030 `2.1 Matrix basics` | `math1030-matrix-basics-position-map` | `docs/manim-matrix-basics-video-qa-2026-05-25.md` |
| Math1030 `2.2 Augmented matrices and row operations` | `math1030-augmented-matrix-row-operation-safety` | `docs/manim-augmented-matrices-video-qa-2026-05-25.md` |
| Math1030 `9.3 Gram-Schmidt orthogonalization` | `math1030-gram-schmidt-projection-story` | `docs/manim-gram-schmidt-video-qa-2026-06-10.md` |
| Math1030 `3.2 Matrix multiplication and linear systems` | `math1030-matrix-product-linear-system-story` | `docs/manim-matrix-product-linear-system-video-qa-2026-06-11.md` |
| Math1030 `3.3 Row-operation matrices` | `math1030-row-operation-matrix-left-multiply-story` | `docs/manim-row-operation-matrices-video-qa-2026-06-11.md` |
| Math1030 `6.3 Linear combinations and span` | `math1030-linear-combination-span-sweep-story` | `docs/manim-linear-combinations-span-video-qa-2026-06-11.md` |
| Math1030 `6.4 Linear dependence and independence` | `math1030-linear-dependence-redundancy-story` | `docs/manim-linear-dependence-video-qa-2026-06-11.md` |
| Math1090 `2.2 Functions and relations` | `math1090-function-map-properties-story` | `docs/manim-function-map-video-qa-2026-06-11.md` |
| Math1025 `6.1 Complex numbers, polar form, and geometry` | `math1025-complex-plane-arithmetic-story` | `docs/manim-complex-plane-video-qa-2026-06-11.md` |
| CSCI2520 `1.2 Hash tables and collision strategies` | `csci2520-hash-table-collision-strategy-story` | `docs/manim-hash-table-video-qa-2026-06-11.md` |

## Latest Slice Notes

CSCI2520 `1.2` was implemented after the roadmap, current MDX, extracted
lecture/tutorial text, and a read-only explorer confirmed that the first visual
pass should be Manim + widget. The clip explains the dictionary contract,
hashing to a bucket, collision meaning, chaining, and open addressing while the
existing `hash-bucket-lab` remains the reader-controlled follow-up.

Fixes applied:

- new storyboard covers dictionary operations, hash-to-bucket compression,
  collision meaning, chaining, and probing;
- Manim scene renders EN, zh-HK, and zh-CN variants with locale fonts;
- render script now includes the CSCI2520 scene and writes assets under
  `public/generated/animations/csci2520/`;
- visible in-video explanatory text uses reader-facing terms consistent with
  the page, especially dictionary contract, bucket, collision, chaining, and
  open addressing;
- video embed was placed after the collision definition and before the
  chaining section in all three localized MDX files;
- Chinese probing labels were shortened to avoid overlap, and the explanation
  card was moved upward so browser video controls do not obscure it;
- existing `hash-bucket-lab` remains embedded and its export snapshot is still
  present.

## Verification Stack Used For Latest Slice

- `python3 -m py_compile ...`
- `bash -n tools/animations/manim/scripts/render_scene.sh`
- JSON parse check for the touched storyboard
- `git diff --check`
- `npm run verify:mdx-tables`
- `npx tsc --noEmit --pretty false`
- `npm run lint`
- `AUTH_SECRET=local-test-secret npm run build`
- Playwright route, video metadata/playback, responsive/theme screenshots, and
  TXT/PDF export checks for all three locales

## Next Slice

Proceed to the generated-video storage policy checkpoint, then Math1025
integer-method and polynomial-method clips unless the roadmap priority changes.

Expected first step:

1. Decide whether committed MP4 assets under `public/generated/animations/`
   remain acceptable for the next several pilots or should move to external
   static hosting.
2. If assets remain repo-local, continue with Math1025 integer-method clips.
3. Keep future CSCI2520 algorithm videos short and preserve widgets for
   reader-controlled traces.

Useful explorer result:

- After Gram-Schmidt, the next implementation-slice explorer flagged
  Math1030 `matrix-multiplication-and-linear-systems`, `row-operation-matrices`,
  span, and independence as feasible near-term Math1030 video candidates.
  `matrix-multiplication-and-linear-systems` and `row-operation-matrices` are
  now complete, and span plus independence are now complete.
- A dedicated Math1090 explorer confirmed `functions-relations` had sufficient
  source support in the February 27 lecture notes, midterm review notes, and
  Worksheet 3; that first non-Math1030 pilot is now complete.
- A dedicated Math1025 explorer confirmed `complex-number-arithmetic-and-geometry`
  had sufficient support in `MATH1025_slides_ch6(3).pdf`; the first clip
  intentionally deferred roots of unity, loci, complex ratios, and
  transformations to avoid overloading the video.
- A dedicated CSCI2520 explorer confirmed `hash-tables-and-collision-strategies`
  should be Manim + widget: a short invariant-focused clip for collision
  handling plus the existing `hash-bucket-lab` for editable bucket/key tracing.
- A separate register scan found Math1030 `9.4 Cauchy-Schwarz and triangle
  inequalities` is also feasible as a careful proof-diagram video, but it
  remains a later candidate behind the current Math1025 and CSCI2520 roadmap
  slices.
