export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-sm p-md">
      <h2 className="text-sm font-semibold text-text mb-sm">{title}</h2>
      <div className="flex flex-col gap-sm">{children}</div>
    </div>
  );
}
