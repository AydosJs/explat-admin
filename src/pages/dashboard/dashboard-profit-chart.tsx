import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  CartesianGrid,
  ComposedChart,
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
  aggregateProfitByPeriod,
  formatChartDateLabel,
  type ChartPeriod,
} from "./chart-period";
import { formatBalanceUsdt } from "./format-balance";
import type { DashboardProfitPoint } from "./mock-data";

const CHART_PERIODS: ChartPeriod[] = ["daily", "weekly", "monthly", "yearly"];
const PERIOD_KEYS: Record<ChartPeriod, string> = {
  daily: "dashboard.periodDaily",
  weekly: "dashboard.periodWeek",
  monthly: "dashboard.periodMonth",
  yearly: "dashboard.periodYearly",
};

interface DashboardProfitChartProps {
  data: DashboardProfitPoint[];
}

export function DashboardProfitChart({ data }: DashboardProfitChartProps) {
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

  const chartData = useMemo(() => {
    const aggregated = aggregateProfitByPeriod(data, period);
    return aggregated.map((d) => ({
      ...d,
      profit: Math.max(0, d.profit),
    }));
  }, [data, period]);

  const yDomain = useMemo(() => {
    const values = chartData.map((d) => d.profit);
    const dataMax = values.length ? Math.max(...values, 0) : 0;
    const padding = dataMax > 0 ? dataMax * 0.05 : 5;
    return [0, dataMax + padding] as [number, number];
  }, [chartData]);

  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="dashboard-profit-chart-heading"
            className="text-lg font-medium text-foreground"
          >
            {t("dashboard.profit")}
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
        <div className="h-[240px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              accessibilityLayer
            >
              <defs>
                <linearGradient id="profitAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--success)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
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
                domain={yDomain}
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
                  const entry = payload[0];
                  const value = entry?.value ?? 0;
                  const isNegative = value < 0;
                  return (
                    <div className="rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm">
                      <p className="mb-1 font-medium text-foreground">
                        {label
                          ? formatChartDateLabel(label, period)
                          : label}
                      </p>
                      <p
                        className={
                          isNegative
                            ? "tabular-nums font-medium text-destructive"
                            : "tabular-nums font-medium text-emerald-600 dark:text-emerald-400"
                        }
                      >
                        {t("dashboard.profit")}: {formatBalanceUsdt(value)} USDT
                      </p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                fill="url(#profitAreaFill)"
                stroke="none"
              />
              <Line
                type="monotone"
                dataKey="profit"
                name={t("dashboard.profit")}
                stroke="var(--success)"
                strokeWidth={2}
                dot={{ fill: "var(--success)", strokeWidth: 0 }}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
