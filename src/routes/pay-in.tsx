import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { PayInPage } from "@/pages/pay-in-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pay-in",
  component: PayInPage,
});
