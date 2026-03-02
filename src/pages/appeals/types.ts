export type AppealStatus = "pending" | "resolved" | "rejected";

export type AppealType = "pay-in" | "pay-out";

export interface AppealRow {
  id: string;
  merchantId: string;
  merchantName: string;
  type: AppealType;
  operationId: string;
  traderId: string;
  traderName: string;
  amount: number;
  status: AppealStatus;
  timerSeconds: number | null;
  telegramSent: boolean;
  createdAt: string;
}
