import { create } from "zustand";
import i18n from "i18next";
import { cookies } from "@/lib/cookies";

const THEME_KEY = "theme";
const LOCALE_KEY = "locale";

export type Theme = "light" | "dark";

export type Locale = "ru" | "en";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = cookies.get(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "ru";
  const stored = cookies.get(LOCALE_KEY);
  if (stored === "ru" || stored === "en") return stored;
  return "ru";
}

interface HeaderState {
  theme: Theme;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  theme: getInitialTheme(),
  locale: getInitialLocale(),
  setTheme: (theme) => {
    applyTheme(theme);
    cookies.set(THEME_KEY, theme);
    set({ theme });
  },
  setLocale: (locale) => {
    void i18n.changeLanguage(locale);
    cookies.set(LOCALE_KEY, locale);
    set({ locale });
  },
}));

