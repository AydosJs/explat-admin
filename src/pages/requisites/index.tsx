import { RequisitesTable } from "./requisites-table";
import { RequisitesToolbar } from "./requisites-toolbar";
import { useRequisitesPage } from "./models/use-requisites-page";

export function RequisitesPage() {
  const {
    table,
    search,
    setSearch,
    selectedCount,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  } = useRequisitesPage();

  return (
    <div className="space-y-4">
      <RequisitesToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCount={selectedCount}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
      <RequisitesTable table={table} />
    </div>
  );
}
