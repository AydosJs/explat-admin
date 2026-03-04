import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { BanksCreatePage } from "@/pages/bank-sms/banks/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bank-sms/banks/create",
  component: BanksCreatePage,
});
