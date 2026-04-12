# Chapter coverage map

This map translates the raw source audit into authoring decisions. Use it when
you decide which chapters can become detailed public notes now, which chapters
need tighter subsection planning first, and which chapters must stay marked as
`MISSING_SOURCE`.

## MATH1090

The MATH1090 lecture notes now expose more chapter structure than the current
live site. The table below records the current practical authoring stance.

| Chapter | Source status | Public status |
| --- | --- | --- |
| 1 Logic | Dense lecture + worksheet support | Live |
| 2 Sets | Dense lecture + worksheet support | Live |
| 3 Integers and number construction | Dense through `3.6` | Live through `3.5`, expandable |
| 4 The reals | Lecture support through `4.13`, thinner exercises | Not yet live, selectively expandable |
| 5 Delta and epsilon | Lecture support only | Hold until tighter subsection planning |
| 6 Big sets | Only `6.1` is locally visible | Hold and mark thin |

## MATH1030

The MATH1030 source tree supports more chapters than the current public note
set. The practical route plan is:

| Chapter | Source status | Public status |
| --- | --- | --- |
| 1 Systems of linear equations | Dense | Partly live |
| 2 Matrices and Gaussian elimination | Dense | Live |
| 3 Matrix algebra | Dense | Not yet live |
| 4 Homogeneous systems and nonsingular matrices | Strong | Not yet live |
| 5 Invertible matrix | Strong | Partly live |
| 6 Vector space | Dense through `6.6` | Live through `6.5` |
| 7 Determinant | Strong opening support | Not yet live |
| 8 Eigenvalues and eigenvectors | Moderate opening support | Not yet live |
| 9 Inner product space | Thin opening support | Not yet live |

## Immediate authoring priority

Use the next content cycle on the strongest missing MATH1030 chapters first.

1. Chapter 3 matrix algebra.
2. Chapter 4 homogeneous systems, null space, and nonsingularity.
3. Chapter 5.2 to 5.3 on invertibility equivalences and inverse computation.
4. Chapter 6.6 on null space, column space, and row space.
5. Chapter 7 determinant basics.

## Hold line

Do not treat every visible chapter heading as equally ready for public notes.

- MATH1090 Chapter 5 and later require tighter exercise-backed planning.
- MATH1030 Chapters 8 and 9 need more careful subsection mapping before they
  become detailed beginner-first notes.
- Any unit without a clean subsection plan and at least one direct supporting
  source packet stays `MISSING_SOURCE`.
