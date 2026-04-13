# Script Draft (en)

Audience: first-course linear algebra

## Concept Intro
Goal: Connect matrix shape to data organization and system representation.

- Define matrix size m×n and explain row/column indexing notation a_{ij}.
- Contrast coefficient matrix with augmented matrix.
- State why dimensions control allowed operations.

Math blocks:
- `A = [a_{ij}]_{m\times n}`
- `\left[\begin{array}{ccc|c}1&2&-1&4\end{array}\right]`

## Theorem Statement
Goal: State the formal condition for two matrices to be equal.

- Require same dimensions.
- Require entry-wise equality for all i,j.
- Show one mismatch entry as a counterexample.

Math blocks:
- `A=B \iff a_{ij}=b_{ij}\;\forall i,j`

## Example Walkthrough
Goal: Practice identifying dimensions, entries, and legal comparisons.

- Read dimensions of three sample matrices.
- Extract designated entries a_23, b_11.
- Decide if two matrices can be compared for equality.

Math blocks:
- `A\in\mathbb{R}^{2\times3}`
- `B\in\mathbb{R}^{3\times2}`

## Recap Checkpoints
Goal: Confirm foundational matrix literacy before row operations.

- Checkpoint: identify matrix dimensions quickly.
- Checkpoint: explain entry notation without ambiguity.
- Checkpoint: apply equality rule to short examples.
