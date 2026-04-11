# Source audit

This audit records the current local source coverage for the textbook site.
`reference/` is the source of truth. If a topic is not supported by the local
materials, mark it as `MISSING_SOURCE` in content plans and do not invent
course-specific claims.

## Current authoring boundary

The current implementation only ships source-backed early units. That means the
live textbook currently stays inside the strongest local coverage zones.

- `math1090`: logic, quantifiers, sets, functions, and relations
- `math1030`: systems of equations, matrices, row operations, RREF,
  solution-set types, and invertibility

## MATH1090

The MATH1090 set theory sources are strongest in the early course spine:
logic, sets, functions, relations, natural numbers, integers, and rational
numbers. The local files also support the beginning of the real-number
chapter, but coverage becomes thinner after that.

### Available materials

- `reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf`
- `reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf`
- `reference/MATH1090/MATH1090_midterm_review_notes_master.pdf`
- `reference/MATH1090/MATH1090_midterm_review_notes_final.pdf`
- `reference/MATH1090/MATH1090_midterm_review_notes_final.tex`
- `reference/MATH1090/MATH1090_HW1.pdf`
- `reference/MATH1090/MATH1090_Worksheet1.pdf`
- `reference/MATH1090/MATH1090_Worksheet2.pdf`
- `reference/MATH1090/MATH1090_Worksheet3.pdf`
- `reference/MATH1090/MATH1090_Worksheet4.pdf`
- `reference/MATH1090/MATH1090_Worksheet5.pdf`
- `reference/MATH1090/MATH1090 HW8.pdf`

### Duplicate or conflicting materials

- The February 27 and March 26 lecture notes are near-duplicate variants of
  the same lecture-note stream.
- The `midterm_review_notes_master.pdf` and `midterm_review_notes_final.pdf`
  files overlap heavily and should be treated as two editorial states of the
  same review packet.
- The `.tex` file is a richer source for headings, appendix structure, and
  some proof templates, but it should not be treated as a separate topical
  source.

### Weak or incomplete coverage

- Early chapter coverage is strong and traceable.
- Later real-number material is present, but the local packet is clearly
  thinner than the early chapters.
- `MISSING_SOURCE`: lecture-note content beyond `§4.7` and Dedekind cuts is
  not supported by the local audit set.
- `MISSING_SOURCE`: the local tree does not include a complete homework series
  beyond the available `HW1` and `HW8` files.

## MATH1030

The MATH1030 linear algebra sources are strongest in the matrix and system
foundations: systems of linear equations, elimination, RREF, matrix algebra,
invertibility, vector spaces, basis, dimension, determinants, eigenvalues, and
inner product space material are all present in the main notes.

### Available materials

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
- `reference/MATH1030/math1030_assignment4_review_solutions (1).pdf`
- `reference/MATH1030/math1030_assignment4_review_solutions (2).pdf`

### Duplicate or conflicting materials

- The week 2 through week 8 tutorials each have answer-sheet variants, which
  makes them useful for tracing worked solutions but easy to confuse with the
  question-only versions.
- The practice sets have matching solution files, so content authoring must
  keep question text and answer text separate.
- The assignment 4 review solutions appear in multiple local copies with the
  same substance.
- `reference/MATH1030/MATH1090_Worksheet5 (1).pdf` is a stray, misfiled copy
  from the MATH1090 tree and should not be treated as MATH1030 source.

### Weak or incomplete coverage

- The main notes support the later vector-space and inner-product chapters,
  but the practice material is less dense there than in the early matrix
  chapters.
- `MISSING_SOURCE`: any chapter or subsection beyond the locally available
  notes and tutorials is unsupported by the current audit set.
- `MISSING_SOURCE`: do not invent course-specific claims for advanced topics
  that are not explicitly present in the local notes or exercises.

## Audit rules for content authors

Use the audit like this when writing pages:

- Prefer the earliest source that states the relevant concept clearly.
- Cite the exact chapter, worksheet, or practice set in the section metadata.
- Label unsupported claims with `MISSING_SOURCE` instead of filling gaps from
  memory.
- When two local sources disagree, keep the site content conservative and add
  a note that the source set is conflicted.
