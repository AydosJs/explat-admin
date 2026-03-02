import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  ChevronsUpDown,
  Copy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

import type { AppealRow } from "./types";

function formatTimer(seconds: number | null): string {
  if (seconds === null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function useAppealsColumns(
  copiedOperationId: string | null,
  copyOperationId: (value: string, appealId: string) => void,
  typeFilterActive: boolean,
  setTypeFilterActive: (value: boolean) => void,
  amountFilterActive: boolean,
  setAmountFilterActive: (value: boolean) => void,
  timerFilterActive: boolean,
  setTimerFilterActive: (value: boolean) => void
) {
  const { t } = useTranslation();

  return useMemo<ColumnDef<AppealRow>[]>(
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
            aria-label={t("appeals.selectAll")}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={t("appeals.selectRow")}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "index",
        header: t("appeals.index"),
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "merchantName",
        header: t("appeals.merchant"),
        cell: ({ row }) => (
          <Link
            to="/merchants/$merchantId"
            params={{ merchantId: row.original.merchantId }}
            className="text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {row.original.merchantName}
          </Link>
        ),
      },
      {
        accessorKey: "type",
        header: () => (
          <div className="flex items-center gap-1.5">
            <span>{t("appeals.type")}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setTypeFilterActive(!typeFilterActive);
              }}
              aria-label={
                typeFilterActive
                  ? t("appeals.typeFiltered")
                  : t("appeals.typeNotFiltered")
              }
            >
              <ChevronsUpDown
                className={
                  typeFilterActive
                    ? "size-4 text-primary"
                    : "size-4 text-muted-foreground"
                }
              />
            </Button>
          </div>
        ),
        cell: ({ row }) => {
          const isPayIn = row.original.type === "pay-in";
          return (
            <div className="flex items-center gap-1.5">
              {isPayIn ? (
                <ArrowDownToLine className="size-4 shrink-0 text-muted-foreground" />
              ) : (
                <ArrowUpFromLine className="size-4 shrink-0 text-muted-foreground" />
              )}
              <span>
                {isPayIn ? t("appeals.typePayIn") : t("appeals.typePayOut")}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "operationId",
        header: t("appeals.operationId"),
        cell: ({ row }) => {
          const { operationId, id } = row.original;
          const isCopied = copiedOperationId === id;
          return (
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm">{operationId}</span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  copyOperationId(operationId, id);
                }}
                aria-label={
                  isCopied ? t("appeals.copied") : t("appeals.copyOperationId")
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
        accessorKey: "traderName",
        header: t("appeals.trader"),
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
        accessorKey: "amount",
        header: () => (
          <div className="flex items-center gap-1.5">
            <span>{t("appeals.amount")}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setAmountFilterActive(!amountFilterActive);
              }}
              aria-label={
                amountFilterActive
                  ? t("appeals.amountFiltered")
                  : t("appeals.amountNotFiltered")
              }
            >
              <ChevronsUpDown
                className={
                  amountFilterActive
                    ? "size-4 text-primary"
                    : "size-4 text-muted-foreground"
                }
              />
            </Button>
          </div>
        ),
        cell: ({ row }) =>
          `₼ ${row.original.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
      {
        accessorKey: "timerSeconds",
        header: () => (
          <div className="flex items-center gap-1.5">
            <span>{t("appeals.timer")}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setTimerFilterActive(!timerFilterActive);
              }}
              aria-label={
                timerFilterActive
                  ? t("appeals.timerFiltered")
                  : t("appeals.timerNotFiltered")
              }
            >
              <ChevronsUpDown
                className={
                  timerFilterActive
                    ? "size-4 text-primary"
                    : "size-4 text-muted-foreground"
                }
              />
            </Button>
          </div>
        ),
        cell: ({ row }) => formatTimer(row.original.timerSeconds),
      },
      {
        accessorKey: "telegramSent",
        header: t("appeals.telegramSent"),
        cell: ({ row }) =>
          row.original.telegramSent ? t("appeals.alreadyProcessed") : "—",
      },
      {
        accessorKey: "createdAt",
        header: t("appeals.createdAt"),
        cell: ({ row }) =>
          dayjs(row.original.createdAt).format("MMM D, HH:mm"),
      },
    ],
    [
      t,
      copiedOperationId,
      copyOperationId,
      typeFilterActive,
      setTypeFilterActive,
      amountFilterActive,
      setAmountFilterActive,
      timerFilterActive,
      setTimerFilterActive,
    ]
  );
}
