export default function AvailabilityBadge({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--jv-muted)]">
      <span aria-hidden="true" className="size-2 rounded-full bg-[var(--jv-accent)]" />
      {children}
    </p>
  );
}
