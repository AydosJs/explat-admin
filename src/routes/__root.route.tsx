import { createRootRoute } from "@tanstack/react-router";
import { RootComponent } from "./__root";

export const rootRoute = createRootRoute({
  component: RootComponent,
});
