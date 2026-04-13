# Script Draft (en)

Audience: first-course linear algebra

## Concept Intro
Goal: Map a linear system into one manipulable matrix object.

- Separate coefficient block and constants column.
- Explain vertical bar notation and what must remain aligned.
- Preview legal elementary row operations.

Math blocks:
- `\left[\begin{array}{ccc|c}1&2&-1&4\\2&1&3&5\end{array}\right]`

## Theorem Statement
Goal: State and justify the row-equivalence principle.

- List three elementary row operations.
- State equivalence of solution sets under these operations.
- Clarify nonzero scalar requirement for row scaling.

Math blocks:
- `R_i\leftrightarrow R_j`
- `R_i\leftarrow cR_i\;(c\neq0)`
- `R_i\leftarrow R_i+cR_j`

## Example Walkthrough
Goal: Execute two row operations and interpret each move.

- Choose first pivot in column one.
- Eliminate below-pivot entries using row replacement.
- Interpret resulting row as simplified equation.

Math blocks:
- `R_2\leftarrow R_2-2R_1`
- `R_3\leftarrow R_3+R_1`

## Recap Checkpoints
Goal: Prevent common algebraic and structural mistakes.

- Checkpoint: constants column transformed together with coefficient columns.
- Checkpoint: row scaling never uses zero multiplier.
- Checkpoint: each operation documented in notation R_i←...
