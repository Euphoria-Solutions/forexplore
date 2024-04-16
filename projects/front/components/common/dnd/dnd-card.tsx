'use client';

import React, { ReactNode, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Box } from '../..';

export const ItemTypes = {
  CARD: 'card',
};

interface CardProps {
  id: number;
  component: ReactNode;
  columnId: number;
  moveCard: (
    _dragColumnId: number,
    _hoverColumnId: number,
    _dragId: number,
    _hoverId: number | null
  ) => void;
}

export const DNDCard: React.FC<CardProps> = ({ id, component, columnId }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, columnId },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <Box ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {component}
    </Box>
  );
};
