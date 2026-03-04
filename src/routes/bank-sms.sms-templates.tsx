import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { SmsTemplatesPage } from "@/pages/bank-sms/sms-templates";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bank-sms/sms-templates",
  component: SmsTemplatesPage,
});
