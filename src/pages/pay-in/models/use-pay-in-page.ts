import { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import { usePayInColumns } from "../pay-in-columns";
import { mockPayInData } from "../mock-data";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

export function usePayInPage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

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
    state: { rowSelection, pagination },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
    pageSizeOptions: PAGE_SIZE_OPTIONS,
  };
}
