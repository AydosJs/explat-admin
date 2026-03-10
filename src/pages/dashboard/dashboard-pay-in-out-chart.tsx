import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  SegmentGroup,
  type SegmentGroupOption,
} from "@/components/ui/segment-group";

import {
  aggregatePayInOutByPeriod,
  formatChartDateLabel,
  type ChartPeriod,
} from "./chart-period";
import { formatBalanceUsdt } from "./format-balance";
import type { DashboardPayInOutPoint } from "./mock-data";

const CHART_PERIODS: ChartPeriod[] = ["daily", "weekly", "monthly", "yearly"];
const PERIOD_KEYS: Record<ChartPeriod, string> = {
  daily: "dashboard.periodDaily",
  weekly: "dashboard.periodWeek",
  monthly: "dashboard.periodMonth",
  yearly: "dashboard.periodYearly",
};

interface DashboardPayInOutChartProps {
  data: DashboardPayInOutPoint[];
}

export function DashboardPayInOutChart({ data }: DashboardPayInOutChartProps) {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<ChartPeriod>("daily");

  const periodOptions = useMemo<SegmentGroupOption[]>(
    () =>
      CHART_PERIODS.map((value) => ({
        value,
        label: t(PERIOD_KEYS[value]),
      })),
    [t]
  );

  const chartData = useMemo(
    () => aggregatePayInOutByPeriod(data, period),
    [data, period]
  );

  return (
    <Card className="h-full w-full">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="dashboard-pay-in-out-chart-heading"
            className="text-lg font-medium text-foreground"
          >
            {t("dashboard.payInOutChartTitle")}
          </h2>
          <SegmentGroup
            value={period}
            onValueChange={(v) => setPeriod(v as ChartPeriod)}
            options={periodOptions}
            ariaLabel={t("dashboard.periodFilterLabel")}
            size="sm"
            className="w-full max-w-xs shrink-0"
          />
        </div>
        <div className="h-[280px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              accessibilityLayer
            >
              <defs>
                <linearGradient id="payInAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="payOutAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tickFormatter={(value) => formatChartDateLabel(value, period)}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatBalanceUsdt(value)}
              />
              <Tooltip
                content={(props: unknown) => {
                  const {
                    active,
                    payload,
                    label,
                  } = props as {
                    active?: boolean;
                    payload?: Array<{
                      name?: string;
                      value?: number;
                      dataKey: string;
                    }>;
                    label?: string;
                  };
                  if (!active || !payload?.length) return null;
                  const seen = new Set<string>();
                  const uniqueByDataKey = [...payload]
                    .reverse()
                    .filter((entry) => {
                      if (seen.has(entry.dataKey)) return false;
                      seen.add(entry.dataKey);
                      return true;
                    })
                    .reverse();
                  return (
                    <div className="rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm">
                      <p className="mb-2 font-medium text-foreground">
                        {label
                          ? formatChartDateLabel(label, period)
                          : label}
                      </p>
                      {uniqueByDataKey.map((entry) => {
                        const color =
                          entry.dataKey === "payIn"
                            ? "var(--chart-1)"
                            : "var(--chart-2)";
                        return (
                          <div
                            key={entry.dataKey}
                            className="flex items-center justify-between gap-4"
                          >
                            <span
                              className="font-medium"
                              style={{ color }}
                            >
                              {entry.name ?? entry.dataKey}:
                            </span>
                            <span
                              className="tabular-nums font-medium"
                              style={{ color }}
                            >
                              {formatBalanceUsdt(entry.value ?? 0)} USDT
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                formatter={(value) => (
                  <span className="text-muted-foreground">{value}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="payIn"
                fill="url(#payInAreaFill)"
                stroke="none"
                legendType="none"
              />
              <Area
                type="monotone"
                dataKey="payOut"
                fill="url(#payOutAreaFill)"
                stroke="none"
                legendType="none"
              />
              <Line
                type="monotone"
                dataKey="payIn"
                name={t("dashboard.payIn")}
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ fill: "var(--chart-1)", strokeWidth: 0 }}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="payOut"
                name={t("dashboard.payOut")}
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={{ fill: "var(--chart-2)", strokeWidth: 0 }}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
