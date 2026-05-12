# Source audit

This audit records the current local source coverage for the math notes site.
`reference/` is the source of truth. If a topic is not supported by the local
materials, mark it as `MISSING_SOURCE` and do not invent course-specific
claims.

## Current live note boundary

The current production note set remains inside the strongest audited zones.
These units are already authored in EN, zh-HK, and zh-CN.

- `math1090`: 1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2,
  4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 7.1
- `math1030`: 1.1, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 4.1, 4.2, 5.1,
  6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 7.1, 7.2, 7.3, 8.1, 8.2, 8.3,
  9.1, 9.2, 9.3, 9.4
- `math1025`: 0.1, 1.1, 2.1, 3.1, 4.1
- `csci2520`: programming foundations `0.1`, ADT operations `1.1`, hashing
  `1.2`, lists / recursion `2.1`, complexity and selection / sorting `3.1`
  to `3.2`, trees / BSTs `4.1`, and graph / heap material `5.1` to `5.2`

`math1025` now has an authored early-methods baseline under `content/textbook`
through chapter 4, but chapters 5-11 remain source backlog rather than
complete public notes.

## MATH1090

The MATH1090 sources are strongest in the logic, sets, number-construction,
order/completeness, and first limits material that now extends through the
chapter-5 `delta`-`epsilon` family in the public Notes area.

### Available materials

The current local files for MATH1090 are:

- `reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf`
- `reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf`
- `reference/MATH1090/MATH1090_Lecture_Notes_Apr10.pdf`
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

- Coverage is now strong for logic, quantifiers, sets, functions, relations,
  natural numbers, induction, integers, rationals, the `sqrt(2)` gap in `Q`,
  the full late chapter-4 family through Dedekind cuts and decimal
  expansions, and the first limits family: sequences, Cauchy sequences,
  delta-epsilon limits, limit laws, sequential characterization, and
  continuity.
- The April 10 lecture packet is now substantially processed into public notes.
  The remaining MATH1090 gap is not a missing conceptual chapter, but weak or
  secondary support material such as poorly extracting homework / review
  overlap.
- The homework sequence is still incomplete. Only `HW1` and `HW8` are locally
  available, so exercise design should continue to lean mainly on lecture-note
  exercises, worksheets, and the review packet.

## MATH1030

The MATH1030 sources are strongest in systems, matrices, elimination,
invertibility, the first vector-space sequence through basis and dimension,
the determinant chapter family, and the eigenvalue / diagonalization family
that follows, plus the inner-product / orthogonality family drawn from the
master notes and `1030gi-n08-01.pdf`.

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
  and must not be treated as MATH1030 source.
- `reference/MATH1030/1030 added.zip` is an opaque bundle. Audit the extracted
  files before you cite it directly.

### Weak or incomplete coverage

The current weak spots are:

- Coverage is strong for systems of equations, augmented matrices, row
  operations, Gaussian elimination, solution-set types, invertibility, vector
  spaces, subspaces, span, linear independence, basis, dimension, determinants,
  transpose / column determinant formulas, the local adjoint / Cramer's rule
  appendix material, eigenvalues, eigenspaces, diagonalization, similarity,
  characteristic polynomials, the first diagonalization tests, inner products,
  orthogonal and orthonormal bases, Gram-Schmidt, and the two core inequalities.
- The master notes appear to continue beyond the current authored boundary, but
  the remaining unprocessed territory is now mostly outside the main
  Math1030 core spine.
- `MISSING_SOURCE`: linear transformations still need tighter source mapping
  before they become detailed public notes.
- `MISSING_SOURCE`: later problem sets are less densely represented than the
  early matrix and vector-space chapters.

## MATH1025

The MATH1025 tree is broad enough to drive source-backed authoring. It now
appears in the public Notes catalog through the chapter-4 binomial-theorem
unit, while the later slide families remain backlog.

### Available materials

The current local files for MATH1025 include:

- `reference/MATH1025/MATH1025_slides_ch0.pdf` through
  `reference/MATH1025/MATH1025_slides_ch11.pdf`
- `reference/MATH1025/MATH1025_Midterm_Exam.pdf`
- `reference/MATH1025/MATH1028_Midterm_Exam.pdf`
- `reference/MATH1025/Solution to MATH1025_1028_HW1.pdf` through
  `reference/MATH1025/Solution to MATH1025_1028_HW10.pdf`
- `reference/MATH1025/Solution to MATH1025_Midterm_Exam.pdf`
- `reference/MATH1025/Solution to MATH1028_Midterm_Exam.pdf`

### Duplicate or conflicting materials

The MATH1025 tree is cleaner than MATH1030, but there are still distinctions to
preserve during future authoring.

- `*:Zone.Identifier` files are sidecar metadata only.
- The `1028` exam and solution files are adjacent-course support, not primary
  chapter-note sources.
- The homework and exam solution PDFs are secondary support. They should enrich
  exercises only after the chapter notes are built from the slide sequence.

### Weak or incomplete coverage

The current weak spots are straightforward:

- The repository clearly contains usable conceptual material for a future
  MATH1025 course.
- The course now has a public EN / zh-HK / zh-CN baseline through `4.1`, but
  the majority of chapter-slide material is still unauthored.
- The next Math1025 work must stay source-backed and chapter-scoped rather than
  pretending the course is already broadly complete.

## CSCI2520

The CSCI2520 tree is now active public content rather than a placeholder. The
current route family covers the main data-structures spine from C memory
foundations through ADTs, hashing, lists, complexity, selection, linear-time
sorting, binary trees, graph traversal, MST / shortest-path reasoning,
topological sorting, heaps, and a first Huffman-coding pass.

### Available materials

The current local files for CSCI2520 include:

- `reference/CSCI2520/2520ds_00_intro.ppt`
- `reference/CSCI2520/2520ds_01_adt.ppt`
- `reference/CSCI2520/2520ds_02_stack.ppt`
- `reference/CSCI2520/2520ds_03_queue.ppt`
- `reference/CSCI2520/2520ds_04a_hashtable.ppt`
- `reference/CSCI2520/2520ds_04b_functionPointer.ppt`
- `reference/CSCI2520/2520ds_05_list (1).ppt`
- `reference/CSCI2520/2520ds_06_complexity (1).ppt`
- `reference/CSCI2520/2520ds_07_sorting (1).ppt`
- `reference/CSCI2520/2520ds_07_sorting2 (1).pptx`
- `reference/CSCI2520/2520ds_08_trees (1).ppt`
- `reference/CSCI2520/2520ds_08_trees2 (1).ppt`
- `reference/CSCI2520/2520ds_09_graph (1).ppt`
- `reference/CSCI2520/2520ds_10_heap.ppt`
- `reference/CSCI2520/2520ds_10_heap2.ppt`
- `reference/CSCI2520/2520ds_10_heap2huffmanCoding.pdf`
- `reference/CSCI2520/csci2520_tuto1_c_programming.pptx`
- `reference/CSCI2520/csci2520_tuto2_stack_and_queue.pptx`
- `reference/CSCI2520/csci2520_tuto3_hashtable.pptx`
- `reference/CSCI2520/csci2520_tuto4_recursion (1).pptx`
- `reference/CSCI2520/csci2520_tuto6_selection_problem (1).pptx`
- `reference/CSCI2520/csci2520_tuto7_binary_tree (1).pptx`
- `reference/CSCI2520/csci2520_tuto8_dynamic_selection.pptx`
- `reference/CSCI2520/csci2520_tuto9_graph.pptx`
- `reference/CSCI2520/csci2520_tuto10_topo_sort_and_heap.pptx`

### Duplicate or conflicting materials

- `*:Zone.Identifier` files are sidecar metadata only.
- Many lecture assets are legacy `.ppt` binaries, so extraction quality is less
  reliable than the `.pptx` tutorial files.
- `docs/extracted/csci2520/**` now contains text extraction from the current
  tutorial deck files and selected legacy lecture decks to support note
  authoring.
- `CSCI2120` was requested by name in the working prompt, but the repository
  contains no `reference/CSCI2120/**` or `content/textbook/csci2120/**` tree.
  Do not claim CSCI2120 coverage unless those files are added.

### Weak or incomplete coverage

- The public route family now covers the main CSCI2520 sequence with nine
  three-language units.
- Legacy `.ppt` extraction remains weaker than `.pptx` extraction, so list,
  tree, graph, and heap pages should still be treated as high-confidence
  lecture-note syntheses rather than line-by-line slide transcriptions.
- Dynamic selection and later optional graph / heap exercises remain a useful
  future depth pass, but the public course no longer stops at early foundations.

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

Move next to the remaining Math1025 chapter-slide backlog deliberately,
starting with sequences / complex numbers / number-theory / polynomials from
`ch5`-`ch8`, while keeping Math1030 and Math1090 in export, rendering, and
exercise QA unless a specific thin unit is selected.
