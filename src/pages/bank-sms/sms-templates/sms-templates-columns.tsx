import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { Checkbox } from "@/components/ui/checkbox";

import type { SmsTemplateRow } from "./types";

export function useSmsTemplatesColumns() {
  const { t } = useTranslation();

  return useMemo<ColumnDef<SmsTemplateRow>[]>(
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
            aria-label={t("smsTemplates.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("smsTemplates.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "sender",
        header: t("smsTemplates.sender"),
        cell: ({ row }) => row.original.sender,
      },
      {
        accessorKey: "template",
        header: t("smsTemplates.template"),
        cell: ({ row }) => row.original.template,
      },
      {
        accessorKey: "isActive",
        meta: { className: "text-center" },
        header: () => <div className="text-center">{t("smsTemplates.isActive")}</div>,
        cell: ({ row }) => {
          const isActive = row.original.isActive;
          return (
            <div className="flex justify-center">
              <span
                className={`inline-block size-2.5 shrink-0 rounded-full ${isActive ? "bg-emerald-500" : "bg-destructive"}`}
                title={isActive ? t("smsTemplates.yes") : t("smsTemplates.no")}
                aria-label={isActive ? t("smsTemplates.yes") : t("smsTemplates.no")}
                role="img"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: t("smsTemplates.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [t]
  );
}
