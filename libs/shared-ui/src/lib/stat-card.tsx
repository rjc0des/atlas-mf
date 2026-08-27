import { cn } from './cn';

export interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendTone?: 'success' | 'danger' | 'neutral';
  className?: string;
}

export function StatCard({ label, value, trend, trendTone = 'neutral', className }: StatCardProps) {
  return (
    <div className={cn('bg-surface border-2 border-border rounded-sm p-md', className)}>
      <div className="text-xs uppercase tracking-wide text-text-muted font-mono">{label}</div>
      <div className="mt-xs text-3xl font-black tabular-nums font-mono text-text">{value}</div>
      {trend && (
        <div
          className={cn('mt-xs text-xs', {
            'text-success': trendTone === 'success',
            'text-danger': trendTone === 'danger',
            'text-text-muted': trendTone === 'neutral',
          })}
        >
          {trend}
        </div>
      )}
    </div>
  );
}
