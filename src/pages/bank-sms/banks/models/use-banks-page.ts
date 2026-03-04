import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useBanksColumns } from "../banks-columns";
import { mockBanksData } from "../mock-data";

export function useBanksPage() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const columns = useBanksColumns();

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockBanksData;
    const q = search.trim().toLowerCase();
    return mockBanksData.filter((row) =>
      row.name.toLowerCase().includes(q)
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
