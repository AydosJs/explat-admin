import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
  Smartphone,
  Store,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
}: {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));
  const [clickKey, setClickKey] = useState(0);

  return (
    <Link
      to={to}
      onClick={() => Icon && setClickKey((k) => k + 1)}
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
      {label}
    </Link>
  );
}

function SingleItem({ item }: { item: SidebarMenuItemSingle }) {
  const Icon = SIDEBAR_ICONS[item.icon];
  return (
    <li>
      <NavLink to={item.to} label={item.label} icon={Icon} />
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
}: {
  item: SidebarMenuItemGroup;
  open: boolean;
  onOpenChange: (next: boolean, title: string) => void;
}) {
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
              {item.title}
            </span>
            <ChevronDownIcon className="size-4 shrink-0 transition-transform group-data-[state=open]/trigger:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden">
          <ul className="mt-1 flex flex-col gap-0.5 pl-2">
            {item.items.map((sub) => (
              <li key={sub.to}>
                <NavLink to={sub.to} label={sub.label} />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
});

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const groupForPath = useMemo(() => getGroupTitleForPath(pathname), [pathname]);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [pathGroupClosed, setPathGroupClosed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setOpenGroup(groupForPath);
      setPathGroupClosed(false);
    }, 0);
    return () => clearTimeout(t);
  }, [groupForPath]);

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
    <aside className="flex h-full w-56 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 shrink-0 items-center border-b border-sidebar-border px-4">
        <span className="font-semibold">Explat Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="flex flex-col gap-0.5">
          {sidebarMenuItems.map((item) =>
            item.type === "single" ? (
              <SingleItem key={item.to} item={item} />
            ) : (
              <GroupItem
                key={item.title}
                item={item}
                open={isGroupOpen(item.title)}
                onOpenChange={handleGroupOpenChange}
              />
            )
          )}
        </ul>
      </nav>
    </aside>
  );
}
