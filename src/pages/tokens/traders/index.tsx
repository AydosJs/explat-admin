import { TokensTradersTable } from "./tokens-traders-table";
import { TokensTradersToolbar } from "./tokens-traders-toolbar";
import { useTokensTradersPage } from "./models/use-tokens-traders-page";

export function TokensTradersPage() {
  const { table, search, setSearch } = useTokensTradersPage();

  return (
    <div className="space-y-4">
      <TokensTradersToolbar search={search} onSearchChange={setSearch} />
      <TokensTradersTable table={table} />
    </div>
  );
}
