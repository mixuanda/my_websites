# Branch Merge Checkpoints

Date: 2026-05-13

Scope: merge recent outstanding branches into `main`, verify the merged result, and clean up inactive branches only after they are proven merged.

## Checkpoints

### Checkpoint 1 - repository baseline

- Current checkout: `main`
- Upstream: `origin/main`
- Worktree state before merge: clean
- Remote: `origin git@github.com:mixuanda/my_websites.git`

### Checkpoint 2 - outstanding branch inventory

- `gh pr list --state open`: no open pull requests
- Remote branches not merged into `origin/main`:
  - `origin/codex/tiered-access-development`
  - `origin/codex/tinacms-database-workflow-plan`
- Linked worktrees currently hold several branch checkouts, so local branch deletion must avoid removing active worktree state.

### Checkpoint 3 - merge execution

- Merged `origin/codex/tiered-access-development` into `main`.
- Conflict handling:
  - `.contentlayer/generated/TextbookUnit/_index.json`
  - `.contentlayer/generated/TextbookUnit/_index.mjs`
- Resolution: kept the current generated files during conflict resolution and scheduled a fresh Contentlayer rebuild after all branch merges.
- Next merge target: `origin/codex/tinacms-database-workflow-plan`.
- Merged `origin/codex/tinacms-database-workflow-plan` into `main`.
- Conflict handling: no manual conflicts.
- Notable scope: TinaCMS removal, private admin dashboard modernization, database workflow/runbook documentation, package dependency changes.
- Next action: regenerate Contentlayer output and run verification.

### Checkpoint 4 - verification

- `npm run contentlayer`: passed; regenerated 232 documents.
- `npm run verify:mdx-tables`: passed.
- `npm run lint`: passed.
- `npx tsc --noEmit --pretty false`: passed.
- `git diff --check`: passed.
- `npm run check:textbook-content`: exited 0 with existing content-depth warnings.
- `AUTH_SECRET=local-test-secret npm run build`: passed; generated 313 static pages.
- Local production smoke:
  - `/en/notes`: 200
  - `/en/notes/math1090/logic/quantifiers-negation`: 200
  - TXT export for the same note: 200
  - PDF export for the same note: 200
- Merge fallout found and fixed:
  - `/api/stripe/webhook` was returning production 404 through the billing webhook guard.
  - Fixed by keeping the webhook reachable and relying on Stripe signature validation instead of the production preview guard.
- Re-verification after the webhook fix:
  - `npm run lint`: passed.
  - `npx tsc --noEmit --pretty false`: passed.
  - `git diff --check`: passed.
  - `AUTH_SECRET=local-test-secret npm run build`: passed.
  - Production-surface `/api/stripe/webhook` without `stripe-signature`: 400.
  - Production-surface `/api/billing/status`: 404 by design.
  - Preview-surface `/api/billing/status`: 200.

### Checkpoint 5 - push and branch cleanup

- Pushed merged `main` to `origin/main`.
- Vercel production deployment for commit `bb66317c8ae55c8acf2c2235c8b21fcf517f98cf`: Ready.
- Production smoke on `https://www.evanalysis.top`:
  - `/en/notes`: 200
  - `/en/notes/math1090/logic/quantifiers-negation`: 200
  - TXT export for the same note: 200
  - `/api/stripe/webhook` without `stripe-signature`: 400
- Remote inactive branches deleted after verification:
  - `CSCI2520`
  - `codex/create-content-pipeline-for-storyboard-segments`
  - `codex/create-mandatory-authoring-template-and-checks`
  - `codex/define-mcq-and-fill-in-the-blank-problem-schema`
  - `codex/define-product-model-and-implement-checkout`
  - `codex/implement-subscription-membership-model`
  - `codex/notes-shell-foundation`
  - `codex/seo-search-console`
  - `codex/table-rendering-fix`
  - `codex/textbook-deploy-fix`
  - `codex/tiered-access-development`
  - `codex/tinacms-database-workflow-plan`
  - `codex/vercel-analytics`
  - `optimization`
- Local inactive branches deleted:
  - `codex/pre-merge-all-20260512`
  - `codex/tablefixed`
- Local branches still checked out in linked worktrees were not force-deleted.
