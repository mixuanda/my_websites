import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldX, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "无权限访问",
};

export default function UnauthorizedPage() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <GlassCard className="p-8 text-center">
        <ShieldX className="w-16 h-16 mx-auto mb-4 text-destructive" />
        <h1 className="text-2xl font-bold mb-2">无权限访问</h1>
        <p className="text-muted-foreground mb-6">
          抱歉，你没有权限访问此页面。此区域仅限管理员使用。
        </p>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Button>
        </Link>
      </GlassCard>
    </div>
  );
}
