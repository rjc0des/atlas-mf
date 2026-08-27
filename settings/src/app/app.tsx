import { AppearanceSection } from './appearance-section';
import { NotificationsSection } from './notifications-section';
import { ThresholdsSection } from './thresholds-section';

export function App() {
  return (
    <div className="p-md flex flex-col gap-sm max-w-2xl">
      <div className="mb-xs">
        <div className="font-mono text-xs uppercase tracking-widest text-pulse">Settings</div>
        <h1 className="text-2xl font-black tracking-tight">Alerting</h1>
      </div>
      <AppearanceSection />
      <NotificationsSection />
      <ThresholdsSection />
    </div>
  );
}

export default App;
