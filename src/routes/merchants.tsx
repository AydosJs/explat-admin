import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { MerchantsPage } from "@/pages/merchants";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/merchants",
  component: MerchantsPage,
});
