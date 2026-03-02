import { Search, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TraderOption {
  traderId: string;
  traderName: string;
}

interface MerchantOption {
  merchantId: string;
  merchantName: string;
}

interface AppealsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  merchantFilter: string;
  onMerchantFilterChange: (value: string) => void;
  merchantOptions: MerchantOption[];
  traderFilter: string;
  onTraderFilterChange: (value: string) => void;
  traderOptions: TraderOption[];
  selectedCount: number;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export function AppealsToolbar({
  search,
  onSearchChange,
  merchantFilter,
  onMerchantFilterChange,
  merchantOptions,
  traderFilter,
  onTraderFilterChange,
  traderOptions,
  selectedCount,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onConfirmDelete,
}: AppealsToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:flex-1 sm:flex-nowrap">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("appeals.search")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
            aria-label={t("appeals.search")}
          />
        </div>
        <Select
          value={merchantFilter || "all"}
          onValueChange={(v) => onMerchantFilterChange(v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-full sm:w-44" size="default">
            <SelectValue placeholder={t("appeals.merchantFilter")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("appeals.allMerchants")}</SelectItem>
            {merchantOptions.map(({ merchantId, merchantName }) => (
              <SelectItem key={merchantId} value={merchantId}>
                {merchantName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={traderFilter || "all"}
          onValueChange={(v) => onTraderFilterChange(v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-full sm:w-44" size="default">
            <SelectValue placeholder={t("appeals.traderFilter")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("appeals.allTraders")}</SelectItem>
            {traderOptions.map(({ traderId, traderName }) => (
              <SelectItem key={traderId} value={traderId}>
                {traderName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:shrink-0">
        <Button
          variant="outline"
          className="h-9 shrink-0 text-muted-foreground"
          disabled={selectedCount === 0}
          onClick={() => onDeleteDialogOpenChange(true)}
        >
          <Trash2 className="size-4" />
          <span className="whitespace-nowrap">
            {selectedCount > 0
              ? `${t("appeals.deleteSelected")} (${selectedCount})`
              : t("appeals.deleteSelected")}
          </span>
        </Button>
      </div>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        title={t("appeals.deleteConfirmTitle")}
        description={t("appeals.deleteConfirmDescription", {
          count: selectedCount,
        })}
        cancelLabel={t("appeals.deleteConfirmCancel")}
        confirmLabel={t("appeals.deleteConfirmAction")}
        confirmVariant="destructive"
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}
