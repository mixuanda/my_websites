"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Home, User, FolderKanban, FileText, BookOpen, Sun, Moon, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/", label: "首页", icon: <Home className="w-4 h-4" /> },
  { href: "/about", label: "关于", icon: <User className="w-4 h-4" /> },
  { href: "/projects", label: "项目", icon: <FolderKanban className="w-4 h-4" /> },
  { href: "/blog", label: "博客", icon: <FileText className="w-4 h-4" /> },
  { href: "/notes", label: "笔记", icon: <BookOpen className="w-4 h-4" /> },
];

interface GlassSidebarProps {
  highContrast?: boolean;
  onHighContrastChange?: (value: boolean) => void;
}

export function GlassSidebar({ highContrast = false, onHighContrastChange }: GlassSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch by only rendering theme-dependent UI after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Profile Section */}
      <div className="p-6 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-white/20">
          <AvatarImage src="/avatar.png" alt="Avatar" />
          <AvatarFallback className="text-2xl">EA</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">Evanalysis</h2>
        <p className="text-sm text-muted-foreground mt-1">
          开发者 / 数学爱好者
        </p>
      </div>

      <Separator className="bg-white/10" />

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "hover:bg-white/10 dark:hover:bg-white/5"
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

      <Separator className="bg-white/10" />

      {/* Settings */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )
          ) : (
            <Sun className="w-4 h-4" />
          )}
          <span>{mounted ? (theme === "dark" ? "亮色模式" : "暗色模式") : "切换主题"}</span>
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
          <span>高对比度</span>
        </Button>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-xs text-muted-foreground">
        <p>© 2026 Evanalysis</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 transition-all duration-300",
          highContrast
            ? "bg-sidebar border-r border-border"
            : "bg-sidebar/90 backdrop-blur-2xl border-r border-white/10"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Header with Sheet */}
      <header
        className={cn(
          "lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 transition-all duration-300",
          highContrast
            ? "bg-sidebar border-b border-border"
            : "bg-sidebar/90 backdrop-blur-2xl border-b border-white/10"
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
              highContrast
                ? "bg-sidebar"
                : "bg-sidebar/95 backdrop-blur-2xl"
            )}
          >
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <span className="ml-4 font-semibold">Evanalysis</span>
      </header>
    </>
  );
}
