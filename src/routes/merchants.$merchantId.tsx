import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/merchants/$merchantId",
  component: MerchantDetailPage,
});

function MerchantDetailPage() {
  const { merchantId } = Route.useParams();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-foreground">
        Мерчант: {merchantId}
      </h1>
      <p className="text-sm text-muted-foreground">
        Детальная страница мерчанта (заглушка).
      </p>
    </div>
  );
}
