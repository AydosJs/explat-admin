import { AppealsTable } from "./appeals-table";
import { AppealsToolbar } from "./appeals-toolbar";
import { useAppealsPage } from "./models/use-appeals-page";

export function AppealsPage() {
  const {
    table,
    search,
    setSearch,
    merchantFilter,
    setMerchantFilter,
    merchantOptions,
    traderFilter,
    setTraderFilter,
    traderOptions,
    selectedCount,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  } = useAppealsPage();

  return (
    <div className="space-y-4">
      <AppealsToolbar
        search={search}
        onSearchChange={setSearch}
        merchantFilter={merchantFilter}
        onMerchantFilterChange={setMerchantFilter}
        merchantOptions={merchantOptions}
        traderFilter={traderFilter}
        onTraderFilterChange={setTraderFilter}
        traderOptions={traderOptions}
        selectedCount={selectedCount}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
      <AppealsTable table={table} />
    </div>
  );
}
