import Link from "next/link";

export default function MembershipCancelPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-3xl font-bold">Checkout canceled</h1>
      <p className="text-muted-foreground">
        No changes were made to your membership. You can return to Notes or try subscription again at any time.
      </p>
      <Link className="underline" href="/notes/membership">
        Return to membership center
      </Link>
    </main>
  );
}
