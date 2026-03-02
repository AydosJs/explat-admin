export type MerchantStatus = "active" | "inactive";

export interface MerchantRow {
  id: string;
  name: string;
  login: string;
  method: string;
  conversionTransactions: number;
  conversionPayouts: number;
  apiKeyMasked: string;
  status: MerchantStatus;
  createdAt: string;
}
