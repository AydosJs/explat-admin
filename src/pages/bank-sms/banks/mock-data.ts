import type { BankRow } from "./types";

export const mockBanksData: BankRow[] = [
  {
    id: "bank-001",
    name: "Сбербанк",
    sendersCount: 3,
    isActive: true,
    createdAt: "2025-03-01T10:00:00Z",
  },
  {
    id: "bank-002",
    name: "Тинькофф",
    sendersCount: 2,
    isActive: true,
    createdAt: "2025-02-28T14:30:00Z",
  },
  {
    id: "bank-003",
    name: "ВТБ",
    sendersCount: 0,
    isActive: false,
    createdAt: "2025-02-20T12:00:00Z",
  },
  {
    id: "bank-004",
    name: "Альфа-Банк",
    sendersCount: 1,
    isActive: true,
    createdAt: "2025-03-02T08:00:00Z",
  },
];
