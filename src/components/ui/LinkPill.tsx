import type { ComponentPropsWithoutRef } from "react";

type LinkPillProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "quiet";
};

export function LinkPill({ className = "", variant = "quiet", ...props }: LinkPillProps) {
  const variantClass =
    variant === "primary"
      ? "border-transparent bg-accent text-static-black"
      : "border-line bg-bg-elevated text-text-soft hover:border-accent/60 hover:text-text";

  return (
    <a
      className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold no-underline shadow-soft transition hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent ${variantClass} ${className}`}
      {...props}
    />
  );
}
