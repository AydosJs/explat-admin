export type PayInMethodStatus = "success" | "pending" | "failed";

export interface PayInRow {
  uid: string;
  merchant: string;
  merchantId: string;
  trader: string;
  requisite: string;
  method: PayInMethodStatus;
  device: string;
  amountUsd: number;
  amountEur: number;
  card: string;
  createdAt: string;
}
