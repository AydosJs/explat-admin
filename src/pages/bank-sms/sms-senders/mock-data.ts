import type { SmsSenderRow } from "./types";

export const mockSmsSendersData: SmsSenderRow[] = [
  {
    id: "sender-001",
    sender: "Сбербанк Онлайн",
    bank: "Сбербанк",
    templatesCount: 2,
    isActive: true,
    createdAt: "2025-03-01T10:00:00Z",
  },
  {
    id: "sender-002",
    sender: "Tinkoff",
    bank: "Тинькофф",
    templatesCount: 1,
    isActive: true,
    createdAt: "2025-02-28T14:30:00Z",
  },
  {
    id: "sender-003",
    sender: "VTB",
    bank: "ВТБ",
    templatesCount: 0,
    isActive: false,
    createdAt: "2025-02-20T12:00:00Z",
  },
  {
    id: "sender-004",
    sender: "AlfaBank",
    bank: "Альфа-Банк",
    templatesCount: 1,
    isActive: true,
    createdAt: "2025-03-02T08:00:00Z",
  },
];
