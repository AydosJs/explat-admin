export interface BalanceLogRow {
  id: string;
  traderName: string;
  traderId: string;
  amount: number;
  type: string;
  method: string;
  reason: string;
  transaction: string;
  createdAt: string;
}
