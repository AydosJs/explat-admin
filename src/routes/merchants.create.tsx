import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { MerchantsCreatePage } from "@/pages/merchants/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/merchants/create",
  component: MerchantsCreatePage,
});
