'use client';
import { Box, Text } from '@/components';
import {
  DeleteModal,
  RecentTrades,
  SearchInput,
  Trade,
  TradePlan,
  TradingPlan,
} from '@/components/trades-page';
import { GET_TRADE_PLANS_QUERY, GET_TRADES_QUERY } from '@/graphql';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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

  const [recentData, setRecentData] = useState<Trade[]>([]);
  const [tradePlansData, setTradePlansData] = useState<TradePlan[]>([]);
  const [visible, setVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [searchValue, setSearchValue] = useState('');

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

  // const handleDrop = (item: DragItem, index: number) => {
  //   setRecentData(
  //     recentData.map((e, i) => {
  //       if (i == index) {
  //         console.log(item.data);
  //         return {
  //           ...e,
  //           plan: item.data,
  //         };
  //       }
  //       return e;
  //     })
  //   );
  //   setTradePlansData(prev =>
  //     prev.map(tradePlan => ({
  //       ...tradePlan,
  //       plans: tradePlan.plans.filter((_plan, i) => item.id != i),
  //     }))
  //   );
  //   return undefined;
  // };

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
        <SearchInput
          placeholder="Search"
          value={searchValue}
          setValue={setSearchValue}
          rightElement={
            <button className="bg-dark text-white flex-shrink-0 font-medium rounded-full p-2 px-6 flex gap-1">
              <Image
                src="/icons/add.svg"
                height={22}
                width={22}
                alt="add icon"
              />
              New Plan
            </button>
          }
        />
        {tradePlansData.map((tradePlan: TradePlan, indx: number) => (
          <TradingPlan
            key={indx}
            data={tradePlan.plans}
            tradePlan={tradePlan}
            setData={setTradePlansData}
            setDeleteIndex={setDeleteIndex}
            setVisible={setVisible}
            searchValue={searchValue}
            id={indx}
          />
        ))}
        <RecentTrades
          setTradePlansData={setTradePlansData}
          searchValue={searchValue}
          data={recentData}
          setData={setRecentData}
        />
      </Box>
    </DndProvider>
  );
};

export default Page;
