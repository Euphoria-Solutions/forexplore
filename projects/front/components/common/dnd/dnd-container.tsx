'use client';

import React, { ReactNode, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box } from '../..';
import { DNDColumn } from '.';
import { SessionAnalysis } from '@/components/dashboard/session/session-analysis';
import { OrderAnalysis } from '@/components/dashboard/order/order';
import { PairAnalysis } from '@/components/dashboard';

interface CardData {
  id: number;
  component: ReactNode;
}

interface ColumnData {
  id: number;
  cards: CardData[];
}

const initialColumns: ColumnData[] = [
  {
    id: 1,
    cards: [
      {
        id: 4,
        component: <SessionAnalysis />,
      },
    ],
  },
  {
    id: 2,
    cards: [
      {
        id: 5,
        component: <OrderAnalysis />,
      },
    ],
  },
  {
    id: 3,
    cards: [
      {
        id: 6,
        component: <PairAnalysis />,
      },
    ],
  },
];

const Container: React.FC = () => {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);

  const moveCard = (
    dragColumnId: number,
    hoverColumnId: number,
    dragId: number,
    hoverId: number | null
  ) => {
    setColumns(prevColumns => {
      const newColumns = prevColumns.map(col => ({
        ...col,
        cards: col.cards.map(card => ({ ...card })),
      }));

      const fromColumnIndex = newColumns.findIndex(
        col => col.id === dragColumnId
      );
      const toColumnIndex = newColumns.findIndex(
        col => col.id === hoverColumnId
      );
      const dragCardIndex = newColumns[fromColumnIndex].cards.findIndex(
        card => card.id === dragId
      );

      const cardBeingDragged = {
        ...newColumns[fromColumnIndex].cards[dragCardIndex],
      };

      newColumns[fromColumnIndex].cards.splice(dragCardIndex, 1);

      if (hoverId === null || newColumns[toColumnIndex].cards.length === 0) {
        newColumns[toColumnIndex].cards.push(cardBeingDragged);
      } else {
        const hoverCardIndex = newColumns[toColumnIndex].cards.findIndex(
          card => card.id === hoverId
        );
        newColumns[toColumnIndex].cards.splice(
          hoverCardIndex,
          0,
          cardBeingDragged
        );
      }

      return newColumns;
    });
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="flex flex-row justify-center space-x-8 w-full h-full">
        {columns.map(column => (
          <DNDColumn
            key={column.id}
            id={column.id}
            cards={column.cards}
            moveCard={moveCard}
          />
        ))}
      </Box>
    </DndProvider>
  );
};

export default Container;
