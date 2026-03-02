export type TokenBalanceStatus = "active" | "used" | "expired";

export interface TokenBalanceRow {
  id: string;
  tokenMasked: string;
  traderId: string;
  traderName: string;
  amount: number;
  status: TokenBalanceStatus;
  usedAt: string | null;
  createdAt: string;
  createdBy: string;
}
