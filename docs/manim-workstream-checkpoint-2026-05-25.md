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
- Browser plugin is available in this session for DOM / console / interaction
  QA. Its screenshot capability timed out on `Page.captureScreenshot`, so
  visual screenshot evidence used Playwright against the system Chrome channel.
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
| Math1030 `8.1 Eigenvalues, eigenvectors, and eigenspaces` | `math1030-eigenvalue-direction-eigenspace-story` | `docs/manim-eigenvalue-direction-eigenspace-video-qa-2026-06-21.md` |
| Math1030 `8.2 Diagonalization and similarity` | `math1030-diagonalization-similarity-eigenbasis-story` | `docs/manim-diagonalization-similarity-video-qa-2026-06-29.md` |
| Math1030 `8.3 Characteristic polynomials and diagonalization tests` | `math1030-characteristic-polynomial-diagonalization-test-story` | `docs/manim-characteristic-polynomial-diagonalization-test-video-qa-2026-06-29.md` |
| Math1030 `9.1 Inner products, norms, and angles` | `math1030-inner-product-norm-angle-story` | `docs/manim-inner-products-norms-angles-video-qa-2026-06-29.md` |
| Math1030 `9.2 Orthogonal sets and orthonormal bases` | `math1030-orthogonal-sets-orthonormal-bases-story` | `docs/manim-orthogonal-sets-orthonormal-bases-video-qa-2026-06-30.md` |
| Math1030 `9.4 Cauchy-Schwarz and triangle inequalities` | `math1030-cauchy-schwarz-triangle-inequalities-story` | `docs/manim-cauchy-schwarz-triangle-inequalities-video-qa-2026-06-30.md` |
| Math1030 `2.4 Solution-set types` | `math1030-solution-set-types-trichotomy-story` | `docs/manim-solution-set-types-video-qa-2026-06-30.md` |
| Math1030 `2.5 Existence of row-echelon forms` | `math1030-existence-of-row-echelon-forms-story` | `docs/manim-existence-row-echelon-forms-video-qa-2026-06-30.md` |
| Math1030 `1.1 Equations and solution sets` | `math1030-equations-solution-sets-story` | `docs/manim-equations-solution-sets-video-qa-2026-07-01.md` |
| Math1030 `3.1 Matrix addition, subtraction, and scalar multiplication` | `math1030-matrix-entrywise-arithmetic-story` | `docs/manim-matrix-entrywise-arithmetic-video-qa-2026-07-01.md` |
| Math1030 `3.1 Matrix multiplication and identity matrices` | `math1030-matrix-multiplication-identity-story` | `docs/manim-matrix-multiplication-identity-video-qa-2026-07-01.md` |
| Math1030 `3.2/3.3 Transpose, symmetry, and skew-symmetry` | `math1030-transpose-symmetry-story` | `docs/manim-transpose-symmetry-video-qa-2026-07-01.md` |
| Math1030 `3.4 Special matrices` | `math1030-special-matrices-family-recognition-story` | `docs/manim-special-matrices-video-qa-2026-07-01.md` |

## Latest Slice Notes

Math1030 `3.5 Block matrices` was implemented after roadmap, current MDX,
catalog metadata, reference inspection, and read-only agent scouting confirmed
that the source-backed boundary is block partitions, blockwise addition /
scalar multiplication, compatible block multiplication, and the column-block
bridge. `MATH1030-Notes.pdf` §3.5 pp. 57-61, `1030gi-n01-01.pdf` pp. 5-6,
`1030gi-n01-02.pdf` pp. 1-2, and `1030gi-n01-se0102.pdf` pp. 1 and 4 support
the implemented clip.

Fixes applied:

- new storyboard covers partition cuts, block sizes, same-partition addition,
  scalar multiplication, the 2 by 2 block product formula, compatibility of
  each inner block product, and the column-block bridge;
- Manim scene renders EN, zh-HK, and zh-CN variants with locale fonts;
- render script now includes the block-matrix scene and
  writes assets under `public/generated/animations/math1030/`;
- the localized video was embedded into the EN / zh-HK / zh-CN
  `block-matrices` note immediately after the partition-motivation discussion
  and before the worked example;
- no new widget was added because the section already reads as an article-led
  formula and compatibility explanation;
- solving `AX=B` by columns is only bridged briefly; full null-space,
  invertibility, and solution-structure geometry stay in later units.

## Verification Stack Used For Latest Slice

- `python3 -m py_compile ...`
- `bash -n tools/animations/manim/scripts/render_scene.sh`
- JSON parse check for the touched storyboard
- `git diff --check`
- `npm run verify:mdx-tables`
- `npx tsc --noEmit --pretty false`
- `npm run lint`
- `npm run check:textbook-content`
- `AUTH_SECRET=local-test-secret npm run build`
- Browser DOM / console checks through the in-app Browser, route / asset
  checks, desktop / dark / mobile screenshots, media metadata, target
  content-check warning check, and TXT/PDF export checks for all three locales

## Next Slice

Proceed to the next unresolved Math1030 register item unless the roadmap
priority changes.

Expected first step:

1. Start with the next unresolved Math1030 register item, currently
   `solution-structure/homogeneous-systems-and-null-space`; keep it focused on
   homogeneous systems, null space, and the geometry of solution sets.
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
- Math1030 `9.4 Cauchy-Schwarz and triangle inequalities` is now complete as a
  careful proof-diagram video.
