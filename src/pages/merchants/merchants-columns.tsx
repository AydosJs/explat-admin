import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

import type { MerchantRow } from "./types";

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

export function useMerchantsColumns(
  copiedApiKeyId: string | null,
  copyApiKey: (value: string, merchantId: string) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<MerchantRow>[]>(
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
            aria-label={t("merchants.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("merchants.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("merchants.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "name",
        header: t("merchants.name"),
        cell: ({ row }) => (
          <Link
            to="/merchants/$merchantId"
            params={{ merchantId: row.original.id }}
            className="text-primary hover:underline"
          >
            {row.original.name}
          </Link>
        ),
      },
      { accessorKey: "login", header: t("merchants.login") },
      {
        accessorKey: "method",
        header: t("merchants.method"),
        cell: ({ row }) => (
          <Badge variant={getMethodVariant(row.original.method)}>
            {row.original.method}
          </Badge>
        ),
      },
      {
        id: "conversion",
        header: t("merchants.conversion"),
        cell: ({ row }) => {
          const { conversionTransactions, conversionPayouts } = row.original;
          return (
            <div className="flex flex-col gap-0.5">
              <span>
                {t("merchants.conversionTransactions", {
                  value: conversionTransactions.toFixed(1),
                })}
              </span>
              <span>
                {t("merchants.conversionPayouts", {
                  value: conversionPayouts.toFixed(1),
                })}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "apiKeyMasked",
        header: t("merchants.apiKey"),
        cell: ({ row }) => {
          const { id, apiKeyMasked } = row.original;
          const isCopied = copiedApiKeyId === id;
          return (
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-muted-foreground text-sm">
                {apiKeyMasked}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  copyApiKey(apiKeyMasked, id);
                }}
                aria-label={
                  isCopied ? t("merchants.copied") : t("merchants.copyApiKey")
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
        header: t("merchants.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t, copiedApiKeyId, copyApiKey]
  );
}
