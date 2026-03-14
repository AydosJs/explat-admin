import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useHeaderStore, type Theme } from "@/stores/use-header-store";
import { cn } from "@/lib/utils";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const themeOptions: { value: Theme; labelKey: string; icon: typeof SunIcon }[] = [
  { value: "light", labelKey: "header.themeLight", icon: SunIcon },
  { value: "dark", labelKey: "header.themeDark", icon: MoonIcon },
];

interface ThemeToggleProps {
  triggerClassName?: string;
  iconClassName?: string;
}

export function ThemeToggle({
  triggerClassName,
  iconClassName = "size-4",
}: ThemeToggleProps) {
  const { t } = useTranslation();
  const { theme, setTheme } = useHeaderStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-9 shrink-0", triggerClassName)}
        >
          <SunIcon className={cn("dark:hidden", iconClassName)} />
          <MoonIcon className={cn("hidden dark:block", iconClassName)} />
          <span className="sr-only">{t("header.changeTheme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as Theme)}>
          {themeOptions.map((opt) => (
            <DropdownMenuRadioItem key={opt.value} value={opt.value}>
              <opt.icon className={cn("size-4", iconClassName)} />
              {t(opt.labelKey)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
