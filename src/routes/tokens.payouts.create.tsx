import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { TokensPayoutsCreatePage } from "@/pages/tokens/payouts/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tokens/payouts/create",
  component: TokensPayoutsCreatePage,
});
