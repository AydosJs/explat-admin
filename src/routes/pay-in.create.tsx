import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { PayInCreatePage } from "@/pages/pay-in/crud/pay-in-create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pay-in/create",
  component: PayInCreatePage,
});
