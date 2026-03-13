import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  ArrowDownToLine,
  MoreHorizontal,
} from "lucide-react";

import { getSidebarMenuItemsForRole } from "@/config/sidebar-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAIN_NAV_ITEMS = [
  { to: "/", icon: LayoutDashboard, labelKey: "trader.nav.dashboard" },
  { to: "/pay-in", icon: ArrowDownToLine, labelKey: "trader.nav.transactions" },
  { to: "/appeals", icon: MessageSquare, labelKey: "trader.nav.appeals" },
  { to: "/requisites", icon: FileText, labelKey: "trader.nav.requisites" },
] as const;

export function TraderBottomNav() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sheetOpen, setSheetOpen] = useState(false);
  const traderItems = getSidebarMenuItemsForRole("trader");

  const moreLinks = traderItems.flatMap((item) => {
    if (item.type === "single") {
      if (MAIN_NAV_ITEMS.some((m) => m.to === item.to)) return [];
      return [{ to: item.to, labelKey: item.label }];
    }
    return item.items.map((sub) => ({ to: sub.to, labelKey: sub.label }));
  });

  const moreActive = moreLinks.some(
    (l) => pathname === l.to || pathname.startsWith(l.to + "/")
  );

  const navContent = (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex md:hidden",
        "rounded-t-lg border-t border-border/50 bg-background/80 backdrop-blur-md"
      )}
      aria-label={t("trader.nav.ariaLabel")}
    >
      <div className="flex w-full flex-1 items-center justify-around gap-1 px-2 py-3">
        {MAIN_NAV_ITEMS.map(({ to, icon: Icon, labelKey }) => {
          const isActive =
            pathname === to || (to !== "/" && pathname.startsWith(to + "/"));
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex min-h-11 flex-row items-center justify-center rounded-full px-4 py-2",
                "transition-[background-color,color] duration-200 ease-out",
                isActive ? "gap-2 bg-muted/50 backdrop-blur-sm text-foreground" : "gap-0 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
              aria-label={t(labelKey)}
            >
              <span className="flex size-6 shrink-0 items-center justify-center">
                <Icon
                  className={cn(
                    "size-6 transition-[fill,opacity] duration-200 ease-out",
                    isActive && "fill-current"
                  )}
                  aria-hidden
                />
              </span>
              <span
                className={cn(
                  "whitespace-nowrap overflow-hidden text-xs font-medium transition-[max-width,opacity] duration-200 ease-out",
                  isActive ? "max-w-32 opacity-100" : "min-w-0 max-w-0 w-0 opacity-0"
                )}
                aria-hidden
              >
                {t(labelKey)}
              </span>
            </Link>
          );
        })}

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex min-h-11 flex-row items-center justify-center rounded-full px-4 py-2",
                "transition-[background-color,color] duration-200 ease-out",
                moreActive
                  ? "gap-2 bg-muted/50 backdrop-blur-sm text-foreground hover:bg-muted/50 hover:text-foreground"
                  : "gap-0 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
              aria-label={t("trader.nav.more")}
            >
              <span className="flex size-6 shrink-0 items-center justify-center">
                <MoreHorizontal
                  className={cn(
                    "size-6 transition-[fill,opacity] duration-200 ease-out",
                    moreActive && "fill-current"
                  )}
                  aria-hidden
                />
              </span>
              <span
                className={cn(
                  "whitespace-nowrap overflow-hidden text-xs font-medium transition-[max-width,opacity] duration-200 ease-out",
                  moreActive ? "max-w-32 opacity-100" : "min-w-0 max-w-0 w-0 opacity-0"
                )}
                aria-hidden
              >
                {t("trader.nav.more")}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-xl">
            <SheetHeader>
              <SheetTitle>{t("trader.nav.more")}</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col gap-1 py-4">
              {moreLinks.map(({ to, labelKey }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="block rounded-md px-3 py-3 text-foreground hover:bg-muted"
                    onClick={() => setSheetOpen(false)}
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );

  return createPortal(navContent, document.body);
}
