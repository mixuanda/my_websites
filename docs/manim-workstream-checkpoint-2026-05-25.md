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
| Math1025 `7.1 Divisibility, gcd, and integer equations` | `math1025-euclidean-bezout-integer-equation-story` | `docs/manim-euclidean-bezout-video-qa-2026-06-12.md` |
| Math1025 `7.2 Rational and irrational numbers` | `math1025-rational-irrational-root-proof-story` | `docs/manim-rational-irrational-video-qa-2026-06-12.md` |
| Math1025 `8.1 Polynomial arithmetic and division` | `math1025-polynomial-division-remainder-story` | `docs/manim-polynomial-division-video-qa-2026-06-12.md` |
| Math1025 `8.2 Polynomial gcds and irreducibility` | `math1025-polynomial-gcd-irreducibility-story` | `docs/manim-polynomial-gcd-video-qa-2026-06-12.md` |

## Latest Slice Notes

Math1025 `8.2` was implemented after the roadmap, current MDX, extracted
chapter 8 text, and a read-only explorer confirmed that the polynomial gcd /
irreducibility unit should be Manim-only. The clip uses the source-backed
Example 8.2 with
`f=4x^4-2x^3-16x^2+5x+9` and `g=2x^3-x^2-5x+4`. It visualizes the monic-gcd
convention, the Euclidean invariant `gcd(f,g)=gcd(g,r)`, the remainder chain
ending at `-x+1`, normalization to `x-1`, Bézout back-substitution,
field-dependent irreducibility, and the prime-like divisibility step.

Fixes applied:

- new storyboard covers monic gcd normalization, the Euclidean step, the
  Example 8.2 remainder chain, Bézout reverse substitution, coefficient-field
  dependence, and irreducible-polynomial divisibility;
- Manim scene renders EN, zh-HK, and zh-CN variants with locale fonts;
- render script now includes the polynomial-gcd scene and writes assets under
  `public/generated/animations/math1025/`;
- video embed was placed before the proof-sketch section in all three localized
  MDX files;
- the displayed Bézout formula in all three locales was corrected with the
  source-backed `+ (... )g(x)` term;
- layout spacing, arrow placement, and field-comparison cards were adjusted
  after visual QA to reduce overlap.

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

Proceed to the next Math1025 polynomial-method clip unless the roadmap priority
changes.

Expected first step:

1. Start with Math1025 `polynomial-methods/rational-functions-and-vieta`
   unless source inspection changes the priority.
2. Keep future CSCI2520 algorithm videos short and preserve widgets for
   reader-controlled traces.
3. Revisit `docs/generated-video-storage-policy.md` before the generated asset
   directory reaches its documented size gates.

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
