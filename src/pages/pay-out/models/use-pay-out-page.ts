import { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";

import { usePayOutColumns } from "../pay-out-columns";
import { mockPayOutData } from "../mock-data";

export function usePayOutPage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const copyUid = (uid: string) => {
    void navigator.clipboard.writeText(uid).then(() => {
      setCopiedUid(uid);
      window.setTimeout(() => setCopiedUid(null), 1500);
    });
  };

  const columns = usePayOutColumns(copiedUid, copyUid);

  const table = useReactTable({
    data: mockPayOutData,
    columns,
    state: { rowSelection, pagination },
    onRowSelectionChange: setRowSelection,
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
