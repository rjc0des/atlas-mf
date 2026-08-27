import { useDraggable } from '@dnd-kit/core';
import { Card, StatusDot } from '@atlas-mf/shared-ui';
import {
  COLUMNS,
  SEVERITY_ACCENT,
  nextColumn,
  type ColumnId,
  type IncidentCard,
} from './types';

export function DraggableCard({
  card,
  column,
  onAdvance,
}: {
  card: IncidentCard;
  column: ColumnId;
  onAdvance: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
    });
  const columnMeta = COLUMNS.find((c) => c.id === column)!;
  const upNext = nextColumn(column);

  return (
    <Card
      ref={setNodeRef}
      accent={SEVERITY_ACCENT[card.severity]}
      className={`p-sm mb-sm cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-40' : ''}`}
      style={
        transform
          ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
              zIndex: 10,
              position: 'relative',
            }
          : undefined
      }
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-xs">
        <StatusDot tone={columnMeta.dot} />
        <span className="text-sm font-medium text-text">{card.title}</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wide text-text-muted">
          {card.severity}
        </span>
      </div>
      <p className="mt-xs text-xs text-text-muted">{card.description}</p>
      {upNext && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onAdvance}
          className="mt-sm text-xs text-primary hover:underline cursor-pointer"
        >
          Move to {COLUMNS.find((c) => c.id === upNext)!.label} →
        </button>
      )}
    </Card>
  );
}
