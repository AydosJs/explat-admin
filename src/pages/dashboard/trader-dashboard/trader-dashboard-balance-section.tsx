import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function TraderDashboardBalanceSection() {
  const { t } = useTranslation();

  return (
    <div className="my-10">
      <section
        aria-labelledby="trader-dashboard-balance-heading"
        className="flex flex-col items-center justify-center py-6 text-center"
      >
        <h2
          id="trader-dashboard-balance-heading"
          className="text-sm font-medium text-white/80"
        >
          {t("trader.dashboard.totalBalance")}
        </h2>
        <p className="relative mt-2 flex justify-center">
          <span className="text-5xl font-bold tabular-nums text-white sm:text-5xl">
            45,644.00
          </span>
          <span className="absolute left-full ml-1.5 bottom-1 text-sm font-bold text-white/80 sm:text-xl">
            USDT
          </span>
        </p>
      </section>
      <nav
        className="flex flex-row flex-wrap justify-center gap-3"
        aria-label={t("trader.dashboard.quickLinks")}
      >
        <Link
          to="/more/balance-logs"
          className="rounded-lg bg-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {t("trader.dashboard.logs")}
        </Link>
        <Link
          to="/pay-in"
          className="rounded-lg bg-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {t("trader.dashboard.transactions")}
        </Link>
      </nav>
    </div>
  );
}
