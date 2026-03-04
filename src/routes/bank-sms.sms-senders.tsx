import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { SmsSendersPage } from "@/pages/bank-sms/sms-senders";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bank-sms/sms-senders",
  component: SmsSendersPage,
});
