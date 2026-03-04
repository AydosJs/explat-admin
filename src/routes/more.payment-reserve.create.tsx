import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { PaymentReserveCreatePage } from "@/pages/more/payment-reserve/create-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/more/payment-reserve/create",
  component: PaymentReserveCreatePage,
});
