# Script Draft (en)

Audience: first-course linear algebra

## Concept Intro
Goal: Frame elimination as a structure-reading process.

- Define pivot and pivot column in context of augmented matrices.
- Differentiate REF and RREF reading power.
- Show staircase intuition for pivot placement.

Math blocks:
- `\text{REF}\subset\text{RREF}`
- `\begin{bmatrix}1&2&2&4\\0&1&1&1\\0&0&-1&-4\end{bmatrix}`

## Theorem Statement
Goal: Anchor elimination with a formal invariant.

- State row-equivalent augmented matrices represent equivalent systems.
- Connect theorem to legal operation sequence logging.
- Note contradiction-row interpretation.

Math blocks:
- `A\sim B \Rightarrow \mathcal{S}(A)=\mathcal{S}(B)`
- `[0\;0\;0\mid c],\;c\neq0`

## Example Walkthrough
Goal: Walk through full elimination from system to final solution.

- Apply below-pivot elimination to reach REF.
- Normalize pivot and eliminate above to reach RREF.
- Read solution directly from final matrix.

Math blocks:
- `R_2\leftarrow R_2-R_1`
- `R_3\leftarrow R_3-2R_1`
- `R_3\leftarrow -R_3`

## Recap Checkpoints
Goal: Classify unique/infinite/inconsistent outcomes from RREF patterns.

- Checkpoint: no contradiction + pivot in every variable column => unique solution.
- Checkpoint: free variable present => infinitely many solutions.
- Checkpoint: contradiction row => no solution.
