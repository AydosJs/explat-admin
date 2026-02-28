import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { LoginPage } from "@/pages/login-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
