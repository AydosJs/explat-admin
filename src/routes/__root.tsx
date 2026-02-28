import { Outlet } from "@tanstack/react-router";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

export function RootComponent() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main className="min-h-0 flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
