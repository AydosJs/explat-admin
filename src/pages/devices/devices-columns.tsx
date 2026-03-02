import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ChevronsUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

import type { DeviceRow } from "./types";

export function useDevicesColumns(
  batteryFilterActive: boolean,
  setBatteryFilterActive: (value: boolean) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<DeviceRow>[]>(
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
            aria-label={t("devices.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("devices.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("devices.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "name",
        header: t("devices.name"),
        cell: ({ row }) => row.original.name,
      },
      {
        accessorKey: "requisiteDisplay",
        header: t("devices.requisite"),
        cell: ({ row }) => (
          <Link
            to="/requisites"
            className="font-mono text-sm text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {row.original.requisiteDisplay}
          </Link>
        ),
      },
      {
        accessorKey: "traderName",
        header: t("devices.trader"),
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
        accessorKey: "battery",
        header: () => (
          <div className="flex items-center gap-1.5">
            <span>{t("devices.battery")}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setBatteryFilterActive(!batteryFilterActive);
              }}
              aria-label={
                batteryFilterActive
                  ? t("devices.batteryFiltered")
                  : t("devices.batteryNotFiltered")
              }
            >
              <ChevronsUpDown
                className={
                  batteryFilterActive
                    ? "size-4 text-primary"
                    : "size-4 text-muted-foreground"
                }
              />
            </Button>
          </div>
        ),
        cell: ({ row }) => {
          const battery = row.original.battery;
          const isLow = battery < 20;
          return (
            <span
              className={isLow ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}
            >
              {battery}%
            </span>
          );
        },
      },
      { accessorKey: "operator", header: t("devices.operator") },
      {
        accessorKey: "healthcheck",
        header: t("devices.healthcheck"),
        cell: ({ row }) =>
          dayjs(row.original.healthcheck).format("MMM D, HH:mm"),
      },
    ],
    [t, batteryFilterActive, setBatteryFilterActive]
  );
}
