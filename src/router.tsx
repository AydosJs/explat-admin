import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root.route";
import { Route as indexRoute } from "./routes/index";
import { Route as loginRoute } from "./routes/login";
import { Route as merchantsRoute } from "./routes/merchants";
import { Route as merchantsMerchantIdRoute } from "./routes/merchants.$merchantId";
import { Route as payInCreateRoute } from "./routes/pay-in.create";
import { Route as payInPayInIdRoute } from "./routes/pay-in.$payInId";
import { Route as payInRoute } from "./routes/pay-in";
import { Route as devicesRoute } from "./routes/devices";
import { Route as payOutRoute } from "./routes/pay-out";
import { Route as requisitesRoute } from "./routes/requisites";
import { Route as tradersRoute } from "./routes/traders";
import { Route as tradersTraderIdRoute } from "./routes/traders.$traderId";
import { Route as appealsRoute } from "./routes/appeals";
import { Route as tokensPayoutsRoute } from "./routes/tokens.payouts";
import { Route as tokensBalanceRoute } from "./routes/tokens.balance";

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  merchantsRoute,
  merchantsMerchantIdRoute,
  payInRoute,
  payInCreateRoute,
  payInPayInIdRoute,
  payOutRoute,
  requisitesRoute,
  devicesRoute,
  tradersRoute,
  tradersTraderIdRoute,
  appealsRoute,
  tokensPayoutsRoute,
  tokensBalanceRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
