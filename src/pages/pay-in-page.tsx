import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { Check, Copy, FileDown, Plus, Search, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";

export type PayInMethodStatus = "success" | "pending" | "failed";

export interface PayInRow {
  uid: string;
  merchant: string;
  merchantId: string;
  trader: string;
  requisite: string;
  method: PayInMethodStatus;
  device: string;
  amountUsd: number;
  amountEur: number;
  card: string;
  createdAt: string;
}

const mockData: PayInRow[] = [
  {
    uid: "a1b2c3d4",
    merchant: "Merchant One",
    merchantId: "merchant-one",
    trader: "Trader Alpha",
    requisite: "4111 1111 1111 1111",
    method: "success",
    device: "iOS 17",
    amountUsd: 150.5,
    amountEur: 138.27,
    card: "**** 4521",
    createdAt: "2025-02-28T10:30:00Z",
  },
  {
    uid: "e5f6g7h8",
    merchant: "Merchant Two",
    merchantId: "merchant-two",
    trader: "Trader Beta",
    requisite: "5500 0000 0000 0004",
    method: "pending",
    device: "Android 14",
    amountUsd: 299.99,
    amountEur: 276.18,
    card: "**** 8832",
    createdAt: "2025-02-28T09:15:00Z",
  },
  {
    uid: "i9j0k1l2",
    merchant: "Merchant Three",
    merchantId: "merchant-three",
    trader: "Trader Gamma",
    requisite: "3400 000000 00009",
    method: "failed",
    device: "Web",
    amountUsd: 75.0,
    amountEur: 69.27,
    card: "**** 1209",
    createdAt: "2025-02-27T16:45:00Z",
  },
];

export function PayInPage() {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const copyUid = (uid: string) => {
    void navigator.clipboard.writeText(uid).then(() => {
      setCopiedUid(uid);
      window.setTimeout(() => setCopiedUid(null), 1500);
    });
  };

  const columns = useMemo<ColumnDef<PayInRow>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label={t("payIn.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("payIn.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("payIn.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "uid",
        header: t("payIn.uid"),
        cell: ({ row }) => {
          const uid = row.original.uid;
          const isCopied = copiedUid === uid;
          return (
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm">{uid}</span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  copyUid(uid);
                }}
                aria-label={isCopied ? t("payIn.copied") : t("payIn.copyUid")}
              >
                {isCopied ? (
                  <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </Button>
            </div>
          );
        },
      },
      {
        accessorKey: "merchant",
        header: t("payIn.merchant"),
        cell: ({ row }) => (
          <Link
            to="/merchants/$merchantId"
            params={{ merchantId: row.original.merchantId }}
            className="text-primary hover:underline"
          >
            {row.original.merchant}
          </Link>
        ),
      },
      { accessorKey: "trader", header: t("payIn.trader") },
      { accessorKey: "requisite", header: t("payIn.requisite") },
      { accessorKey: "device", header: t("payIn.device") },
      {
        id: "amount",
        header: t("payIn.amountUsd"),
        cell: ({ row }) => {
          const { amountUsd, amountEur } = row.original;
          const format = (n: number) =>
            n.toLocaleString("en-US", { minimumFractionDigits: 2 });
          return (
            <div className="flex flex-col gap-0.5">
              <span>{format(amountUsd)}</span>
              <span className="text-muted-foreground text-xs">
                {format(amountEur)} {t("payIn.currencyEur")}
              </span>
            </div>
          );
        },
      },
      { accessorKey: "card", header: t("payIn.card") },
      {
        accessorKey: "createdAt",
        header: t("payIn.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t, copiedUid]
  );
  const table = useReactTable({
    data: mockData,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });
  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("payIn.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
              aria-label={t("payIn.search")}
            />
          </div>
          <Button
            variant="outline"
            className="h-9 text-muted-foreground"
            disabled={selectedRows.length === 0}
            onClick={() => {
              /* TODO: connect to API - delete selectedRows */
            }}
          >
            <Trash2 className="size-4" />
            {selectedRows.length > 0
              ? `${t("payIn.deleteSelected")} (${selectedRows.length})`
              : t("payIn.deleteSelected")}
          </Button>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" className="text-muted-foreground">
            <FileDown className="size-4" />
            {t("payIn.downloadExcel")}
          </Button>
          <Button variant="outline" className="text-muted-foreground">
            <Plus className="size-4" />
            {t("payIn.create")}
          </Button>
        </div>
      </div>
      <div className="rounded-md border border-border/50 bg-table">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const method = row.original.method;
                const statusBarColor =
                  method === "success"
                    ? "bg-emerald-500/50"
                    : method === "pending"
                      ? "bg-amber-500/50"
                      : "bg-red-500/50";
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell
                        key={cell.id}
                        className={cellIndex === 0 ? "relative" : undefined}
                      >
                        {cellIndex === 0 && (
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-1 ${statusBarColor}`}
                            aria-hidden
                          />
                        )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {t("payIn.noData")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
