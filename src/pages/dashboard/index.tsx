import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RotateCw, Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/stores/use-user-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TraderDashboard } from "./trader-dashboard/trader-dashboard";
import { DashboardConversionCard } from "./dashboard-conversion-card";
import { DashboardStatsCard } from "./dashboard-stats-card";
import { DashboardPayInOutChart } from "./dashboard-pay-in-out-chart";
import { DashboardProfitChart } from "./dashboard-profit-chart";
import { DashboardStatusChart } from "./dashboard-status-chart";
import { DashboardTransactionsCard } from "./dashboard-transactions-card";
import { formatBalanceUsdt } from "./format-balance";
import {
  DASHBOARD_MERCHANTS,
  DASHBOARD_PAY_IN_OUT_SERIES,
  DASHBOARD_PROFIT_SERIES,
  DASHBOARD_STATS_PAY_IN_USDT,
  DASHBOARD_STATS_PAY_OUT_USDT,
  DASHBOARD_PROFIT_PAY_IN_USDT,
  DASHBOARD_PROFIT_PAY_OUT_USDT,
  DASHBOARD_CONVERSION_PAY_IN_PCT,
  DASHBOARD_CONVERSION_PAY_OUT_PCT,
  DASHBOARD_CONVERSION_APPEALS_PCT,
  DASHBOARD_TRANSACTIONS_SUCCESS,
  DASHBOARD_TRANSACTIONS_TOTAL,
  DASHBOARD_TRANSACTIONS_CANCELLED,
} from "./mock-data";
import type { DashboardStatsPeriod } from "./mock-data";
import { IncomeCalendar } from "./income-calendar";
import { MerchantsTable } from "./merchants-table";

export function DashboardPage() {
  const { t } = useTranslation();
  const role = useUserStore((s) => s.role);
  const [search, setSearch] = useState("");
  const [statsPeriod, setStatsPeriod] = useState<DashboardStatsPeriod>("all");
  const [profitPeriod, setProfitPeriod] = useState<DashboardStatsPeriod>("all");
  const [conversionPeriod, setConversionPeriod] =
    useState<DashboardStatsPeriod>("all");
  const [transactionsPeriod, setTransactionsPeriod] =
    useState<DashboardStatsPeriod>("all");

  const filteredMerchants = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DASHBOARD_MERCHANTS;
    return DASHBOARD_MERCHANTS.filter((m) =>
      m.name.toLowerCase().includes(q)
    );
  }, [search]);

  const merchantsTotalBalance = useMemo(
    () => filteredMerchants.reduce((sum, m) => sum + m.balanceUsdt, 0),
    [filteredMerchants]
  );

  if (role === "trader") {
    return <TraderDashboard />;
  }

  return (
    <div className="space-y-6">
      <section
        aria-labelledby="dashboard-profit-chart-heading"
        className="w-full"
      >
        <DashboardProfitChart data={DASHBOARD_PROFIT_SERIES} />
      </section>
      <section
        aria-labelledby="dashboard-status-chart-heading"
        className="flex w-full flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6"
      >
        <div className="min-w-0 lg:w-1/3">
          <DashboardStatusChart
            successCount={DASHBOARD_TRANSACTIONS_SUCCESS}
            rejectedCount={DASHBOARD_TRANSACTIONS_CANCELLED}
          />
        </div>
        <div className="min-w-0 lg:w-2/3">
          <DashboardPayInOutChart data={DASHBOARD_PAY_IN_OUT_SERIES} />
        </div>
      </section>
      <section
        aria-labelledby="dashboard-merchants-heading"
        className="flex w-full flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6 "
      >
        <div className="flex min-w-0 flex-1 flex-col lg:w-1/2">
          <h2
            id="dashboard-merchants-heading"
            className="mb-3 shrink-0 text-lg font-medium text-foreground"
          >
            {t("dashboard.ourMerchants")}
          </h2>
          <Card className="flex max-h-[411px]! min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border/50 px-4 py-3">
              <div className="relative min-w-0 flex-1 max-w-xs">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("dashboard.search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                  aria-label={t("dashboard.search")}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground"
                onClick={() => { }}
                aria-label={t("dashboard.reload")}
                title={t("dashboard.reload")}
              >
                <RotateCw className="size-5" />
              </Button>
            </div>
            <CardContent className="min-h-0 flex-1 overflow-auto p-0">
              <MerchantsTable merchants={filteredMerchants} />
            </CardContent>
            <div className="shrink-0 border-t border-border/50 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("dashboard.totalBalance")}
                </span>
                <span
                  className={
                    merchantsTotalBalance < 0
                      ? "tabular-nums font-semibold text-destructive"
                      : "tabular-nums font-semibold text-emerald-600 dark:text-emerald-400"
                  }
                >
                  {formatBalanceUsdt(merchantsTotalBalance)} USDT
                </span>
              </div>
            </div>
          </Card>
        </div>
        <div className="grid min-w-0 w-full grid-cols-1 gap-4 lg:w-1/2 lg:grid-cols-2 lg:content-start">
          <div className="min-w-0">
            <h2 className="mb-3 text-lg font-medium text-foreground">
              {t("dashboard.statistics")}
            </h2>
            <DashboardStatsCard
              payInUsdt={DASHBOARD_STATS_PAY_IN_USDT}
              payOutUsdt={DASHBOARD_STATS_PAY_OUT_USDT}
              period={statsPeriod}
              onPeriodChange={setStatsPeriod}
            />
          </div>
          <div className="min-w-0">
            <h2 className="mb-3 text-lg font-medium text-foreground">
              {t("dashboard.profit")}
            </h2>
            <DashboardStatsCard
              payInUsdt={DASHBOARD_PROFIT_PAY_IN_USDT}
              payOutUsdt={DASHBOARD_PROFIT_PAY_OUT_USDT}
              period={profitPeriod}
              onPeriodChange={setProfitPeriod}
            />
          </div>
          <div className="min-w-0">
            <h2 className="mb-3 text-lg font-medium text-foreground">
              {t("dashboard.conversion")}
            </h2>
            <DashboardConversionCard
              payInPct={DASHBOARD_CONVERSION_PAY_IN_PCT}
              payOutPct={DASHBOARD_CONVERSION_PAY_OUT_PCT}
              appealsPct={DASHBOARD_CONVERSION_APPEALS_PCT}
              period={conversionPeriod}
              onPeriodChange={setConversionPeriod}
            />
          </div>
          <div className="min-w-0">
            <h2 className="mb-3 text-lg font-medium text-foreground">
              {t("dashboard.transactions")}
            </h2>
            <DashboardTransactionsCard
              success={DASHBOARD_TRANSACTIONS_SUCCESS}
              total={DASHBOARD_TRANSACTIONS_TOTAL}
              cancelled={DASHBOARD_TRANSACTIONS_CANCELLED}
              period={transactionsPeriod}
              onPeriodChange={setTransactionsPeriod}
            />
          </div>
        </div>
      </section>

      <section className="w-full">
        <IncomeCalendar />
      </section>
    </div>
  );
}
