export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border-2 border-border rounded-sm p-md">
      <h2 className="font-mono text-xs font-bold uppercase tracking-wide text-text mb-sm">{title}</h2>
      <div className="flex flex-col gap-sm">{children}</div>
    </div>
  );
}
