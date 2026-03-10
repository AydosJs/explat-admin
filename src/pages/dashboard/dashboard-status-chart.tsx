import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatusChartProps {
  successCount: number;
  rejectedCount: number;
}

export function DashboardStatusChart({
  successCount,
  rejectedCount,
}: DashboardStatusChartProps) {
  const { t } = useTranslation();

  const data = useMemo(
    () => [
      {
        name: t("dashboard.success"),
        value: successCount,
        fill: "var(--success)",
      },
      {
        name: t("dashboard.cancelled"),
        value: rejectedCount,
        fill: "var(--destructive)",
      },
    ],
    [successCount, rejectedCount, t]
  );

  const total = successCount + rejectedCount;

  const successPctLabel =
    total > 0 ? ((successCount / total) * 100).toFixed(1) : "0";
  const rejectedPctLabel =
    total > 0 ? ((rejectedCount / total) * 100).toFixed(1) : "0";

  return (
    <Card className="flex h-full w-full flex-col">
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4 p-4">
        <div className="h-[220px] w-full min-w-0 max-w-[220px] shrink-0 sm:max-w-none">
          <h2
            id="dashboard-status-chart-heading"
            className="mb-3 text-lg font-medium text-foreground"
          >
            {t("dashboard.statusChartTitle")}
          </h2>
          {total > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="40%"
                  outerRadius="85%"
                  label={false}
                  labelLine={false}
                  isAnimationActive
                  stroke="var(--pie-stroke)"
                  strokeWidth={1}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      stroke="var(--pie-stroke)"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={(props: unknown) => {
                    const { active, payload } = props as {
                      active?: boolean;
                      payload?: Array<{ name?: string; value?: number }>;
                    };
                    if (!active || !payload?.length) return null;
                    const item = payload[0];
                    const value = item?.value ?? 0;
                    const pct =
                      total > 0 ? ((value / total) * 100).toFixed(1) : "0";
                    const color =
                      item?.name === t("dashboard.success")
                        ? "var(--success)"
                        : "var(--destructive)";
                    return (
                      <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-sm">
                        <span
                          className="font-medium"
                          style={{ color }}
                        >
                          {item?.name ?? ""}:
                        </span>{" "}
                        <span className="tabular-nums" style={{ color }}>
                          {value} ({pct}%)
                        </span>
                      </div>
                    );
                  }}
                  cursor={{ fill: "transparent" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
              {t("dashboard.dayDetailNoData")}
            </div>
          )}
        </div>
        <div className="mt-auto flex shrink-0 flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <span
              className="size-3 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"
              aria-hidden
            />
            <span className="text-sm text-muted-foreground">
              {t("dashboard.success")}
            </span>
            <span className="tabular-nums text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {successCount}
            </span>
            <span className="text-sm text-muted-foreground">
              ({successPctLabel}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="size-3 shrink-0 rounded-full bg-destructive"
              aria-hidden
            />
            <span className="text-sm text-muted-foreground">
              {t("dashboard.cancelled")}
            </span>
            <span className="tabular-nums text-sm font-medium text-destructive">
              {rejectedCount}
            </span>
            <span className="text-sm text-muted-foreground">
              ({rejectedPctLabel}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
