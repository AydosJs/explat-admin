import { createRootRoute } from "@tanstack/react-router";
import { RootComponent } from "./__root";
import { NotFoundPage } from "@/pages/not-found-page";

export const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});
