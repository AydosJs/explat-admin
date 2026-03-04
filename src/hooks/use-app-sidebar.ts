import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useSidebar } from "@/components/ui/sidebar";
import {
  getSidebarMenuItemsForRole,
  type SidebarMenuItemGroup,
  type SidebarMenuItemSingle,
} from "@/config/sidebar-menu";
import { useUserStore } from "@/stores/use-user-store";

const HOVER_ENTER_DELAY_MS = 150;
const HOVER_LEAVE_DELAY_MS = 120;

function getGroupTitleForPath(
  pathname: string,
  items: Array<SidebarMenuItemSingle | SidebarMenuItemGroup>
): string | null {
  for (const item of items) {
    if (item.type !== "group") continue;
    for (const sub of item.items) {
      if (pathname === sub.to || pathname.startsWith(sub.to + "/")) {
        return item.title;
      }
    }
  }
  return null;
}

export function useAppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const role = useUserStore((s) => s.role);
  const { isMobile, setOpenMobile, state, toggleSidebar } = useSidebar();

  const visibleMenuItems = useMemo(
    () => getSidebarMenuItemsForRole(role),
    [role]
  );

  const groupForPath = useMemo(
    () => getGroupTitleForPath(pathname, visibleMenuItems),
    [pathname, visibleMenuItems]
  );

  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [pathGroupClosed, setPathGroupClosed] = useState(false);

  useEffect(() => {
    setOpenGroup(groupForPath ?? null);
    setPathGroupClosed(false);
  }, [pathname, groupForPath]);

  const isGroupOpen = useCallback(
    (title: string) =>
      (title === groupForPath && !pathGroupClosed) || title === openGroup,
    [groupForPath, pathGroupClosed, openGroup]
  );

  const handleGroupOpenChange = useCallback(
    (title: string) => (next: boolean) => {
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

  const closeMobileSidebar = useCallback(() => {
    if (isMobile) setOpenMobile(false);
  }, [isMobile, setOpenMobile]);

  const isExpanded = state === "expanded";

  const [hoverFlyout, setHoverFlyout] = useState(false);
  const [hoveringToggleButton, setHoveringToggleButton] = useState(false);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimeouts = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  }, []);

  const handleFlyoutMouseEnter = useCallback(() => {
    clearHoverTimeouts();
    if (isMobile || isExpanded) return;
    enterTimeoutRef.current = setTimeout(() => setHoverFlyout(true), HOVER_ENTER_DELAY_MS);
  }, [clearHoverTimeouts, isMobile, isExpanded]);

  const handleFlyoutMouseLeave = useCallback(() => {
    clearHoverTimeouts();
    leaveTimeoutRef.current = setTimeout(() => setHoverFlyout(false), HOVER_LEAVE_DELAY_MS);
  }, [clearHoverTimeouts]);

  const showHoverFlyout = !isMobile && !isExpanded && hoverFlyout && !hoveringToggleButton;

  const toggleButtonFlyoutHandlers = useMemo(
    () => ({
      onMouseEnter: () => setHoveringToggleButton(true),
      onMouseLeave: () => setHoveringToggleButton(false),
    }),
    []
  );

  return {
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
  };
}
