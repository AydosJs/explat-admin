import { Plus, Search, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TradersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCount: number;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export function TradersToolbar({
  search,
  onSearchChange,
  selectedCount,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onConfirmDelete,
}: TradersToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="relative w-full min-w-0 sm:max-w-xs sm:flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t("traders.search")}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
          aria-label={t("traders.search")}
        />
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
              ? `${t("traders.deleteSelected")} (${selectedCount})`
              : t("traders.deleteSelected")}
          </span>
        </Button>
        <Button variant="outline" className="h-9 shrink-0 text-muted-foreground" asChild>
          <Link to="/traders/create">
            <Plus className="size-4" />
            <span className="whitespace-nowrap">{t("common.create")}</span>
          </Link>
        </Button>
      </div>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        title={t("traders.deleteConfirmTitle")}
        description={t("traders.deleteConfirmDescription", {
          count: selectedCount,
        })}
        cancelLabel={t("traders.deleteConfirmCancel")}
        confirmLabel={t("traders.deleteConfirmAction")}
        confirmVariant="destructive"
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}
