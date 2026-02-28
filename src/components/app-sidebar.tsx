import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  sidebarMenuItems,
  type SidebarMenuIcon,
  type SidebarMenuItemGroup,
  type SidebarMenuItemSingle,
} from "@/config/sidebar-menu";
import { useIsMobile } from "@/hooks/use-media-query";
import { useAppStore } from "@/stores/use-app-store";

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

function getGroupTitleForPath(pathname: string): string | null {
  for (const item of sidebarMenuItems) {
    if (item.type !== "group") continue;
    for (const sub of item.items) {
      if (pathname === sub.to || pathname.startsWith(sub.to + "/")) {
        return item.title;
      }
    }
  }
  return null;
}

const linkBase =
  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
const linkActive = "bg-sidebar-accent text-sidebar-accent-foreground opacity-100";
const linkInactive = "opacity-70 hover:opacity-90";

function NavLink({
  to,
  label,
  icon: Icon,
  collapsed,
  onSingleItemClick,
  onNavigate,
}: {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  collapsed?: boolean;
  onSingleItemClick?: () => void;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));
  const [clickKey, setClickKey] = useState(0);
  const labelText = t(label);

  const handleClick = useCallback(() => {
    if (Icon) setClickKey((k) => k + 1);
    onSingleItemClick?.();
    onNavigate?.();
  }, [Icon, onSingleItemClick, onNavigate]);

  if (collapsed && Icon) {
    return (
      <Link
        to={to}
        onClick={handleClick}
        title={labelText}
        className={cn(
          "flex items-center justify-center rounded-md p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground opacity-100",
          !isActive && "opacity-70 hover:opacity-90"
        )}
        activeProps={{
          className: cn(
            "flex items-center justify-center rounded-md p-2 bg-sidebar-accent text-sidebar-accent-foreground opacity-100"
          ),
        }}
      >
        <span
          key={clickKey}
          className="inline-flex shrink-0 animate-[sidebar-icon-jump_0.35s_ease-out]"
        >
          <Icon className="size-4" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={cn(linkBase, isActive ? linkActive : linkInactive)}
      activeProps={{ className: cn(linkBase, linkActive) }}
    >
      {Icon ? (
        <span
          key={clickKey}
          className="inline-flex shrink-0 animate-[sidebar-icon-jump_0.35s_ease-out]"
        >
          <Icon className="size-4" />
        </span>
      ) : null}
      {labelText}
    </Link>
  );
}

function SingleItem({
  item,
  collapsed,
  onSingleItemClick,
}: {
  item: SidebarMenuItemSingle;
  collapsed?: boolean;
  onSingleItemClick?: () => void;
}) {
  const Icon = SIDEBAR_ICONS[item.icon];
  return (
    <li>
      <NavLink
        to={item.to}
        label={item.label}
        icon={Icon}
        collapsed={collapsed}
        onSingleItemClick={onSingleItemClick}
      />
    </li>
  );
}

const groupTriggerBase =
  "group/trigger w-full justify-between rounded-md px-3 py-2 h-auto font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-opacity";
const groupTriggerActive = "opacity-100";
const groupTriggerInactive = "opacity-70 hover:opacity-90";

const GroupItem = memo(function GroupItem({
  item,
  open,
  onOpenChange: onOpenChangeProp,
  collapsed,
  onNavigate,
}: {
  item: SidebarMenuItemGroup;
  open: boolean;
  onOpenChange: (next: boolean, title: string) => void;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActiveGroup =
    item.items.some(
      (sub) => pathname === sub.to || pathname.startsWith(sub.to + "/")
    );

  const [iconKey, setIconKey] = useState(0);
  const onOpenChange = useCallback(
    (next: boolean) => {
      if (next) setIconKey((k) => k + 1);
      onOpenChangeProp(next, item.title);
    },
    [item.title, onOpenChangeProp]
  );
  const GroupIcon = SIDEBAR_ICONS[item.icon];

  if (collapsed) {
    return (
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              title={t(item.title)}
              className={cn(
                "flex w-full justify-center rounded-md p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActiveGroup ? groupTriggerActive : groupTriggerInactive
              )}
              onClick={() => setIconKey((k) => k + 1)}
            >
              <span
                key={iconKey}
                className="inline-flex shrink-0 animate-[sidebar-icon-jump_0.35s_ease-out]"
              >
                <GroupIcon className="size-4" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" sideOffset={8}>
            {item.items.map((sub) => (
              <DropdownMenuItem key={sub.to} asChild>
                <Link
                  to={sub.to}
                  className="flex cursor-pointer items-center gap-2"
                >
                  {t(sub.label)}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    );
  }

  return (
    <li>
      <Collapsible open={open} onOpenChange={onOpenChange} className="group/collapsible">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              groupTriggerBase,
              isActiveGroup ? groupTriggerActive : groupTriggerInactive
            )}
          >
            <span className="flex items-center gap-2">
              <span
                key={iconKey}
                className="inline-flex shrink-0 animate-[sidebar-icon-jump_0.35s_ease-out]"
              >
                <GroupIcon className="size-4" />
              </span>
              {t(item.title)}
            </span>
            <ChevronDownIcon className="size-4 shrink-0 transition-transform group-data-[state=open]/trigger:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden">
          <ul className="mt-1 flex flex-col gap-0.5 pl-2">
            {item.items.map((sub) => (
              <li key={sub.to}>
                <NavLink to={sub.to} label={sub.label} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
});

export function AppSidebar() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isMobile = useIsMobile();
  const expanded = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  // On mobile: drawer is always "expanded" (full menu); store controls open/closed
  const effectiveExpanded = isMobile ? true : expanded;
  const collapsed = !effectiveExpanded;
  const closeSidebar = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);

  const groupForPath = useMemo(() => getGroupTitleForPath(pathname), [pathname]);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [pathGroupClosed, setPathGroupClosed] = useState(false);

  // When pathname changes, sync open group so only the group containing the current path stays open
  useEffect(() => {
    queueMicrotask(() => {
      setOpenGroup(groupForPath);
      setPathGroupClosed(false);
    });
  }, [pathname, groupForPath]);

  const isGroupOpen = useCallback(
    (title: string) =>
      (title === groupForPath && !pathGroupClosed) || title === openGroup,
    [groupForPath, pathGroupClosed, openGroup]
  );

  const handleGroupOpenChange = useCallback(
    (next: boolean, title: string) => {
      if (next) {
        setOpenGroup(title);
        setPathGroupClosed(false);
      } else {
        if (title === groupForPath) {
          setPathGroupClosed(true);
        } else {
          setOpenGroup(null);
        }
      }
    },
    [groupForPath]
  );

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-in-out",
        isMobile ? "w-full" : "border-r border-sidebar-border",
        !isMobile && (effectiveExpanded ? "w-56" : "w-14")
      )}
    >
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-b border-sidebar-border",
          effectiveExpanded ? "justify-between px-3" : "justify-center px-0"
        )}
      >
        {effectiveExpanded && (
          <span className="truncate font-semibold">{t("sidebar.appName")}</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={isMobile ? closeSidebar : toggleSidebar}
          title={
            isMobile
              ? t("sidebar.closeMenu")
              : effectiveExpanded
                ? t("sidebar.collapseMenu")
                : t("sidebar.expandMenu")
          }
          className="shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {effectiveExpanded ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeft className="size-4" />
          )}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="flex flex-col gap-0.5">
          {sidebarMenuItems.map((item) =>
            item.type === "single" ? (
              <SingleItem
                key={item.to}
                item={item}
                collapsed={collapsed}
                onSingleItemClick={() => {
                  setOpenGroup(null);
                  if (isMobile) closeSidebar();
                }}
              />
            ) : (
              <GroupItem
                key={item.title}
                item={item}
                open={isGroupOpen(item.title)}
                onOpenChange={handleGroupOpenChange}
                collapsed={collapsed}
                onNavigate={isMobile ? closeSidebar : undefined}
              />
            )
          )}
        </ul>
      </nav>
    </aside>
  );
}
