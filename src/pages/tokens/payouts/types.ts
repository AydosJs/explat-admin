export type TokenPayoutStatus = "active" | "used" | "expired";

export interface TokenPayoutRow {
  id: string;
  tokenName: string;
  traderId: string;
  traderName: string;
  tokenMasked: string;
  isActive: boolean;
  status: TokenPayoutStatus;
  createdAt: string;
  usedAt: string | null;
}
