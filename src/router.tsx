import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root.route";
import { Route as indexRoute } from "./routes/index";
import { Route as loginRoute } from "./routes/login";
import { Route as payInRoute } from "./routes/pay-in";

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, payInRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
