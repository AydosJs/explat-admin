import { flexRender } from "@tanstack/react-table";
import type { Table as TanStackTable } from "@tanstack/react-table";
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

import type { AppealRow } from "./types";

interface AppealsTableProps {
  table: TanStackTable<AppealRow>;
}

export function AppealsTable({ table }: AppealsTableProps) {
  const { t } = useTranslation();
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
              const status = row.original.status;
              const statusBarColor =
                status === "resolved"
                  ? "bg-emerald-500/50"
                  : status === "pending"
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
                {t("appeals.noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TableFooter
        table={table}
        statusLegend={{
          items: [
            { dotClassName: "bg-emerald-500/50", label: t("appeals.statusResolved") },
            { dotClassName: "bg-amber-500/50", label: t("appeals.statusPending") },
            { dotClassName: "bg-red-500/50", label: t("appeals.statusRejected") },
          ],
          ariaLabel: t("appeals.statusLegend"),
        }}
      />
    </div>
  );
}
