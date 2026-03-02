import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { PayOutPage } from "@/pages/pay-out";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pay-out",
  component: PayOutPage,
});
