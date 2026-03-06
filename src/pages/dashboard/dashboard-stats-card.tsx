import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import {
  SegmentGroup,
  type SegmentGroupOption,
} from "@/components/ui/segment-group";

import { formatBalanceUsdt } from "./format-balance";
import type { DashboardStatsPeriod } from "./mock-data";

const PERIODS: DashboardStatsPeriod[] = ["today", "week", "month", "all"];

const PERIOD_KEYS: Record<DashboardStatsPeriod, string> = {
  today: "dashboard.periodToday",
  week: "dashboard.periodWeek",
  month: "dashboard.periodMonth",
  all: "dashboard.periodAllTime",
};

interface DashboardStatsCardProps {
  payInUsdt: number;
  payOutUsdt: number;
  period: DashboardStatsPeriod;
  onPeriodChange: (period: DashboardStatsPeriod) => void;
}

export function DashboardStatsCard({
  payInUsdt,
  payOutUsdt,
  period,
  onPeriodChange,
}: DashboardStatsCardProps) {
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
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              {t("dashboard.payIn")}
            </span>
            <p className="tabular-nums text-lg font-semibold text-foreground">
              {formatBalanceUsdt(payInUsdt)} USDT
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              {t("dashboard.payOut")}
            </span>
            <p className="tabular-nums text-lg font-semibold text-foreground">
              {formatBalanceUsdt(payOutUsdt)} USDT
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
