import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import { usePayInColumns } from "../pay-in-columns";
import { mockPayInData } from "../mock-data";

export function usePayInPage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const copyUid = (uid: string) => {
    void navigator.clipboard.writeText(uid).then(() => {
      setCopiedUid(uid);
      window.setTimeout(() => setCopiedUid(null), 1500);
    });
  };

  const columns = usePayInColumns(copiedUid, copyUid);

  const table = useReactTable({
    data: mockPayInData,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedRows = table.getSelectedRowModel().rows;

  const handleConfirmDelete = () => {
    /* TODO: connect to API - use selectedRows.map(r => r.original) */
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
