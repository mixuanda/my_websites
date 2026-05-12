# Database Backup and Rollback Runbook

Date: 2026-05-13

Scope: operational runbook for future database work. These steps are not a
request to access production. Do not run production backup, import, migration,
or Vercel environment mutation commands without explicit owner approval.

## Safety Rules

- Do not read `.env.local` or print real secret values during planning.
- Do not pull Vercel secrets unless the owner explicitly approves that action.
- Do not connect to production Firestore during a documentation-only pass.
- Do not write, import, delete, or transform production Firestore data without a
  dated approval and rollback window.
- Prefer a same-project Firestore managed export before any app-level custom
  export script.
- Treat Stripe as the external billing source of truth. The app database stores
  authorization cache and customer mapping, not payment truth.

## Firestore Backup Preconditions

The managed Firestore export service requires:

- Firebase / Google Cloud billing enabled.
- A Cloud Storage bucket in a suitable location.
- Firestore export/import permissions.
- Cloud Storage permissions for the export bucket.
- The Firestore service agent:
  `service-PROJECT_NUMBER@gcp-sa-firestore.iam.gserviceaccount.com`.

For exports to a bucket in the same project, the service agent can usually
access the bucket by default. For cross-project buckets, grant the service
agent explicit bucket permissions before exporting.

## Full Firestore Export

Use a full export before any migration rehearsal or production cutover:

```bash
PROJECT_ID="your-firebase-project-id"
DATABASE="(default)"
BUCKET_NAME="your-firestore-export-bucket"
EXPORT_PREFIX="my-websites/firestore/$(date -u +%Y%m%dT%H%M%SZ)"

gcloud config set project "$PROJECT_ID"
gcloud firestore export "gs://$BUCKET_NAME/$EXPORT_PREFIX" \
  --database="$DATABASE" \
  --async
```

Record the operation name returned by `gcloud`.

Check status:

```bash
gcloud firestore operations list
gcloud firestore operations describe "OPERATION_NAME"
```

The operation status should be saved in the change log for any migration
branch. Record `workEstimated` and `workCompleted` if available.

## Targeted Collection-Group Export

Use targeted exports only for analysis or staged dry runs. A targeted export is
not a complete backup unless it includes every collection group needed by the
current app.

Current collection group IDs to consider:

- `users`
- `accounts`
- `sessions`
- `verificationTokens`
- `credentialUsers`
- `user_entitlements`
- `stripe_customers`
- `textbookProblemAttempts`
- `textbookSectionProgress`
- `diaries`

Example:

```bash
gcloud firestore export "gs://$BUCKET_NAME/$EXPORT_PREFIX-targeted" \
  --database="$DATABASE" \
  --collection-ids="users,accounts,credentialUsers,user_entitlements,stripe_customers,textbookProblemAttempts,textbookSectionProgress,diaries" \
  --async
```

Use a full export for rollback-grade backups.

## Backup Verification Checklist

Before treating an export as usable:

- Operation status is complete.
- Export path contains an `.overall_export_metadata` file.
- The export path is recorded in the implementation issue or PR.
- The bucket has retention and access controls appropriate for private user and
  auth-adjacent data.
- The export was made before any migration write or env switch.
- A staging import or analysis job has proven the backup can be read.

## Import and Restore Policy

Do not import into production as a first rollback action.

Preferred rollback for a failed database migration:

1. Stop reading from the new target database.
2. Switch the application back to Firestore.
3. Disable or drain any dual-write queue.
4. Reconcile mismatched records using comparison reports.

Use `gcloud firestore import` only when source Firestore itself is corrupted or
when importing into a staging/empty recovery project:

```bash
gcloud firestore import "gs://$BUCKET_NAME/$EXPORT_PREFIX" \
  --database="$DATABASE" \
  --async
```

Important: cancelling an import does not undo writes already performed. Never
test import behavior in production.

## Vercel Environment Rollback

For database provider changes, do not overwrite production env vars in place
without recording the old variable names and intended rollback values.

Safe planning commands may list variable names without values:

```bash
npx --yes vercel@latest env ls
```

Do not run commands that reveal or pull secret values unless approved:

```bash
npx --yes vercel@latest env pull .env.local
```

If a database cutover needs Vercel env changes, prepare a non-secret checklist:

- environment: Production, Preview, or Development
- variable name
- provider
- secret/public classification
- old provider role
- new provider role
- rollback owner
- verification route

## Stripe Rollback

Stripe remains the external source of truth for subscriptions and payments.

Before changing entitlement storage:

- Export app database entitlement records.
- Export or list Stripe test-mode subscriptions for rehearsal.
- Record the webhook endpoint in use.
- Verify `/api/stripe/webhook` still rejects missing or invalid signatures.
- Verify old and new entitlement readers agree for test users.

Do not replay live Stripe events or bulk-change live entitlements without
explicit approval.

## Minimum Rehearsal Before Production Migration

1. Fixture conversion test using checked-in sanitized fixture data.
2. Staging Firestore export.
3. Staging import/conversion into target database.
4. User/auth smoke test.
5. Stripe test-mode webhook smoke test.
6. Textbook attempt/progress smoke test.
7. Comparison report for counts and key mappings.
8. Rollback switch test.

## External References Checked

- [Export and import Firestore data](https://firebase.google.com/docs/firestore/manage-data/export-import?hl=en)
- [Vercel Storage overview](https://vercel.com/docs/storage)
