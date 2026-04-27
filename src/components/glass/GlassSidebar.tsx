"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SiteLanguageSwitcher } from "@/components/SiteLanguageSwitcher";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Eye,
  FileText,
  FolderKanban,
  Home,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Settings,
  ShieldCheck,
  Sun,
  User,
  UserPlus,
} from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { getRouteLocale, getSiteText, resolveSiteLocale, siteUiText } from "@/lib/site-i18n";
import { isProductionSurface, type SiteSurface } from "@/lib/site-surface";
import { defaultLocale } from "@/lib/textbook/i18n";
import type { Locale } from "@/lib/textbook/types";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  matches?: (pathname: string) => boolean;
}

function getNavItems(locale: Locale, surface: SiteSurface): NavItem[] {
  const productionItems: NavItem[] = [
    { href: "/", label: getSiteText(siteUiText.home, locale), icon: <Home className="w-4 h-4" /> },
    {
      href: `/${locale}/notes`,
      label: getSiteText(siteUiText.notes, locale),
      icon: <BookOpen className="w-4 h-4" />,
      matches: (pathname) =>
        pathname === "/notes" ||
        pathname.startsWith("/notes/") ||
        /^\/(en|zh-hk|zh-cn)(\/notes|$)/.test(pathname),
    },
  ];

  if (isProductionSurface(surface)) {
    return productionItems;
  }

  return [
    ...productionItems,
    { href: "/about", label: getSiteText(siteUiText.about, locale), icon: <User className="w-4 h-4" /> },
    { href: "/projects", label: getSiteText(siteUiText.projects, locale), icon: <FolderKanban className="w-4 h-4" /> },
    { href: "/blog", label: getSiteText(siteUiText.blog, locale), icon: <FileText className="w-4 h-4" /> },
  ];
}

interface GlassSidebarProps {
  highContrast?: boolean;
  onHighContrastChange?: (value: boolean) => void;
  surface: SiteSurface;
}

function subscribeThemeReady(onStoreChange: () => void) {
  queueMicrotask(onStoreChange);
  return () => {};
}

function getThemeReadySnapshot() {
  return true;
}

function getThemeReadyServerSnapshot() {
  return false;
}

interface SidebarProfile {
  email: string;
  name?: string | null;
  role: "admin" | "member" | "user";
}

function AccountActions({
  locale,
  onNavigate,
  pathname,
}: {
  locale: Locale;
  onNavigate: () => void;
  pathname: string;
}) {
  const [profile, setProfile] = useState<SidebarProfile | null>(null);
  const [loaded, setLoaded] = useState(false);
  const callbackUrl = pathname || "/";
  const loginHref = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  const registerHref = `/login?mode=register&callbackUrl=${encodeURIComponent(callbackUrl)}`;

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const response = await fetch("/api/user/profile", {
          cache: "no-store",
          headers: { accept: "application/json" },
        });

        if (!active) return;

        if (!response.ok) {
          setProfile(null);
          return;
        }

        const data = (await response.json()) as { profile?: SidebarProfile | null };
        setProfile(data.profile ?? null);
      } catch {
        if (active) setProfile(null);
      } finally {
        if (active) setLoaded(true);
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [pathname]);

  if (!loaded) {
    return <div className="h-[84px]" aria-hidden="true" />;
  }

  if (!profile) {
    return (
      <div className="space-y-2">
        <Button asChild size="sm" className="w-full justify-start gap-3">
          <Link href={loginHref} onClick={onNavigate}>
            <LogIn className="w-4 h-4" />
            <span>{getSiteText(siteUiText.signIn, locale)}</span>
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="w-full justify-start gap-3">
          <Link href={registerHref} onClick={onNavigate}>
            <UserPlus className="w-4 h-4" />
            <span>{getSiteText(siteUiText.register, locale)}</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="rounded-lg border bg-muted/30 px-3 py-2">
        <p className="truncate text-sm font-medium">{profile.name || profile.email}</p>
        <p className="truncate text-xs text-muted-foreground">{profile.email}</p>
      </div>
      <Button asChild size="sm" variant="ghost" className="w-full justify-start gap-3">
        <Link href="/settings" onClick={onNavigate}>
          <Settings className="w-4 h-4" />
          <span>{getSiteText(siteUiText.accountSettings, locale)}</span>
        </Link>
      </Button>
      {profile.role === "admin" ? (
        <Button asChild size="sm" variant="ghost" className="w-full justify-start gap-3">
          <Link href="/admin/users" onClick={onNavigate}>
            <ShieldCheck className="w-4 h-4" />
            <span>{getSiteText(siteUiText.adminPanel, locale)}</span>
          </Link>
        </Button>
      ) : null}
      <Button
        size="sm"
        variant="ghost"
        className="w-full justify-start gap-3 text-destructive hover:text-destructive"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="w-4 h-4" />
        <span>{getSiteText(siteUiText.signOut, locale)}</span>
      </Button>
    </div>
  );
}

interface SidebarContentProps {
  highContrast: boolean;
  locale: Locale;
  onHighContrastChange?: (value: boolean) => void;
  onLocaleChange?: (locale: Locale) => void;
  onNavigate: () => void;
  pathname: string;
  resolvedTheme?: string;
  setTheme: (theme: string) => void;
  surface: SiteSurface;
  themeReady: boolean;
}

function SidebarContent({
  highContrast,
  locale,
  onHighContrastChange,
  onLocaleChange,
  onNavigate,
  pathname,
  resolvedTheme,
  setTheme,
  surface,
  themeReady,
}: SidebarContentProps) {
  const navItems = getNavItems(locale, surface);
  const isDarkTheme = themeReady && resolvedTheme === "dark";
  const themeIcon = isDarkTheme ? (
    <Sun className="w-4 h-4" />
  ) : (
    <Moon className="w-4 h-4" />
  );
  const themeLabel = isDarkTheme
    ? getSiteText(siteUiText.switchToLightMode, locale)
    : getSiteText(siteUiText.switchToDarkMode, locale);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="p-6 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-border/70">
          <AvatarImage src="/avatar.png" alt="Avatar" />
          <AvatarFallback className="text-2xl">EA</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">Evanalysis</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {getSiteText(siteUiText.shellSubtitle, locale)}
        </p>
      </div>

      <Separator className="bg-border/70" />

      <nav className="min-h-0 flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              item.matches?.(pathname) ||
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "hover:bg-accent/70"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator className="bg-border/70" />

      <div className="shrink-0 p-4 space-y-2">
        {!isProductionSurface(surface) ? (
          <>
            <AccountActions locale={locale} onNavigate={onNavigate} pathname={pathname} />
            <Separator className="bg-border/70" />
          </>
        ) : null}
        <SiteLanguageSwitcher locale={locale} onLocaleChange={onLocaleChange} />
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3"
          onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
        >
          {themeIcon}
          <span>{themeLabel}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start gap-3",
            highContrast && "bg-primary/20"
          )}
          onClick={() => onHighContrastChange?.(!highContrast)}
        >
          <Eye className="w-4 h-4" />
          <span>{getSiteText(siteUiText.highContrast, locale)}</span>
        </Button>
      </div>

      <div className="shrink-0 p-4 text-center text-xs text-muted-foreground space-y-1">
        <p>© 2026 Evanalysis</p>
        <p>{getSiteText(siteUiText.footerNote, locale)}</p>
      </div>
    </div>
  );
}

export function GlassSidebar({
  highContrast = false,
  onHighContrastChange,
  surface,
}: GlassSidebarProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const themeReady = useSyncExternalStore(
    subscribeThemeReady,
    getThemeReadySnapshot,
    getThemeReadyServerSnapshot
  );
  const [locale, setLocale] = useState<Locale>(
    getRouteLocale(pathname) ?? defaultLocale
  );
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setLocale(resolveSiteLocale(pathname));
  }, [pathname]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 transition-all duration-300",
          highContrast
            ? "bg-sidebar border-r border-border"
            : "bg-sidebar/90 backdrop-blur-2xl border-r border-border/60"
        )}
      >
        <SidebarContent
          highContrast={highContrast}
          locale={locale}
          onHighContrastChange={onHighContrastChange}
          onLocaleChange={setLocale}
          onNavigate={() => setOpen(false)}
          pathname={pathname}
          resolvedTheme={resolvedTheme}
          setTheme={setTheme}
          surface={surface}
          themeReady={themeReady}
        />
      </aside>

      {/* Mobile Header with Sheet */}
      <header
        className={cn(
          "lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 transition-all duration-300",
          highContrast
            ? "bg-sidebar border-b border-border"
            : "bg-sidebar/90 backdrop-blur-2xl border-b border-border/60"
        )}
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              aria-label={getSiteText(siteUiText.mainMenu, locale)}
              variant="ghost"
              size="icon"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className={cn(
              "w-64 p-0 transition-all duration-300",
              highContrast
                ? "bg-sidebar"
                : "bg-sidebar/95 backdrop-blur-2xl border-r border-border/60"
            )}
          >
            <SheetTitle className="sr-only">
              {getSiteText(siteUiText.mainMenu, locale)}
            </SheetTitle>
            <SidebarContent
              highContrast={highContrast}
              locale={locale}
              onHighContrastChange={onHighContrastChange}
              onLocaleChange={setLocale}
              onNavigate={() => setOpen(false)}
              pathname={pathname}
              resolvedTheme={resolvedTheme}
              setTheme={setTheme}
              surface={surface}
              themeReady={themeReady}
            />
          </SheetContent>
        </Sheet>
        <span className="ml-4 font-semibold">Evanalysis</span>
      </header>
    </>
  );
}
