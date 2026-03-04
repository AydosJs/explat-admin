import type { SmsTemplateRow } from "./types";

export const mockSmsTemplatesData: SmsTemplateRow[] = [
  {
    id: "tpl-001",
    sender: "Сбербанк",
    template: "Код: {{code}}. Никому не сообщайте.",
    isActive: true,
    createdAt: "2025-03-01T10:00:00Z",
  },
  {
    id: "tpl-002",
    sender: "Тинькофф",
    template: "Подтверждение: {{code}}. Срок {{minutes}} мин.",
    isActive: true,
    createdAt: "2025-02-28T14:30:00Z",
  },
  {
    id: "tpl-003",
    sender: "ВТБ",
    template: "Ваш код: {{code}}",
    isActive: false,
    createdAt: "2025-02-20T12:00:00Z",
  },
  {
    id: "tpl-004",
    sender: "Альфа-Банк",
    template: "Код подтверждения {{code}}. Действует 5 мин.",
    isActive: true,
    createdAt: "2025-03-02T08:00:00Z",
  },
];
