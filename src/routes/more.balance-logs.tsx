import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { BalanceLogsPage } from "@/pages/more/balance-logs";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/more/balance-logs",
  component: BalanceLogsPage,
});
