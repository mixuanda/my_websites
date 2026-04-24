"use client";

import { type FormEvent, Suspense, useState } from "react";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Github, LockKeyhole, Mail } from "lucide-react";

function LoginPageContent() {
  const [credentialError, setCredentialError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const availableProviders = (process.env.NEXT_PUBLIC_AUTH_PROVIDERS || "github,google")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const callbackUrl = searchParams.get("callbackUrl") || "/diary";

  const isLoading = Boolean(loadingProvider);
  const showCredentials =
    availableProviders.includes("credentials") || availableProviders.includes("password");
  const showGithub = availableProviders.includes("github");
  const showGoogle = availableProviders.includes("google");

  const handleSignIn = async (provider: string) => {
    setCredentialError(null);
    setLoadingProvider(provider);
    await signIn(provider, { redirectTo: callbackUrl });
    setLoadingProvider(null);
  };

  const handleCredentialSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCredentialError(null);
    setLoadingProvider("credentials");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: callbackUrl,
    });

    setLoadingProvider(null);

    if (!result?.ok) {
      setCredentialError("邮箱或密码不正确，或此登录方式尚未在后端配置。");
      return;
    }

    router.push(result.url || callbackUrl);
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <GlassCard className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">登录</h1>
          <p className="text-muted-foreground">
            选择你喜欢的登录方式
          </p>
        </div>

        <div className="space-y-3">
          {showCredentials && (
            <form onSubmit={handleCredentialSignIn} className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="login-email">
                  邮箱
                </label>
                <Input
                  id="login-email"
                  autoComplete="email"
                  inputMode="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="login-password">
                  密码
                </label>
                <Input
                  id="login-password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
              </div>
              {credentialError ? (
                <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {credentialError}
                </p>
              ) : null}
              <Button
                className="w-full"
                disabled={isLoading}
                type="submit"
                variant="default"
              >
                <LockKeyhole className="w-4 h-4 mr-2" />
                使用站点账号登录
              </Button>
            </form>
          )}

          {showCredentials && (showGithub || showGoogle) && (
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  或使用其他方式
                </span>
              </div>
            </div>
          )}

          {showGithub && (
            <Button
              onClick={() => handleSignIn("github")}
              disabled={isLoading}
              className="w-full"
              variant="outline"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          )}

          {showGoogle && (
            <Button
              onClick={() => handleSignIn("google")}
              disabled={isLoading}
              className="w-full"
              variant="outline"
            >
              <Mail className="w-4 h-4 mr-2" />
              Google
            </Button>
          )}

          {!showCredentials && !showGithub && !showGoogle ? (
            <p className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              当前没有公开启用的登录方式。请先配置后端认证 provider。
            </p>
          ) : null}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          仅限授权用户访问私密内容
        </p>
      </GlassCard>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto mt-20" />}>
      <LoginPageContent />
    </Suspense>
  );
}
