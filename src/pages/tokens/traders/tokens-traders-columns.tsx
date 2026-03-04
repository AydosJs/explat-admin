import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Link } from "@tanstack/react-router";

import type { TokenTraderRow } from "./types";

export function useTokensTradersColumns(
  onStatusChange: (row: TokenTraderRow, checked: boolean) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<TokenTraderRow>[]>(
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
            aria-label={t("tokensTraders.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("tokensTraders.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "tokenMasked",
        header: t("tokensTraders.token"),
        cell: ({ row }) => (
          <span className="font-mono text-muted-foreground text-sm">
            {row.original.tokenMasked}
          </span>
        ),
      },
      {
        accessorKey: "traderName",
        header: t("tokensTraders.trader"),
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
        header: () => <div className="text-center">{t("tokensTraders.status")}</div>,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Switch
              checked={row.original.isActive}
              onCheckedChange={(checked) =>
                onStatusChange(row.original, checked === true)
              }
              onClick={(e) => e.stopPropagation()}
              aria-label={
                row.original.isActive
                  ? t("tokensTraders.statusActive")
                  : t("tokensTraders.statusInactive")
              }
            />
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: t("tokensTraders.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t, onStatusChange]
  );
}
