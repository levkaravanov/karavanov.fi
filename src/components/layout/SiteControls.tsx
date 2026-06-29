"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { localeLabels, locales, type Locale } from "@/data/locales";
import { dictionary } from "@/data/navigation";
import { localizedPath } from "@/lib/i18n/routing";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type SiteControlsProps = {
  locale: Locale;
};

export function SiteControls({ locale }: SiteControlsProps) {
  const copy = dictionary[locale];
  const gearRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const speedRef = useRef(45);
  const targetSpeedRef = useRef(45);
  const [isOpen, setIsOpen] = useState(false);
  const [isGearHot, setIsGearHot] = useState(false);

  const setGearTargetSpeed = useCallback((degreesPerSecond: number) => {
    targetSpeedRef.current = degreesPerSecond;
  }, []);

  useEffect(() => {
    setGearTargetSpeed(isOpen || isGearHot ? 138 : 45);
  }, [isGearHot, isOpen, setGearTargetSpeed]);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const cancelGearAnimation = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const rotateGear = (timestamp: number) => {
      const lastFrameTime = lastFrameTimeRef.current ?? timestamp;
      const deltaSeconds = Math.min((timestamp - lastFrameTime) / 1000, 0.05);

      lastFrameTimeRef.current = timestamp;
      speedRef.current += (targetSpeedRef.current - speedRef.current) * Math.min(deltaSeconds * 10, 1);
      rotationRef.current = (rotationRef.current + speedRef.current * deltaSeconds) % 360;

      if (gearRef.current) {
        gearRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }

      frameRef.current = window.requestAnimationFrame(rotateGear);
    };

    const syncMotionPreference = () => {
      cancelGearAnimation();
      lastFrameTimeRef.current = null;

      if (reducedMotionQuery.matches) {
        speedRef.current = 0;
        if (gearRef.current) gearRef.current.style.transform = "";
        return;
      }

      frameRef.current = window.requestAnimationFrame(rotateGear);
    };

    syncMotionPreference();
    reducedMotionQuery.addEventListener("change", syncMotionPreference);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncMotionPreference);
      cancelGearAnimation();
    };
  }, []);

  return (
    <div className="site-settings relative mt-5 flex items-center">
      <button
        className="site-settings-button inline-flex min-h-10 min-w-10 items-center justify-center rounded-full text-text transition focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent"
        type="button"
        aria-label={copy.theme.settings}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        onBlur={() => setIsGearHot(false)}
        onFocus={() => setIsGearHot(true)}
        onPointerEnter={() => setIsGearHot(true)}
        onPointerLeave={() => setIsGearHot(false)}
      >
        <span
          ref={gearRef}
          className="settings-gear-icon block h-6 w-6 bg-current"
          style={{
            WebkitMask: 'url("/icons/gearshape.svg") center / contain no-repeat',
            mask: 'url("/icons/gearshape.svg") center / contain no-repeat',
          }}
          aria-hidden="true"
        />
      </button>

      <div className={`site-settings-panel ${isOpen ? "site-settings-panel-open" : ""}`}>
        <div className="flex rounded-full p-1" aria-label={copy.accessibility.language}>
          {locales.map((item) => (
            <Link
              className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-full px-2.5 text-xs font-bold no-underline transition ${
                item === locale ? "bg-accent text-static-black" : "text-text-muted hover:text-text"
              }`}
              href={localizedPath(item)}
              key={item}
              tabIndex={isOpen ? undefined : -1}
            >
              {localeLabels[item]}
            </Link>
          ))}
        </div>
        <ThemeToggle
          labels={{ label: copy.theme.label, system: copy.theme.system, light: copy.theme.light, dark: copy.theme.dark }}
          tabIndex={isOpen ? undefined : -1}
        />
      </div>
    </div>
  );
}
