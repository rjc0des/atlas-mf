// Uncomment this line to use CSS modules
// import styles from './app.module.css';
// import NxWelcome from './nx-welcome';
import { Button } from '@atlas-mf/shared-ui';

export function App() {
  return (
    <div>
      {/*<NxWelcome title="boards" />*/}
      <Button variant="primary">New board</Button>
    </div>
  );
}

export default App;
