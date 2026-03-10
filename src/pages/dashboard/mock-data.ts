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

/** Time-series data for Pay In / Pay Out line chart. */
export interface DashboardPayInOutPoint {
  date: string;
  payIn: number;
  payOut: number;
}

export const DASHBOARD_PAY_IN_OUT_SERIES: DashboardPayInOutPoint[] = [
  { date: "2026-02-25", payIn: 320, payOut: 180 },
  { date: "2026-02-26", payIn: 410, payOut: 220 },
  { date: "2026-02-27", payIn: 285, payOut: 95 },
  { date: "2026-02-28", payIn: 390, payOut: 310 },
  { date: "2026-03-01", payIn: 450, payOut: 270 },
  { date: "2026-03-02", payIn: 380, payOut: 190 },
  { date: "2026-03-03", payIn: 520, payOut: 340 },
  { date: "2026-03-04", payIn: 410, payOut: 165 },
  { date: "2026-03-05", payIn: 480, payOut: 290 },
  { date: "2026-03-06", payIn: 537.71, payOut: 0 },
];

/** Time-series data for profit line chart. */
export interface DashboardProfitPoint {
  date: string;
  profit: number;
}

export const DASHBOARD_PROFIT_SERIES: DashboardProfitPoint[] = [
  { date: "2026-02-25", profit: 42.5 },
  { date: "2026-02-26", profit: 68.0 },
  { date: "2026-02-27", profit: -12.3 },
  { date: "2026-02-28", profit: 95.0 },
  { date: "2026-03-01", profit: 120.5 },
  { date: "2026-03-02", profit: 55.0 },
  { date: "2026-03-03", profit: 88.2 },
  { date: "2026-03-04", profit: 31.0 },
  { date: "2026-03-05", profit: 72.5 },
  { date: "2026-03-06", profit: 9.45 },
];

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
