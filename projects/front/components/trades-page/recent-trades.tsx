import { Box, Text } from '..';
import { DragItem, Trade, RecentTrade, TradePlan, PlanType } from '.';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type RecentTradesType = {
  data: Trade[];
  setData: Dispatch<SetStateAction<Trade[]>>;
  setTradePlansData: Dispatch<SetStateAction<TradePlan[]>>;
  searchValue?: string;
};

export const RecentTrades: React.FC<RecentTradesType> = ({
  data: curData,
  setData: setCurData,
  setTradePlansData,
  searchValue,
}) => {
  const [data, setData] = useState(curData);

  useEffect(() => {
    if (curData) {
      if (searchValue) {
        const curSearch = searchValue.toLowerCase();
        setData(
          curData.filter(e => {
            if (
              new Date(e.closeTime)
                .toLocaleDateString()
                .toLowerCase()
                .includes(curSearch)
            )
              return true;
            if (e.type.toLowerCase().includes(curSearch)) return true;
            if (e.symbol.toLowerCase().includes(curSearch)) return true;
            return false;
          })
        );
      } else {
        setData(curData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curData, searchValue]);

  const handleDrop = (item: DragItem, index: number) => {
    setCurData(
      curData.map((e, i) => {
        if (i == index) {
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
    setData(prev => prev.filter((_e, i) => item.id != i));
    return undefined;
  };
  const removePlan = (
    id: string | undefined,
    index: number,
    data: PlanType | null
  ) => {
    if (data) {
      setCurData(
        curData.map((e, i) => {
          if (i == index) {
            return {
              ...e,
              plan: null,
            };
          }
          return e;
        })
      );
      if (id) {
        setTradePlansData(prev =>
          prev.map(tradePlan => {
            if (tradePlan._id == id) {
              return {
                ...tradePlan,
                plans: [...tradePlan.plans, data],
              };
            }
            return tradePlan;
          })
        );
      }
    }
  };

  if (data.length == 0 && (curData.length != 0 || searchValue)) {
    return (
      <Text className="bg-white p-6 w-full text-center rounded-lg font-bold">
        No Trades Data
      </Text>
    );
  }

  return (
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
        {data.map((e, i) => (
          <RecentTrade
            removePlan={id => removePlan(id, i, e.plan)}
            id={i}
            onDrop={handleDrop}
            key={i}
            data={e}
          />
        ))}
      </Box>
    </Box>
  );
};
