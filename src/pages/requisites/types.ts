export interface RequisiteRow {
  id: string;
  cardholderName: string;
  cardNumberMasked: string;
  bank: string;
  bankLogoUrl: string | null;
  traderId: string;
  traderName: string;
  phone: string;
  method: string;
  status: string;
  dailyLimit: number;
  tokenMasked: string;
  telegramUserId: string;
  isActive: boolean;
  createdAt: string;
}
