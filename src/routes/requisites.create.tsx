import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { RequisitesCreatePage } from "@/pages/requisites/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/requisites/create",
  component: RequisitesCreatePage,
});
