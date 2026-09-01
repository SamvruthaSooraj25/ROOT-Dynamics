import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> & {
  label: string;
  variant?: "solid" | "ghost";
};

export function PrimaryButton({ label, variant = "solid", className = "", ...rest }: Props) {
  const base =
    "group inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.28em] px-7 py-4 transition-colors duration-500";
  const styles =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:bg-[var(--red-bright)]"
      : "border border-[color-mix(in_oklab,var(--foreground)_22%,transparent)] text-foreground hover:border-primary hover:text-primary";

  return (
    <button {...rest} className={`${base} ${styles} ${className}`}>
      {label}
      <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
    </button>
  );
}
