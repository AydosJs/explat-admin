import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { DevicesPage } from "@/pages/devices";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/devices",
  component: DevicesPage,
});
