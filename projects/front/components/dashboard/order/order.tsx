import { Box } from '@/components/common';
import { OrderCard } from './order-card';
import OrderChart from './order-chart';
import OrderLineChart from './order-line-chart';
import { Arrow } from '@/public/icons/arrow';
import { useQuery } from '@apollo/client';
import { GET_ORDER_ANALYSIS_QUERY } from '@/graphql';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/providers';

const dummyData: OrderTypeAnalysisDataType = {
  bestOrderType: 'Unknown',
  winRate: 0,
  growth: 0,
  statistics: [
    {
      month: 'Unknown',
      long: 0,
      short: 0,
    },
  ],
};

interface OrderTypeAnalysisDataType {
  bestOrderType: string;
  winRate: number;
  growth: number;
  statistics: [
    {
      month: string;
      long: number;
      short: number;
    },
  ];
}

export const OrderAnalysis = () => {
  const { forexAccount } = useContext(AuthContext);
  const [data, setData] = useState<OrderTypeAnalysisDataType>(dummyData);
  const {
    data: dataRaw,
    loading,
    refetch,
  } = useQuery(GET_ORDER_ANALYSIS_QUERY, {
    variables: {
      forexAccount: forexAccount._id,
    },
  });

  useEffect(() => {
    if (!loading && dataRaw) {
      setData(dataRaw.getOrderAnalysis);
    } else {
      setData(dummyData);
    }
  }, [loading, dataRaw]);

  useEffect(() => {
    refetch({
      forexAccount: forexAccount._id,
    });
  }, [forexAccount]);

  if (loading) {
    return <Box>Loading ...</Box>;
  }
  return (
    <Box className="flex-col w-full">
      <OrderCard cardText={data.bestOrderType} />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow />
      </Box>
      <OrderChart winRate={data.winRate} growth={data.growth} />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow />
      </Box>
      <OrderLineChart data={data.statistics} />
    </Box>
  );
};
