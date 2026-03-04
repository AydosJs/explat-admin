import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root.route";
import { Route as indexRoute } from "./routes/index";
import { Route as loginRoute } from "./routes/login";
import { Route as merchantsRoute } from "./routes/merchants";
import { Route as merchantsCreateRoute } from "./routes/merchants.create";
import { Route as merchantsMerchantIdRoute } from "./routes/merchants.$merchantId";
import { Route as payInCreateRoute } from "./routes/pay-in.create";
import { Route as payInPayInIdRoute } from "./routes/pay-in.$payInId";
import { Route as payInRoute } from "./routes/pay-in";
import { Route as devicesRoute } from "./routes/devices";
import { Route as devicesCreateRoute } from "./routes/devices.create";
import { Route as payOutRoute } from "./routes/pay-out";
import { Route as payOutCreateRoute } from "./routes/pay-out.create";
import { Route as requisitesRoute } from "./routes/requisites";
import { Route as requisitesCreateRoute } from "./routes/requisites.create";
import { Route as tradersRoute } from "./routes/traders";
import { Route as tradersCreateRoute } from "./routes/traders.create";
import { Route as tradersTraderIdRoute } from "./routes/traders.$traderId";
import { Route as appealsRoute } from "./routes/appeals";
import { Route as appealsCreateRoute } from "./routes/appeals.create";
import { Route as tokensPayoutsRoute } from "./routes/tokens.payouts";
import { Route as tokensPayoutsCreateRoute } from "./routes/tokens.payouts.create";
import { Route as tokensBalanceRoute } from "./routes/tokens.balance";
import { Route as tokensBalanceCreateRoute } from "./routes/tokens.balance.create";
import { Route as tokensTradersRoute } from "./routes/tokens.traders";
import { Route as tokensTradersCreateRoute } from "./routes/tokens.traders.create";
import { Route as bankSmsBanksRoute } from "./routes/bank-sms.banks";
import { Route as bankSmsBanksCreateRoute } from "./routes/bank-sms.banks.create";
import { Route as bankSmsSmsTemplatesRoute } from "./routes/bank-sms.sms-templates";
import { Route as bankSmsSmsTemplatesCreateRoute } from "./routes/bank-sms.sms-templates.create";
import { Route as bankSmsSmsSendersRoute } from "./routes/bank-sms.sms-senders";
import { Route as bankSmsSmsSendersCreateRoute } from "./routes/bank-sms.sms-senders.create";
import { Route as moreBalanceLogsRoute } from "./routes/more.balance-logs";
import { Route as moreBalanceLogsCreateRoute } from "./routes/more.balance-logs.create";
import { Route as morePaymentReserveRoute } from "./routes/more.payment-reserve";
import { Route as morePaymentReserveCreateRoute } from "./routes/more.payment-reserve.create";

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  merchantsRoute,
  merchantsCreateRoute,
  merchantsMerchantIdRoute,
  payInRoute,
  payInCreateRoute,
  payInPayInIdRoute,
  payOutRoute,
  payOutCreateRoute,
  requisitesRoute,
  requisitesCreateRoute,
  devicesRoute,
  devicesCreateRoute,
  tradersRoute,
  tradersCreateRoute,
  tradersTraderIdRoute,
  appealsRoute,
  appealsCreateRoute,
  tokensPayoutsRoute,
  tokensPayoutsCreateRoute,
  tokensBalanceRoute,
  tokensBalanceCreateRoute,
  tokensTradersRoute,
  tokensTradersCreateRoute,
  bankSmsBanksRoute,
  bankSmsBanksCreateRoute,
  bankSmsSmsTemplatesRoute,
  bankSmsSmsTemplatesCreateRoute,
  bankSmsSmsSendersRoute,
  bankSmsSmsSendersCreateRoute,
  moreBalanceLogsRoute,
  moreBalanceLogsCreateRoute,
  morePaymentReserveRoute,
  morePaymentReserveCreateRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
