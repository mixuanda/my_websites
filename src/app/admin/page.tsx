import { existsSync } from "node:fs";
import { join } from "node:path";
import { redirect } from "next/navigation";
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
  const adminBundlePath = join(process.cwd(), "public", "admin", "index.html");
  const adminEmails = getAdminEmails();
  const billingConfig = getBillingConfigStatus();
  const configuredPlans = getBillingPlanConfigs().filter((plan) => plan.priceId);

  if (existsSync(adminBundlePath)) {
    redirect("/admin/index.html");
  }

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
        </section>

        <section className="rounded-xl border bg-card p-5 text-center">
          <h1 className="text-2xl font-semibold">TinaCMS 尚未构建</h1>
          <p className="text-muted-foreground">
            主站已经可以正常部署，但当前环境还没有生成 TinaCMS 的静态管理界面。
          </p>
          <p className="text-sm text-muted-foreground">
            如需启用 `/admin`，请在配置好 Tina 相关环境变量后运行
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5">npm run build:cms</code>
            或
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5">npm run tina:build:auto</code>
            生成后台资源。
          </p>
        </section>
      </div>
    </div>
  );
}
