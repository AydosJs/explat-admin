import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { DevicesCreatePage } from "@/pages/devices/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/devices/create",
  component: DevicesCreatePage,
});
