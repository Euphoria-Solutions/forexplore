import { Box } from '@/components/common';
import { OrderCard } from './order-card';
import OrderChart from './order-chart';
import OrderLineChart from './order-line-chart';
import { Arrow } from '@/public/icons/arrow';
import { useQuery } from '@apollo/client';
import { GET_ORDER_ANALYSIS_QUERY } from '@/graphql';

export const OrderAnalysis = () => {
  const { data: dataRaw, loading } = useQuery(GET_ORDER_ANALYSIS_QUERY, {
    variables: {
      forexAccount: '66218e158029f98d4155d3d5',
    },
  });
  if (loading) {
    return <Box>Loading ...</Box>;
  }
  return (
    <Box className="flex-col w-full">
      <OrderCard cardText={dataRaw.getOrderAnalysis.bestOrderType} />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow />
      </Box>
      <OrderChart
        winRate={dataRaw.getOrderAnalysis.winRate}
        growth={dataRaw.getOrderAnalysis.growth}
      />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow />
      </Box>
      <OrderLineChart data={dataRaw.getOrderAnalysis.statistics} />
    </Box>
  );
};
