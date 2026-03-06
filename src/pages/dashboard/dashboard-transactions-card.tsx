import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import {
  SegmentGroup,
  type SegmentGroupOption,
} from "@/components/ui/segment-group";

import type { DashboardStatsPeriod } from "./mock-data";

const PERIODS: DashboardStatsPeriod[] = ["today", "week", "month", "all"];

const PERIOD_KEYS: Record<DashboardStatsPeriod, string> = {
  today: "dashboard.periodToday",
  week: "dashboard.periodWeek",
  month: "dashboard.periodMonth",
  all: "dashboard.periodAllTime",
};

interface DashboardTransactionsCardProps {
  success: number;
  total: number;
  cancelled: number;
  period: DashboardStatsPeriod;
  onPeriodChange: (period: DashboardStatsPeriod) => void;
}

export function DashboardTransactionsCard({
  success,
  total,
  cancelled,
  period,
  onPeriodChange,
}: DashboardTransactionsCardProps) {
  const { t } = useTranslation();

  const periodOptions = useMemo<SegmentGroupOption[]>(
    () =>
      PERIODS.map((value) => ({
        value,
        label: t(PERIOD_KEYS[value]),
      })),
    [t]
  );

  return (
    <Card size="sm" className="flex max-h-112 flex-col overflow-hidden">
      <CardContent className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
        <div className="w-full min-w-0 shrink-0">
          <SegmentGroup
            value={period}
            onValueChange={(v) => onPeriodChange(v as DashboardStatsPeriod)}
            options={periodOptions}
            ariaLabel={t("dashboard.periodFilterLabel")}
            size="sm"
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              {t("dashboard.success")}
            </span>
            <p className="tabular-nums text-lg font-semibold text-foreground">
              {success.toLocaleString("ru-RU")}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              {t("dashboard.totalCount")}
            </span>
            <p className="tabular-nums text-lg font-semibold text-foreground">
              {total.toLocaleString("ru-RU")}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              {t("dashboard.cancelled")}
            </span>
            <p className="tabular-nums text-lg font-semibold text-foreground">
              {cancelled.toLocaleString("ru-RU")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
