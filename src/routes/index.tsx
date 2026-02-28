import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { MainPage } from "@/pages/main-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainPage,
});
