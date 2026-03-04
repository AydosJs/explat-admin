import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { BalanceLogsCreatePage } from "@/pages/more/balance-logs/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/more/balance-logs/create",
  component: BalanceLogsCreatePage,
});
