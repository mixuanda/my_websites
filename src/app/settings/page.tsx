"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Check,
  Database,
  Github,
  Link2,
  Loader2,
  LockKeyhole,
  Mail,
  Save,
  ShieldCheck,
  Unlink,
  User,
} from "lucide-react";

interface Account {
  id: string;
  provider: string;
  providerAccountId: string;
  type: string;
}

interface UserProfile {
  createdAt: string;
  email: string;
  id: string;
  image?: string | null;
  lastLoginAt?: string;
  loginCount: number;
  name?: string | null;
  preferredLocale: "en" | "zh-hk" | "zh-cn";
  role: "admin" | "member" | "user";
  theme: "system" | "light" | "dark";
  updatedAt: string;
}

interface ProfileResponse {
  backend: {
    authProvidersConfigured: boolean;
    passwordUserCount: number;
    persistence: "firestore" | "memory";
  };
  profile: UserProfile | null;
}

const providerInfo: Record<string, { name: string; icon: React.ReactNode; color: string }> = {
  credentials: {
    name: "站点账号",
    icon: <LockKeyhole className="w-5 h-5" />,
    color: "bg-blue-700 hover:bg-blue-800",
  },
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
  .filter((p) => !["credentials", "password", "passkey"].includes(p));

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [backend, setBackend] = useState<ProfileResponse["backend"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileForm, setProfileForm] = useState({
    name: "",
    preferredLocale: "en" as UserProfile["preferredLocale"],
    theme: "system" as UserProfile["theme"],
  });
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      Promise.all([fetchProfile(), fetchAccounts()]).finally(() => setLoading(false));
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = (await res.json()) as ProfileResponse;
      setBackend(data.backend ?? null);
      setProfile(data.profile ?? null);
      if (data.profile) {
        setProfileForm({
          name: data.profile.name ?? "",
          preferredLocale: data.profile.preferredLocale,
          theme: data.profile.theme,
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/user/accounts");
      const data = await res.json();
      setAccounts(data.accounts || []);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    }
  };

  const handleLinkAccount = async (provider: string) => {
    setLinking(provider);
    // 使用 signIn 并设置 redirect: false，然后手动处理
    // 这会创建新的 account 记录并链接到当前用户（基于 email）
    await signIn(provider, { callbackUrl: "/settings" });
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileMessage(null);

    try {
      const res = await fetch("/api/user/profile", {
        body: JSON.stringify(profileForm),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error(`Profile update failed: ${res.status}`);
      }

      const data = (await res.json()) as { profile: UserProfile };
      setProfile(data.profile);
      setProfileMessage("账号资料已更新。");
    } catch (error) {
      console.error("Failed to save profile:", error);
      setProfileMessage("保存失败，请稍后重试。");
    } finally {
      setSavingProfile(false);
    }
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
          {profile?.image || session.user.image ? (
            <Image
              src={profile?.image || session.user.image || ""}
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
          <div className="min-w-0">
            <h2 className="text-xl font-semibold truncate">
              {profile?.name || session.user.name || "用户"}
            </h2>
            <p className="text-muted-foreground truncate">
              {profile?.email || session.user.email}
            </p>
            {profile ? (
              <p className="mt-1 text-xs text-muted-foreground">用户 ID: {profile.id}</p>
            ) : null}
          </div>
        </div>
      </GlassCard>

      {/* Profile Preferences */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          用户资料与偏好
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium" htmlFor="profile-name">
              显示名称
            </label>
            <Input
              id="profile-name"
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              value={profileForm.name}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="profile-locale">
              默认语言
            </label>
            <select
              id="profile-locale"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  preferredLocale: event.target.value as UserProfile["preferredLocale"],
                }))
              }
              value={profileForm.preferredLocale}
            >
              <option value="en">English</option>
              <option value="zh-hk">繁體中文</option>
              <option value="zh-cn">简体中文</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="profile-theme">
              默认主题
            </label>
            <select
              id="profile-theme"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  theme: event.target.value as UserProfile["theme"],
                }))
              }
              value={profileForm.theme}
            >
              <option value="system">跟随系统</option>
              <option value="light">浅色</option>
              <option value="dark">深色</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            {profile?.lastLoginAt
              ? `上次登录：${new Date(profile.lastLoginAt).toLocaleString()}`
              : "此账号还没有记录登录时间。"}
          </div>
          <Button onClick={handleSaveProfile} disabled={savingProfile}>
            {savingProfile ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            保存资料
          </Button>
        </div>
        {profileMessage ? (
          <p className="mt-3 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
            {profileMessage}
          </p>
        ) : null}
      </GlassCard>

      {/* Backend Status */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Database className="w-5 h-5" />
          后端状态
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">数据持久化</p>
            <p className="font-medium">
              {backend?.persistence === "firestore" ? "Firestore" : "内存模式"}
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">认证 Provider</p>
            <p className="font-medium">
              {backend?.authProvidersConfigured ? "已配置" : "未配置"}
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">站点账号</p>
            <p className="font-medium">{backend?.passwordUserCount ?? 0} 个</p>
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
          绑定多个 OAuth 账号后，使用任意一个都可以登录到相同的账户。站点账号由后端环境变量控制，不在前端创建。
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
