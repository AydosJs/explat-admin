import { PayOutTable } from "./pay-out-table";
import { PayOutToolbar } from "./pay-out-toolbar";
import { usePayOutPage } from "./models/use-pay-out-page";

export function PayOutPage() {
  const { table, search, setSearch } = usePayOutPage();

  return (
    <div className="space-y-4">
      <PayOutToolbar search={search} onSearchChange={setSearch} />
      <PayOutTable table={table} />
    </div>
  );
}
