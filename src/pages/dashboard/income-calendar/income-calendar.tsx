import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  addMonths,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { formatBalanceUsdt, formatPercent } from "../format-balance";
import { DayDetailPanel } from "./day-detail-panel";
import {
  INCOME_CALENDAR_DAY_DATA,
  INCOME_CALENDAR_DAY_DETAIL_DATA,
} from "./mock-data";
import type { DayDetailStats } from "./types";
import type { IncomeCalendarDayStats } from "./types";

const WEEK_STARTS_ON = 1; // Monday
const CALENDAR_WEEKS = 6;
const DAYS_PER_WEEK = 7;
const TOTAL_CELLS = CALENDAR_WEEKS * DAYS_PER_WEEK;

const DAY_KEYS = [
  "incomeCalendarDayMon",
  "incomeCalendarDayTue",
  "incomeCalendarDayWed",
  "incomeCalendarDayThu",
  "incomeCalendarDayFri",
  "incomeCalendarDaySat",
  "incomeCalendarDaySun",
] as const;

function toDateKey(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

function getStatsForDay(dateKey: string): IncomeCalendarDayStats | null {
  return INCOME_CALENDAR_DAY_DATA[dateKey] ?? null;
}

interface CalendarDayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  stats: IncomeCalendarDayStats | null;
  dayDetailStats: DayDetailStats | null;
  dayLabel: string;
  operationsLabel: string;
  conversionLabel: string;
  earningsLabel: string;
  noDataLabel: string;
  onSelect: () => void;
  onOpenChange: (open: boolean) => void;
}

function CalendarDayCell({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  stats,
  dayDetailStats,
  dayLabel,
  operationsLabel,
  conversionLabel,
  earningsLabel,
  noDataLabel,
  onSelect,
  onOpenChange,
}: CalendarDayCellProps) {
  const dateNum = format(date, "d");

  return (
    <Popover open={isSelected} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={onSelect}
          className={`flex min-h-30 w-full flex-col border-r border-b border-border bg-card p-2 text-left text-card-foreground transition-colors hover:bg-muted/50 sm:min-h-32 sm:p-3 ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
          aria-label={dayLabel}
          aria-pressed={isSelected}
        >
          <div className="flex items-center justify-between gap-1">
            <span
              className={
                !isCurrentMonth
                  ? "text-muted-foreground/60"
                  : isToday
                    ? "flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold sm:size-7"
                    : "text-sm font-medium text-foreground sm:text-sm"
              }
            >
              {dateNum}
            </span>
          </div>
          {stats !== null ? (
            <div className=" flex flex-1 flex-col justify-center gap-0.5 text-xs sm:gap-1 sm:text-sm">
              <div className="flex min-w-0 items-center justify-between gap-1">
                <span className="truncate text-muted-foreground">{operationsLabel}</span>
                <span className="shrink-0 tabular-nums font-medium">{stats.operations}</span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-1">
                <span className="truncate text-muted-foreground">{conversionLabel}</span>
                <span className="shrink-0 tabular-nums font-medium text-destructive">
                  {formatPercent(stats.conversionPct)}
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-1">
                <span className="truncate text-muted-foreground">{earningsLabel}</span>
                <span className="shrink-0 whitespace-nowrap tabular-nums font-medium text-emerald-600 dark:text-emerald-400">
                  {formatBalanceUsdt(stats.earningsUsdt)}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center" aria-hidden />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto max-w-[calc(100vw-2rem)] p-0"
        align="start"
        side="bottom"
        sideOffset={6}
      >
        {dayDetailStats != null ? (
          <DayDetailPanel date={date} stats={dayDetailStats} compact />
        ) : (
          <p className="px-3 py-4 text-sm text-muted-foreground">
            {noDataLabel}
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}

export function IncomeCalendar() {
  const { t } = useTranslation();
  const [viewMonth, setViewMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const gridDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewMonth), {
      weekStartsOn: WEEK_STARTS_ON,
    });
    const end = new Date(start);
    end.setDate(end.getDate() + TOTAL_CELLS - 1);
    return eachDayOfInterval({ start, end });
  }, [viewMonth]);

  const goPrev = () => setViewMonth((m) => subMonths(m, 1));
  const goNext = () => setViewMonth((m) => addMonths(m, 1));
  const goToday = () => setViewMonth(new Date());

  const today = useMemo(() => new Date(), []);

  return (
    <section
      className="w-full"
      aria-labelledby="income-calendar-heading"
    >
      <h2
        id="income-calendar-heading"
        className="mb-3 text-lg font-medium text-foreground"
      >
        {t("dashboard.incomeCalendar")}
      </h2>
      <div className="rounded-lg border border-border bg-card p-3 sm:p-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {format(viewMonth, "d MMMM yyyy", { locale: ru })}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full"
              onClick={goPrev}
              aria-label={t("dashboard.incomeCalendarPrev")}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 gap-1.5 rounded-full"
              onClick={goToday}
              aria-label={t("dashboard.incomeCalendarToday")}
            >
              <CalendarIcon className="size-4" />
              <span>{t("dashboard.incomeCalendarToday")}</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full"
              onClick={goNext}
              aria-label={t("dashboard.incomeCalendarNext")}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="-mx-3 overflow-x-auto sm:mx-0">
          <div className="min-w-4xl sm:min-w-0">
            <div
              className="grid grid-cols-7 border-l border-t border-border"
              role="grid"
              aria-label={t("dashboard.incomeCalendar")}
            >
              {DAY_KEYS.map((key) => (
                <div
                  key={key}
                  className="border-r border-b border-border py-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm"
                  role="columnheader"
                >
                  {t(`dashboard.${key}`)}
                </div>
              ))}
              {gridDays.map((date) => {
                const dateKey = toDateKey(date);
                const dayDetailStats =
                  INCOME_CALENDAR_DAY_DETAIL_DATA[dateKey] ?? null;
                return (
                  <CalendarDayCell
                    key={date.getTime()}
                    date={date}
                    isCurrentMonth={isSameMonth(date, viewMonth)}
                    isToday={isSameDay(date, today)}
                    isSelected={
                      selectedDate !== null && isSameDay(date, selectedDate)
                    }
                    stats={getStatsForDay(dateKey)}
                    dayDetailStats={dayDetailStats}
                    dayLabel={format(date, "d MMMM yyyy", { locale: ru })}
                    operationsLabel={t("dashboard.incomeCalendarOperations")}
                    conversionLabel={t("dashboard.incomeCalendarConversion")}
                    earningsLabel={t("dashboard.incomeCalendarEarnings")}
                    noDataLabel={t("dashboard.dayDetailNoData")}
                    onSelect={() => setSelectedDate(date)}
                    onOpenChange={(open) => {
                      if (!open) setSelectedDate(null);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
