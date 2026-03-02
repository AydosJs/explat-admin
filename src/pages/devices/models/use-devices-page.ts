import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import { useDevicesColumns } from "../devices-columns";
import { mockDevicesData } from "../mock-data";

export function useDevicesPage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [batteryFilterActive, setBatteryFilterActive] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const columns = useDevicesColumns(batteryFilterActive, setBatteryFilterActive);

  const table = useReactTable({
    data: mockDevicesData,
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
