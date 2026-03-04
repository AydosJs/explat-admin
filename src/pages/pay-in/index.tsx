import { PayInTable } from "./pay-in-table";
import { PayInToolbar } from "./pay-in-toolbar";
import { usePayInPage } from "./models/use-pay-in-page";

export function PayInPage() {
  const {
    table,
    search,
    setSearch,
    selectedCount,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
    pageSizeOptions,
  } = usePayInPage();

  return (
    <div className="space-y-4">
      <PayInToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCount={selectedCount}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
      <PayInTable table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  );
}
