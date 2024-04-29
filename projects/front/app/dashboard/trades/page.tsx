'use client';
import { Box, Text } from '@/components';
import update from 'immutability-helper';
import {
  AddPlanModal,
  DeleteModal,
  PlanType,
  RecentTrades,
  SearchInput,
  Trade,
  TradePlan,
  TradingPlan,
} from '@/components/trades-page';
import {
  CHANGE_TRADING_PLAN_ORDERS_MUTATION,
  CREATE_TRADING_PLAN_MUTATION,
  GET_TRADE_PLANS_QUERY,
  GET_TRADES_QUERY,
} from '@/graphql';
import { useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';
import { notifUpdater } from '@/helper';
import useScrollOnDrag from '@/components/trades-page/use-scroll';
import { AuthContext } from '@/providers';

const Page = () => {
  const { forexAccount } = useContext(AuthContext);
  const {
    data: tradePlansDataRaw,
    loading,
    refetch: refetchTradePlansData,
  } = useQuery(GET_TRADE_PLANS_QUERY, {
    variables: {
      forexAccount: forexAccount._id,
    },
  });

  const { data: tradeData, refetch: refetchTradesData } = useQuery(
    GET_TRADES_QUERY,
    {
      variables: {
        forexAccount: forexAccount._id,
      },
    }
  );

  const [CreateTradingPlan] = useMutation(CREATE_TRADING_PLAN_MUTATION);
  const [ChangeTradingPlansOrder] = useMutation(
    CHANGE_TRADING_PLAN_ORDERS_MUTATION
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [recentData, setRecentData] = useState<Trade[]>([]);
  const [tradePlansData, setTradePlansData] = useState<TradePlan[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState<TradePlan[]>([]);
  const [visibleNumber, setVisibleNumber] = useState(0);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  useEffect(() => {
    if (!loading && tradePlansDataRaw?.getTradePlans) {
      setTradePlansData(
        tradePlansDataRaw?.getTradePlans.map((tradePlan: TradePlan) => ({
          ...tradePlan,
          plans: tradePlan.plans.filter(
            (plan: PlanType) => !plan.linkedToTrade
          ),
        }))
      );
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

  useEffect(() => {
    changeTradingPlansOrder();
  }, [filteredData]);

  const refetchData = () => {
    refetchTradePlansData({ forexAccount: forexAccount._id });
    refetchTradesData({ forexAccount: forexAccount._id });
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
  const addTradingPlan = async (name: string) => {
    const notifId = toast.loading('Loading ...');
    try {
      await CreateTradingPlan({
        variables: {
          forexAccount: forexAccount._id,
          title: name,
          order: tradePlansData.length + 1,
        },
      });
      refetchData();

      await notifUpdater(notifId, 'Updated Successfully', 'success');
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
    }
  };
  const moveTradingPlan = useCallback(
    (index: number, hoverIndex: number) => {
      setFilteredData((prev: TradePlan[]) =>
        update(prev, {
          $splice: [
            [index, 1],
            [hoverIndex, 0, prev[index] as TradePlan],
          ],
        })
      );
    },
    [tradePlansData]
  );
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
          moveTradingPlan={moveTradingPlan}
          refetchData={() => {
            refetchTradePlansData({ forexAccount: forexAccount._id });
            refetchTradesData({ forexAccount: forexAccount._id });
          }}
        />
      );
    },
    [moveTradingPlan, searchValue]
  );
  const changeTradingPlansOrder = async () => {
    await ChangeTradingPlansOrder({
      variables: {
        orders: filteredData.map((order: { _id: string }) => order._id),
      },
    });
    refetchData();
  };

  useScrollOnDrag(containerRef, { sensitivity: 50, speed: 5 });

  if (loading) {
    return (
      <Box>
        <Text>Loading ...</Text>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      className="w-full py-7 h-screen overflow-scroll bg-bg flex flex-col gap-6"
    >
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
            <Image src="/icons/add.svg" height={22} width={22} alt="add icon" />
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
        searchValue={searchValue}
        data={recentData}
        refetch={refetchData}
      />
    </Box>
  );
};

const Render = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Page />
    </DndProvider>
  );
};

export default Render;
