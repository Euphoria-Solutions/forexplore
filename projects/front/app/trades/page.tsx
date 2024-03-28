'use client';
import { Box, Text } from '@/components';
import {
  DragItem,
  RecentTrades,
  SearchInput,
  TradingPlan,
  recentTradeData,
  tempData,
} from '@/components/trades-page';
import Image from 'next/image';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Page = () => {
  const [data, setData] = useState(tempData);
  const [recentData, setRecentData] = useState(recentTradeData);

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
          if (e.plans) {
            e.plans = [...e.plans, item.data];
          } else {
            e.plans = [item.data];
          }
        }
        return e;
      })
    );
    setData(prev => prev.filter((_e, i) => item.id != i));
    return undefined;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="w-screen py-7 bg-bg flex flex-col gap-6">
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
              className="grid grid-cols-8 gap-2 w-full text-sm bg-bg py-3 px-5"
            >
              <Text>Time</Text>
              <Text>Symbol</Text>
              <Text>Buy/Sell</Text>
              <Text>Lots</Text>
              <Text>Entry Price</Text>
              <Text>Stop loss</Text>
              <Text>Target Profit</Text>
            </Box>
            {data?.map((e, i) => (
              <TradingPlan setData={setData} id={i} key={i} data={e} />
            ))}
            <Box className="py-3 flex justify-center">
              <button onClick={addData} className="bg-dark rounded-md p-1">
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
              className="grid grid-cols-7 gap-2 w-full text-sm  text-gray bg-bg py-3 px-5"
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
