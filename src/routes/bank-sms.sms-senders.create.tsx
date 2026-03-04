import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { SmsSendersCreatePage } from "@/pages/bank-sms/sms-senders/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bank-sms/sms-senders/create",
  component: SmsSendersCreatePage,
});
