import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { TradersCreatePage } from "@/pages/traders/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/traders/create",
  component: TradersCreatePage,
});
