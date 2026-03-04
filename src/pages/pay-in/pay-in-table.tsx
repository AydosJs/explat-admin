import { flexRender } from "@tanstack/react-table";
import type { Table as TanStackTable } from "@tanstack/react-table";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableFooter } from "@/components/table-footer";

import type { PayInRow } from "./types";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

interface PayInTableProps {
  table: TanStackTable<PayInRow>;
  pageSizeOptions?: readonly number[];
}

export function PayInTable({
  table,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
}: PayInTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const columns = table.getAllColumns();

  return (
    <div className="rounded-md border border-border/50 bg-table dark:bg-table">
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
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    navigate({ to: "/pay-in/$payInId", params: { payInId: row.original.uid } })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate({ to: "/pay-in/$payInId", params: { payInId: row.original.uid } });
                    }
                  }}
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
      <TableFooter
        table={table}
        statusLegend={{
          items: [
            { dotClassName: "bg-emerald-500/50", label: t("payIn.statusSuccess") },
            { dotClassName: "bg-amber-500/50", label: t("payIn.statusPending") },
            { dotClassName: "bg-red-500/50", label: t("payIn.statusFailed") },
          ],
          ariaLabel: t("payIn.statusLegend"),
        }}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}
