import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { db, initSampleData } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Calendar, Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export const metadata = {
  title: "日记详情",
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DiaryDetailPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const userId = session.user.id || session.user.email || "demo-user";
  
  // 确保有示例数据
  let diaries = await db.getAll(userId);
  if (diaries.length === 0) {
    initSampleData(userId);
  }
  
  const diary = await db.getById(userId, id);

  if (!diary) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Link */}
      <Link
        href="/diary"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        返回日记列表
      </Link>

      {/* Diary Header */}
      <GlassCard className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {diary.mood && (
              <span className="text-2xl">{moodEmoji[diary.mood]}</span>
            )}
            <h1 className="text-3xl font-bold">{diary.title}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive">
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {format(diary.createdAt, "yyyy年MM月dd日 HH:mm", { locale: zhCN })}
          </span>
          {diary.tags && diary.tags.length > 0 && (
            <div className="flex gap-2">
              {diary.tags.map((tag) => (
                <span key={tag} className="bg-muted px-2 py-0.5 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </GlassCard>

      {/* Diary Content */}
      <GlassCard className="p-6 md:p-8">
        <div className="prose prose-invert max-w-none">
          {diary.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.replace("## ", "")}</h2>;
            }
            if (line.startsWith("- ")) {
              return <li key={i} className="ml-4">{line.replace("- ", "")}</li>;
            }
            if (line.match(/^\d+\. /)) {
              return <li key={i} className="ml-4">{line.replace(/^\d+\. /, "")}</li>;
            }
            if (line.trim() === "") {
              return <br key={i} />;
            }
            return <p key={i} className="my-2">{line}</p>;
          })}
        </div>
      </GlassCard>

      {/* Privacy Notice */}
      <GlassPanel className="p-4">
        <p className="text-xs text-muted-foreground text-center">
          🔒 此内容仅你可见 · 最后更新于 {format(diary.updatedAt, "yyyy-MM-dd HH:mm", { locale: zhCN })}
        </p>
      </GlassPanel>
    </div>
  );
}
