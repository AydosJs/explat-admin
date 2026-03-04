import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { TokensBalanceCreatePage } from "@/pages/tokens/balance/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tokens/balance/create",
  component: TokensBalanceCreatePage,
});
