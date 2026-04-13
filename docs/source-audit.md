# Source audit

This audit records the current local source coverage for the math notes site.
`reference/` is the source of truth. If a topic is not supported by the local
materials, mark it as `MISSING_SOURCE` and do not invent course-specific
claims.

## Current authoring boundary

The current live note set stays inside the strongest audited coverage zones.
These units are already present in code and should remain source-backed.

- `math1090`: 1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1
- `math1030`: 1.1, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 4.1, 5.1, 6.1, 6.2, 6.3,
  6.4, 6.5, 6.6
- `math1025`: baseline foundations pair only

`math1025` now has a small authored tree under `content/textbook`, but most of
its slide families are still only source backlog rather than complete public
notes.

## MATH1090

The MATH1090 sources are strongest in the early logic, sets, and number
construction spine. Coverage is good through the current `sqrt(2)` unit and
then becomes noticeably thinner.

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

### Duplicate or conflicting materials

The local MATH1090 tree has a few editorial duplicates and Windows metadata
artifacts that should not be treated as separate sources.

- `*:Zone.Identifier` files are sidecar metadata only.
- `MATH1090_midterm_review_notes_master.pdf` and
  `MATH1090_midterm_review_notes_final.pdf` are two editorial states of the
  same review packet.
- `MATH1090_midterm_review_notes_final.tex` is useful for headings and proof
  structure, but it is not a separate topical source.

### Weak or incomplete coverage

The current weak spots are:

- Coverage is strong for logic, quantifiers, sets, functions, relations,
  natural numbers, induction, integers, rationals, and the `sqrt(2)` gap in
  `Q`.
- Coverage becomes thinner after the currently authored `3.5` note, but the
  April 10 lecture packet and the review materials do support a next chapter on
  total order, upper and lower bounds, supremum / infimum, and incompleteness
  of `Q`.
- `MISSING_SOURCE`: material well beyond the audited `§4.7` boundary and the
  later completeness constructions still needs tighter page-by-page mapping
  before it becomes detailed public notes.
- `MISSING_SOURCE`: the homework sequence is incomplete. Only `HW1` and `HW8`
  are locally available.

## MATH1030

The MATH1030 sources are strongest in systems, matrices, elimination,
invertibility, and the first vector-space sequence through basis and
dimension.

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
- `reference/MATH1030/1030gi-n01-01.pdf` through
  `reference/MATH1030/1030gi-n08-01.pdf`

### Duplicate or conflicting materials

The MATH1030 tree contains many useful but easy-to-confuse duplicates.

- `*:Zone.Identifier` files are sidecar metadata only.
- `1030efghi-tutorial-week02 (1).pdf` duplicates the week 2 tutorial packet.
- `math1030_assignment4_review_solutions.pdf`,
  `math1030_assignment4_review_solutions (1).pdf`, and
  `math1030_assignment4_review_solutions (2).pdf` overlap heavily.
- Tutorial files and `as` answer-sheet variants must be kept distinct when you
  trace problem statements versus worked solutions.
- `reference/MATH1030/MATH1090_Worksheet5 (1).pdf` is a stray MATH1090 file
  and must not be treated as MATH1030 source.
- `reference/MATH1030/1030 added.zip` is an opaque bundle. Audit the extracted
  files before you cite it directly.

### Weak or incomplete coverage

The current weak spots are:

- Coverage is strong for systems of equations, augmented matrices, row
  operations, Gaussian elimination, solution-set types, invertibility, vector
  spaces, subspaces, span, linear independence, basis, and dimension.
- The master notes appear to continue beyond the current authored boundary,
  but later topics are not yet mapped tightly enough to subsection-level note
  plans.
- `MISSING_SOURCE`: linear transformations, determinants, eigenvalues, and
  inner-product topics need tighter source mapping before they become detailed
  public notes.
- `MISSING_SOURCE`: later problem sets are less densely represented than the
  early matrix and vector-space chapters.

## MATH1025

The MATH1025 tree is broad enough to enter planning immediately, even though it
does not yet appear in the public Notes catalog.

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
- The course now has a minimal public foundations baseline, but the majority of
  chapter-slide material is still unauthored.
- The next Math1025 work must stay source-backed and chapter-scoped rather than
  pretending the course is already broadly complete.

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

Map the determinant, eigenvalue, and inner-product families page by page before
writing new Math1030 notes, then return to the remaining Math1090 chapter-4
and proof-structure backlog. Keep Math1025 expansion narrow and source-backed
while the main Math1090 / Math1030 spine remains the priority.
