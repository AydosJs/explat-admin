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

export const sidebarMenuItems: SidebarMenuItem[] = [
  { type: "single", label: "Дашборд", to: "/", icon: "LayoutDashboard" },
  { type: "single", label: "Pay in", to: "/pay-in", icon: "ArrowDownToLine" },
  { type: "single", label: "Pay out", to: "/pay-out", icon: "ArrowUpFromLine" },
  { type: "single", label: "Мерчанты", to: "/merchants", icon: "Store" },
  { type: "single", label: "Трейдеры", to: "/traders", icon: "TrendingUp" },
  { type: "single", label: "Реквизиты", to: "/requisites", icon: "FileText" },
  { type: "single", label: "Устройства", to: "/devices", icon: "Smartphone" },
  { type: "single", label: "Апеляции", to: "/appeals", icon: "MessageSquare" },
  {
    type: "group",
    title: "Токены",
    icon: "Coins",
    items: [
      { label: "Токены для выплат", to: "/tokens/payouts" },
      { label: "Токены пополнения баланса", to: "/tokens/balance" },
      { label: "Токены трейдеров", to: "/tokens/traders" },
    ],
  },
  {
    type: "group",
    title: "Банк и СМС",
    icon: "Building2",
    items: [
      { label: "Банки", to: "/bank-sms/banks" },
      { label: "SMS шаблона", to: "/bank-sms/sms-templates" },
      { label: "SMS отправители", to: "/bank-sms/sms-senders" },
    ],
  },
  {
    type: "group",
    title: "Еще",
    icon: "MoreHorizontal",
    items: [
      { label: "Логи балансов", to: "/more/balance-logs" },
      { label: "Логи Callback'ов", to: "/more/callback-logs" },
      { label: "Резерв оплат", to: "/more/payment-reserve" },
    ],
  },
];
