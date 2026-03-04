import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { TokensTradersCreatePage } from "@/pages/tokens/traders/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tokens/traders/create",
  component: TokensTradersCreatePage,
});
