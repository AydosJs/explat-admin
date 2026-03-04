import { FileDown, Filter, Plus, Search, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DeleteConfirmDialog } from "./delete-confirm-dialog";

interface PayInToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCount: number;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
  filterOpen?: boolean;
  onFilterOpenChange?: (open: boolean) => void;
}

export function PayInToolbar({
  search,
  onSearchChange,
  selectedCount,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onConfirmDelete,
  filterOpen = false,
  onFilterOpenChange,
}: PayInToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:max-w-md">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("payIn.search")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
            aria-label={t("payIn.search")}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 w-9 shrink-0 text-muted-foreground data-[state=on]:bg-muted"
          aria-label={t("payIn.filter")}
          aria-expanded={filterOpen}
          data-state={filterOpen ? "on" : "off"}
          onClick={() => onFilterOpenChange?.(!filterOpen)}
        >
          <Filter className="size-4" />
        </Button>
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
              ? `${t("payIn.deleteSelected")} (${selectedCount})`
              : t("payIn.deleteSelected")}
          </span>
        </Button>
        <Button variant="outline" className="shrink-0 text-muted-foreground">
          <FileDown className="size-4" />
          <span className="whitespace-nowrap">{t("payIn.downloadExcel")}</span>
        </Button>
        <Button variant="outline" className="shrink-0 text-muted-foreground" asChild>
          <Link to="/pay-in/create">
            <Plus className="size-4" />
            <span className="whitespace-nowrap">{t("payIn.create")}</span>
          </Link>
        </Button>
      </div>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        selectedCount={selectedCount}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}
