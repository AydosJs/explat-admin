import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import { useAppealsColumns } from "../appeals-columns";
import { mockAppealsData } from "../mock-data";
import type { AppealRow } from "../types";

function getUniqueTraders(data: AppealRow[]): { traderId: string; traderName: string }[] {
  const seen = new Set<string>();
  return data
    .map((r) => ({ traderId: r.traderId, traderName: r.traderName }))
    .filter(({ traderId }) => {
      if (seen.has(traderId)) return false;
      seen.add(traderId);
      return true;
    })
    .sort((a, b) => a.traderName.localeCompare(b.traderName));
}

function getUniqueMerchants(data: AppealRow[]): { merchantId: string; merchantName: string }[] {
  const seen = new Set<string>();
  return data
    .map((r) => ({ merchantId: r.merchantId, merchantName: r.merchantName }))
    .filter(({ merchantId }) => {
      if (seen.has(merchantId)) return false;
      seen.add(merchantId);
      return true;
    })
    .sort((a, b) => a.merchantName.localeCompare(b.merchantName));
}

export function useAppealsPage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [search, setSearch] = useState("");
  const [traderFilter, setTraderFilter] = useState<string>("");
  const [merchantFilter, setMerchantFilter] = useState<string>("");
  const [typeFilterActive, setTypeFilterActive] = useState(false);
  const [amountFilterActive, setAmountFilterActive] = useState(false);
  const [timerFilterActive, setTimerFilterActive] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [copiedOperationId, setCopiedOperationId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const copyOperationId = (value: string, appealId: string) => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopiedOperationId(appealId);
      window.setTimeout(() => setCopiedOperationId(null), 1500);
    });
  };

  const traderOptions = useMemo(() => getUniqueTraders(mockAppealsData), []);
  const merchantOptions = useMemo(() => getUniqueMerchants(mockAppealsData), []);
  const filteredData = useMemo(() => {
    if (!traderFilter) return mockAppealsData;
    return mockAppealsData.filter((row) => row.traderId === traderFilter);
  }, [traderFilter]);

  const columns = useAppealsColumns(
    copiedOperationId,
    copyOperationId,
    typeFilterActive,
    setTypeFilterActive,
    amountFilterActive,
    setAmountFilterActive,
    timerFilterActive,
    setTimerFilterActive
  );

  const table = useReactTable({
    data: filteredData,
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
    traderFilter,
    setTraderFilter,
    traderOptions,
    merchantFilter,
    setMerchantFilter,
    merchantOptions,
    typeFilterActive,
    setTypeFilterActive,
    selectedCount: selectedRows.length,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  };
}
