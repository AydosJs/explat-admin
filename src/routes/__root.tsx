import { Outlet } from "@tanstack/react-router";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { useIsMobile } from "@/hooks/use-media-query";
import { useAppStore } from "@/stores/use-app-store";
import { cn } from "@/lib/utils";

export function RootComponent() {
  const isMobile = useIsMobile();
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile: backdrop when sidebar is open */}
      {isMobile && (
        <button
          type="button"
          aria-label="Закрыть меню"
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
