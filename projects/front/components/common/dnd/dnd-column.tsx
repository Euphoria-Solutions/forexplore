'use client';

import React, { ReactNode, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '../..';
import { DNDCard, ItemTypes } from '.';

interface CardData {
  id: number;
  component: ReactNode;
}

interface ColumnProps {
  id: number;
  cards: CardData[];
  moveCard: (
    _dragColumnId: number,
    _hoverColumnId: number,
    _dragId: number,
    _hoverId: number | null
  ) => void;
}

export const DNDColumn: React.FC<ColumnProps> = ({ id, cards, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (item: { id: number; columnId: number }, monitor) => {
        if (!monitor.didDrop()) {
          moveCard(item.columnId, id, item.id, null);
        }
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [moveCard, id]
  );
  drop(ref);
  return (
    <Box ref={ref} className="flex-1 flex-col w-full space-y-8">
      {cards.map(card => (
        <DNDCard
          key={card.id}
          id={card.id}
          component={card.component}
          columnId={id}
          moveCard={moveCard}
        />
      ))}
    </Box>
  );
};
