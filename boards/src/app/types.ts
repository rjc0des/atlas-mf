export type ColumnId = 'investigating' | 'mitigating' | 'resolved';
export type Severity = 'critical' | 'warning' | 'minor';

export interface IncidentCard {
  id: string;
  title: string;
  description: string;
  severity: Severity;
}

export const COLUMNS: { id: ColumnId; label: string; dot: 'warning' | 'info' | 'success' }[] = [
  { id: 'investigating', label: 'Investigating', dot: 'warning' },
  { id: 'mitigating', label: 'Mitigating', dot: 'info' },
  { id: 'resolved', label: 'Resolved', dot: 'success' },
];

export const SEVERITY_ACCENT: Record<Severity, 'danger' | 'warning' | 'info'> = {
  critical: 'danger',
  warning: 'warning',
  minor: 'info',
};

export function nextColumn(current: ColumnId): ColumnId | null {
  const idx = COLUMNS.findIndex((c) => c.id === current);
  return idx < COLUMNS.length - 1 ? COLUMNS[idx + 1].id : null;
}
