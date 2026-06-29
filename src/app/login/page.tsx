"use client";

import { type FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { getProviders, signIn } from "next-auth/react";
import { Github, LockKeyhole, Mail } from "lucide-react";
import { parsePublicAuthProviders } from "@/lib/auth-providers";
import { getFirebaseClientAuth, getFirebasePopupProvider } from "@/lib/firebase-client";
import { isFirebaseClientAuthConfigured } from "@/lib/firebase-client-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  type User as FirebaseUser,
} from "firebase/auth";

type TurnstileRenderOptions = {
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  sitekey: string;
};

type TurnstileApi = {
  remove?: (widgetId: string) => void;
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
};

type RegistrationReadiness = {
  blockers: string[];
  captcha: {
    configured: boolean;
    required: boolean;
  };
  enabled: boolean;
  firebase?: {
    bridgeConfigured: boolean;
    clientConfigured: boolean;
    missingClientEnv: string[];
  };
  persistence: {
    configured: boolean;
    required: boolean;
  };
  ready: boolean;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function LoginPageContent() {
  const [credentialError, setCredentialError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [providersLoaded, setProvidersLoaded] = useState(false);
  const [registrationReadiness, setRegistrationReadiness] =
    useState<RegistrationReadiness | null>(null);
  const [registrationReadinessLoaded, setRegistrationReadinessLoaded] = useState(false);
  const [serverProviders, setServerProviders] = useState<string[]>([]);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const availableProviders = parsePublicAuthProviders(
    process.env.NEXT_PUBLIC_AUTH_PROVIDERS
  );
  const availableProviderKey = availableProviders.join(",");
  const callbackUrl = searchParams.get("callbackUrl") || "/diary";
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
  const registrationVerificationRequired =
    process.env.NEXT_PUBLIC_AUTH_REGISTRATION_REQUIRE_TURNSTILE === "true";
  const firebaseClientConfigured = isFirebaseClientAuthConfigured();

  const isLoading = Boolean(loadingProvider);
  const firebaseBridgeConfigured = serverProviders.includes("firebase");
  const firebaseAuthReady = firebaseClientConfigured && firebaseBridgeConfigured;
  const showCredentials =
    (availableProviders.includes("credentials") || availableProviders.includes("password")) &&
    firebaseAuthReady;
  const showGithub =
    availableProviders.includes("github") && firebaseAuthReady;
  const showGoogle =
    availableProviders.includes("google") && firebaseAuthReady;
  const registrationEnabled = process.env.NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED === "true";
  const captchaMissing =
    mode === "register" && registrationVerificationRequired && !turnstileSiteKey;
  const serverCaptchaMissing =
    mode === "register" &&
    registrationReadiness !== null &&
    registrationReadiness.captcha.required &&
    !registrationReadiness.captcha.configured;
  const registrationStorageMissing =
    mode === "register" &&
    registrationReadiness !== null &&
    registrationReadiness.persistence.required &&
    !registrationReadiness.persistence.configured;
  const registrationStatusMissing =
    mode === "register" && registrationEnabled && registrationReadinessLoaded && !registrationReadiness;
  const registrationStatusPending =
    mode === "register" && registrationEnabled && !registrationReadinessLoaded;
  const registrationNotReady =
    mode === "register" &&
    registrationEnabled &&
    registrationReadinessLoaded &&
    (!registrationReadiness || !registrationReadiness.ready);
  const captchaTokenMissing =
    mode === "register" &&
    registrationVerificationRequired &&
    Boolean(turnstileSiteKey) &&
    !turnstileToken;
  const firebaseMissing =
    providersLoaded &&
    availableProviders.length > 0 &&
    (!firebaseClientConfigured || !firebaseBridgeConfigured);
  const pageTitle = mode === "register" ? "创建账号" : "登录";
  const pageDescription =
    mode === "register"
      ? "使用邮箱密码创建站点账号。也可以使用 Google 或 GitHub 登录。"
      : "使用邮箱密码、Google 或 GitHub 登录。";

  useEffect(() => {
    if (registrationEnabled && searchParams.get("mode") === "register") {
      setMode("register");
    }
  }, [registrationEnabled, searchParams]);

  useEffect(() => {
    if (!availableProviderKey) {
      setServerProviders([]);
      setProvidersLoaded(true);
      return;
    }

    getProviders()
      .then((providers) => {
        setServerProviders(Object.keys(providers ?? {}));
      })
      .catch(() => {
        setServerProviders([]);
      })
      .finally(() => {
        setProvidersLoaded(true);
      });
  }, [availableProviderKey]);

  useEffect(() => {
    if (!registrationEnabled) {
      setRegistrationReadiness(null);
      setRegistrationReadinessLoaded(true);
      return;
    }

    fetch("/api/auth/register", {
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("registration_status_unavailable");
        }

        setRegistrationReadiness((await response.json()) as RegistrationReadiness);
      })
      .catch(() => {
        setRegistrationReadiness(null);
      })
      .finally(() => {
        setRegistrationReadinessLoaded(true);
      });
  }, [registrationEnabled]);

  useEffect(() => {
    if (
      mode !== "register" ||
      !turnstileSiteKey ||
      !turnstileReady ||
      !turnstileContainerRef.current ||
      !window.turnstile ||
      turnstileWidgetIdRef.current
    ) {
      return;
    }

    turnstileWidgetIdRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        callback: (token) => setTurnstileToken(token),
        "error-callback": () => setTurnstileToken(""),
        "expired-callback": () => setTurnstileToken(""),
        sitekey: turnstileSiteKey,
      }
    );

    return () => {
      if (turnstileWidgetIdRef.current) {
        window.turnstile?.remove?.(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
      setTurnstileToken("");
    };
  }, [mode, turnstileReady, turnstileSiteKey]);

  function messageForFirebaseError(error: unknown) {
    const code = (error as { code?: string }).code;
    const message = error instanceof Error ? error.message : "";

    switch (code) {
      case "auth/email-already-in-use":
        return "这个邮箱已经注册，请直接登录。";
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "邮箱或密码不正确。";
      case "auth/popup-blocked":
        return "浏览器阻止了登录弹窗，请允许弹窗后重试。";
      case "auth/popup-closed-by-user":
        return "登录弹窗已关闭。";
      case "auth/unauthorized-domain":
        return "当前域名尚未加入 Firebase Authentication 授权域名。";
      case "auth/weak-password":
        return "密码强度不足，请使用至少 8 个字符。";
      default:
        return message || "登录失败，请稍后再试。";
    }
  }

  const completeFirebaseBridgeSignIn = async (user: FirebaseUser) => {
    const idToken = await user.getIdToken(true);
    const result = await signIn("firebase", {
      idToken,
      redirect: false,
      redirectTo: callbackUrl,
    });

    if (!result?.ok) {
      throw new Error("Firebase 登录已完成，但站点会话创建失败。");
    }

    router.push(result.url || callbackUrl);
    router.refresh();
  };

  const handleSignIn = async (provider: "github" | "google") => {
    setCredentialError(null);
    setLoadingProvider(provider);

    try {
      const firebaseAuth = getFirebaseClientAuth();
      const credential = await signInWithPopup(
        firebaseAuth,
        getFirebasePopupProvider(provider)
      );
      await completeFirebaseBridgeSignIn(credential.user);
    } catch (error) {
      setCredentialError(messageForFirebaseError(error));
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleCredentialSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCredentialError(null);
    setLoadingProvider("credentials");

    try {
      const firebaseAuth = getFirebaseClientAuth();
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await completeFirebaseBridgeSignIn(credential.user);
    } catch (error) {
      setCredentialError(messageForFirebaseError(error));
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCredentialError(null);
    setLoadingProvider("register");

    try {
      if (password !== passwordConfirm) {
        throw new Error("两次输入的密码不一致。");
      }

      const response = await fetch("/api/auth/register", {
        body: JSON.stringify({ email, name, password, turnstileToken }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "账号创建失败。");
      }

      const firebaseAuth = getFirebaseClientAuth();
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await completeFirebaseBridgeSignIn(credential.user);
    } catch (error) {
      setCredentialError(messageForFirebaseError(error));
      setTurnstileToken("");
      if (turnstileWidgetIdRef.current) {
        window.turnstile?.reset(turnstileWidgetIdRef.current);
      }
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="mx-auto mt-12 w-[calc(100vw-4rem)] max-w-md sm:mt-20 sm:w-full">
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
        />
      ) : null}
      <GlassCard className="w-full p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{pageTitle}</h1>
          <p className="break-words text-muted-foreground">
            {pageDescription}
          </p>
        </div>

        <div className="space-y-3">
          {showCredentials && (
            <form
              onSubmit={mode === "register" ? handleRegister : handleCredentialSignIn}
              className="space-y-3"
            >
              {mode === "register" ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="login-name">
                    显示名称
                  </label>
                  <Input
                    id="login-name"
                    autoComplete="name"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="你的名字"
                    type="text"
                    value={name}
                  />
                </div>
              ) : null}
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
                  autoComplete={mode === "register" ? "new-password" : "current-password"}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                  type="password"
                  value={password}
                />
              </div>
              {mode === "register" ? (
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    htmlFor="login-password-confirm"
                  >
                    确认密码
                  </label>
                  <Input
                    id="login-password-confirm"
                    autoComplete="new-password"
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    minLength={8}
                    required
                    type="password"
                    value={passwordConfirm}
                  />
                </div>
              ) : null}
              {mode === "register" && turnstileSiteKey ? (
                <div className="flex min-h-[65px] justify-center">
                  <div ref={turnstileContainerRef} />
                </div>
              ) : null}
              {captchaMissing ? (
                <p className="rounded-md border border-amber-300/50 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-100">
                  注册验证码尚未配置完成，暂时不能开放注册。
                </p>
              ) : null}
              {registrationStatusPending ? (
                <p className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                  正在检查注册服务状态。
                </p>
              ) : null}
              {registrationStorageMissing ? (
                <p className="rounded-md border border-amber-300/50 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-100">
                  注册存储尚未配置完成，暂时不能开放注册。
                </p>
              ) : null}
              {serverCaptchaMissing && !captchaMissing ? (
                <p className="rounded-md border border-amber-300/50 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-100">
                  注册验证码服务端密钥尚未配置完成，暂时不能开放注册。
                </p>
              ) : null}
              {registrationStatusMissing ? (
                <p className="rounded-md border border-amber-300/50 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-100">
                  注册服务状态暂时无法确认，请稍后再试。
                </p>
              ) : null}
              {credentialError ? (
                <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {credentialError}
                </p>
              ) : null}
              <Button
                className="w-full"
                disabled={
                  isLoading ||
                  captchaMissing ||
                  captchaTokenMissing ||
                  registrationStatusPending ||
                  registrationNotReady
                }
                type="submit"
                variant="default"
              >
                <LockKeyhole className="w-4 h-4 mr-2" />
                {mode === "register" ? "创建站点账号" : "使用站点账号登录"}
              </Button>
              {registrationEnabled ? (
                <button
                  className="w-full text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                  disabled={isLoading}
                  onClick={() => {
                    setCredentialError(null);
                    setMode((current) => (current === "login" ? "register" : "login"));
                  }}
                  type="button"
                >
                  {mode === "register" ? "已有账号？返回登录" : "没有账号？注册一个站点账号"}
                </button>
              ) : null}
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

          {providersLoaded && !showCredentials && !showGithub && !showGoogle ? (
            <p className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              {firebaseMissing
                ? "Firebase 登录尚未配置完成。"
                : "当前没有公开启用的登录方式。"}
            </p>
          ) : null}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          账号用于站点设置、订阅状态和私密内容访问。
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
