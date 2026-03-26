"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Github, Mail, Link2, Unlink, User, ArrowLeft, Loader2, Check } from "lucide-react";

interface Account {
  id: string;
  provider: string;
  providerAccountId: string;
  type: string;
}

const providerInfo: Record<string, { name: string; icon: React.ReactNode; color: string }> = {
  github: {
    name: "GitHub",
    icon: <Github className="w-5 h-5" />,
    color: "bg-gray-800 hover:bg-gray-700",
  },
  google: {
    name: "Google",
    icon: <Mail className="w-5 h-5" />,
    color: "bg-red-500 hover:bg-red-600",
  },
};

// 可用的 providers（根据环境变量配置）
const availableProviders = (process.env.NEXT_PUBLIC_AUTH_PROVIDERS || "github,google")
  .split(",")
  .map((p) => p.trim())
  .filter((p) => p !== "passkey");

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchAccounts();
    }
  }, [session]);

  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/user/accounts");
      const data = await res.json();
      setAccounts(data.accounts || []);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkAccount = async (provider: string) => {
    setLinking(provider);
    // 使用 signIn 并设置 redirect: false，然后手动处理
    // 这会创建新的 account 记录并链接到当前用户（基于 email）
    await signIn(provider, { callbackUrl: "/settings" });
  };

  const linkedProviders = accounts.map((a) => a.provider);
  const unlinkedProviders = availableProviders.filter((p) => !linkedProviders.includes(p));

  if (status === "loading" || loading) {
    return (
      <div className="max-w-2xl mx-auto mt-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Back Link */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">账号设置</h1>
        <p className="text-muted-foreground">管理你的登录方式和绑定账号</p>
      </div>

      {/* User Info */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-4">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="Avatar"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{session.user.name || "用户"}</h2>
            <p className="text-muted-foreground">{session.user.email}</p>
          </div>
        </div>
      </GlassCard>

      {/* Linked Accounts */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Link2 className="w-5 h-5" />
          已绑定的账号
        </h3>
        
        {accounts.length === 0 ? (
          <p className="text-muted-foreground text-sm">暂无绑定账号信息</p>
        ) : (
          <div className="space-y-3">
            {accounts.map((account) => {
              const info = providerInfo[account.provider];
              return (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${info?.color || "bg-gray-500"} text-white`}>
                      {info?.icon || <User className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium">{info?.name || account.provider}</p>
                      <p className="text-xs text-muted-foreground">
                        ID: {account.providerAccountId.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">已绑定</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>

      {/* Link New Account */}
      {unlinkedProviders.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Unlink className="w-5 h-5" />
            绑定更多账号
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            绑定后，你可以使用以下任意方式登录同一个账号
          </p>
          <div className="space-y-3">
            {unlinkedProviders.map((provider) => {
              const info = providerInfo[provider];
              return (
                <Button
                  key={provider}
                  onClick={() => handleLinkAccount(provider)}
                  disabled={linking !== null}
                  variant="outline"
                  className="w-full justify-start gap-3"
                >
                  {linking === provider ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    info?.icon || <User className="w-5 h-5" />
                  )}
                  绑定 {info?.name || provider}
                </Button>
              );
            })}
          </div>
        </GlassCard>
      )}

      {/* Info */}
      <GlassPanel className="p-4">
        <p className="text-xs text-muted-foreground text-center">
          💡 绑定多个账号后，使用任意一个都可以登录到相同的账户。账号绑定基于邮箱地址匹配。
        </p>
      </GlassPanel>

      {/* Logout */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-destructive hover:text-destructive"
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}
