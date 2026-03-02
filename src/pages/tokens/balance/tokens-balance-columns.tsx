import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

import type { TokenBalanceRow } from "./types";

export function useTokensBalanceColumns(
  copiedTokenId: string | null,
  copyToken: (value: string, rowId: string) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<TokenBalanceRow>[]>(
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
            aria-label={t("tokensBalance.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("tokensBalance.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("tokensBalance.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "tokenMasked",
        header: t("tokensBalance.token"),
        cell: ({ row }) => {
          const { id, tokenMasked } = row.original;
          const isCopied = copiedTokenId === id;
          return (
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-muted-foreground text-sm">
                {tokenMasked}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToken(tokenMasked, id);
                }}
                aria-label={
                  isCopied ? t("tokensBalance.copied") : t("tokensBalance.copyToken")
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
        header: t("tokensBalance.trader"),
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
        header: t("tokensBalance.amount"),
        cell: ({ row }) =>
          row.original.amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      },
      {
        accessorKey: "usedAt",
        header: t("tokensBalance.usedAt"),
        cell: ({ row }) =>
          row.original.usedAt ? dayjs(row.original.usedAt).format("MMM D, HH:mm") : "—",
      },
      {
        accessorKey: "createdAt",
        header: t("tokensBalance.createdAt"),
        cell: ({ row }) => dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
      {
        accessorKey: "createdBy",
        header: t("tokensBalance.createdBy"),
        cell: ({ row }) => row.original.createdBy,
      },
    ],
    [t, copiedTokenId, copyToken]
  );
}
