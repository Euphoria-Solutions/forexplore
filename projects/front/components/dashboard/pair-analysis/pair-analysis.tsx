import { Box } from '@/components/common';
import { PairAnalysisCard } from './pair-analysis-card';
import PairAnalysisLineChart from './pair-analysis-line-chart';
import { Arrow } from '@/public/icons/arrow';
import { useQuery } from '@apollo/client';
import { GET_PAIR_ANALYSIS_QUERY } from '@/graphql';

export const PairAnalysis = () => {
  const { data: dataRaw, loading } = useQuery(GET_PAIR_ANALYSIS_QUERY, {
    variables: {
      forexAccount: '660e3a7ce29aea9a1f48ef03',
    },
  });
  if (loading) {
    return <Box>Loading ...</Box>;
  }
  return (
    <Box className="flex-col w-full">
      <PairAnalysisCard
        bestPairs={dataRaw.getPairAnalysis.bestPairs}
        worstPairs={dataRaw.getPairAnalysis.worstPairs}
        cardTitle="Best and worst Pairs"
      />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow />
      </Box>
      <PairAnalysisLineChart
        title={'Best pairs'}
        data={dataRaw.getPairAnalysis.bestPairsStatistics}
      />
      <Box className="justify-end -mr-2 -my-1.5">
        <Arrow />
      </Box>
      <PairAnalysisLineChart
        title={'Worst pairs'}
        data={dataRaw.getPairAnalysis.worstPairsStatistics}
      />
    </Box>
  );
};
