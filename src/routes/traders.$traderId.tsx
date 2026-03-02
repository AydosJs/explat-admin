import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root.route";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/traders/$traderId",
  component: TraderDetailPage,
});

function TraderDetailPage() {
  const { traderId } = Route.useParams();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-foreground">
        Трейдер: {traderId}
      </h1>
      <p className="text-sm text-muted-foreground">
        Детальная страница трейдера (заглушка).
      </p>
    </div>
  );
}
