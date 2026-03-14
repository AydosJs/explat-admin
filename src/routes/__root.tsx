import { useEffect, useRef, useState } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { TraderBottomNav } from "@/components/trader/trader-bottom-nav";
import { TraderHeader } from "@/components/trader/trader-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/use-app-store";
import { useHeaderStore } from "@/stores/use-header-store";
import { useUserStore } from "@/stores/use-user-store";
import i18n from "@/i18n";

const TRADER_HEADER_SCROLL_THRESHOLD = 60;
const TRADER_HEADER_TOP_ZONE = 24;

export function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const role = useUserStore((s) => s.role);
  const isLoginPage = pathname === "/login";
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);
  const isTrader = role === "trader";
  const [traderHeaderVisible, setTraderHeaderVisible] = useState(true);
  const mainRef = useRef<HTMLElement>(null);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const locale = useHeaderStore.getState().locale;
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, []);

  useEffect(() => {
    if (!isTrader) return;
    const el = mainRef.current;
    const getScrollTop = () => {
      const mainScroll = el?.scrollTop ?? 0;
      const windowScroll = typeof window !== "undefined" ? window.scrollY : 0;
      return Math.max(mainScroll, windowScroll);
    };
    lastScrollTopRef.current = getScrollTop();
    let rafId = 0;
    const updateVisibility = () => {
      const st = getScrollTop();
      const last = lastScrollTopRef.current;
      const scrollingDown = st > last;
      const scrollingUp = st < last;
      if (st <= TRADER_HEADER_TOP_ZONE) {
        setTraderHeaderVisible(true);
        lastScrollTopRef.current = st;
      } else if (scrollingDown && st > TRADER_HEADER_SCROLL_THRESHOLD) {
        setTraderHeaderVisible(false);
        lastScrollTopRef.current = st;
      } else if (scrollingUp) {
        setTraderHeaderVisible(true);
      } else {
        lastScrollTopRef.current = st;
      }
    };
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        updateVisibility();
      });
    };
    if (el) el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTrader]);

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        className={cn(isTrader && "h-svh max-h-svh overflow-hidden")}
      >
        <AppSidebar />
        <SidebarInset>
          {!isTrader && <AppHeader />}
          {isTrader && (
            <div
              className={cn(
                "sticky top-0 z-40 shrink-0 overflow-hidden md:relative md:z-auto",
                traderHeaderVisible ? "h-[76px]" : "h-0"
              )}
            >
              <TraderHeader />
            </div>
          )}
          <main
            ref={mainRef}
            className={cn(
              "min-h-0 flex-1 overflow-auto",
              isTrader && "pb-20 md:pb-0 mb-10 md:mb-0"
            )}
          >
            <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
              <Outlet />
            </div>
          </main>
          {isTrader && <TraderBottomNav />}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
