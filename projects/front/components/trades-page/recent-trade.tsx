'use client';
import Image from 'next/image';
import { Box, Text } from '..';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DragItem, Trade } from '.';
import { useDrop } from 'react-dnd';
import { useRef, useState } from 'react';

type RecentComponentType = {
  data: Trade;
  id: number;
  onDrop: (_item: DragItem, _index: number) => undefined;
};
type DropResult = {
  item: DragItem;
};

export const RecentTrade: React.FC<RecentComponentType> = ({
  data,
  onDrop,
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showAccordion, setShowAccordion] = useState(false);
  const [{ isOver }, drop] = useDrop<DragItem, DropResult, { isOver: boolean }>(
    {
      accept: 'item',
      drop: (item: DragItem) => {
        return onDrop(item, id);
      },
      collect: monitor => ({
        isOver: !data.plan ? monitor.isOver() : false,
      }),
      canDrop: () => {
        if (data.plan) {
          return false;
        } else {
          return true;
        }
      },
    }
  );

  drop(ref);

  const handleAccordion = () => {
    setShowAccordion(prev => !prev);
  };

  const showPlan = () => {
    if (showAccordion && data.plan) {
      return (
        <>
          <Box className="grid grid-cols-7 w-full text-sm p-4 gap-2 relative text-gray">
            <Box className="z-10">Lots</Box>
            <Box className="z-10">Planned entry</Box>
            <Box className="z-10">Stop loss</Box>
            <Box className="z-10">Target profit</Box>
            <Box className={`absolute w-[57%] h-full bg-bg`} />
          </Box>
          {data.plan && (
            <>
              <Box className="grid grid-cols-7 w-full text-sm p-4 gap-2">
                <Text>{data.plan.lot}</Text>
                <DatePicker
                  className="outline-none w-full bg-transparent"
                  selected={data.plan.time}
                  onChange={() => {}}
                  disabled
                />
                <Text className="text-light-red">{data.plan.stopLoss}</Text>
                <Text className="text-light-green">{data.plan.takeProfit}</Text>
              </Box>
            </>
          )}
        </>
      );
    }
  };

  return (
    <>
      <Box
        block
        ref={ref}
        className={`grid grid-cols-6 gap-2 w-full bg-white text-black text-sm p-4 ${isOver && 'brightness-90'} transition-all`}
      >
        <Box className="flex items-center">
          <DatePicker
            className="outline-none w-full bg-transparent"
            selected={new Date(data.closeTime)}
            onChange={() => {}}
            disabled
          />
        </Box>
        <Text>{data.symbol}</Text>
        <Text className="capitalize">{data.type}</Text>
        <Text>{data.volume}</Text>
        <Text>{data.plan ? 'Yes' : 'No'}</Text>
        <Box className="flex justify-between">
          <Text
            className={data.profit < 0 ? 'text-light-red' : 'text-light-green'}
          >
            {Math.abs(data.profit)}
          </Text>
          {data.plan && (
            <button
              className={`${showAccordion && 'rotate-180'} transition-all`}
              onClick={handleAccordion}
            >
              <Image
                src="/icons/down-arrow.svg"
                height={24}
                width={24}
                alt="down arrow icon"
              />
            </button>
          )}
        </Box>
      </Box>
      {showPlan()}
      <Box className="h-px w-full bg-bg" />
    </>
  );
};
