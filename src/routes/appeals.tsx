import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { AppealsPage } from "@/pages/appeals";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/appeals",
  component: AppealsPage,
});
