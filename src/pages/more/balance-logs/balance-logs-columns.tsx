import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import type { BalanceLogRow } from "./types";

const METHOD_BADGE_VARIANT: Record<
  string,
  "card" | "crypto" | "default" | "secondary" | "destructive" | "outline"
> = {
  Card: "card",
  Crypto: "crypto",
  Карта: "card",
  Крипто: "crypto",
};

function getMethodVariant(
  method: string
): "card" | "crypto" | "default" | "secondary" | "destructive" | "outline" {
  return METHOD_BADGE_VARIANT[method] ?? "outline";
}

export function useBalanceLogsColumns(
  copiedTransactionId: string | null,
  copyTransaction: (value: string, rowId: string) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<BalanceLogRow>[]>(
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
            aria-label={t("balanceLogs.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("balanceLogs.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "transaction",
        header: t("balanceLogs.transaction"),
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
                  isCopied ? t("balanceLogs.copied") : t("balanceLogs.copyTransaction")
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
        accessorKey: "traderName",
        header: t("balanceLogs.trader"),
        cell: ({ row }) => (
          <Link
            to="/traders/$traderId"
            params={{ traderId: row.original.traderId }}
            className="text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {row.original.traderName}
          </Link>
        ),
      },
      {
        accessorKey: "amount",
        header: t("balanceLogs.amount"),
        cell: ({ row }) =>
          row.original.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        accessorKey: "method",
        header: t("balanceLogs.method"),
        cell: ({ row }) => (
          <Badge variant={getMethodVariant(row.original.method)}>
            {row.original.method}
          </Badge>
        ),
      },
      {
        accessorKey: "reason",
        header: t("balanceLogs.reason"),
        cell: ({ row }) => row.original.reason,
      },
      {
        accessorKey: "createdAt",
        header: t("balanceLogs.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t, copiedTransactionId, copyTransaction]
  );
}
