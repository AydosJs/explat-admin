export interface IncomeCalendarDayStats {
  operations: number;
  conversionPct: number;
  earningsUsdt: number;
}

export interface DayDetailBlock {
  operations: number;
  successCount: number;
  failedCount: number;
  volumeUsdt: number;
  profitUsdt: number;
  conversionPct: number;
}

export interface DayDetailStats {
  payIn: DayDetailBlock;
  payOut: DayDetailBlock;
  totalOperations: number;
  totalSuccess: number;
  totalFailed: number;
  turnoverUsdt: number;
  platformIncomeUsdt: number;
  avgConversionPct: number;
}
