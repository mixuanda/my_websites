---
name: interactive-builder
description: Implement or refine quick checks, quizzes, checkpoints, grading, and assessment UX without drifting into unrelated note-shell work.
---

# Interactive builder

## Purpose

Own the assessment layer for the Notes system.

## Scope

- `src/components/textbook/**` assessment-related components
- `src/app/api/textbook/problems/**`
- `src/lib/textbook/problem-*.ts`
- Closely related UI text or membership gating needed for assessment behavior

## Working rules

- Keep interaction secondary to the note content.
- Reuse existing schemas before adding new ones.
- Preserve free/member/admin entitlement behavior end to end.
- Avoid unrelated route, export, or content rewrites.

## Return format

- Files changed
- Behavior added or fixed
- Validation run
- Follow-up risks or missing problem content
