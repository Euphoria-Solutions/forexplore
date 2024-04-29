import { Box } from '@/components/common';
import { PairAnalysisCard } from './pair-analysis-card';
import { useQuery } from '@apollo/client';
import { AuthContext } from '@/providers';
import { useContext, useEffect, useState } from 'react';
import { GET_PAIR_ANALYSIS_QUERY } from '@/graphql';
import { Arrow } from '@/public/icons/arrow';
import PairAnalysisLineChart from './pair-analysis-line-chart';

const dummyData: PairTypeAnalysisDataType = {
  bestPairs: ['No data available'],
  worstPairs: ['No data available'],
  bestPairsStatistics: [
    {
      month: 'Unknown',
      statistics: [
        {
          pair: 'Null',
          winRate: '0.0',
        },
      ],
    },
  ],
  worstPairsStatistics: [
    {
      month: 'Unknown',
      statistics: [
        {
          pair: 'Null',
          winRate: '0.0',
        },
      ],
    },
  ],
};

interface MonthStatistic {
  pair: string;
  winRate: string;
}

interface MonthlyData {
  month: string;
  statistics: [MonthStatistic];
}
interface PairTypeAnalysisDataType {
  bestPairs: [string] | [];
  worstPairs: [string] | [];
  bestPairsStatistics: [MonthlyData];
  worstPairsStatistics: [MonthlyData];
}

export const PairAnalysis = () => {
  const { forexAccount } = useContext(AuthContext);
  const [data, setData] = useState<PairTypeAnalysisDataType>(dummyData);
  const {
    data: dataRaw,
    loading,
    refetch,
  } = useQuery(GET_PAIR_ANALYSIS_QUERY, {
    variables: {
      forexAccount: forexAccount._id,
    },
  });

  useEffect(() => {
    if (!loading && dataRaw) {
      setData(dataRaw.getPairAnalysis);
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
      <PairAnalysisCard
        bestPairs={data.bestPairs}
        worstPairs={data.worstPairs}
        cardTitle="Best and worst Pairs"
      />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow />
      </Box>
      <PairAnalysisLineChart
        title={'Best pairs'}
        data={data.bestPairsStatistics}
      />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow />
      </Box>
      <PairAnalysisLineChart
        title={'Worst pairs'}
        data={data.worstPairsStatistics}
      />
    </Box>
  );
};
