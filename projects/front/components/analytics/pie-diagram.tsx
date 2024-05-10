'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Box, Text } from '@/components';
import { PieBg } from '@/public/graph/pie-bg';
import { Poppins } from 'next/font/google';
import { Growth } from '@/public/graph/growth';
import { useQuery } from '@apollo/client';
import { GET_WINRATE_ANALYSIS_QUERY } from '@/graphql';
import { AuthContext } from '@/providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

interface DataType {
  winRate: number;
  growth: number;
}

const PieDiagram: React.FC = () => {
  const { forexAccount } = useContext(AuthContext);
  const { data: dataRaw, loading } = useQuery(GET_WINRATE_ANALYSIS_QUERY, {
    variables: {
      forexAccount: forexAccount._id,
    },
  });
  const [winrateAnalysisData, setWinrateAnalysisData] =
    useState<DataType | null>(null);

  const data = {
    labels: ['Green Part', 'Transparent Part'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          winrateAnalysisData?.winRate ?? 0,
          100 - (winrateAnalysisData?.winRate ?? 0),
        ],
        backgroundColor: ['rgba(0, 223, 22, 1)', 'rgba(0, 0, 0, 0)'],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    rotation: -110 * Math.PI,
    borderWidth: 0,
  };

  useEffect(() => {
    if (!loading && dataRaw) {
      setWinrateAnalysisData(dataRaw.getWinRateAnalysis);
    }
  }, [loading, dataRaw]);

  if (loading) {
    return (
      <Box className="w-full h-full items-center justify-center">
        <Text className="text-xl font-bold">Loading ... </Text>
      </Box>
    );
  }

  return (
    <Box className={poppins.className}>
      <Box className="w-[30vw] h-[16vh] bg-white rounded-md pl-12 pr-28 flex justify-between items-center">
        <Box className="flex flex-col justify-center items-start text-left space-y-2">
          <Text className="text-[#757B7B] font-semibold text-lg">Winrate</Text>
          <Box className="items-center space-x-16">
            <Text className="text-[#1B1D5C] font-semibold text-xl">
              {winrateAnalysisData?.winRate}%
            </Text>
            <Box className="space-x-1 items-center justify-center">
              <Growth></Growth>
              <Text className="text-[#00DF16] font-semibold text-xs">
                {winrateAnalysisData?.growth}%
              </Text>
            </Box>
          </Box>
        </Box>
        <Box className="relative w-20 h-20">
          {' '}
          <Box className="absolute top-0 left-0 w-20 h-20">
            <PieBg></PieBg>
          </Box>
          <Box className="absolute top-0 left-0 w-20 h-20">
            <Pie data={data} options={options} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PieDiagram;
