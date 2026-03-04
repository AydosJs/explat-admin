import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import type { DateRange } from "react-day-picker";

import { usePayInColumns } from "../pay-in-columns";
import { mockPayInData } from "../mock-data";
import type { PayInRow } from "../types";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

function getUniqueMerchants(data: PayInRow[]): { merchantId: string; merchantName: string }[] {
  const seen = new Set<string>();
  return data
    .map((r) => ({ merchantId: r.merchantId, merchantName: r.merchant }))
    .filter(({ merchantId }) => {
      if (seen.has(merchantId)) return false;
      seen.add(merchantId);
      return true;
    })
    .sort((a, b) => a.merchantName.localeCompare(b.merchantName));
}

function getUniqueTraders(data: PayInRow[]): { traderId: string; traderName: string }[] {
  const seen = new Set<string>();
  return data
    .map((r) => ({ traderId: r.trader, traderName: r.trader }))
    .filter(({ traderId }) => {
      if (seen.has(traderId)) return false;
      seen.add(traderId);
      return true;
    })
    .sort((a, b) => a.traderName.localeCompare(b.traderName));
}

export function usePayInPage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");
  const [traderFilter, setTraderFilter] = useState("");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const merchantOptions = useMemo(() => getUniqueMerchants(mockPayInData), []);
  const traderOptions = useMemo(() => getUniqueTraders(mockPayInData), []);

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
    merchantFilter,
    setMerchantFilter,
    merchantOptions,
    traderFilter,
    setTraderFilter,
    traderOptions,
    amountMin,
    setAmountMin,
    amountMax,
    setAmountMax,
    dateRange,
    setDateRange,
    selectedCount: selectedRows.length,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
  };
}
