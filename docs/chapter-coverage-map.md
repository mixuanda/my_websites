# Chapter coverage map

This map gives the current chapter-level state of the mathematics notes system.
Use it alongside `docs/reference-coverage.md` when you decide the next content
batch. The goal is to keep the public Notes area honest about what is fully
authored, what is thin and needs another pass, and what is only present in
`reference/`.

## Math1090

The current public notes now cover the full source-backed late-April Math1090
spine: the order / completeness family through Dedekind cuts and decimal
expansions, plus a first sequences / limits family through Cauchy sequences,
delta-epsilon limits, limit laws, and continuity.

| Course | Chapter | Public state | Source state | Notes |
| --- | --- | --- | --- | --- |
| `math1090` | 1 Logic | Authored in EN, zh-HK, zh-CN | Strong | Needs tone / depth review only. |
| `math1090` | 2 Sets, functions, relations | Authored in EN, zh-HK, zh-CN | Strong | `2.1` and `2.2` are still thinner than the source density. |
| `math1090` | 3 Naturals, integers, rationals | Authored through `3.5` | Strong | `3.4` now has a fuller quotient-construction rewrite. |
| `math1090` | 4 Orders, bounds, completeness, reals | Authored through `4.6` | Strong through `§4.11` | `4.1`-`4.6` now cover total order / ordered field, bounds and `sup` / `inf`, completeness, the `Q`-gap at `sqrt(2)`, axiomatic / first-approximation motivation, Dedekind cuts, decimal expansions, and irrational numbers. |
| `math1090` | 5 Sequences and first limits | Authored through `5.3` | Strong through `§5.6` | Public notes now cover sequence limits, Cauchy sequences, the Cauchy-sequence model of `R`, delta-epsilon limits, limit laws, sequential characterization, and continuity in EN / zh-HK / zh-CN. |
| `math1090` | 6 Review / appendices | Unauthored | Secondary / overlap | Remaining review-packet material is better treated as appendix-style reinforcement rather than the next public priority. |

## Math1030

The current public notes now reach the inner-product / orthogonality sequence.
The next work is no longer a missing Math1030 core chapter family. Instead, the
priority shifts to QA on the newly added higher chapters and then back to the
remaining Math1090 backlog.

| Course | Chapter | Public state | Source state | Notes |
| --- | --- | --- | --- | --- |
| `math1030` | 1 Systems overview | Authored | Strong | `1.1` is still shorter than the source packet. |
| `math1030` | 2 Matrices, elimination, solution types | Authored | Strong | `2.4` now has a fuller rewrite and safer augmented-matrix markup. |
| `math1030` | 3 Matrix algebra | Authored | Strong | `3.1` and `3.2` are now at article depth; later cleanup is mostly cosmetic. |
| `math1030` | 4 Homogeneous systems and null space | Authored | Strong | `4.1` is now much fuller; later work is mainly export and examples QA. |
| `math1030` | 5 Invertibility | Authored | Strong | `5.1` is much deeper now, but appendix proofs remain partial. |
| `math1030` | 6 Vector spaces, span, basis, rank | Authored through `6.6` | Strong | The main backbone is live; appendix-style basis results remain backlog. |
| `math1030` | 7 Determinants | Authored through `7.3` | Strong | `7.3` deliberately absorbs the local appendix path to cofactors, adjoints, and Cramer's rule. |
| `math1030` | 8 Eigenvalues and diagonalization | Authored through `8.3` | Strong | `8.3` includes multiplicities, the distinct-eigenvalue test, and a first Cayley-Hamilton pass. |
| `math1030` | 9 Inner products and orthogonality | Authored through `9.4` | Strong | `9.4` completes the chapter with Cauchy-Schwarz and triangle inequalities after orthogonal bases and Gram-Schmidt. |

## Math1025

Math1025 is no longer a purely future placeholder. The repo already exposes a
small public foundations baseline, but the course is still far from complete.

| Course | Chapter family | Public state | Source state | Notes |
| --- | --- | --- | --- | --- |
| `math1025` | Foundations (`ch0` to `ch4`) | Baseline authored | Usable | Two foundation units are live; the rest of the chapter family still needs source-backed expansion. |
| `math1025` | Methods spine (`ch5` to `ch8`) | Unauthored | Usable | Chapter slides cover sequences, complex numbers, integers / rational numbers, and polynomials. |
| `math1025` | Vectors and geometry (`ch9` to `ch11`) | Unauthored | Usable | Chapter slides cover vectors in `R^n`, straight lines / planes / curves, and conic sections. |
| `math1025` | Homework and assessment support | Unauthored | Secondary support | Keep homework-solution PDFs and the MATH1025 midterm pair for later exercise design after baseline notes exist. |
| `math1025` | MATH1028 overlap material | Unauthored | Overlap | Treat the MATH1028 midterm pair as adjacent-course overlap, not as primary Math1025 conceptual source. |

## Math1010

No `reference/MATH1010/**` source tree is currently present in the repository.
Do not invent a public course plan beyond reserving the architecture for a
future addition.

## Next steps

The next content cycle should shift from missing-source-backed Math1090 authoring
to QA: export fidelity, rendering checks, exercise / reveal integrity, and
theme / layout review across the new `4.5`-`5.3` family, while keeping
Math1025 expansion controlled and source-backed.
