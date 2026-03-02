import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { TokensPayoutsPage } from "@/pages/tokens/payouts";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tokens/payouts",
  component: TokensPayoutsPage,
});
