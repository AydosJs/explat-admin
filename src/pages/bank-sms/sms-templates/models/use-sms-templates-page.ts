import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useSmsTemplatesColumns } from "../sms-templates-columns";
import { mockSmsTemplatesData } from "../mock-data";

export function useSmsTemplatesPage() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const columns = useSmsTemplatesColumns();

  const filteredData = useMemo(() => {
    if (!search.trim()) return mockSmsTemplatesData;
    const q = search.trim().toLowerCase();
    return mockSmsTemplatesData.filter(
      (row) =>
        row.sender.toLowerCase().includes(q) ||
        row.template.toLowerCase().includes(q)
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
