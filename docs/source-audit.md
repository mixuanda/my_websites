# Source audit

This audit records the current local source coverage for the math notes site.
`reference/` is the source of truth. If a topic is not supported by the local
materials, mark it as `MISSING_SOURCE` and do not invent course-specific
claims.

## Current live note boundary

The current production note set remains inside the strongest audited zones.
These units are already authored in EN, zh-HK, and zh-CN.

- `math1090`: 1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5
- `math1030`: 1.1, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 5.1,
  6.1, 6.2, 6.3, 6.4, 6.5

## MATH1090

The MATH1090 tree is strongest in logic, sets, number construction, and the
early real-number sequence. The lecture notes now reach farther than the
current live notes, but exercise support becomes thinner after the rational and
irrational-number boundary.

### Available materials

The current local files for MATH1090 are:

- `reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf`
- `reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf`
- `reference/MATH1090/MATH1090_midterm_review_notes_master.pdf`
- `reference/MATH1090/MATH1090_midterm_review_notes_final.pdf`
- `reference/MATH1090/MATH1090_midterm_review_notes_final.tex`
- `reference/MATH1090/MATH1090_HW1.pdf`
- `reference/MATH1090/MATH1090 HW8.pdf`
- `reference/MATH1090/MATH1090_Worksheet1.pdf`
- `reference/MATH1090/MATH1090_Worksheet2.pdf`
- `reference/MATH1090/MATH1090_Worksheet3.pdf`
- `reference/MATH1090/MATH1090_Worksheet4.pdf`
- `reference/MATH1090/MATH1090_Worksheet5.pdf`

### Source shape

The lecture-note table of contents and the worksheet titles give the clearest
high-level map.

- `MATH1090_Lecture_Notes_Feb27.pdf` covers Chapter 1 logic, Chapter 2 sets,
  Chapter 3 through `3.6`, and Chapter 4 through `4.8`.
- `MATH1090_Lecture_Notes_Mar26.pdf` extends the same spine through `4.13`,
  Chapter 5 delta-epsilon, and `6.1` cardinality.
- `Worksheet4` is explicitly about naturals and integers.
- `Worksheet5` is explicitly about rationals and gaps in `Q`.
- `HW8` gives later real-number practice, but it is sparse and not as clean as
  the earlier worksheets.

### Strong coverage

The strongest public-authoring zones are:

- Chapter 1 logic through predicate logic.
- Chapter 2 sets, functions, relations, partial orders, and equivalence
  relations.
- Chapter 3 through the construction of `Q`.
- Chapter 4 through upper bounds, completeness, Dedekind cuts, irrationals,
  and the first real-number examples.

### Weak or incomplete coverage

The current weak spots are:

- The current live note set stops at `3.5`, but the source tree now supports a
  credible expansion into later Chapter 3 and the early-to-middle Chapter 4
  real-number sequence.
- Chapter 5 delta-epsilon and `6.1` cardinality appear in the lecture notes,
  but the local exercise support is much thinner than in Chapters 1 to 4.
- `MISSING_SOURCE`: anything beyond the locally visible `6.1` boundary, or any
  subsection that only appears once without reinforcing worksheet or review
  material, stays incomplete.
- `MISSING_SOURCE`: the homework sequence is incomplete. Only `HW1` and `HW8`
  are locally available.

## MATH1030

The MATH1030 tree is broader and denser than the current live note set. The
master notes reach Chapters 1 to 9, and the tutorials, practice sets, and
specialized note packets give strong reinforcement through determinants and the
start of eigenvalue and inner-product material.

### Available materials

The current local files for MATH1030 include:

- `reference/MATH1030/MATH1030-Notes.pdf`
- `reference/MATH1030/1030efghi-tutorial-week02.pdf`
- `reference/MATH1030/1030efghi-tutorial-week02as.pdf`
- `reference/MATH1030/1030efghi-tutorial-week03.pdf`
- `reference/MATH1030/1030efghi-tutorial-week03as.pdf`
- `reference/MATH1030/1030efghi-tutorial-week04.pdf`
- `reference/MATH1030/1030efghi-tutorial-week04as.pdf`
- `reference/MATH1030/1030efghi-tutorial-week05.pdf`
- `reference/MATH1030/1030efghi-tutorial-week05as.pdf`
- `reference/MATH1030/1030efghi-tutorial-week06.pdf`
- `reference/MATH1030/1030efghi-tutorial-week06as.pdf`
- `reference/MATH1030/1030efghi-tutorial-week07.pdf`
- `reference/MATH1030/1030efghi-tutorial-week07as.pdf`
- `reference/MATH1030/1030efghi-tutorial-week08.pdf`
- `reference/MATH1030/1030efghi-tutorial-week08as.pdf`
- `reference/MATH1030/Practice Set 1_Set review and Solving Linear system.pdf`
- `reference/MATH1030/Practice Set 1_Solutions.pdf`
- `reference/MATH1030/Practice Set 2_Matrix Algebra.pdf`
- `reference/MATH1030/Practice Set 2_Solutions.pdf`
- `reference/MATH1030/Practice Set 3_Matrix Algebra and Linear Equation System.pdf`
- `reference/MATH1030/Practice Set 3_Solutions.pdf`
- `reference/MATH1030/Practice Set 4_Invertible Matrix.pdf`
- `reference/MATH1030/Practice Set 4_Solutions.pdf`
- `reference/MATH1030/MATH1030 HW3.pdf`
- `reference/MATH1030/math1030_assignment4_review_solutions.pdf`
- `reference/MATH1030/1030efghi-as01.pdf` through
  `reference/MATH1030/1030efghi-as04-202526.pdf`
- `reference/MATH1030/1030gi-n01-se0102.pdf`
- `reference/MATH1030/1030gi-n01-01.pdf` through
  `reference/MATH1030/1030gi-n08-01.pdf`

### Source shape

The source map is much broader than the currently surfaced notes.

- `MATH1030-Notes.pdf` covers Chapter 1 systems of linear equations, Chapter 2
  matrices and Gaussian elimination, Chapter 3 matrix algebra, Chapter 4
  homogeneous systems and nonsingular matrices, Chapter 5 invertible matrices,
  Chapter 6 vector spaces, Chapter 7 determinants, Chapter 8 eigenvalues and
  eigenvectors, and Chapter 9 inner product spaces.
- `tutorial-week04` focuses on transpose, symmetry, skew-symmetry, commuting
  matrices, and orthogonal matrices.
- `1030gi-n01-se0102` gives direct supplementary support for matrix addition,
  matrix multiplication, upper-triangular matrices, and block-matrix
  manipulations.
- `tutorial-week05` focuses on row operations, row-equivalence, REF, RREF, and
  reading solution sets.
- `tutorial-week06` focuses on set language in linear algebra, null spaces, and
  solution sets.
- `tutorial-week07` focuses on invertibility and matrix inverse properties.
- `tutorial-week08` focuses on vector spaces and subspaces.
- `1030gi-n06-01` starts determinants directly.
- `1030gi-n07-01` starts eigenvalues and eigenvectors directly.
- `1030gi-n08-01` starts inner products and norms directly.

### Strong coverage

The strongest authoring zones are:

- Chapters 1 and 2 on systems, matrices, augmented matrices, row operations,
  elimination, and solution-set types.
- Chapter 3 matrix algebra and its tutorial or practice support. This chapter
  is now live across EN, zh-HK, and zh-CN through `3.5`.
- Chapters 4 and 5 on homogeneous systems, null space, nonsingularity,
  invertibility, and inverse computations.
- Chapter 6 through basis and dimension, with additional support for set
  language and vector-space arguments.
- Chapter 7 determinants, backed by both the master notes and specialized
  determinant packets.

### Weak or incomplete coverage

The current weak spots are:

- The public site still surfaces only a subset of the source-backed chapters.
  The homogeneous-system, determinant, and early eigenvalue material is
  available locally and should be treated as authorable once the corresponding
  note packs are written.
- Chapter 8 has targeted support for eigenvalues, but the later diagonalization
  sequence is thinner than the earlier algebra and vector-space blocks.
- Chapter 9 is only lightly reinforced beyond the master notes and the first
  inner-product packet.
- `MISSING_SOURCE`: any subsection beyond the current locally visible Chapter 9
  boundary remains unsupported.
- `MISSING_SOURCE`: topics that only appear in one thin source packet without a
  supporting tutorial, practice set, or review sheet stay incomplete.

## Duplicate or conflicting materials

The current tree contains editorial duplicates and Windows metadata artifacts
that must not be treated as separate sources.

- `*:Zone.Identifier` files are sidecar metadata only.
- `1030efghi-tutorial-week02 (1).pdf` duplicates the week 2 tutorial packet.
- `math1030_assignment4_review_solutions.pdf`,
  `math1030_assignment4_review_solutions (1).pdf`, and
  `math1030_assignment4_review_solutions (2).pdf` overlap heavily.
- `MATH1090_midterm_review_notes_master.pdf` and
  `MATH1090_midterm_review_notes_final.pdf` are two editorial states of the
  same review packet.
- `reference/MATH1030/MATH1090_Worksheet5 (1).pdf` is a stray MATH1090 file
  and must not be cited as MATH1030 material.
- `reference/MATH1030/1030 added.zip` is an opaque bundle. Audit extracted
  contents before citing it directly.

## Audit rules for content authors

Use this audit during authoring so the public notes stay conservative and
traceable.

- Prefer the clearest local source that states the concept directly.
- Keep `sourceRefs` accurate in catalog metadata even if the public page does
  not show the raw list.
- Mark unsupported detail as `MISSING_SOURCE` instead of filling gaps from
  memory.
- Treat duplicates and answer-key variants carefully so you do not merge
  question text with solution text by accident.

## Next steps

Use `docs/chapter-coverage-map.md` as the route-level expansion guide, then
prioritize the currently missing but source-backed MATH1030 chapters before
you push beyond the thin real-analysis and inner-product boundaries.
