import { useTranslation } from "react-i18next";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Building2,
  ChevronDownIcon,
  Coins,
  FileText,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  PanelLeft,
  PanelLeftClose,
  Smartphone,
  Store,
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  type SidebarMenuIcon,
  type SidebarMenuItemGroup,
} from "@/config/sidebar-menu";
import { useAppSidebar } from "@/hooks/use-app-sidebar";
import { cn } from "@/lib/utils";

import logoIcon from "@/assets/logo.svg";
import logoWithText from "@/assets/logo-with-text.svg";

const SIDEBAR_ICONS: Record<SidebarMenuIcon, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Store,
  TrendingUp,
  FileText,
  Smartphone,
  MessageSquare,
  Coins,
  Building2,
  MoreHorizontal,
};

function NavItem({
  to,
  label,
  icon: Icon,
  onNavigate,
}: {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));
  const labelText = t(label);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={to} onClick={onNavigate}>
          {Icon ? <Icon className="size-4" /> : null}
          <span>{labelText}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function GroupNavItem({
  item,
  open,
  onOpenChange,
  onNavigate,
}: {
  item: SidebarMenuItemGroup;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const Icon = SIDEBAR_ICONS[item.icon];
  const isActiveGroup = item.items.some(
    (sub) => pathname === sub.to || pathname.startsWith(sub.to + "/")
  );

  return (
    <SidebarMenuItem>
      <Collapsible open={open} onOpenChange={onOpenChange} className="group/collapsible">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={isActiveGroup}>
            <Icon className="size-4" />
            <span>{t(item.title)}</span>
            <ChevronDownIcon className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((sub) => {
              const isActive =
                pathname === sub.to || pathname.startsWith(sub.to + "/");
              return (
                <SidebarMenuSubItem key={sub.to}>
                  <SidebarMenuSubButton asChild isActive={isActive}>
                    <Link to={sub.to} onClick={onNavigate}>
                      <span>{t(sub.label)}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

const BALANCE_PLACEHOLDER = 12450.0;
const KURS_ENTRY = 1.05;
const KURS_WITHDRAW = 1.02;

function formatBalance(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function SidebarFooterRates({ t }: { t: (key: string) => string }) {
  return (
    <div className="mx-2 mb-2 rounded-lg border border-sidebar-border/60 bg-sidebar-accent/40 p-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-xs font-medium text-sidebar-foreground/80">
            <Wallet className="size-3.5 shrink-0" aria-hidden />
            {t("sidebar.balance")}
          </span>
          <span className="tabular-nums text-sm font-semibold text-sidebar-foreground">
            {formatBalance(BALANCE_PLACEHOLDER)} USDT
          </span>
        </div>
        <div className="h-px bg-sidebar-border/60" aria-hidden />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-2 text-sidebar-foreground/70">
              <ArrowDownToLine className="size-3.5 shrink-0" aria-hidden />
              {t("sidebar.kursOnEntry")}
            </span>
            <span className="tabular-nums font-medium text-sidebar-foreground">
              {KURS_ENTRY.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-2 text-sidebar-foreground/70">
              <ArrowUpFromLine className="size-3.5 shrink-0" aria-hidden />
              {t("sidebar.kursOnWithdraw")}
            </span>
            <span className="tabular-nums font-medium text-sidebar-foreground">
              {KURS_WITHDRAW.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppSidebar() {
  const { t } = useTranslation();
  const {
    visibleMenuItems,
    isGroupOpen,
    handleGroupOpenChange,
    closeMobileSidebar,
    isExpanded,
    isMobile,
    toggleSidebar,
    showHoverFlyout,
    handleFlyoutMouseEnter,
    handleFlyoutMouseLeave,
    toggleButtonFlyoutHandlers,
  } = useAppSidebar();

  const flyoutContent = (
    <>
      <div className="flex h-14 max-h-14 shrink-0 flex-row items-center border-b border-sidebar-border px-3">
        <img
          src={logoWithText}
          alt={t("sidebar.appName")}
          className="h-6 w-auto max-w-full object-contain object-left invert dark:invert-0"
        />
      </div>
      <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2">
        <ul className="flex w-full min-w-0 flex-col gap-1">
          {visibleMenuItems.map((item) =>
            item.type === "single" ? (
              <NavItem
                key={item.to}
                to={item.to}
                label={item.label}
                icon={SIDEBAR_ICONS[item.icon]}
                onNavigate={closeMobileSidebar}
              />
            ) : (
              <GroupNavItem
                key={item.title}
                item={item}
                open={isGroupOpen(item.title)}
                onOpenChange={handleGroupOpenChange(item.title)}
                onNavigate={closeMobileSidebar}
              />
            )
          )}
        </ul>
      </nav>
      <div className="flex shrink-0 flex-col border-t border-sidebar-border p-2">
        <SidebarFooterRates t={t} />
      </div>
    </>
  );

  return (
    <div
      className={!isMobile && !isExpanded ? "relative" : undefined}
      onMouseEnter={handleFlyoutMouseEnter}
      onMouseLeave={handleFlyoutMouseLeave}
    >
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex h-14 max-h-14 shrink-0 flex-row items-center border-b border-sidebar-border p-0">
          <div className="flex h-full min-w-0 flex-1 items-center gap-2 px-2 pl-3">
            {isExpanded ? (
              <img
                src={logoWithText}
                alt={t("sidebar.appName")}
                className="h-6 w-auto max-w-full object-contain object-left invert dark:invert-0"
              />
            ) : (
              <img
                src={logoIcon}
                alt={t("sidebar.appName")}
                className="size-6 shrink-0 object-contain invert dark:invert-0"
              />
            )}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleMenuItems.map((item) =>
                  item.type === "single" ? (
                    <NavItem
                      key={item.to}
                      to={item.to}
                      label={item.label}
                      icon={SIDEBAR_ICONS[item.icon]}
                      onNavigate={closeMobileSidebar}
                    />
                  ) : (
                    <GroupNavItem
                      key={item.title}
                      item={item}
                      open={isGroupOpen(item.title)}
                      onOpenChange={handleGroupOpenChange(item.title)}
                      onNavigate={closeMobileSidebar}
                    />
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter
          className={cn(
            "flex flex-col overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-in-out",
            "max-h-[240px] opacity-100 translate-y-0 delay-[220ms]",
            "group-data-[collapsible=icon]:max-h-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:translate-y-2",
            "group-data-[collapsible=icon]:delay-0 group-data-[collapsible=icon]:duration-150 group-data-[collapsible=icon]:ease-out"
          )}
        >
          <SidebarFooterRates t={t} />
        </SidebarFooter>
        {/* Rounded toggle on the sidebar border, centered with header (desktop only) */}
        {!isMobile && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            {...toggleButtonFlyoutHandlers}
            aria-label={isExpanded ? t("sidebar.collapseMenu") : t("sidebar.expandMenu")}
            title={isExpanded ? t("sidebar.collapseMenu") : t("sidebar.expandMenu")}
            className="absolute right-0 top-14 z-20 size-8 shrink-0 -translate-y-1/2 translate-x-1/2 p-0 m-0 border-none rounded-full"
          >
            {isExpanded ? (
              <PanelLeftClose className="size-4" />
            ) : (
              <PanelLeft className="size-4" />
            )}
          </Button>
        )}
      </Sidebar>
      {/* Hover flyout: overlays the collapsed sidebar (desktop only) */}
      {showHoverFlyout && (
        <div
          className="fixed left-0 top-0 z-50 flex h-svh w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-md"
          role="navigation"
          aria-label={t("sidebar.expandMenu")}
        >
          {flyoutContent}
        </div>
      )}
    </div>
  );
}
