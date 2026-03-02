import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { TradersPage } from "@/pages/traders";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/traders",
  component: TradersPage,
});
