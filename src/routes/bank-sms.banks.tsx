import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { BanksPage } from "@/pages/bank-sms/banks";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bank-sms/banks",
  component: BanksPage,
});
