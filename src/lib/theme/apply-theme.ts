import { themeOrder, themeStorageKey, type ThemeSetting } from "@/lib/theme/storage";

export function resolveTheme(setting: ThemeSetting) {
  if (setting === "light" || setting === "dark") return setting;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function readThemeSetting(): ThemeSetting {
  const stored = localStorage.getItem(themeStorageKey) as ThemeSetting | null;
  return stored && themeOrder.includes(stored) ? stored : "system";
}

export function applyThemeSetting(setting: ThemeSetting) {
  const resolved = resolveTheme(setting);
  document.documentElement.dataset.themeSetting = setting;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
}

export function applyInitialTheme() {
  try {
    applyThemeSetting(readThemeSetting());
  } catch {
    document.documentElement.dataset.themeSetting = "system";
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
}
