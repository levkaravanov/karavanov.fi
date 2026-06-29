"use client";

import { useEffect, useSyncExternalStore } from "react";
import { themeOrder, themeStorageKey, type ThemeSetting } from "@/lib/theme/storage";
import { applyThemeSetting, readThemeSetting } from "@/lib/theme/apply-theme";

type ThemeToggleProps = {
  labels: Record<ThemeSetting | "label", string>;
  tabIndex?: number;
};

const themeIcons: Record<ThemeSetting, string> = {
  system: "/icons/desktopcomputer.svg",
  light: "/icons/sun.max.fill.svg",
  dark: "/icons/moon.fill.svg",
};

const themeChangeEvent = "lev-portfolio-theme-change";

function readServerThemeSetting(): ThemeSetting {
  return "system";
}

function subscribeThemeSetting(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
}

function writeThemeSetting(next: ThemeSetting) {
  localStorage.setItem(themeStorageKey, next);
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function ThemeToggle({ labels, tabIndex }: ThemeToggleProps) {
  const setting = useSyncExternalStore(subscribeThemeSetting, readThemeSetting, readServerThemeSetting);

  useEffect(() => {
    const apply = () => {
      applyThemeSetting(setting);
    };

    apply();

    if (setting !== "system") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [setting]);

  return (
    <div className="flex rounded-full p-1" aria-label={labels.label}>
      {themeOrder.map((item) => {
        const active = setting === item;

        return (
          <button
            className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-full transition focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent ${
              active ? "bg-accent text-static-black" : "text-text-muted hover:text-text"
            }`}
            type="button"
            aria-label={`${labels.label}: ${labels[item]}`}
            aria-pressed={active}
            title={labels[item]}
            key={item}
            tabIndex={tabIndex}
            onClick={() => writeThemeSetting(item)}
          >
            <span
              className="h-4 w-4 bg-current"
              style={{
                WebkitMask: `url("${themeIcons[item]}") center / contain no-repeat`,
                mask: `url("${themeIcons[item]}") center / contain no-repeat`,
              }}
              aria-hidden="true"
            />
            <span className="sr-only">{labels[item]}</span>
          </button>
        );
      })}
    </div>
  );
}
