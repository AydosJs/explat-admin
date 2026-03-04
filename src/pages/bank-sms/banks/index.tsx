import { BanksTable } from "./banks-table";
import { BanksToolbar } from "./banks-toolbar";
import { useBanksPage } from "./models/use-banks-page";

export function BanksPage() {
  const { table, search, setSearch } = useBanksPage();

  return (
    <div className="space-y-4">
      <BanksToolbar search={search} onSearchChange={setSearch} />
      <BanksTable table={table} />
    </div>
  );
}
