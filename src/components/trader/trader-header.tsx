import { useTranslation } from "react-i18next";
import { Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TraderHeader() {
  const { t } = useTranslation();

  return (
    <header
      className={cn(
        "flex shrink-0 items-center justify-between gap-2 rounded-b-lg border-b border-border bg-background px-4 py-3 md:hidden"
      )}
      aria-label={t("trader.header.ariaLabel")}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar className="size-10 shrink-0 ring-2 ring-border/50">
          <AvatarImage src="" alt="" />
          <AvatarFallback className="bg-muted w-full text-muted-foreground">
            <span className="flex size-full items-center justify-center">
              <User className="size-5 shrink-0" aria-hidden />
            </span>
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-sm font-medium text-foreground">
          {t("trader.header.traderName")}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-9 shrink-0"
        aria-label={t("trader.header.settings")}
      >
        <span className="flex size-full items-center justify-center">
          <Settings className="size-5 shrink-0" aria-hidden />
        </span>
      </Button>
    </header>
  );
}
