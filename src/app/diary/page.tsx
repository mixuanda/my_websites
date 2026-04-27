import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { db, initSampleData, usingFirestore } from "@/lib/db";
import { notFoundInProduction } from "@/lib/production-route-guard";
import Link from "next/link";
import { Calendar, Lock, Plus, User, Settings } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export const metadata = {
  title: "私密日记",
  description: "我的私密日记",
  robots: {
    index: false,
    follow: false,
  },
};

// 心情图标映射
const moodEmoji: Record<string, string> = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  excited: "🎉",
  tired: "😴",
};

export default async function DiaryPage() {
  notFoundInProduction();

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = session.user.id || session.user.email || "demo-user";
  
  // 初始化示例数据（仅内存模式用于演示）
  let diaries = await db.getAll(userId);
  if (!usingFirestore && diaries.length === 0) {
    initSampleData(userId);
    diaries = await db.getAll(userId);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            私密日记
          </h1>
          <p className="text-muted-foreground">
            仅你可见的私密内容 · 共 {diaries.length} 篇
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <User className="w-4 h-4" />
            {session.user.name || session.user.email}
          </span>
          <Link href="/settings">
            <Button variant="ghost" size="icon" title="账号设置">
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button variant="outline" size="sm" type="submit">
              退出登录
            </Button>
          </form>
        </div>
      </div>

      {/* Create New */}
      <GlassPanel className="p-4">
        <div className="flex gap-4">
          <Button className="flex-1" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            写新日记
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          💡 提示：这是模板的示例数据。配置数据库后可以保存真实日记。
        </p>
      </GlassPanel>

      {/* Diary List */}
      <div className="space-y-4">
        {diaries.map((diary) => (
          <Link key={diary.id} href={`/diary/${diary.id}`}>
            <GlassCard className="p-6 hover:scale-[1.01] transition-transform cursor-pointer mb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {diary.mood && (
                      <span className="text-lg">{moodEmoji[diary.mood]}</span>
                    )}
                    <h2 className="text-xl font-semibold truncate">{diary.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">{diary.excerpt}</p>
                  {diary.tags && diary.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {diary.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                  <Calendar className="w-4 h-4" />
                  {format(diary.createdAt, "MM月dd日", { locale: zhCN })}
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {diaries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          还没有日记，点击上方按钮创建第一篇
        </div>
      )}

      {/* Info Box */}
      <GlassPanel className="p-4">
        <p className="text-xs text-muted-foreground text-center">
          🔒 此页面内容不会被搜索引擎索引，也不会出现在 sitemap 中
        </p>
      </GlassPanel>
    </div>
  );
}
