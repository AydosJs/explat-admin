export interface TraderRow {
  id: string;
  name: string;
  balanceUsdt: number;
  balanceManat: number;
  method: string;
  priority: number;
  conversionTransactions: number;
  conversionPayouts: number;
  requisitesCount: number;
  activeOrdersCount: number;
  isActive: boolean;
  trafficEnabled: boolean;
  payInEnabled: boolean;
  payOutEnabled: boolean;
  createdAt: string;
}
