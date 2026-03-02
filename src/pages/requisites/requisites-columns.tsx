import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Check, ChevronsUpDown, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

import type { RequisiteRow } from "./types";

const METHOD_BADGE_VARIANT: Record<
  string,
  "card" | "crypto" | "default" | "secondary" | "destructive" | "outline"
> = {
  Card: "card",
  Crypto: "crypto",
};

function getMethodVariant(
  method: string
): "card" | "crypto" | "default" | "secondary" | "destructive" | "outline" {
  return METHOD_BADGE_VARIANT[method] ?? "outline";
}

export function useRequisitesColumns(
  copiedTokenId: string | null,
  copyToken: (value: string, requisiteId: string) => void,
  copiedTelegramId: string | null,
  copyTelegramId: (value: string, requisiteId: string) => void,
  dailyLimitFilterActive: boolean,
  setDailyLimitFilterActive: (value: boolean) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<RequisiteRow>[]>(
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
            aria-label={t("requisites.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("requisites.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("requisites.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "tokenMasked",
        header: t("requisites.token"),
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
                  isCopied ? t("requisites.copied") : t("requisites.copyToken")
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
        accessorKey: "cardholderName",
        header: t("requisites.cardholderName"),
        cell: ({ row }) => row.original.cardholderName,
      },
      {
        accessorKey: "cardNumberMasked",
        header: t("requisites.cardNumber"),
        cell: ({ row }) => (
          <span className="font-mono text-muted-foreground text-sm">
            {row.original.cardNumberMasked}
          </span>
        ),
      },
      {
        accessorKey: "bank",
        header: t("requisites.bank"),
        cell: ({ row }) => {
          const { bank, bankLogoUrl } = row.original;
          return (
            <div className="flex items-center gap-2">
              {bankLogoUrl ? (
                <img
                  src={bankLogoUrl}
                  alt=""
                  className="size-6 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {bank.charAt(0)}
                </span>
              )}
              <span>{bank}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "traderName",
        header: t("requisites.trader"),
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
      { accessorKey: "phone", header: t("requisites.phone") },
      {
        accessorKey: "method",
        header: t("requisites.method"),
        cell: ({ row }) => (
          <Badge variant={getMethodVariant(row.original.method)}>
            {row.original.method}
          </Badge>
        ),
      },
      {
        accessorKey: "dailyLimit",
        header: () => (
          <div className="flex items-center gap-1.5">
            <span>{t("requisites.dailyLimit")}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setDailyLimitFilterActive(!dailyLimitFilterActive);
              }}
              aria-label={
                dailyLimitFilterActive
                  ? t("requisites.dailyLimitFiltered")
                  : t("requisites.dailyLimitNotFiltered")
              }
            >
              <ChevronsUpDown
                className={
                  dailyLimitFilterActive
                    ? "size-4 text-primary"
                    : "size-4 text-muted-foreground"
                }
              />
            </Button>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center">
            {row.original.dailyLimit.toLocaleString("en-US")}
          </div>
        ),
      },
      {
        accessorKey: "telegramUserId",
        header: t("requisites.telegramUserId"),
        cell: ({ row }) => {
          const { id, telegramUserId } = row.original;
          const isCopied = copiedTelegramId === id;
          return (
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm">{telegramUserId}</span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  copyTelegramId(telegramUserId, id);
                }}
                aria-label={
                  isCopied
                    ? t("requisites.copied")
                    : t("requisites.copyTelegramId")
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
        accessorKey: "createdAt",
        header: t("requisites.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [
      t,
      copiedTokenId,
      copyToken,
      copiedTelegramId,
      copyTelegramId,
      dailyLimitFilterActive,
      setDailyLimitFilterActive,
    ]
  );
}
