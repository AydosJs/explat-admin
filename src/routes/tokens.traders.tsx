import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { TokensTradersPage } from "@/pages/tokens/traders";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tokens/traders",
  component: TokensTradersPage,
});
