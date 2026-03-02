import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

import type { PayOutRow } from "./types";

function formatTimer(seconds: number | null): string {
  if (seconds === null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function usePayOutColumns(
  copiedUid: string | null,
  copyUid: (uid: string) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<PayOutRow>[]>(
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
            aria-label={t("payOut.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("payOut.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("payOut.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "merchant",
        header: t("payOut.merchant"),
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
      { accessorKey: "trader", header: t("payOut.trader") },
      {
        accessorKey: "amount",
        header: t("payOut.amount"),
        cell: ({ row }) => {
          const { amount, amountUsdt } = row.original;
          return (
            <div className="flex flex-col gap-0.5">
              <span>
                {amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className="text-muted-foreground text-xs">
                {t("payOut.amountUsdt", { value: amountUsdt.toFixed(4) })}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "timerSeconds",
        header: t("payOut.timer"),
        cell: ({ row }) => formatTimer(row.original.timerSeconds),
      },
      {
        id: "receipt",
        header: t("payOut.receipt"),
        cell: ({ row }) => {
          const { hasReceipt } = row.original;
          if (!hasReceipt) return "—";
          return (
            <span className="inline-flex items-center gap-1">
              <FileText className="size-3.5 text-muted-foreground" />
              {t("payOut.receiptYes")}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: t("payOut.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
      {
        accessorKey: "processedAt",
        header: t("payOut.processedAt"),
        cell: ({ row }) => {
          const at = row.original.processedAt;
          return at ? dayjs(at).format("MMM D, HH:mm") : "—";
        },
      },
    ],
    [t, copiedUid, copyUid]
  );
}
