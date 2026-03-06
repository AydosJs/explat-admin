import type { DashboardMerchant } from "./types";

export const DASHBOARD_OVERALL_BALANCE_USDT = -15947.52;

export type DashboardStatsPeriod = "today" | "week" | "month" | "all";

export const DASHBOARD_STATS_PAY_IN_USDT = 537.71;
export const DASHBOARD_STATS_PAY_OUT_USDT = 0;

export const DASHBOARD_PROFIT_PAY_IN_USDT = 9.45;
export const DASHBOARD_PROFIT_PAY_OUT_USDT = 0;

export const DASHBOARD_CONVERSION_PAY_IN_PCT = 4.83;
export const DASHBOARD_CONVERSION_PAY_OUT_PCT = 0;
export const DASHBOARD_CONVERSION_APPEALS_PCT = 0;

export const DASHBOARD_TRANSACTIONS_SUCCESS = 10;
export const DASHBOARD_TRANSACTIONS_TOTAL = 208;
export const DASHBOARD_TRANSACTIONS_CANCELLED = 198;

export const DASHBOARD_MERCHANTS: DashboardMerchant[] = [
  { id: "m1", name: "Merchant One", balanceUsdt: 12500.0 },
  { id: "m2", name: "Merchant Two", balanceUsdt: 8300.5 },
  { id: "m3", name: "Merchant Three", balanceUsdt: -1200.75 },
  { id: "m4", name: "Merchant Four", balanceUsdt: 25600.0 },
  { id: "m5", name: "Merchant Five", balanceUsdt: 0 },
  { id: "m6", name: "Merchant Six", balanceUsdt: 4200.25 },
  { id: "m7", name: "Merchant Seven", balanceUsdt: 18900.0 },
  { id: "m8", name: "Merchant Eight", balanceUsdt: -500.5 },
];
