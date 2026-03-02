import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import { useTokensBalanceColumns } from "../tokens-balance-columns";
import { mockTokenBalanceData } from "../mock-data";

export function useTokensBalancePage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);

  const copyToken = (value: string, rowId: string) => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopiedTokenId(rowId);
      window.setTimeout(() => setCopiedTokenId(null), 1500);
    });
  };

  const columns = useTokensBalanceColumns(copiedTokenId, copyToken);

  const table = useReactTable({
    data: mockTokenBalanceData,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedRows = table.getSelectedRowModel().rows;

  const handleConfirmDelete = () => {
    setRowSelection({});
  };

  return {
    table,
    search,
    setSearch,
    selectedCount: selectedRows.length,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  };
}
