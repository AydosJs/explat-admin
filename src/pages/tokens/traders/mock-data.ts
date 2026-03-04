import type { TokenTraderRow } from "./types";

export const mockTokenTradersData: TokenTraderRow[] = [
  {
    id: "tt-001",
    tokenMasked: "sk_••••••••••••abc1",
    traderId: "trader-alpha",
    traderName: "Trader Alpha",
    isActive: true,
    createdAt: "2025-03-01T10:00:00Z",
  },
  {
    id: "tt-002",
    tokenMasked: "sk_••••••••••••abc2",
    traderId: "trader-beta",
    traderName: "Trader Beta",
    isActive: false,
    createdAt: "2025-02-28T14:30:00Z",
  },
  {
    id: "tt-003",
    tokenMasked: "sk_••••••••••••abc3",
    traderId: "trader-gamma",
    traderName: "Trader Gamma",
    isActive: true,
    createdAt: "2025-03-02T08:00:00Z",
  },
  {
    id: "tt-004",
    tokenMasked: "sk_••••••••••••abc4",
    traderId: "trader-delta",
    traderName: "Trader Delta",
    isActive: false,
    createdAt: "2025-02-20T12:00:00Z",
  },
];
