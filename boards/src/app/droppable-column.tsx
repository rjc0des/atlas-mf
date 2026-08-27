import { useDroppable } from '@dnd-kit/core';
import { StatusDot } from '@atlas-mf/shared-ui';
import { DraggableCard } from './draggable-card';
import type { COLUMNS, IncidentCard } from './types';

export function DroppableColumn({
  column,
  cards,
  onAdvance,
}: {
  column: (typeof COLUMNS)[number];
  cards: IncidentCard[];
  onAdvance: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-0 rounded-sm border-2 border-border bg-surface p-sm ${
        isOver ? 'border-primary' : ''
      }`}
    >
      <div className="flex items-center gap-xs mb-sm px-xs">
        <StatusDot tone={column.dot} />
        <h2 className="text-sm font-bold uppercase tracking-wide text-text">{column.label}</h2>
        <span className="ml-auto font-mono text-xs text-text-muted">{cards.length}</span>
      </div>
      {cards.map((card) => (
        <DraggableCard
          key={card.id}
          card={card}
          column={column.id}
          onAdvance={() => onAdvance(card.id)}
        />
      ))}
    </div>
  );
}
