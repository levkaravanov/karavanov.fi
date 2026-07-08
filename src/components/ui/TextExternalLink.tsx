import type { ComponentPropsWithoutRef } from "react";

type TextExternalLinkProps = ComponentPropsWithoutRef<"a">;

export function TextExternalLink({ children, className = "", rel, target = "_blank", ...props }: TextExternalLinkProps) {
  const nextRel = target === "_blank" ? rel ?? "noreferrer" : rel;

  return (
    <a className={`text-external-link ${className}`} rel={nextRel} target={target} {...props}>
      <span>{children}</span>
      <svg
        aria-hidden="true"
        className="text-external-link-icon"
        fill="none"
        height="14"
        stroke="currentColor"
        style={{ height: "0.85rem", width: "0.85rem" }}
        viewBox="0 0 16 16"
        width="14"
      >
        <path d="M6 4.5H4.75A2.25 2.25 0 0 0 2.5 6.75v4.5a2.25 2.25 0 0 0 2.25 2.25h4.5a2.25 2.25 0 0 0 2.25-2.25V10" />
        <path d="M9 2.5h4.5V7" />
        <path d="m8 8 5.25-5.25" />
      </svg>
    </a>
  );
}
