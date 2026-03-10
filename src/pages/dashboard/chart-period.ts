import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import type { DashboardPayInOutPoint } from "./mock-data";
import type { DashboardProfitPoint } from "./mock-data";

dayjs.extend(isoWeek);

export type ChartPeriod = "daily" | "weekly" | "monthly" | "yearly";

function groupKey(dateStr: string, period: ChartPeriod): string {
  const d = dayjs(dateStr);
  if (period === "daily") return dateStr;
  if (period === "weekly") return d.startOf("isoWeek").format("YYYY-MM-DD");
  if (period === "monthly") return d.startOf("month").format("YYYY-MM-DD");
  return d.startOf("year").format("YYYY-MM-DD");
}

export function aggregatePayInOutByPeriod(
  data: DashboardPayInOutPoint[],
  period: ChartPeriod
): DashboardPayInOutPoint[] {
  if (period === "daily") return data;
  const map = new Map<string, { payIn: number; payOut: number }>();
  for (const point of data) {
    const key = groupKey(point.date, period);
    const prev = map.get(key) ?? { payIn: 0, payOut: 0 };
    map.set(key, {
      payIn: prev.payIn + point.payIn,
      payOut: prev.payOut + point.payOut,
    });
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, { payIn, payOut }]) => ({ date, payIn, payOut }));
}

export function aggregateProfitByPeriod(
  data: DashboardProfitPoint[],
  period: ChartPeriod
): DashboardProfitPoint[] {
  if (period === "daily") return data;
  const map = new Map<string, number>();
  for (const point of data) {
    const key = groupKey(point.date, period);
    map.set(key, (map.get(key) ?? 0) + point.profit);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, profit]) => ({ date, profit }));
}

export function formatChartDateLabel(value: string, period: ChartPeriod): string {
  const d = dayjs(value);
  if (period === "daily") return d.format("MMM D");
  if (period === "weekly") return d.format("MMM D");
  if (period === "monthly") return d.format("MMM YYYY");
  return d.format("YYYY");
}
