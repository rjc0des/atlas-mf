import { useState } from 'react';
import { Section } from './section';
import { ToggleRow } from './toggle-row';

export function NotificationsSection() {
  const [channels, setChannels] = useState({ slack: true, email: true, webhook: false });

  return (
    <Section title="Notifications">
      <ToggleRow
        label="Slack alerts"
        checked={channels.slack}
        onChange={(v) => setChannels((c) => ({ ...c, slack: v }))}
      />
      <ToggleRow
        label="Email digest"
        checked={channels.email}
        onChange={(v) => setChannels((c) => ({ ...c, email: v }))}
      />
      <ToggleRow
        label="Webhook (PagerDuty)"
        checked={channels.webhook}
        onChange={(v) => setChannels((c) => ({ ...c, webhook: v }))}
      />
    </Section>
  );
}
