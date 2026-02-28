import { FileDown, Plus, Search, Trash2 } from "lucide-react";
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
}

export function PayInToolbar({
  search,
  onSearchChange,
  selectedCount,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onConfirmDelete,
}: PayInToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="relative max-w-xs flex-1">
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
          variant="outline"
          className="h-9 text-muted-foreground"
          disabled={selectedCount === 0}
          onClick={() => onDeleteDialogOpenChange(true)}
        >
          <Trash2 className="size-4" />
          {selectedCount > 0
            ? `${t("payIn.deleteSelected")} (${selectedCount})`
            : t("payIn.deleteSelected")}
        </Button>
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={onDeleteDialogOpenChange}
          selectedCount={selectedCount}
          onConfirm={onConfirmDelete}
        />
      </div>
      <div className="flex shrink-0 gap-2">
        <Button variant="outline" className="text-muted-foreground">
          <FileDown className="size-4" />
          {t("payIn.downloadExcel")}
        </Button>
        <Button variant="outline" className="text-muted-foreground" asChild>
          <Link to="/pay-in/create">
            <Plus className="size-4" />
            {t("payIn.create")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
