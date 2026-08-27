export function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-sm p-sm">
      <h2 className="text-xs uppercase tracking-wide text-text-muted mb-sm">{title}</h2>
      {children}
    </div>
  );
}
