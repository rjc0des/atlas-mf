import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Button, initTheme } from '@atlas-mf/shared-ui';

const Boards = React.lazy(() => import('boards/Module'));
const Reports = React.lazy(() => import('reports/Module'));
const Settings = React.lazy(() => import('settings/Module'));

function Overview() {
  return (
    <div className="p-md text-sm text-text-muted">
      Select Boards, Reports, or Settings to get started.
    </div>
  );
}

export function App() {
  React.useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="flex items-center gap-md border-b border-border px-md py-sm">
        <div className="flex items-center gap-xs">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          <span className="text-sm font-semibold tracking-wide">Pulse</span>
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
