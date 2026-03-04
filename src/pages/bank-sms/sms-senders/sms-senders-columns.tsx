import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { Checkbox } from "@/components/ui/checkbox";

import type { SmsSenderRow } from "./types";

export function useSmsSendersColumns() {
  const { t } = useTranslation();

  return useMemo<ColumnDef<SmsSenderRow>[]>(
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
            aria-label={t("smsSenders.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("smsSenders.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "sender",
        header: t("smsSenders.sender"),
        cell: ({ row }) => row.original.sender,
      },
      {
        accessorKey: "bank",
        header: t("smsSenders.bank"),
        cell: ({ row }) => row.original.bank,
      },
      {
        accessorKey: "templatesCount",
        header: t("smsSenders.templates"),
        cell: ({ row }) => row.original.templatesCount,
      },
      {
        accessorKey: "isActive",
        meta: { className: "text-center" },
        header: () => <div className="text-center">{t("smsSenders.isActive")}</div>,
        cell: ({ row }) => {
          const isActive = row.original.isActive;
          return (
            <div className="flex justify-center">
              <span
                className={`inline-block size-2.5 shrink-0 rounded-full ${isActive ? "bg-emerald-500" : "bg-destructive"}`}
                title={isActive ? t("smsSenders.yes") : t("smsSenders.no")}
                aria-label={isActive ? t("smsSenders.yes") : t("smsSenders.no")}
                role="img"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: t("smsSenders.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t]
  );
}
