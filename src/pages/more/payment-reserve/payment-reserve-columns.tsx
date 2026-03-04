import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import type { PaymentReserveRow } from "./types";

export function usePaymentReserveColumns(
  copiedTransactionId: string | null,
  copyTransaction: (value: string, rowId: string) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<PaymentReserveRow>[]>(
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
            aria-label={t("paymentReserve.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("paymentReserve.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "transaction",
        header: t("paymentReserve.transaction"),
        cell: ({ row }) => {
          const { transaction, id } = row.original;
          const isCopied = copiedTransactionId === id;
          return (
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm">{transaction}</span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  copyTransaction(transaction, id);
                }}
                aria-label={
                  isCopied ? t("paymentReserve.copied") : t("paymentReserve.copyTransaction")
                }
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
        accessorKey: "requisite",
        header: t("paymentReserve.requisite"),
        cell: ({ row }) => row.original.requisite,
      },
      {
        accessorKey: "createdAt",
        header: t("paymentReserve.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t, copiedTransactionId, copyTransaction]
  );
}
