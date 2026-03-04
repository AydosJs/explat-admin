import { useCallback, useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useTokensTradersColumns } from "../tokens-traders-columns";
import { mockTokenTradersData } from "../mock-data";
import type { TokenTraderRow } from "../types";

export function useTokensTradersPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<TokenTraderRow[]>(mockTokenTradersData);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const onStatusChange = useCallback((row: TokenTraderRow, checked: boolean) => {
    setData((prev) =>
      prev.map((r) =>
        r.id === row.id ? { ...r, isActive: checked } : r
      )
    );
  }, []);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.trim().toLowerCase();
    return data.filter(
      (row) =>
        row.tokenMasked.toLowerCase().includes(q) ||
        row.traderName.toLowerCase().includes(q)
    );
  }, [data, search]);

  const columns = useTokensTradersColumns(onStatusChange);

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
