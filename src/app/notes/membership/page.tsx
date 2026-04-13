import Link from "next/link";
import { auth } from "@/lib/auth";
import { getUserEntitlements } from "@/lib/membership/entitlements";
import { BillingActions } from "@/components/membership/BillingActions";

export default async function MembershipPage() {
  const session = await auth();
  const entitlements = await getUserEntitlements(session);

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">Notes Membership</h1>
      <p className="text-muted-foreground">
        Membership unlocks advanced notes, premium checkpoints, more worked examples, and full guided solutions.
      </p>

      <section className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Access model</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Free: core notes, selected quick checks, selected worked examples.</li>
          <li>Member: advanced notes, premium quizzes, guided solutions, and deeper checkpoints.</li>
          <li>Admin: full access automatically through server-side whitelist, no payment required.</li>
        </ul>
      </section>

      <section className="rounded-xl border p-6">
        <p className="text-sm text-muted-foreground">Current access tier</p>
        <p className="mt-1 text-lg font-semibold">
          {entitlements.isAdmin ? "Admin (full access)" : entitlements.isMember ? "Member" : "Free"}
        </p>
        <div className="mt-4">
          <BillingActions />
        </div>
      </section>

      <p className="text-sm text-muted-foreground">
        Premium note units are marked inside Notes pages. Return to <Link className="underline" href="/zh-hk/notes">Notes</Link>.
      </p>
    </main>
  );
}
