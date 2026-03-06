export function formatBalanceUsdt(value: number): string {
  return value.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercent(value: number): string {
  return value.toLocaleString("ru-RU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }) + "%";
}
