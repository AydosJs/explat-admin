import { TokensBalanceTable } from "./tokens-balance-table";
import { TokensBalanceToolbar } from "./tokens-balance-toolbar";
import { useTokensBalancePage } from "./models/use-tokens-balance-page";

export function TokensBalancePage() {
  const {
    table,
    search,
    setSearch,
    selectedCount,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  } = useTokensBalancePage();

  return (
    <div className="space-y-4">
      <TokensBalanceToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCount={selectedCount}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
      />
      <TokensBalanceTable table={table} />
    </div>
  );
}
