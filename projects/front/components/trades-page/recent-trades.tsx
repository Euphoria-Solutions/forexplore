'use client';
import Image from 'next/image';
import { Box, Text } from '..';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DragItem, RecentDataType } from '.';
import { useDrop } from 'react-dnd';
import { useRef, useState } from 'react';

type RecentComponentType = {
  data: RecentDataType;
  id: number;
  onDrop: (_item: DragItem, _index: number) => undefined;
};
type DropResult = {
  item: DragItem;
};

export const RecentTrades: React.FC<RecentComponentType> = ({
  data,
  onDrop,
  id,
}) => {
  const accordionWidth = Math.round(400 / 7);
  const ref = useRef<HTMLDivElement>(null);
  const [showAccordion, setShowAccordion] = useState(false);
  const [{ isOver }, drop] = useDrop<DragItem, DropResult, { isOver: boolean }>(
    {
      accept: 'item',
      drop: (item: DragItem) => {
        return onDrop(item, id);
      },
      collect: monitor => ({
        isOver: !data.plans ? monitor.isOver() : false,
      }),
      canDrop: () => {
        if (data.plans) {
          return false;
        } else {
          return true;
        }
      },
    }
  );

  drop(ref);

  const returnRiskColor: (_r: number) => string = (risk: number) => {
    if (risk >= 10) return 'bg-light-red';
    if (risk >= 5) return 'bg-light-yellow';
    return 'bg-success';
  };
  const handleAccordion = () => {
    setShowAccordion(prev => !prev);
  };

  const showPlans = () => {
    if (showAccordion && data.plans) {
      return (
        <>
          <Box className="grid grid-cols-7 w-full text-sm p-4 gap-2 relative text-gray">
            <Box className="z-10">Lots</Box>
            <Box className="z-10">Planned entry</Box>
            <Box className="z-10">Stop loss</Box>
            <Box className="z-10">Target profit</Box>
            <Box className={`absolute w-[${accordionWidth}%] h-full bg-bg`} />
          </Box>
          {data.plans && (
            <>
              <Box className="grid grid-cols-7 w-full text-sm p-4 gap-2">
                <Text>{data.plans.lots}</Text>
                <DatePicker
                  className="outline-none w-full bg-transparent"
                  selected={data.plans.date}
                  onChange={() => {}}
                  disabled
                />
                <Text className="text-light-red">{data.plans.stopLoss}</Text>
                <Text className="text-light-green">
                  {data.plans.targetProfit}
                </Text>
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
        className={`grid grid-cols-7 gap-2 w-full bg-white text-black text-sm p-4 ${isOver && 'brightness-90'} transition-all`}
      >
        <Box className="flex items-center">
          <DatePicker
            className="outline-none w-full bg-transparent"
            selected={data.date}
            onChange={() => {}}
            disabled
          />
        </Box>
        <Text>{data.symbol}</Text>
        <Text className="capitalize">{data.purchase}</Text>
        <Text>{data.lots}</Text>
        <Text>
          {typeof data.planned == 'boolean'
            ? data.planned
              ? 'Yes'
              : 'No'
            : 'Null'}
        </Text>
        <Box className="flex items-center gap-1">
          <Box
            className={`${returnRiskColor(data.risk)} h-2 w-2 rounded-full`}
          />
          <Text>{data.risk}%</Text>
        </Box>
        <Box className="flex justify-between">
          <Text
            className={data.profit < 0 ? 'text-light-red' : 'text-light-green'}
          >
            {Math.abs(data.profit)}
          </Text>
          {data.plans && (
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
      {showPlans()}
      <Box className="h-px w-full bg-bg" />
    </>
  );
};
