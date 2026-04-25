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
| `math1090` | 3 Naturals, integers, rationals | Authored through `3.5` | Strong | `3.3` and `3.4` now include quotient-construction interactives, expanded integer / rational operation exercises, and checkpoint questions. |
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
| `math1030` | 1 Systems overview | Authored through `1.2` | Strong | `1.1` has a line-system visual and checkpoint problem; `1.2` now incorporates the proof-language, logical-phrase, and counterexample appendices as a public reading note. |
| `math1030` | 2 Matrices, elimination, solution types | Authored through `2.5` | Strong | Every chapter-2 unit now has checkpoint coverage; `2.5` adds the optional REF / RREF existence proof, including pivot-column preservation during REF-to-RREF cleanup. |
| `math1030` | 3 Matrix algebra | Authored through `3.3` | Strong | `3.1` now includes assignment-style parameter recovery, noncommutative expansion warnings, column-interpretation traps, lower-triangular closure, and checkpoint questions; `3.3` adds row-operation matrices, left multiplication by elementary matrices, reverse row operations, and the bridge to invertibility. |
| `math1030` | 4 Homogeneous systems, null space, and set language | Authored through `4.2` | Strong | `4.2` now adds set membership, solution-set notation, null spaces, span, set equality proofs, and redundant-vector arguments from the `n04-*` notes. |
| `math1030` | 5 Invertibility | Authored through `5.2` | Strong | `5.1` includes prerequisite preparation, one-sided inverse warnings, an invertibility-dictionary workflow, null-space noninvertibility tests, inverse-solve examples, and expanded checkpoint questions. `5.2` now adds the optional RREF uniqueness induction proof and the well-defined rank bridge. |
| `math1030` | 6 Vector spaces, span, basis, rank | Authored through `6.8` | Strong | `6.3` now has the span-membership algorithm, `6.4` has the homogeneous-system dependence algorithm, `6.5` includes dimension counting, minimal-spanning-set extraction, and comparable-subspace criteria; `6.6` has a static rank map; `6.7` covers matrix subspaces, bases, and dimension; `6.8` adds basis existence, the Replacement Theorem, ordered bases, and change-of-basis matrices. Remaining work is mostly the optional REF/RREF proof appendix and deeper exercise/export QA. |
| `math1030` | 7 Determinants | Authored through `7.3` | Strong | `7.3` deliberately absorbs the local appendix path to cofactors, adjoints, and Cramer's rule. |
| `math1030` | 8 Eigenvalues and diagonalization | Authored through `8.3` | Strong | `8.2` now includes a full `2 by 2` diagonalization computation with ordered `S` / `D`; `8.3` includes multiplicities, the distinct-eigenvalue test, and a first Cayley-Hamilton pass. |
| `math1030` | 9 Inner products and orthogonality | Authored through `9.4` | Strong | `9.1` now has a full angle / polarization example, and `9.3` has a static Gram-Schmidt table before `9.4` completes the chapter with Cauchy-Schwarz and triangle inequalities. |

## CSCI2520

The repository contains CSCI2520 source material, not CSCI2120 source material.
The public Notes tree has therefore been expanded under `csci2520` only.

| Course | Chapter | Public state | Source state | Notes |
| --- | --- | --- | --- | --- |
| `csci2520` | 0 Programming foundations | Authored in EN, zh-HK, zh-CN | Strong tutorial source | Pointer, `malloc`, `typedef`, and `struct` review are live with an embedded pointer tracer. |
| `csci2520` | 1 ADT and operation semantics | Authored through `1.2` | Strong | Stack / queue contracts, function pointers, hash tables, collisions, chaining, probing, and rehashing are live. |
| `csci2520` | 2 Lists and recursion | Authored through `2.1` | Usable, mixed `.ppt` and `.pptx` extraction | New list note covers head-tail ADTs, recursion, iteration, and representation cost. |
| `csci2520` | 3 Complexity and sorting | Authored through `3.2` | Strong for complexity / selection / linear-time sorting | Existing complexity unit is now paired with selection, quickselect, counting sort, and radix sort. |
| `csci2520` | 4 Trees and BSTs | Authored through `4.1` | Strong tutorial source plus legacy lecture extraction | New unit covers traversals, reconstruction, BST invariant, successor, and deletion cases. |
| `csci2520` | 5 Graphs and priority queues | Authored through `5.2` | Strong tutorial source plus legacy lecture extraction | New units cover DFS, BFS, MSTs, Dijkstra-style shortest paths, topological sort, heaps, and Huffman coding. |

## Math1025

Math1025 is no longer a purely future placeholder. The repo already exposes a
small public foundations baseline, but the course is still far from complete.

| Course | Chapter family | Public state | Source state | Notes |
| --- | --- | --- | --- | --- |
| `math1025` | Foundations and early methods (`ch0` to `ch4`) | Authored through `4.1` | Usable | Five three-language units are live: notation, trigonometry, induction, inequalities / absolute value, and binomial coefficients / expansions. |
| `math1025` | Methods spine (`ch5` to `ch8`) | Unauthored | Usable | Chapter slides cover sequences, complex numbers, integers / rational numbers, and polynomials. |
| `math1025` | Vectors and geometry (`ch9` to `ch11`) | Unauthored | Usable | Chapter slides cover vectors in `R^n`, straight lines / planes / curves, and conic sections. |
| `math1025` | Homework and assessment support | Unauthored | Secondary support | Keep homework-solution PDFs and the MATH1025 midterm pair for later exercise design after baseline notes exist. |
| `math1025` | MATH1028 overlap material | Unauthored | Overlap | Treat the MATH1028 midterm pair as adjacent-course overlap, not as primary Math1025 conceptual source. |

## Math1010

No `reference/MATH1010/**` source tree is currently present in the repository.
Do not invent a public course plan beyond reserving the architecture for a
future addition.

## CSCI2120

No `reference/CSCI2120/**` or `content/textbook/csci2120/**` tree is currently
present in the repository. The current CSCI expansion is intentionally scoped
to the actual checked-in `CSCI2520` materials.

## Next steps

The next content cycle should focus on QA across the now-broader public Notes
tree: export fidelity, rendering checks, exercise / reveal integrity, and
theme / layout review across Math1090, Math1030, and the expanded CSCI2520
sequence. For MATH1030, the remaining content backlog is now mostly `as02` /
`as03` assignment practice parity and export QA rather than missing core
chapter directories, missing matrix-algebra parameter practice, or missing
RREF proof appendices. Math1025 expansion should remain controlled and
source-backed.
