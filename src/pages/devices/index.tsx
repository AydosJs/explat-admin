import { DevicesTable } from "./devices-table";
import { DevicesToolbar } from "./devices-toolbar";
import { useDevicesPage } from "./models/use-devices-page";

export function DevicesPage() {
  const {
    table,
    search,
    setSearch,
    selectedCount,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  } = useDevicesPage();

  return (
    <div className="space-y-4">
      <DevicesToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCount={selectedCount}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
      <DevicesTable table={table} />
    </div>
  );
}
