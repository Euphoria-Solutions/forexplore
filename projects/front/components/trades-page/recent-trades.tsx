import { Box, Text } from '..';
import { DragItem, Trade, RecentTrade } from '.';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { notifUpdater } from '@/helper';
import { useMutation } from '@apollo/client';
import { LINK_TRADE_TO_PLAN, UNLINK_PLAN_FROM_TRADE } from '@/graphql';

type RecentTradesType = {
  data: Trade[];
  searchValue?: string;
  refetch: () => void;
};

export const RecentTrades: React.FC<RecentTradesType> = ({
  data: curData,
  searchValue,
  refetch,
}) => {
  const [data, setData] = useState(curData);
  const [LinkPlanToTrade] = useMutation(LINK_TRADE_TO_PLAN);
  const [UnLinkPlanToTrade] = useMutation(UNLINK_PLAN_FROM_TRADE);

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

  const handleDrop = async (item: DragItem, index: string) => {
    const notifId = toast.loading('Loading ...');
    try {
      await LinkPlanToTrade({
        variables: {
          tradeId: index,
          planId: item.data._id,
        },
      });
      refetch();
      await notifUpdater(notifId, 'Updated Successfully', 'success');
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
    }
  };
  const removePlan = async (data: Trade) => {
    const notifId = toast.loading('Loading ...');
    try {
      await UnLinkPlanToTrade({
        variables: {
          tradeId: data._id,
          planId: data.plan && data.plan._id,
        },
      });
      refetch();
      await notifUpdater(notifId, 'Updated Successfully', 'success');
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
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
            removePlan={removePlan}
            onDrop={handleDrop}
            key={i}
            data={e}
          />
        ))}
      </Box>
    </Box>
  );
};
