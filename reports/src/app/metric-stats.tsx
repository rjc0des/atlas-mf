import { StatCard } from '@atlas-mf/shared-ui';

export function MetricStats() {
  return (
    <div className="grid grid-cols-4 gap-sm mb-md">
      <StatCard label="Uptime (30d)" value="99.97%" trend="+0.02% vs prior" trendTone="success" />
      <StatCard label="Deploy time reduction" value="57%" trend="42min → 18min avg" trendTone="success" />
      <StatCard label="Environments managed" value="8" trend="dev → prod, CI/CD" trendTone="neutral" />
      <StatCard label="Open incidents" value="1" trend="-5 vs 8 weeks ago" trendTone="success" />
    </div>
  );
}
