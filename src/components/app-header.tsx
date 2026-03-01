import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useHeaderStore,
  type Locale,
  type Theme,
} from "@/stores/use-header-store";
import {
  SunIcon,
  MoonIcon,
  LanguagesIcon,
  UserIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/stores/use-app-store";

const themeOptions: { value: Theme; labelKey: string; icon: typeof SunIcon }[] = [
  { value: "light", labelKey: "header.themeLight", icon: SunIcon },
  { value: "dark", labelKey: "header.themeDark", icon: MoonIcon },
];

const localeOptions: { value: Locale; labelKey: string }[] = [
  { value: "ru", labelKey: "header.localeRu" },
  { value: "en", labelKey: "header.localeEn" },
];

function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useHeaderStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9 shrink-0">
          <SunIcon className="size-4 dark:hidden" />
          <MoonIcon className="size-4 hidden dark:block" />
          <span className="sr-only">{t("header.changeTheme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as Theme)}>
          {themeOptions.map((opt) => (
            <DropdownMenuRadioItem key={opt.value} value={opt.value}>
              <opt.icon className="size-4" />
              {t(opt.labelKey)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LanguageToggle() {
  const { t } = useTranslation();
  const { locale, setLocale } = useHeaderStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9 shrink-0">
          <LanguagesIcon className="size-4" />
          <span className="sr-only">{t("header.language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuRadioGroup value={locale} onValueChange={(v) => setLocale(v as Locale)}>
          {localeOptions.map((opt) => (
            <DropdownMenuRadioItem key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// TODO: replace with real user from auth/store when available
const currentUser = {
  teamName: "Support Team",
  role: "Admin",
};

function UserMenu() {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative flex items-center gap-2 rounded-full  py-[2px] pl-[2px] pr-2 outline-none ring-0 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-0">
          <div className="flex shrink-0 items-center justify-center">
            <Avatar className="size-8">
              <AvatarImage src="" alt={t("common.user")} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          <div className="hidden flex-col items-start text-left sm:flex">
            <span className="line-clamp-1 text-sm font-medium leading-tight text-foreground">
              {currentUser.teamName}
            </span>
            <span className="line-clamp-1 text-xs leading-tight text-muted-foreground">
              {currentUser.role}
            </span>
          </div>
          <span className="sr-only">{t("header.userMenu")}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{t("common.user")}</span>
            <span className="text-muted-foreground text-xs font-normal">
              user@example.com
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="size-4" />
            {t("common.profile")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon className="size-4" />
          {t("common.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const PATH_TO_TITLE_KEY: Record<string, string> = {
  "/": "sidebar.dashboard",
  "/pay-in": "sidebar.payIn",
  "/pay-in/create": "payIn.addTransaction",
  "/pay-out": "sidebar.payOut",
  "/merchants": "sidebar.merchants",
  "/traders": "sidebar.traders",
  "/requisites": "sidebar.requisites",
  "/devices": "sidebar.devices",
  "/appeals": "sidebar.appeals",
};

export function AppHeader() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const pageTitle = PATH_TO_TITLE_KEY[pathname]
    ? t(PATH_TO_TITLE_KEY[pathname])
    : pathname === "/login"
      ? null
      : pathname.slice(1) || t("sidebar.dashboard");

  return (
    <header className="shrink-0 border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={t("header.openMenu")}
            className="shrink-0 md:hidden"
          >
            <MenuIcon className="size-5" />
          </Button>
          {pageTitle != null && (
            <h1 className="truncate text-lg font-medium text-foreground">
              {pageTitle}
            </h1>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-9 shrink-0" />
          <LanguageToggle />
          <Separator orientation="vertical" className="h-9 shrink-0" />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
