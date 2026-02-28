import { cookies } from "@/lib/cookies";

const THEME_KEY = "theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
}

export function initTheme() {
  const stored = cookies.get(THEME_KEY);
  const theme: Theme =
    stored === "light" || stored === "dark" ? stored : "dark";
  applyTheme(theme);
}
