import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { AppealsCreatePage } from "@/pages/appeals/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/appeals/create",
  component: AppealsCreatePage,
});
