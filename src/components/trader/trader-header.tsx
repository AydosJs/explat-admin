import { useTranslation } from "react-i18next";
import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function TraderHeader() {
  const { t } = useTranslation();
  const traderName = t("trader.header.traderName");

  return (
    <header
      className={cn(
        "flex h-[76px] shrink-0 items-center justify-between gap-3 border-0 bg-trader-header px-4 py-3 text-trader-header-foreground md:hidden"
      )}
      aria-label={t("trader.header.ariaLabel")}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar className="size-10 shrink-0 ring-2 ring-trader-header-foreground/30">
          <AvatarImage src="" alt="" />
          <AvatarFallback className="bg-trader-header-foreground/20 w-full text-trader-header-foreground">
            <span className="flex size-full items-center justify-center">
              <User className="size-5 shrink-0" aria-hidden />
            </span>
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-sm font-medium text-trader-header-foreground">
          {t("trader.header.greeting", { name: traderName })}
        </span>
      </div>
      <ThemeToggle
        iconClassName="size-6"
        triggerClassName="size-11 text-trader-header-foreground hover:bg-trader-header-foreground/10 hover:text-trader-header-foreground"
      />
    </header>
  );
}
