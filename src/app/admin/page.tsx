import Link from "next/link";
import { firebaseEnabled } from "@/lib/firebase-admin";
import { getAdminEmails } from "@/lib/membership/config";
import { isMembershipGatingEnabled } from "@/lib/membership/entitlements";
import { getBillingConfigStatus, getBillingPlanConfigs } from "@/lib/membership/plans";

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b py-2 text-sm last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default function AdminPage() {
  const adminEmails = getAdminEmails();
  const billingConfig = getBillingConfigStatus();
  const configuredPlans = getBillingPlanConfigs().filter((plan) => plan.priceId);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-2xl space-y-6">
        <section className="rounded-xl border bg-card p-5">
          <h1 className="text-2xl font-semibold">後台狀態</h1>
          <div className="mt-4">
            <StatusRow label="Admin 白名單" value={`${adminEmails.length} 個 email`} />
            <StatusRow
              label="Firebase / Firestore"
              value={firebaseEnabled ? "已配置" : "未配置"}
            />
            <StatusRow
              label="會員 gating"
              value={isMembershipGatingEnabled() ? "已啟用" : "未啟用"}
            />
            <StatusRow
              label="Stripe secret key"
              value={billingConfig.secretKeyConfigured ? "已配置" : "未配置"}
            />
            <StatusRow
              label="Stripe webhook secret"
              value={billingConfig.webhookSecretConfigured ? "已配置" : "未配置"}
            />
            <StatusRow
              label="Stripe recurring plans"
              value={`${configuredPlans.length} 個已填 price id`}
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            詳細 JSON 診斷可由管理員請求{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              /api/admin/system-status
            </code>
            。
          </p>
          <div className="mt-4">
            <Link className="rounded-md border px-3 py-2 text-sm hover:bg-muted" href="/admin/users">
              打开用户管理
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
