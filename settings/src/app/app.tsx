import { AppearanceSection } from './appearance-section';
import { NotificationsSection } from './notifications-section';
import { ThresholdsSection } from './thresholds-section';

export function App() {
  return (
    <div className="p-md flex flex-col gap-sm max-w-2xl">
      <AppearanceSection />
      <NotificationsSection />
      <ThresholdsSection />
    </div>
  );
}

export default App;
