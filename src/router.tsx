import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root.route";
import { Route as indexRoute } from "./routes/index";
import { Route as loginRoute } from "./routes/login";
import { Route as merchantsMerchantIdRoute } from "./routes/merchants.$merchantId";
import { Route as payInCreateRoute } from "./routes/pay-in.create";
import { Route as payInPayInIdRoute } from "./routes/pay-in.$payInId";
import { Route as payInRoute } from "./routes/pay-in";

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  merchantsMerchantIdRoute,
  payInRoute,
  payInCreateRoute,
  payInPayInIdRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
