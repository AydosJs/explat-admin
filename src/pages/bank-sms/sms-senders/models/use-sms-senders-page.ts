import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useSmsSendersColumns } from "../sms-senders-columns";
import { mockSmsSendersData } from "../mock-data";

export function useSmsSendersPage() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const columns = useSmsSendersColumns();

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockSmsSendersData;
    const q = search.trim().toLowerCase();
    return mockSmsSendersData.filter(
      (row) =>
        row.sender.toLowerCase().includes(q) ||
        row.bank.toLowerCase().includes(q)
    );
  }, [search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return {
    table,
    search,
    setSearch,
  };
}
