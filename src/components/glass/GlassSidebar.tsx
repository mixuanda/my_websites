"use client";

import { LanguageSwitcher } from "@/components/textbook/LanguageSwitcher";
import { useSitePreferences } from "@/components/SitePreferencesProvider";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Eye,
  FileText,
  FolderKanban,
  Home,
  Laptop,
  Menu,
  User,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { getSiteText, siteUiText } from "@/lib/site-i18n";
import { siteThemeModes } from "@/lib/site-theme";
import type { Locale } from "@/lib/textbook/types";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  matches?: (pathname: string) => boolean;
}

function getNavItems(locale: Locale): NavItem[] {
  return [
    { href: "/", label: getSiteText(siteUiText.home, locale), icon: <Home className="w-4 h-4" /> },
    {
      href: "/notes",
      label: getSiteText(siteUiText.notes, locale),
      icon: <BookOpen className="w-4 h-4" />,
      matches: (pathname) =>
        pathname === "/notes" ||
        pathname.startsWith("/notes/") ||
        /^\/(en|zh-hk|zh-cn)(\/notes|$)/.test(pathname),
    },
    { href: "/about", label: getSiteText(siteUiText.about, locale), icon: <User className="w-4 h-4" /> },
    { href: "/projects", label: getSiteText(siteUiText.projects, locale), icon: <FolderKanban className="w-4 h-4" /> },
    { href: "/blog", label: getSiteText(siteUiText.blog, locale), icon: <FileText className="w-4 h-4" /> },
  ];
}

interface GlassSidebarProps {
  highContrast?: boolean;
  onHighContrastChange?: (value: boolean) => void;
}

interface SidebarContentProps {
  highContrast: boolean;
  locale: Locale;
  onHighContrastChange?: (value: boolean) => void;
  onNavigate: () => void;
  pathname: string;
  resolvedTheme?: string;
  theme?: string;
  setTheme: (theme: string) => void;
}

function SidebarContent({
  highContrast,
  locale,
  onHighContrastChange,
  onNavigate,
  pathname,
  resolvedTheme,
  theme,
  setTheme,
}: SidebarContentProps) {
  const navItems = getNavItems(locale);
  const activeTheme = siteThemeModes.includes(theme as (typeof siteThemeModes)[number])
    ? (theme as (typeof siteThemeModes)[number])
    : "system";

  return (
    <div className="flex flex-col h-full">
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

      <nav className="flex-1 p-4">
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

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {getSiteText(siteUiText.appearance, locale)}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              type="button"
              variant={activeTheme === "system" ? "default" : "outline"}
              onClick={() => setTheme("system")}
            >
              <Laptop className="mr-1 h-4 w-4" />
              {getSiteText(siteUiText.systemTheme, locale)}
            </Button>
            <Button
              size="sm"
              type="button"
              variant={activeTheme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
            >
              {getSiteText(siteUiText.lightMode, locale)}
            </Button>
            <Button
              size="sm"
              type="button"
              variant={activeTheme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
            >
              {getSiteText(siteUiText.darkMode, locale)}
            </Button>
          </div>
          {activeTheme === "system" && resolvedTheme ? (
            <p className="text-xs text-muted-foreground">
              {getSiteText(siteUiText.themeMode, locale)}:{" "}
              {resolvedTheme === "dark"
                ? getSiteText(siteUiText.darkMode, locale)
                : getSiteText(siteUiText.lightMode, locale)}
            </p>
          ) : null}
        </div>
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
        <LanguageSwitcher className="border-t border-border/60 pt-4" locale={locale} />
      </div>

      <div className="p-4 text-center text-xs text-muted-foreground space-y-1">
        <p>© 2026 Evanalysis</p>
        <p>{getSiteText(siteUiText.footerNote, locale)}</p>
      </div>
    </div>
  );
}

export function GlassSidebar({
  highContrast = false,
  onHighContrastChange,
}: GlassSidebarProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const { highContrast: storedHighContrast, locale } = useSitePreferences();
  const { resolvedTheme, setTheme, theme } = useTheme();
  const effectiveHighContrast = onHighContrastChange
    ? highContrast
    : storedHighContrast;
  const handleHighContrastChange = onHighContrastChange ?? (() => {});

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 transition-all duration-300",
          effectiveHighContrast
            ? "bg-sidebar border-r border-border"
            : "bg-sidebar/90 backdrop-blur-2xl border-r border-border/60"
        )}
      >
        <SidebarContent
          highContrast={effectiveHighContrast}
          locale={locale}
          onHighContrastChange={handleHighContrastChange}
          onNavigate={() => setOpen(false)}
          pathname={pathname}
          resolvedTheme={resolvedTheme}
          theme={theme}
          setTheme={setTheme}
        />
      </aside>

      {/* Mobile Header with Sheet */}
      <header
        className={cn(
          "lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 transition-all duration-300",
          effectiveHighContrast
            ? "bg-sidebar border-b border-border"
            : "bg-sidebar/90 backdrop-blur-2xl border-b border-border/60"
        )}
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className={cn(
              "w-64 p-0 transition-all duration-300",
              effectiveHighContrast
                ? "bg-sidebar"
                : "bg-sidebar/95 backdrop-blur-2xl border-r border-border/60"
            )}
          >
            <SidebarContent
              highContrast={effectiveHighContrast}
              locale={locale}
              onHighContrastChange={handleHighContrastChange}
              onNavigate={() => setOpen(false)}
              pathname={pathname}
              resolvedTheme={resolvedTheme}
              theme={theme}
              setTheme={setTheme}
            />
          </SheetContent>
        </Sheet>
        <span className="ml-4 font-semibold">Evanalysis</span>
      </header>
    </>
  );
}
