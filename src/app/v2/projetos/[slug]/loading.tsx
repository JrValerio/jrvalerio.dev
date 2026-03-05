export default function ProjectDetailLoading() {
  return (
    <div className="jr-container py-16">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-[var(--jr-border)]" />
      <div className="mb-4 h-10 w-2/3 animate-pulse rounded bg-[var(--jr-border)]" />
      <div className="mb-8 h-5 w-full animate-pulse rounded bg-[var(--jr-border)]" />
      <div className="mb-12 h-[280px] w-full animate-pulse rounded-xl bg-[var(--jr-border)]" />

      <div className="space-y-4">
        <div className="h-6 w-40 animate-pulse rounded bg-[var(--jr-border)]" />
        <div className="h-5 w-full animate-pulse rounded bg-[var(--jr-border)]" />
        <div className="h-5 w-11/12 animate-pulse rounded bg-[var(--jr-border)]" />
      </div>
    </div>
  );
}
