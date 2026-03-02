import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import { useMerchantsColumns } from "../merchants-columns";
import { mockMerchantsData } from "../mock-data";

export function useMerchantsPage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState("");
  const [copiedApiKeyId, setCopiedApiKeyId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const copyApiKey = (value: string, merchantId: string) => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopiedApiKeyId(merchantId);
      window.setTimeout(() => setCopiedApiKeyId(null), 1500);
    });
  };

  const columns = useMerchantsColumns(copiedApiKeyId, copyApiKey);

  const table = useReactTable({
    data: mockMerchantsData,
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
