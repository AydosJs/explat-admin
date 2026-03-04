import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { PayOutCreatePage } from "@/pages/pay-out/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pay-out/create",
  component: PayOutCreatePage,
});
