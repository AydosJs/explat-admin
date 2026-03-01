import { defineAbility } from "@casl/ability";

/** Sidebar visibility: user can "view" a menu item (by path). */
export type SidebarAction = "view";

/** Subject for CASL: sidebar menu item identified by route path. */
export type SidebarSubject = string;

/** All sidebar paths that exist (must match sidebar-menu.ts). Used to define permissions per role. */
const SIDEBAR_PATHS = {
  dashboard: "/",
  payIn: "/pay-in",
  payOut: "/pay-out",
  merchants: "/merchants",
  traders: "/traders",
  requisites: "/requisites",
  devices: "/devices",
  appeals: "/appeals",
  tokensPayouts: "/tokens/payouts",
  tokensBalance: "/tokens/balance",
  tokensTraders: "/tokens/traders",
  bankBanks: "/bank-sms/banks",
  bankSmsTemplates: "/bank-sms/sms-templates",
  bankSmsSenders: "/bank-sms/sms-senders",
  moreBalanceLogs: "/more/balance-logs",
  moreCallbackLogs: "/more/callback-logs",
  morePaymentReserve: "/more/payment-reserve",
} as const;

/** Paths each role can view (per ADMIN_SIDEBAR_AND_ROLES.md). */
const ROLE_PATHS: Record<
  "admin" | "trader" | "merchant",
  readonly string[]
> = {
  admin: Object.values(SIDEBAR_PATHS),
  trader: [
    SIDEBAR_PATHS.dashboard,
    SIDEBAR_PATHS.requisites,
    SIDEBAR_PATHS.tokensPayouts,
    SIDEBAR_PATHS.payIn,
    SIDEBAR_PATHS.payOut,
    SIDEBAR_PATHS.moreBalanceLogs,
    SIDEBAR_PATHS.appeals,
  ],
  merchant: [
    SIDEBAR_PATHS.dashboard,
    SIDEBAR_PATHS.payIn,
    SIDEBAR_PATHS.payOut,
    SIDEBAR_PATHS.appeals,
  ],
};

/**
 * Creates an Ability for the given role. Use ability.can('view', path) to check
 * if the user can see a sidebar item (and for future route guards).
 */
export function createAbilityFor(role: "admin" | "trader" | "merchant") {
  const paths = ROLE_PATHS[role];
  return defineAbility((can) => {
    for (const path of paths) {
      can("view", path);
    }
  });
}
