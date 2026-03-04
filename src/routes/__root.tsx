import { useEffect } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/stores/use-app-store";
import { useHeaderStore } from "@/stores/use-header-store";
import i18n from "@/i18n";

export function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLoginPage = pathname === "/login";
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);

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
    <TooltipProvider>
      <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="min-h-0 flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
