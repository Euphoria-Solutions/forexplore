'use client';
import { Box, Text } from '@/components';
import {
  DeleteModal,
  DragItem,
  RecentTrades,
  SearchInput,
  TradingPlan,
  recentTradeData,
  tempData,
} from '@/components/trades-page';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Page = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(tempData);
  const [recentData, setRecentData] = useState(recentTradeData);
  const [editable, setEditable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current) {
        if (!ref.current.contains(event.target as Node)) {
          console.log('what');
          setEditable(false);
        } else {
          console.log('true');
          setEditable(true);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setEditable]);

  const addData = () => {
    const temp = [...data];
    temp.push({
      date: new Date(),
      symbol: '',
      purchase: 'sell',
      lots: 0,
      entryPrice: 0,
      stopLoss: 0,
      targetProfit: 0,
    });
    return setData(temp);
  };
  const handleDrop = (item: DragItem, index: number) => {
    setRecentData(
      recentData.map((e, i) => {
        if (i == index) {
          e.plans = item.data;
        }
        return e;
      })
    );
    setData(prev => prev.filter((_e, i) => item.id != i));
    return undefined;
  };
  const handleSave = () => {
    setEditable(false);
  };
  const onDelete = () => {
    if (deleteIndex != -1) {
      setData(data.filter((e, i) => i != deleteIndex));
    }
    setVisible(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="w-screen py-7 bg-bg flex flex-col gap-6">
        <DeleteModal
          onDelete={onDelete}
          setVisible={setVisible}
          visible={visible}
        />
        <SearchInput />
        <Box className="bg-white flex flex-col gap-10 rounded-lg w-full p-6">
          <Box className="flex justify-between items-center">
            <Text className="font-medium text-xl">Trading plan 1</Text>
            <button className="bg-dark p-3 rounded-lg">
              <Image
                src="/icons/category.svg"
                alt="category icon"
                height={20}
                width={20}
              />
            </button>
          </Box>
          <Box className="w-full flex flex-col">
            <Box
              block
              className="grid grid-cols-7 gap-2 w-full text-sm bg-bg p-4"
            >
              <Text>Time</Text>
              <Text>Symbol</Text>
              <Text>Buy/Sell</Text>
              <Text>Lots</Text>
              <Text>Entry Price</Text>
              <Text>Stop loss</Text>
              <Text>Target Profit</Text>
            </Box>
            <Box className="flex-col w-full" ref={ref}>
              {data?.map((e, i) => (
                <TradingPlan
                  setDeleteIndex={setDeleteIndex}
                  openDelete={setVisible}
                  setEditable={setEditable}
                  editable={editable}
                  setData={setData}
                  id={i}
                  key={i}
                  data={e}
                />
              ))}
            </Box>
            <Box className="py-3 justify-center gap-6">
              <button
                onClick={handleSave}
                className="bg-dark rounded-md p-2 active:brightness-150 transition-all"
              >
                <Image
                  src="/icons/save.svg"
                  height={12.5}
                  width={12.5}
                  alt="save icon"
                />
              </button>
              <button
                onClick={addData}
                className="bg-dark rounded-md p-1  active:brightness-150 transition-all"
              >
                <Image
                  src="/icons/add.svg"
                  height={20}
                  width={20}
                  alt="add icon"
                />
              </button>
            </Box>
            <Box className="h-px w-full bg-bg" />
          </Box>
        </Box>
        <Box className="bg-white flex flex-col gap-10 rounded-lg w-full p-6">
          <Box className="flex items-center">
            <Text className="font-medium text-xl">Recent Trades</Text>
          </Box>
          <Box className="w-full flex flex-col">
            <Box
              block
              className="grid grid-cols-7 gap-2 w-full text-sm  text-gray bg-bg p-4"
            >
              <Text>Date/Time</Text>
              <Text>Symbol</Text>
              <Text>Market Execution</Text>
              <Text>Lots</Text>
              <Text>Planned</Text>
              <Text>Risk</Text>
              <Text>Profit</Text>
            </Box>
            {recentData.map((e, i) => (
              <RecentTrades id={i} onDrop={handleDrop} key={i} data={e} />
            ))}
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default Page;
