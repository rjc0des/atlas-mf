import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import { Button } from '@atlas-mf/shared-ui';

const Boards = React.lazy(() => import('boards/Module'));
const Reports = React.lazy(() => import('reports/Module'));
const Settings = React.lazy(() => import('settings/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <nav className="flex gap-sm p-md">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">Home</Link>
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
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
