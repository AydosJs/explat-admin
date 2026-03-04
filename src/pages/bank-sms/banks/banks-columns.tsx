import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { Checkbox } from "@/components/ui/checkbox";

import type { BankRow } from "./types";

export function useBanksColumns() {
  const { t } = useTranslation();

  return useMemo<ColumnDef<BankRow>[]>(
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
            aria-label={t("banks.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("banks.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: t("banks.name"),
        cell: ({ row }) => row.original.name,
      },
      {
        accessorKey: "sendersCount",
        meta: { className: "text-center" },
        header: () => <div className="text-center">{t("banks.senders")}</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.sendersCount}</div>
        ),
      },
      {
        accessorKey: "isActive",
        meta: { className: "text-center" },
        header: () => <div className="text-center">{t("banks.isActive")}</div>,
        cell: ({ row }) => {
          const isActive = row.original.isActive;
          return (
            <div className="flex justify-center">
              <span
                className={`inline-block size-2.5 shrink-0 rounded-full ${isActive ? "bg-emerald-500" : "bg-destructive"}`}
                title={isActive ? t("banks.yes") : t("banks.no")}
                aria-label={isActive ? t("banks.yes") : t("banks.no")}
                role="img"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: t("banks.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t]
  );
}
