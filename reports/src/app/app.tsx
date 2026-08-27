// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { Button } from '@atlas-mf/shared-ui';

export function App() {
  return (
    <div>
      <NxWelcome title="reports" />
      <Button variant="secondary">Export report</Button>
    </div>
  );
}

export default App;
