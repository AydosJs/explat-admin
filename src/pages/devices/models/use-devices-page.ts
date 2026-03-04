import { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const columns = useDevicesColumns(batteryFilterActive, setBatteryFilterActive);

  const table = useReactTable({
    data: mockDevicesData,
    columns,
    state: { rowSelection, pagination },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
