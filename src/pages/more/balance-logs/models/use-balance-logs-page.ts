import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useBalanceLogsColumns } from "../balance-logs-columns";
import { mockBalanceLogsData } from "../mock-data";

export function useBalanceLogsPage() {
  const [search, setSearch] = useState("");
  const [copiedTransactionId, setCopiedTransactionId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const copyTransaction = (value: string, rowId: string) => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopiedTransactionId(rowId);
      window.setTimeout(() => setCopiedTransactionId(null), 1500);
    });
  };

  const columns = useBalanceLogsColumns(copiedTransactionId, copyTransaction);

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockBalanceLogsData;
    const q = search.trim().toLowerCase();
    return mockBalanceLogsData.filter(
      (row) =>
        row.traderName.toLowerCase().includes(q) ||
        row.transaction.toLowerCase().includes(q) ||
        row.type.toLowerCase().includes(q) ||
        row.reason.toLowerCase().includes(q)
    );
  }, [search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
  });

  return {
    table,
    search,
    setSearch,
  };
}
