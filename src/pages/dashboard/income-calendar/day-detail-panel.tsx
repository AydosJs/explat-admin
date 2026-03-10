import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { formatBalanceUsdt, formatPercent } from "../format-balance";
import type { DayDetailStats } from "./types";

interface DayDetailPanelProps {
  date: Date;
  stats: DayDetailStats;
  /** When true, use tighter padding and text for popover. */
  compact?: boolean;
}

function cellClassName(
  kind: "number" | "usdt" | "percent",
  value: number,
  isProfit = false
): string {
  const base = "tabular-nums text-right text-xs font-medium sm:text-sm";
  if (!isProfit || kind !== "usdt") return base;
  return value < 0
    ? `${base} text-destructive`
    : `${base} text-emerald-600 dark:text-emerald-400`;
}

export function DayDetailPanel({
  date,
  stats,
  compact = false,
}: DayDetailPanelProps) {
  const { t } = useTranslation();
  const dateFormatted = format(date, "d MMMM yyyy 'г.'", { locale: ru });

  const rows: Array<{
    labelKey: string;
    payIn: number;
    payOut: number;
    total: number;
    kind: "number" | "usdt" | "percent";
    isProfit?: boolean;
  }> = [
    {
      labelKey: "dashboard.dayDetailOperations",
      payIn: stats.payIn.operations,
      payOut: stats.payOut.operations,
      total: stats.totalOperations,
      kind: "number",
    },
    {
      labelKey: "dashboard.dayDetailSuccess",
      payIn: stats.payIn.successCount,
      payOut: stats.payOut.successCount,
      total: stats.totalSuccess,
      kind: "number",
    },
    {
      labelKey: "dashboard.dayDetailFailed",
      payIn: stats.payIn.failedCount,
      payOut: stats.payOut.failedCount,
      total: stats.totalFailed,
      kind: "number",
    },
    {
      labelKey: "dashboard.dayDetailVolume",
      payIn: stats.payIn.volumeUsdt,
      payOut: stats.payOut.volumeUsdt,
      total: stats.turnoverUsdt,
      kind: "usdt",
    },
    {
      labelKey: "dashboard.dayDetailProfit",
      payIn: stats.payIn.profitUsdt,
      payOut: stats.payOut.profitUsdt,
      total: stats.platformIncomeUsdt,
      kind: "usdt",
      isProfit: true,
    },
    {
      labelKey: "dashboard.dayDetailConversion",
      payIn: stats.payIn.conversionPct,
      payOut: stats.payOut.conversionPct,
      total: stats.avgConversionPct,
      kind: "percent",
    },
  ];

  return (
    <div
      className={
        compact
          ? "px-2.5 py-2"
          : "mt-3 rounded-lg border border-border bg-card px-3 py-2.5 shadow-sm sm:mt-4 sm:px-4 sm:py-3"
      }
      role="region"
      aria-label={t("dashboard.dayDetailTitle")}
    >
      <p
        className={
          compact
            ? "text-xs font-semibold text-foreground"
            : "text-sm font-semibold text-foreground"
        }
      >
        {dateFormatted}
      </p>
      <div className={compact ? "mt-1.5 overflow-x-auto" : "mt-2 overflow-x-auto"}>
        <table
          className={
            compact
              ? "w-full min-w-48 border-collapse text-xs"
              : "w-full min-w-[240px] border-collapse text-xs sm:text-sm"
          }
        >
          <thead>
            <tr className="border-b border-border">
              <th
                className={
                  compact
                    ? "py-1 pr-2 text-left font-medium text-muted-foreground"
                    : "py-1.5 pr-3 text-left font-medium text-muted-foreground"
                }
              >
                {" "}
              </th>
              <th
                className={
                  compact
                    ? "py-1 px-1.5 text-right font-medium text-muted-foreground"
                    : "py-1.5 px-2 text-right font-medium text-muted-foreground"
                }
              >
                {t("dashboard.payIn")}
              </th>
              <th
                className={
                  compact
                    ? "py-1 px-1.5 text-right font-medium text-muted-foreground"
                    : "py-1.5 px-2 text-right font-medium text-muted-foreground"
                }
              >
                {t("dashboard.payOut")}
              </th>
              <th
                className={
                  compact
                    ? "py-1 pl-1.5 text-right font-medium text-muted-foreground"
                    : "py-1.5 pl-2 text-right font-medium text-muted-foreground"
                }
              >
                {t("dashboard.dayDetailTotal")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.labelKey}
                className={
                  index < rows.length - 1 ? "border-b border-border/60" : ""
                }
              >
                <td
                  className={
                    compact
                      ? "py-1 pr-2 text-muted-foreground"
                      : "py-1.5 pr-3 text-muted-foreground"
                  }
                >
                  {t(row.labelKey)}
                </td>
                <td
                  className={`${compact ? "py-1 px-1.5" : "py-1.5 px-2"} ${cellClassName(
                    row.kind,
                    row.payIn,
                    row.isProfit
                  )}`}
                >
                  {row.kind === "usdt"
                    ? formatBalanceUsdt(row.payIn)
                    : row.kind === "percent"
                      ? formatPercent(row.payIn)
                      : row.payIn}
                </td>
                <td
                  className={`${compact ? "py-1 px-1.5" : "py-1.5 px-2"} ${cellClassName(
                    row.kind,
                    row.payOut,
                    row.isProfit
                  )}`}
                >
                  {row.kind === "usdt"
                    ? formatBalanceUsdt(row.payOut)
                    : row.kind === "percent"
                      ? formatPercent(row.payOut)
                      : row.payOut}
                </td>
                <td
                  className={`${compact ? "py-1 pl-1.5" : "py-1.5 pl-2"} ${cellClassName(
                    row.kind,
                    row.total,
                    row.isProfit
                  )}`}
                >
                  {row.kind === "usdt"
                    ? formatBalanceUsdt(row.total)
                    : row.kind === "percent"
                      ? formatPercent(row.total)
                      : row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
