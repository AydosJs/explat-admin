import type { Table as TanStackTable } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableStatusLegend } from "@/components/table-status-legend";
import type { TableStatusLegendItem } from "@/components/table-status-legend";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

interface StatusLegendConfig {
  items: TableStatusLegendItem[];
  ariaLabel: string;
}

interface TableFooterProps<TData> {
  /** TanStack Table instance with pagination enabled (getPaginationRowModel + state.pagination) */
  table: TanStackTable<TData>;
  /** Optional status legend (e.g. success / pending / failed) */
  statusLegend?: StatusLegendConfig;
  /** Page size options for the dropdown; default [10, 25, 50, 100] */
  pageSizeOptions?: readonly number[];
  /** Aria-label for the rows-per-page select; default uses common.rowsPerPage */
  rowsPerPageAriaLabel?: string;
}

export function TableFooter<TData>({
  table,
  statusLegend,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  rowsPerPageAriaLabel,
}: TableFooterProps<TData>) {
  const { t } = useTranslation();
  const { pageIndex, pageSize } = table.getState().pagination;
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();
  const label = rowsPerPageAriaLabel ?? t("common.rowsPerPage");

  return (
    <div className="flex w-full flex-col gap-2 border-t border-border/50 px-3 py-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-4">
      {statusLegend ? (
        <TableStatusLegend
          className="border-t-0 px-0 py-0"
          items={statusLegend.items}
          ariaLabel={statusLegend.ariaLabel}
        />
      ) : (
        <div aria-hidden className="min-w-0 flex-1" />
      )}
      <div className="flex min-h-9 flex-wrap items-center gap-2 sm:gap-3">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger
            size="sm"
            className="h-9 min-w-14 touch-manipulation sm:h-8 sm:min-w-16"
            aria-label={label}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={!canPreviousPage}
                onClick={() => table.previousPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>{pageIndex + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                disabled={!canNextPage}
                onClick={() => table.nextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
