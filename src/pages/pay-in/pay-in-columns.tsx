import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

import type { PayInRow } from "./types";

export function usePayInColumns(copiedUid: string | null, copyUid: (uid: string) => void) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<PayInRow>[]>(
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
            aria-label={t("payIn.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("payIn.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("payIn.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "merchant",
        header: t("payIn.merchant"),
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
      { accessorKey: "trader", header: t("payIn.trader") },
      { accessorKey: "requisite", header: t("payIn.requisite") },
      { accessorKey: "device", header: t("payIn.device") },
      {
        id: "amount",
        header: t("payIn.amountUsd"),
        cell: ({ row }) => {
          const { amountUsd, amountEur } = row.original;
          const format = (n: number) =>
            n.toLocaleString("en-US", { minimumFractionDigits: 2 });
          return (
            <div className="flex flex-col gap-0.5">
              <span>{format(amountUsd)}</span>
              <span className="text-muted-foreground text-xs">
                {format(amountEur)} {t("payIn.currencyEur")}
              </span>
            </div>
          );
        },
      },
      { accessorKey: "card", header: t("payIn.card") },
      {
        accessorKey: "createdAt",
        header: t("payIn.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t, copiedUid, copyUid]
  );
}
