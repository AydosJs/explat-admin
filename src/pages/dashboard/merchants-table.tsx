import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatBalanceUsdt } from "./format-balance";
import type { DashboardMerchant } from "./types";

interface MerchantsTableProps {
  merchants: DashboardMerchant[];
}

export function MerchantsTable({ merchants }: MerchantsTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0 min-w-0">{t("dashboard.index")}</TableHead>
          <TableHead className="w-1/2">{t("sidebar.merchants")}</TableHead>
          <TableHead className="text-right">
            {t("sidebar.balance")} USDT
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {merchants.map((merchant, index) => {
          const isNegative = merchant.balanceUsdt < 0;
          return (
            <TableRow
              key={merchant.id}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() =>
                navigate({ to: "/merchants/$merchantId", params: { merchantId: merchant.id } })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate({ to: "/merchants/$merchantId", params: { merchantId: merchant.id } });
                }
              }}
            >
              <TableCell className="w-0 min-w-0 tabular-nums text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="w-1/2 font-medium text-foreground">
                {merchant.name}
              </TableCell>
              <TableCell
                className={`text-right tabular-nums font-medium ${
                  isNegative
                    ? "text-destructive"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {formatBalanceUsdt(merchant.balanceUsdt)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
