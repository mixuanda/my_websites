import Link from "next/link";
import { listAdminUserRows } from "@/lib/admin-users";

export const metadata = {
  title: "User Management - Admin",
  robots: {
    index: false,
    follow: false,
  },
};

function formatDate(value?: string) {
  if (!value) return "未记录";
  return new Intl.DateTimeFormat("zh-HK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusLabel(status?: string) {
  switch (status) {
    case "active":
      return "Active";
    case "trialing":
      return "Trialing";
    case "past_due":
      return "Past due";
    case "canceled":
      return "Canceled";
    case "unpaid":
      return "Unpaid";
    case "inactive":
      return "Inactive";
    default:
      return "Free / none";
  }
}

export default async function AdminUsersPage() {
  const users = await listAdminUserRows();

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Admin</p>
          <h1 className="text-3xl font-semibold">用户管理</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            查看登录账号、管理员白名单、会员状态、Stripe 订阅同步状态和最近登录记录。
          </p>
        </div>
        <Link
          className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
          href="/admin"
        >
          返回后台状态
        </Link>
      </div>

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">用户总数</p>
          <p className="mt-1 text-2xl font-semibold">{users.length}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">管理员</p>
          <p className="mt-1 text-2xl font-semibold">
            {users.filter((user) => user.isAdmin).length}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">会员订阅</p>
          <p className="mt-1 text-2xl font-semibold">
            {users.filter((user) => user.membership?.status === "active").length}
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">用户</th>
                <th className="px-4 py-3 font-medium">角色</th>
                <th className="px-4 py-3 font-medium">登录方式</th>
                <th className="px-4 py-3 font-medium">会员状态</th>
                <th className="px-4 py-3 font-medium">登录次数</th>
                <th className="px-4 py-3 font-medium">最近登录</th>
                <th className="px-4 py-3 font-medium">更新时间</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const providers = [
                  ...user.providers,
                  user.credentialLogin ? "credentials" : null,
                ].filter(Boolean);

                return (
                  <tr key={user.email} className="border-b last:border-b-0">
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium">{user.name || user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="mt-1 text-xs text-muted-foreground">ID: {user.id}</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="rounded-full border px-2 py-1 text-xs">
                        {user.isAdmin ? "Admin" : user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      {providers.length ? providers.join(", ") : "未记录"}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <p>{statusLabel(user.membership?.status)}</p>
                      {user.membership?.subscriptionId ? (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {user.membership.subscriptionId}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 align-top">{user.loginCount}</td>
                    <td className="px-4 py-3 align-top">{formatDate(user.lastLoginAt)}</td>
                    <td className="px-4 py-3 align-top">{formatDate(user.updatedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-muted-foreground">
        该页面只提供管理视图；角色提升仍由服务器端 `ADMIN_EMAILS` 控制，会员状态由 Stripe webhook 同步。
      </p>
    </main>
  );
}
