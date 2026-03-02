import { TradersTable } from "./traders-table";
import { TradersToolbar } from "./traders-toolbar";
import { useTradersPage } from "./models/use-traders-page";

export function TradersPage() {
  const {
    table,
    search,
    setSearch,
    selectedCount,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  } = useTradersPage();

  return (
    <div className="space-y-4">
      <TradersToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCount={selectedCount}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
      <TradersTable table={table} />
    </div>
  );
}
