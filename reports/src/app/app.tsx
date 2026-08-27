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
      <MetricStats />
      <OpsCharts />
    </div>
  );
}

export default App;
