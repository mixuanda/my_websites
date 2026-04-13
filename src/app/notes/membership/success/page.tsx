import Link from "next/link";

export default function MembershipSuccessPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-3xl font-bold">Subscription activated</h1>
      <p className="text-muted-foreground">
        Your membership checkout was completed. Webhook sync may take a short moment before entitlements appear everywhere.
      </p>
      <Link className="underline" href="/notes/membership">
        Back to membership center
      </Link>
    </main>
  );
}
