import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { PaymentReservePage } from "@/pages/more/payment-reserve";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/more/payment-reserve",
  component: PaymentReservePage,
});
