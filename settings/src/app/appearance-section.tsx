import { Button, useTheme } from '@atlas-mf/shared-ui';
import { Section } from './section';

export function AppearanceSection() {
  const [theme, setTheme] = useTheme();

  return (
    <Section title="Appearance">
      <div className="flex items-center justify-between text-sm text-text">
        <span>Theme</span>
        <div className="flex gap-xs">
          <Button
            size="sm"
            variant={theme === 'dark' ? 'primary' : 'secondary'}
            onClick={() => setTheme('dark')}
          >
            Dark
          </Button>
          <Button
            size="sm"
            variant={theme === 'light' ? 'primary' : 'secondary'}
            onClick={() => setTheme('light')}
          >
            Light
          </Button>
        </div>
      </div>
    </Section>
  );
}
