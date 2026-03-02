import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import { useRequisitesColumns } from "../requisites-columns";
import { mockRequisitesData } from "../mock-data";

export function useRequisitesPage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);
  const [copiedTelegramId, setCopiedTelegramId] = useState<string | null>(null);
  const [dailyLimitFilterActive, setDailyLimitFilterActive] = useState(false);

  const copyToken = (value: string, requisiteId: string) => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopiedTokenId(requisiteId);
      window.setTimeout(() => setCopiedTokenId(null), 1500);
    });
  };

  const copyTelegramId = (value: string, requisiteId: string) => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopiedTelegramId(requisiteId);
      window.setTimeout(() => setCopiedTelegramId(null), 1500);
    });
  };

  const columns = useRequisitesColumns(
    copiedTokenId,
    copyToken,
    copiedTelegramId,
    copyTelegramId,
    dailyLimitFilterActive,
    setDailyLimitFilterActive
  );

  const table = useReactTable({
    data: mockRequisitesData,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedRows = table.getSelectedRowModel().rows;

  const handleConfirmDelete = () => {
    // TODO: call delete API for selectedRows.map(r => r.original.id)
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
