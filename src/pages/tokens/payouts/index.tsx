import { TokensPayoutsTable } from "./tokens-payouts-table";
import { TokensPayoutsToolbar } from "./tokens-payouts-toolbar";
import { useTokensPayoutsPage } from "./models/use-tokens-payouts-page";

export function TokensPayoutsPage() {
  const {
    table,
    search,
    setSearch,
    selectedCount,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  } = useTokensPayoutsPage();

  return (
    <div className="space-y-4">
      <TokensPayoutsToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCount={selectedCount}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
      <TokensPayoutsTable table={table} />
    </div>
  );
}
