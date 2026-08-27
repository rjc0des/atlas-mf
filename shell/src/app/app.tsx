import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Button, Card, StatusDot, initTheme } from '@atlas-mf/shared-ui';

const Boards = React.lazy(() => import('boards/Module'));
const Reports = React.lazy(() => import('reports/Module'));
const Settings = React.lazy(() => import('settings/Module'));

const DESTINATIONS = [
  {
    to: '/boards',
    label: 'Boards',
    accent: 'danger' as const,
    dot: 'danger' as const,
    description: 'Track incidents and deploys from investigating to resolved.',
  },
  {
    to: '/reports',
    label: 'Reports',
    accent: 'info' as const,
    dot: 'info' as const,
    description: 'Uptime, deploy velocity, and incident trend over 8 weeks.',
  },
  {
    to: '/settings',
    label: 'Settings',
    accent: 'success' as const,
    dot: 'success' as const,
    description: 'Alert channels and the thresholds that trigger them.',
  },
];

function Overview() {
  return (
    <div className="bg-grid border-b-2 border-border px-md py-lg h-dvh">
      <div className="text-xs font-mono uppercase tracking-widest text-pulse mb-sm">
        Incident response platform
      </div>
      <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-md max-w-3xl">
        Ship fast.
        <br />
        Watch everything.
      </h1>
      <p className="text-sm text-text-muted max-w-3xl mb-lg mt-12">
        One dashboard for the whole incident lifecycle: kanban triage, ops
        reporting, and the alert thresholds that keep you honest.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
        {DESTINATIONS.map((d) => (
          <Link key={d.to} to={d.to} className="block">
            <Card
              accent={d.accent}
              className="p-md h-full transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-xs mb-xs">
                <StatusDot tone={d.dot} live />
                <span className="font-mono text-xs uppercase tracking-wide text-text-muted">
                  {d.label}
                </span>
              </div>
              <p className="text-sm text-text">{d.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function App() {
  React.useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="relative flex items-center gap-md border-b-2 border-border px-md py-sm">
        <div className="flex items-center gap-xs">
          <StatusDot tone="success" live />
          <span className="font-mono text-sm font-black uppercase tracking-wider">
            Atlas MF
          </span>
        </div>
        <nav className="flex gap-xs">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">Overview</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/boards">Boards</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/reports">Reports</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/settings">Settings</Link>
          </Button>
        </nav>
        <div className="absolute -bottom-[2px] left-0 h-[2px] w-full overflow-hidden">
          <div className="animate-pulse-sweep h-full w-1/3 bg-pulse" />
        </div>
      </header>
      <React.Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
