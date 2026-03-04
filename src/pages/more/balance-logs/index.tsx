import { BalanceLogsTable } from "./balance-logs-table";
import { BalanceLogsToolbar } from "./balance-logs-toolbar";
import { useBalanceLogsPage } from "./models/use-balance-logs-page";

export function BalanceLogsPage() {
  const { table, search, setSearch } = useBalanceLogsPage();

  return (
    <div className="space-y-4">
      <BalanceLogsToolbar search={search} onSearchChange={setSearch} />
      <BalanceLogsTable table={table} />
    </div>
  );
}
