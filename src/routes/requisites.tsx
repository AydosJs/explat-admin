import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { RequisitesPage } from "@/pages/requisites";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/requisites",
  component: RequisitesPage,
});
