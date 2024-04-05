'use client';
import { Box, Text } from '@/components';
import {
  DeleteModal,
  DragItem,
  RecentTrades,
  SearchInput,
  Trade,
  TradePlan,
  TradingPlan,
} from '@/components/trades-page';
import { GET_TRADE_PLANS_QUERY, GET_TRADES_QUERY } from '@/graphql';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Page = () => {
  const { data: tradePlansDataRaw, loading } = useQuery(GET_TRADE_PLANS_QUERY, {
    variables: {
      forexAccount: '660e3a7ce29aea9a1f48ef03',
    },
  });
  const { data: tradeData } = useQuery(GET_TRADES_QUERY, {
    variables: {
      forexAccount: '660e3a7ce29aea9a1f48ef03',
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  const [recentData, setRecentData] = useState<Trade[]>([]);
  const [tradePlansData, setTradePlansData] = useState<TradePlan[]>([]);
  const [editable, setEditable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current) {
        if (!ref.current.contains(event.target as Node)) {
          setEditable(false);
        } else {
          setEditable(true);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setEditable]);

  useEffect(() => {
    if (!loading && tradePlansDataRaw?.getTradePlans) {
      setTradePlansData(tradePlansDataRaw?.getTradePlans);
    }
  }, [loading, tradePlansDataRaw]);

  useEffect(() => {
    if (tradeData?.getTrades) {
      setRecentData(tradeData?.getTrades);
    }
  }, [tradeData]);

  const addData = (id: string) => {
    const newData = tradePlansData.map(tradePlan => {
      if (tradePlan._id === id) {
        return {
          ...tradePlan,
          plans: [
            {
              time: new Date(),
              symbol: '',
              type: 'sell',
              lot: 0,
              entryPrice: 0,
              stopLoss: 0,
              takeProfit: 0,
            },
            ...tradePlan.plans,
          ],
        };
      }
      return tradePlan;
    });
    setTradePlansData(newData);
  };
  const handleDrop = (item: DragItem, index: number) => {
    setRecentData(
      recentData.map((e, i) => {
        if (i == index) {
          console.log(item.data);
          return {
            ...e,
            plan: item.data,
          };
        }
        return e;
      })
    );
    setTradePlansData(prev =>
      prev.map(tradePlan => ({
        ...tradePlan,
        plans: tradePlan.plans.filter((_plan, i) => item.id != i),
      }))
    );
    return undefined;
  };
  const handleSave = () => {
    setEditable(false);
  };
  const onDelete = () => {
    if (deleteIndex != -1) {
      setTradePlansData(
        tradePlansData.map(tradePlan => ({
          ...tradePlan,
          plans: tradePlan.plans.filter((_e, i) => i != deleteIndex),
        }))
      );
    }
    setVisible(false);
  };

  if (loading) {
    return (
      <Box>
        <Text>Loading ...</Text>
      </Box>
    );
  }

  console.log(recentData);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="w-screen py-7 bg-bg flex flex-col gap-6">
        <DeleteModal
          onDelete={onDelete}
          setVisible={setVisible}
          visible={visible}
        />
        <SearchInput />
        {tradePlansData.map((tradePlan: TradePlan, indx: number) => (
          <Box
            key={indx}
            className="bg-white flex flex-col gap-10 rounded-lg w-full p-6"
          >
            <Box className="flex justify-between items-center">
              <Text className="font-medium text-xl">{tradePlan.title}</Text>
              <Box className="bg-dark p-3 rounded-lg">
                <Image
                  src="/icons/category.svg"
                  alt="category icon"
                  height={20}
                  width={20}
                />
              </Box>
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
                {tradePlan.plans.map((e, i) => (
                  <TradingPlan
                    setDeleteIndex={setDeleteIndex}
                    openDelete={setVisible}
                    setEditable={setEditable}
                    editable={editable}
                    setData={setTradePlansData}
                    tradePlanId={tradePlan._id}
                    id={i}
                    key={i}
                    data={e}
                  />
                ))}
              </Box>
              <Box className="py-3 justify-center gap-6">
                <Box
                  onClick={handleSave}
                  className="bg-dark rounded-md p-2 active:brightness-150 transition-all"
                >
                  <Image
                    src="/icons/save.svg"
                    height={12.5}
                    width={12.5}
                    alt="save icon"
                  />
                </Box>
                <Box
                  onClick={() => addData(tradePlan._id)}
                  className="bg-dark rounded-md p-1  active:brightness-150 transition-all"
                >
                  <Image
                    src="/icons/add.svg"
                    height={20}
                    width={20}
                    alt="add icon"
                  />
                </Box>
              </Box>
              <Box className="h-px w-full bg-bg" />
            </Box>
          </Box>
        ))}
        <Box className="bg-white flex flex-col gap-10 rounded-lg w-full p-6">
          <Box className="flex items-center">
            <Text className="font-medium text-xl">Recent Trades</Text>
          </Box>
          <Box className="w-full flex flex-col">
            <Box
              block
              className="grid grid-cols-6 gap-2 w-full text-sm  text-gray bg-bg p-4"
            >
              <Text>Date/Time</Text>
              <Text>Symbol</Text>
              <Text>Market Execution</Text>
              <Text>Lots</Text>
              <Text>Planned</Text>
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
