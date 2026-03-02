import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

import type { TraderRow } from "./types";

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

export function useTradersColumns() {
  const { t } = useTranslation();

  return useMemo<ColumnDef<TraderRow>[]>(
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
            aria-label={t("traders.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("traders.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("traders.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "name",
        header: t("traders.name"),
        cell: ({ row }) => (
          <Link
            to="/traders/$traderId"
            params={{ traderId: row.original.id }}
            className="text-primary hover:underline"
          >
            {row.original.name}
          </Link>
        ),
      },
      {
        id: "balance",
        header: t("traders.balance"),
        cell: ({ row }) => {
          const { balanceUsdt, balanceManat } = row.original;
          return (
            <div className="flex flex-col gap-0.5">
              <span>
                {t("traders.balanceUsdt", {
                  value: balanceUsdt.toFixed(2),
                })}
              </span>
              <span className="text-muted-foreground text-xs">
                {t("traders.balanceManat", {
                  value: balanceManat.toFixed(2),
                })}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "method",
        header: t("traders.method"),
        cell: ({ row }) => (
          <Badge variant={getMethodVariant(row.original.method)}>
            {row.original.method}
          </Badge>
        ),
      },
      {
        accessorKey: "priority",
        header: t("traders.priority"),
        cell: ({ row }) => (
          <div className="text-center">{row.original.priority}</div>
        ),
      },
      {
        id: "conversion",
        header: t("traders.conversion"),
        cell: ({ row }) => {
          const { conversionTransactions, conversionPayouts } = row.original;
          return (
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5">
                <ArrowDownToLine
                  className="size-3.5 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                {t("traders.conversionTransactions", {
                  value: conversionTransactions.toFixed(1),
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <ArrowUpFromLine
                  className="size-3.5 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                {t("traders.conversionPayouts", {
                  value: conversionPayouts.toFixed(1),
                })}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "requisitesCount",
        header: t("traders.requisites"),
        cell: ({ row }) => (
          <div className="text-center">{row.original.requisitesCount}</div>
        ),
      },
      {
        accessorKey: "activeOrdersCount",
        header: t("traders.activeOrders"),
        cell: ({ row }) => (
          <div className="text-center">{row.original.activeOrdersCount}</div>
        ),
      },
      {
        accessorKey: "isActive",
        header: t("traders.isActive"),
        cell: ({ row }) => {
          const isActive = row.original.isActive;
          return (
            <div className="flex justify-center">
              <span
                className={`inline-block size-2.5 shrink-0 rounded-full ${isActive ? "bg-emerald-500" : "bg-destructive"}`}
                title={isActive ? t("traders.yes") : t("traders.no")}
                aria-label={isActive ? t("traders.yes") : t("traders.no")}
                role="img"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "trafficEnabled",
        header: t("traders.trafficEnabled"),
        cell: ({ row }) => {
          const value = row.original.trafficEnabled;
          return (
            <div className="flex justify-center">
              <span
                className={`inline-block size-2.5 shrink-0 rounded-full ${value ? "bg-emerald-500" : "bg-destructive"}`}
                title={value ? t("traders.yes") : t("traders.no")}
                aria-label={value ? t("traders.yes") : t("traders.no")}
                role="img"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "payInEnabled",
        header: t("traders.payInEnabled"),
        cell: ({ row }) => {
          const value = row.original.payInEnabled;
          return (
            <div className="flex justify-center">
              <span
                className={`inline-block size-2.5 shrink-0 rounded-full ${value ? "bg-emerald-500" : "bg-destructive"}`}
                title={value ? t("traders.yes") : t("traders.no")}
                aria-label={value ? t("traders.yes") : t("traders.no")}
                role="img"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "payOutEnabled",
        header: t("traders.payOutEnabled"),
        cell: ({ row }) => {
          const value = row.original.payOutEnabled;
          return (
            <div className="flex justify-center">
              <span
                className={`inline-block size-2.5 shrink-0 rounded-full ${value ? "bg-emerald-500" : "bg-destructive"}`}
                title={value ? t("traders.yes") : t("traders.no")}
                aria-label={value ? t("traders.yes") : t("traders.no")}
                role="img"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: t("traders.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t]
  );
}
