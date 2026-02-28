import { useEffect } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { useIsMobile } from "@/hooks/use-media-query";
import { useAppStore } from "@/stores/use-app-store";
import { useHeaderStore } from "@/stores/use-header-store";
import { cn } from "@/lib/utils";
import i18n from "@/i18n";

export function RootComponent() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLoginPage = pathname === "/login";
  const isMobile = useIsMobile();
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);

  // Sync i18n language from stored locale on mount (e.g. from cookie)
  useEffect(() => {
    const locale = useHeaderStore.getState().locale;
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, []);

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile: backdrop when sidebar is open */}
      {isMobile && (
        <button
          type="button"
          aria-label={t("sidebar.closeMenu")}
          onClick={() => setSidebarOpen(false)}
          className={cn(
            "fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden",
            sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        />
      )}

      {/* Sidebar: fixed overlay on mobile, in-flow on desktop */}
      <div
        className={cn(
          "flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-[transform,width] duration-200 ease-in-out",
          isMobile && "fixed inset-y-0 left-0 z-50 w-72",
          isMobile && !sidebarOpen && "-translate-x-full",
          !isMobile && "shrink-0"
        )}
      >
        <AppSidebar />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden min-w-0">
        <AppHeader />
        <main className="min-h-0 flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
