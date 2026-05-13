import Link from "next/link";
import type { ComponentType } from "react";
import { allTextbookUnits } from "contentlayer/generated";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CreditCard,
  Database,
  FileText,
  LockKeyhole,
  ServerCog,
  ShieldCheck,
  Users,
} from "lucide-react";
import { auth, authBackendStatus } from "@/lib/auth";
import { listAdminUserRows } from "@/lib/admin-users";
import { usingFirestore } from "@/lib/db";
import { getAdminEmails } from "@/lib/membership/config";
import { isMembershipGatingEnabled } from "@/lib/membership/entitlements";
import {
  getBillingConfigStatus,
  getConfiguredBillingPlans,
} from "@/lib/membership/plans";
import { getSiteSurface } from "@/lib/site-surface";
import { allUnits, getVisibleCourseList } from "@/lib/textbook/catalog";
import { getProblemsForUnit } from "@/lib/textbook/problem-bank";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function boolLabel(value: boolean) {
  return value ? "已配置" : "未配置";
}

function formatDate(value?: string) {
  if (!value) return "未記錄";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未記錄";

  return new Intl.DateTimeFormat("zh-HK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function StatCard({
  description,
  icon: Icon,
  label,
  tone = "neutral",
  value,
}: {
  description: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  tone?: "neutral" | "good" | "warn";
  value: string;
}) {
  const toneClass =
    tone === "good"
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : tone === "warn"
        ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
        : "bg-muted text-muted-foreground";

  return (
    <Card className="gap-3 rounded-lg py-5">
      <CardHeader className="px-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardDescription>{label}</CardDescription>
            <CardTitle className="mt-2 text-2xl">{value}</CardTitle>
          </div>
          <span className={`rounded-md p-2 ${toneClass}`}>
            <Icon className="size-4" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-5 text-xs text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
}

function StatusRow({
  label,
  value,
  intent = "neutral",
}: {
  intent?: "neutral" | "good" | "warn";
  label: string;
  value: string;
}) {
  const variant =
    intent === "good" ? "default" : intent === "warn" ? "secondary" : "outline";
  return (
    <div className="grid gap-2 border-b py-3 text-sm last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <span className="text-muted-foreground">{label}</span>
      <Badge variant={variant}>{value}</Badge>
    </div>
  );
}

export default async function AdminPage() {
  const session = await auth();
  const users = await listAdminUserRows();
  const adminEmails = getAdminEmails();
  const billingConfig = getBillingConfigStatus();
  const configuredPlans = getConfiguredBillingPlans();
  const activeMembers = users.filter((user) => user.membership?.status === "active");
  const credentialUsers = users.filter((user) => user.credentialLogin);
  const oauthUsers = users.filter((user) => user.providers.length > 0);
  const recentUsers = users.slice(0, 5);
  const surface = getSiteSurface();
  const visibleCourses = getVisibleCourseList(surface);
  const chapterCount = visibleCourses.reduce(
    (total, course) => total + course.chapters.length,
    0
  );
  const checkpointCount = allUnits.reduce(
    (total, unit) => total + getProblemsForUnit(unit.unitId).length,
    0
  );
  const billingReady =
    configuredPlans.length > 0 &&
    billingConfig.secretKeyConfigured &&
    billingConfig.webhookSecretConfigured;
  const adminEmail = session?.user?.email ?? "admin";

  return (
    <main className="mx-auto w-full max-w-7xl space-y-7 px-4 py-7 md:px-6">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b pb-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">
              <ShieldCheck className="size-3" />
              Admin
            </Badge>
            <Badge variant={surface === "production" ? "secondary" : "outline"}>
              {surface}
            </Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-normal">後台總覽</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            已登入：{adminEmail}。匿名或非管理員訪問 `/admin` 會直接返回 404。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/users">
              <Users className="size-4" />
              用戶
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/en/notes">
              <BookOpen className="size-4" />
              Notes
            </Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          description={`Admin 白名單有 ${adminEmails.length} 個 email。`}
          icon={Users}
          label="已知用戶"
          value={`${users.length}`}
        />
        <StatCard
          description={`${activeMembers.length} 個 active membership；${credentialUsers.length} 個 credentials login。`}
          icon={ShieldCheck}
          label="權限狀態"
          tone={activeMembers.length > 0 ? "good" : "neutral"}
          value={`${users.filter((user) => user.isAdmin).length} admin`}
        />
        <StatCard
          description={usingFirestore ? "持久化資料會寫入 Firestore。" : "目前只適合本機或臨時 preview。"}
          icon={Database}
          label="資料庫"
          tone={usingFirestore ? "good" : "warn"}
          value={usingFirestore ? "Firestore" : "Memory"}
        />
        <StatCard
          description={`${configuredPlans.length} 個 recurring price id；webhook ${boolLabel(billingConfig.webhookSecretConfigured)}。`}
          icon={CreditCard}
          label="Billing"
          tone={billingReady ? "good" : "warn"}
          value={billingReady ? "Ready" : "Partial"}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ServerCog className="size-4" />
              系統狀態
            </CardTitle>
            <CardDescription>
              只顯示配置狀態，不輸出任何 secret。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatusRow
              intent={authBackendStatus.hasConfiguredProvider ? "good" : "warn"}
              label="Auth provider"
              value={authBackendStatus.hasConfiguredProvider ? "已啟用" : "未配置"}
            />
            <StatusRow
              label="Password users"
              value={`${authBackendStatus.passwordUserCount}`}
            />
            <StatusRow
              intent={authBackendStatus.registrationEnabled ? "good" : "neutral"}
              label="Registration"
              value={authBackendStatus.registrationEnabled ? "已啟用" : "未啟用"}
            />
            <StatusRow
              intent={usingFirestore ? "good" : "warn"}
              label="Firebase / Firestore"
              value={usingFirestore ? "持久化" : "memory fallback"}
            />
            <StatusRow
              intent={isMembershipGatingEnabled() ? "good" : "neutral"}
              label="Notes membership gating"
              value={isMembershipGatingEnabled() ? "已啟用" : "未啟用"}
            />
            <StatusRow
              intent={billingConfig.secretKeyConfigured ? "good" : "warn"}
              label="Stripe secret key"
              value={boolLabel(billingConfig.secretKeyConfigured)}
            />
            <StatusRow
              intent={billingConfig.webhookSecretConfigured ? "good" : "warn"}
              label="Stripe webhook secret"
              value={boolLabel(billingConfig.webhookSecretConfigured)}
            />
            <StatusRow
              intent={configuredPlans.length > 0 ? "good" : "warn"}
              label="Recurring plans"
              value={`${configuredPlans.length}`}
            />
            <StatusRow
              intent={billingConfig.appUrlConfigured ? "good" : "warn"}
              label="App URL"
              value={boolLabel(billingConfig.appUrlConfigured)}
            />
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-4" />
              最近用戶
            </CardTitle>
            <CardDescription>
              來自 Firestore 或當前 memory store 的管理視圖。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.length ? (
              recentUsers.map((user) => (
                <div
                  className="grid gap-2 rounded-md border p-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto]"
                  key={user.email}
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{user.name || user.email}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-left text-xs text-muted-foreground sm:text-right">
                    <p>{user.isAdmin ? "Admin" : user.role}</p>
                    <p>{formatDate(user.lastLoginAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
                尚未有可顯示的用戶資料。
              </p>
            )}
            <Button asChild variant="secondary" className="w-full">
              <Link href="/admin/users">
                查看完整用戶表
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-4" />
              Notes 內容
            </CardTitle>
            <CardDescription>當前公開 Notes catalog 和已生成 MDX 文檔。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <StatusRow label="Courses" value={`${visibleCourses.length}`} />
            <StatusRow label="Chapters" value={`${chapterCount}`} />
            <StatusRow label="Catalog units" value={`${allUnits.length}`} />
            <StatusRow label="Localized documents" value={`${allTextbookUnits.length}`} />
            <StatusRow label="Checkpoint problems" value={`${checkpointCount}`} />
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="size-4" />
              Admin 邊界
            </CardTitle>
            <CardDescription>後台入口不再把匿名訪客導向登入頁。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>匿名訪問 `/admin`：404。</p>
            <p>非白名單登入訪問 `/admin`：404。</p>
            <p>白名單管理員登入後：顯示後台總覽與用戶表。</p>
            <p>`ADMIN_EMAILS` 仍是唯一的管理員判定來源。</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              運行文檔
            </CardTitle>
            <CardDescription>本分支新增的資料庫與部署決策文檔。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              "docs/database-inventory.md",
              "docs/database-backup-rollback-runbook.md",
              "docs/billing-entitlement-reconciliation.md",
              "docs/vercel-database-evaluation.md",
            ].map((path) => (
              <div className="rounded-md border px-3 py-2 font-mono text-xs" key={path}>
                {path}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="rounded-lg border bg-muted/25 p-4 text-xs text-muted-foreground">
        OAuth users: {oauthUsers.length}. Credentials users: {credentialUsers.length}.
        本頁不會顯示 secret；需要 raw JSON 時由管理員請求 `/api/admin/system-status`。
      </section>
    </main>
  );
}
