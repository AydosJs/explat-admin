import type { UserRole } from "@/stores/use-user-store";
import { createAbilityFor } from "@/lib/ability";

export type SidebarMenuIcon =
  | "LayoutDashboard"
  | "ArrowDownToLine"
  | "ArrowUpFromLine"
  | "Store"
  | "TrendingUp"
  | "FileText"
  | "Smartphone"
  | "MessageSquare"
  | "Coins"
  | "Building2"
  | "MoreHorizontal";

export type SidebarMenuItemSingle = {
  type: "single";
  label: string;
  to: string;
  icon: SidebarMenuIcon;
};

export type SidebarMenuItemGroup = {
  type: "group";
  title: string;
  icon: SidebarMenuIcon;
  items: { label: string; to: string }[];
};

export type SidebarMenuItem = SidebarMenuItemSingle | SidebarMenuItemGroup;

/** Translation keys for sidebar labels (see locales/ru.json under "sidebar") */
export const sidebarMenuItems: SidebarMenuItem[] = [
  { type: "single", label: "sidebar.dashboard", to: "/", icon: "LayoutDashboard" },
  { type: "single", label: "sidebar.payIn", to: "/pay-in", icon: "ArrowDownToLine" },
  { type: "single", label: "sidebar.payOut", to: "/pay-out", icon: "ArrowUpFromLine" },
  { type: "single", label: "sidebar.merchants", to: "/merchants", icon: "Store" },
  { type: "single", label: "sidebar.traders", to: "/traders", icon: "TrendingUp" },
  { type: "single", label: "sidebar.requisites", to: "/requisites", icon: "FileText" },
  { type: "single", label: "sidebar.devices", to: "/devices", icon: "Smartphone" },
  { type: "single", label: "sidebar.appeals", to: "/appeals", icon: "MessageSquare" },
  {
    type: "group",
    title: "sidebar.tokens",
    icon: "Coins",
    items: [
      { label: "sidebar.tokensPayouts", to: "/tokens/payouts" },
      { label: "sidebar.tokensBalance", to: "/tokens/balance" },
      { label: "sidebar.tokensTraders", to: "/tokens/traders" },
    ],
  },
  {
    type: "group",
    title: "sidebar.bankAndSms",
    icon: "Building2",
    items: [
      { label: "sidebar.banks", to: "/bank-sms/banks" },
      { label: "sidebar.smsTemplates", to: "/bank-sms/sms-templates" },
      { label: "sidebar.smsSenders", to: "/bank-sms/sms-senders" },
    ],
  },
  {
    type: "group",
    title: "sidebar.more",
    icon: "MoreHorizontal",
    items: [
      { label: "sidebar.balanceLogs", to: "/more/balance-logs" },
      { label: "sidebar.callbackLogs", to: "/more/callback-logs" },
      { label: "sidebar.paymentReserve", to: "/more/payment-reserve" },
    ],
  },
];

/**
 * Returns sidebar items visible for the given role using CASL abilities.
 * Uses ability.can('view', path) so permissions stay in @/lib/ability.
 */
export function getSidebarMenuItemsForRole(role: UserRole): SidebarMenuItem[] {
  const ability = createAbilityFor(role);
  return sidebarMenuItems
    .map((item): SidebarMenuItem | null => {
      if (item.type === "single") {
        return ability.can("view", item.to) ? item : null;
      }
      const visibleSubItems = item.items.filter((sub) =>
        ability.can("view", sub.to)
      );
      if (visibleSubItems.length === 0) return null;
      return { ...item, items: visibleSubItems };
    })
    .filter((item): item is SidebarMenuItem => item !== null);
}
