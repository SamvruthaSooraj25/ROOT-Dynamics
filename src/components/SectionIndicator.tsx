export function SectionIndicator({ index, label }: { index: string; label: string }) {
  return (
    <div className="pointer-events-none flex items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.4em] text-muted-foreground">
      <span className="text-primary">{index}</span>
      <span className="h-px w-10 bg-[color-mix(in_oklab,var(--foreground)_20%,transparent)]" />
      <span>{label}</span>
    </div>
  );
}
