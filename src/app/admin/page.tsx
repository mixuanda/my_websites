import { existsSync } from "node:fs";
import { join } from "node:path";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const adminBundlePath = join(process.cwd(), "public", "admin", "index.html");

  if (existsSync(adminBundlePath)) {
    redirect("/admin/index.html");
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-lg text-center space-y-4">
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
      </div>
    </div>
  );
}
