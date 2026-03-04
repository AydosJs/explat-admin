import type { PaymentReserveRow } from "./types";

export const mockPaymentReserveData: PaymentReserveRow[] = [
  {
    id: "res-001",
    transaction: "TXN-2025-001",
    requisite: "**** 4521 • Сбербанк",
    usedAt: "2025-03-01T12:30:00Z",
    createdAt: "2025-03-01T10:00:00Z",
  },
  {
    id: "res-002",
    transaction: "TXN-2025-002",
    requisite: "**** 8834 • Тинькофф",
    usedAt: null,
    createdAt: "2025-02-28T14:00:00Z",
  },
  {
    id: "res-003",
    transaction: "TXN-2025-003",
    requisite: "**** 1209 • ВТБ",
    usedAt: "2025-02-27T09:15:00Z",
    createdAt: "2025-02-27T08:00:00Z",
  },
  {
    id: "res-004",
    transaction: "TXN-2025-004",
    requisite: "**** 5562 • Альфа-Банк",
    usedAt: null,
    createdAt: "2025-03-02T11:00:00Z",
  },
];
