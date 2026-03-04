import { Plus, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TokensTradersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function TokensTradersToolbar({
  search,
  onSearchChange,
}: TokensTradersToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="relative w-full min-w-0 sm:max-w-xs sm:flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t("tokensTraders.search")}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
          aria-label={t("tokensTraders.search")}
        />
      </div>
      <Button variant="outline" className="shrink-0 text-muted-foreground" asChild>
        <Link to="/tokens/traders/create">
          <Plus className="size-4" />
          <span className="whitespace-nowrap">{t("common.create")}</span>
        </Link>
      </Button>
    </div>
  );
}
