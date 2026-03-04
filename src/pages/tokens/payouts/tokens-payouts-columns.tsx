import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

import type { TokenPayoutRow } from "./types";

export function useTokensPayoutsColumns(
  copiedTokenId: string | null,
  copyToken: (value: string, rowId: string) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<TokenPayoutRow>[]>(
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
            aria-label={t("tokensPayouts.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("tokensPayouts.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("tokensPayouts.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "tokenMasked",
        header: t("tokensPayouts.token"),
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
                  isCopied ? t("tokensPayouts.copied") : t("tokensPayouts.copyToken")
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
        accessorKey: "tokenName",
        header: t("tokensPayouts.tokenName"),
        cell: ({ row }) => row.original.tokenName,
      },
      {
        accessorKey: "traderName",
        header: t("tokensPayouts.trader"),
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
        accessorKey: "isActive",
        meta: { className: "text-center" },
        header: () => <div className="text-center">{t("tokensPayouts.isActive")}</div>,
        cell: ({ row }) => {
          const isActive = row.original.isActive;
          return (
            <div className="flex justify-center">
              <span
                className={`inline-block size-2.5 shrink-0 rounded-full ${isActive ? "bg-emerald-500" : "bg-destructive"}`}
                title={isActive ? t("tokensPayouts.yes") : t("tokensPayouts.no")}
                aria-label={isActive ? t("tokensPayouts.yes") : t("tokensPayouts.no")}
                role="img"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: t("tokensPayouts.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
      {
        accessorKey: "usedAt",
        header: t("tokensPayouts.usedAt"),
        cell: ({ row }) =>
          row.original.usedAt
            ? dayjs(row.original.usedAt).format("MMM D, HH:mm")
            : "—",
      },
    ],
    [t, copiedTokenId, copyToken]
  );
}
