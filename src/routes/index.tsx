import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { DashboardPage } from "@/pages/dashboard";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});
