import { useEffect } from 'react';
import { initTheme } from '@atlas-mf/shared-ui';
import { MetricStats } from './metric-stats';
import { OpsCharts } from './ops-charts';

export function App() {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="p-md">
      <div className="mb-md">
        <div className="font-mono text-xs uppercase tracking-widest text-pulse">Reports</div>
        <h1 className="text-2xl font-black tracking-tight">Ops health</h1>
      </div>
      <MetricStats />
      <OpsCharts />
    </div>
  );
}

export default App;
