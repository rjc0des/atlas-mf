import { useEffect, useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { initTheme } from '@atlas-mf/shared-ui';
import { AddCardForm } from './add-card-form';
import { DroppableColumn } from './droppable-column';
import { initialBoard } from './data';
import { COLUMNS, nextColumn, type ColumnId, type IncidentCard, type Severity } from './types';

export function App() {
  useEffect(() => {
    initTheme();
  }, []);
  const [board, setBoard] = useState(initialBoard);

  function findColumn(id: string): ColumnId {
    return (Object.keys(board) as ColumnId[]).find((col) =>
      board[col].some((c) => c.id === id)
    )!;
  }

  function moveCard(id: string, to: ColumnId) {
    setBoard((prev) => {
      const from = findColumn(id);
      if (from === to) return prev;
      const card = prev[from].find((c) => c.id === id)!;
      return {
        ...prev,
        [from]: prev[from].filter((c) => c.id !== id),
        [to]: [...prev[to], card],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    moveCard(String(active.id), over.id as ColumnId);
  }

  function handleAdvance(id: string) {
    const from = findColumn(id);
    const to = nextColumn(from);
    if (to) moveCard(id, to);
  }

  function handleAddCard(fields: { title: string; description: string; severity: Severity }) {
    const card: IncidentCard = { id: `card-${Date.now()}`, ...fields };
    setBoard((prev) => ({ ...prev, investigating: [card, ...prev.investigating] }));
  }

  return (
    <div className="p-md">
      <div className="mb-md">
        <div className="font-mono text-xs uppercase tracking-widest text-pulse">Boards</div>
        <h1 className="text-2xl font-black tracking-tight">Incident triage</h1>
      </div>
      <AddCardForm onAdd={handleAddCard} />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-sm items-start">
          {COLUMNS.map((column) => (
            <DroppableColumn
              key={column.id}
              column={column}
              cards={board[column.id]}
              onAdvance={handleAdvance}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default App;
