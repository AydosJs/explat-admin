import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";
import { PayInEditPage } from "@/pages/pay-in/crud/pay-in-edit-page";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pay-in/$payInId",
  component: PayInEditPageWrapper,
});

function PayInEditPageWrapper() {
  const { payInId } = Route.useParams();
  return <PayInEditPage payInId={payInId} />;
}
