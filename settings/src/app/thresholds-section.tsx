import { useState } from 'react';
import { Input } from '@atlas-mf/shared-ui';
import { Section } from './section';

export function ThresholdsSection() {
  const [thresholds, setThresholds] = useState({ errorRate: '2', latencyMs: '500', cpuPercent: '85' });

  return (
    <Section title="Environment thresholds">
      <label className="flex items-center justify-between text-sm text-text">
        Error rate alert (%)
        <Input
          className="w-24"
          value={thresholds.errorRate}
          onChange={(e) => setThresholds((t) => ({ ...t, errorRate: e.target.value }))}
        />
      </label>
      <label className="flex items-center justify-between text-sm text-text">
        Latency alert (ms)
        <Input
          className="w-24"
          value={thresholds.latencyMs}
          onChange={(e) => setThresholds((t) => ({ ...t, latencyMs: e.target.value }))}
        />
      </label>
      <label className="flex items-center justify-between text-sm text-text">
        CPU alert (%)
        <Input
          className="w-24"
          value={thresholds.cpuPercent}
          onChange={(e) => setThresholds((t) => ({ ...t, cpuPercent: e.target.value }))}
        />
      </label>
    </Section>
  );
}
