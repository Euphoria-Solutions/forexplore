'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Box, Text } from '@/components';
import { Poppins } from 'next/font/google';
import { Growth } from '@/public/graph/growth';
import { useQuery } from '@apollo/client';
import { GET_BALANCE_ANALYSIS_QUERY } from '@/graphql';
import { AuthContext } from '@/providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface StraightLineDiagramProps {
  options?: ChartOptions<'line'>;
}

interface StatisticType {
  month: string;
  balance: number;
}

interface DataType {
  balance: number;
  growth: number;
  statistics: StatisticType[];
}

const StraightLineDiagram: React.FC<StraightLineDiagramProps> = ({
  options,
}) => {
  const { forexAccount } = useContext(AuthContext);
  const { data: dataRaw, loading } = useQuery(GET_BALANCE_ANALYSIS_QUERY, {
    variables: {
      forexAccount: forexAccount._id,
    },
  });
  const [balanceAnalysisData, setBalanceAnalysisData] =
    useState<DataType | null>(null);

  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
      },
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
    ...(options as object),
  };

  const data = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        data: [
          0,
          ...(balanceAnalysisData?.statistics.map(
            statistic => statistic.balance
          ) || []),
        ],
        borderColor: '#00DF16',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  useEffect(() => {
    if (!loading && dataRaw) {
      setBalanceAnalysisData(dataRaw.getBalanceAnalysis);
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
      <Box className="w-[30vw] h-[16vh] pl-10 pr-16 bg-white rounded-md items-center justify-between">
        <Box className="flex-col w-full space-y-2">
          <Text className="text-[#757B7B] font-semibold text-lg">Balance</Text>
          <Box className="flex-row items-center space-x-3">
            <Text className="text-[#1B1D5C] font-semibold text-xl">
              ${balanceAnalysisData?.balance}
            </Text>
            <Box className="space-x-1 items-center justify-center">
              <Growth></Growth>
              <Text className="text-[#00DF16] font-semibold text-sm">
                {balanceAnalysisData?.growth}%
              </Text>
            </Box>
          </Box>
        </Box>
        <Box className="h-16 w-max items-center justify-center flex-col">
          <Line data={data} options={defaultOptions} />
        </Box>
      </Box>
    </Box>
  );
};

export default StraightLineDiagram;
