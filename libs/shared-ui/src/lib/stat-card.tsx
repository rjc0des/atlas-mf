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
    <div className={cn('bg-surface border border-border rounded-sm p-md', className)}>
      <div className="text-xs uppercase tracking-wide text-text-muted">{label}</div>
      <div className="mt-xs text-3xl font-semibold tabular-nums text-text">{value}</div>
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
