import { MerchantsTable } from "./merchants-table";
import { MerchantsToolbar } from "./merchants-toolbar";
import { useMerchantsPage } from "./models/use-merchants-page";

export function MerchantsPage() {
  const {
    table,
    search,
    setSearch,
    selectedCount,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  } = useMerchantsPage();

  return (
    <div className="space-y-4">
      <MerchantsToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCount={selectedCount}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
      <MerchantsTable table={table} />
    </div>
  );
}
