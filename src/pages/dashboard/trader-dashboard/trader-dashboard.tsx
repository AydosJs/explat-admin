import { IncomeCalendar } from "../income-calendar";
import { TraderDashboardBalanceSection } from "./trader-dashboard-balance-section";
import { TraderDashboardRequisitesSection } from "./trader-dashboard-requisites-section";

export function TraderDashboard() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 -mx-4 -mt-4 bg-black px-4 pb-10 pt-4 sm:-mx-6 sm:-mt-6 sm:px-6 sm:pt-6">
        <TraderDashboardBalanceSection />
      </div>
      <div className="min-w-0 -mx-4 flex flex-col -mt-10 rounded-t-[30px] bg-background px-4 shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.12)] sm:-mx-6 sm:px-6 dark:shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.4)]">
        <TraderDashboardRequisitesSection />
        <section className="w-full">
          <IncomeCalendar />
        </section>
      </div>
    </div>
  );
}
