import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { SmsTemplatesCreatePage } from "@/pages/bank-sms/sms-templates/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bank-sms/sms-templates/create",
  component: SmsTemplatesCreatePage,
});
