import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { TokensBalancePage } from "@/pages/tokens/balance";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tokens/balance",
  component: TokensBalancePage,
});
