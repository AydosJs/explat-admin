import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { usePaymentReserveColumns } from "../payment-reserve-columns";
import { mockPaymentReserveData } from "../mock-data";

export function usePaymentReservePage() {
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

  const columns = usePaymentReserveColumns(copiedTransactionId, copyTransaction);

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockPaymentReserveData;
    const q = search.trim().toLowerCase();
    return mockPaymentReserveData.filter(
      (row) =>
        row.id.toLowerCase().includes(q) ||
        row.transaction.toLowerCase().includes(q) ||
        row.requisite.toLowerCase().includes(q)
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
