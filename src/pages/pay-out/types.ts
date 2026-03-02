export type PayOutStatus = "pending" | "success" | "failed";

export interface PayOutRow {
  uid: string;
  merchant: string;
  merchantId: string;
  trader: string;
  amount: number;
  amountUsdt: number;
  status: PayOutStatus;
  timerSeconds: number | null;
  hasReceipt: boolean;
  receiptUrl: string | null;
  createdAt: string;
  processedAt: string | null;
}
