"use client";

import { Suspense, useState } from "react";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Github, Mail, Fingerprint } from "lucide-react";

function LoginPageContent() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const availableProviders = (process.env.NEXT_PUBLIC_AUTH_PROVIDERS || "github,google")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const callbackUrl = searchParams.get("callbackUrl") || "/diary";

  const showPasskey = availableProviders.includes("passkey");
  const showGithub = availableProviders.includes("github");
  const showGoogle = availableProviders.includes("google");

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    await signIn(provider, { redirectTo: callbackUrl });
    setIsLoading(false);
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
          {showPasskey && (
            <Button
              onClick={() => handleSignIn("passkey")}
              disabled={isLoading}
              className="w-full"
              variant="default"
            >
              <Fingerprint className="w-4 h-4 mr-2" />
              使用 Passkey 登录 (推荐)
            </Button>
          )}

          {(showGithub || showGoogle) && (
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
        </div>

        {showPasskey && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <p className="text-xs text-blue-900 dark:text-blue-200">
              <strong>💡 提示:</strong> Passkey 是最安全的登录方式，使用你的设备的生物识别或 PIN 码验证。无需记住密码！
            </p>
          </div>
        )}

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
