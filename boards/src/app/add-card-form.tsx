import { useState } from 'react';
import { Button, Input } from '@atlas-mf/shared-ui';
import type { Severity } from './types';

export function AddCardForm({ onAdd }: { onAdd: (card: { title: string; description: string; severity: Severity }) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('warning');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description.trim(), severity });
    setTitle('');
    setDescription('');
    setSeverity('warning');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-sm mb-md items-center flex-wrap">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Incident or deploy title"
        className="w-64"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description"
        className="w-80"
      />
      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value as Severity)}
        className="h-8 rounded-sm border border-border bg-surface-2 px-2 text-sm text-text"
      >
        <option value="critical">Critical</option>
        <option value="warning">Warning</option>
        <option value="minor">Minor</option>
      </select>
      <Button type="submit" size="sm">
        Add card
      </Button>
    </form>
  );
}
