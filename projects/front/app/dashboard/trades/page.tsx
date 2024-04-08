'use client';
import { Box, Text } from '@/components';
import update from 'immutability-helper';
import {
  AddPlanModal,
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
import React, { useCallback, useEffect, useState } from 'react';
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
  const [filteredData, setFilteredData] = useState<TradePlan[]>([]);
  const [visibleNumber, setVisibleNumber] = useState(0);
  const [addModalVisible, setAddModalVisible] = useState(false);

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

  useEffect(() => {
    setVisibleNumber(0);
    if (tradePlansData) {
      if (searchValue) {
        const handleAddfilteredData = () => {
          setVisibleNumber(prev => prev + 1);
          return true;
        };
        const curSearch = searchValue.toLowerCase();
        setFilteredData(
          tradePlansData.map(data => {
            return {
              ...data,
              plans: data.plans.filter(e => {
                if (
                  new Date(e.time)
                    ?.toLocaleDateString()
                    ?.toLowerCase()
                    .includes(curSearch)
                )
                  return handleAddfilteredData();
                if (e.type.toLowerCase().includes(curSearch))
                  return handleAddfilteredData();
                if (e.symbol.toLowerCase().includes(curSearch))
                  return handleAddfilteredData();
                return false;
              }),
            };
          })
        );
      } else {
        setVisibleNumber(1);
        setFilteredData(tradePlansData);
      }
    }
  }, [tradePlansData, searchValue]);

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
  const addTradingPlan = (name: string) => {
    setTradePlansData([
      ...tradePlansData,
      {
        _id: tradePlansData.length.toString(),
        title: name ? name : 'New Trading Plan',
        plans: [],
        index: tradePlansData.length,
      },
    ]);
  };
  const moveTradingPlan = useCallback((index: number, hoverIndex: number) => {
    setFilteredData((prev: TradePlan[]) =>
      update(prev, {
        $splice: [
          [index, 1],
          [hoverIndex, 0, prev[index] as TradePlan],
        ],
      })
    );
    return;
  }, []);
  const renderTradingPlan = useCallback(
    (index: number, tradePlan: TradePlan) => {
      return (
        <TradingPlan
          index={index}
          key={index}
          data={tradePlan.plans}
          tradePlan={tradePlan}
          setData={setTradePlansData}
          setDeleteIndex={setDeleteIndex}
          setVisible={setVisible}
          searchValue={searchValue}
          setTradingPlansData={setTradePlansData}
          moveTradingPlan={moveTradingPlan}
        />
      );
    },
    [moveTradingPlan, searchValue]
  );

  if (loading) {
    return (
      <Box>
        <Text>Loading ...</Text>
      </Box>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="w-screen py-7 min-h-screen h-fit bg-bg flex flex-col gap-6">
        <DeleteModal
          onDelete={onDelete}
          setVisible={setVisible}
          visible={visible}
        />
        <AddPlanModal
          onCreate={addTradingPlan}
          visible={addModalVisible}
          setVisible={setAddModalVisible}
        />
        <SearchInput
          placeholder="Search"
          value={searchValue}
          setValue={setSearchValue}
          rightElement={
            <button
              onClick={() => setAddModalVisible(true)}
              className="bg-dark text-white flex-shrink-0 font-medium rounded-full p-2 px-6 flex gap-1"
            >
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
        {visibleNumber ? (
          filteredData.map((tradePlan: TradePlan, indx: number) =>
            renderTradingPlan(indx, tradePlan)
          )
        ) : (
          <Text className="bg-white p-6 w-full text-center rounded-lg font-bold">
            No Plan Data
          </Text>
        )}
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
