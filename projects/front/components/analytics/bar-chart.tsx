'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Box, Text } from '@/components';
import { Inter } from 'next/font/google';
import { useQuery } from '@apollo/client';
import { GET_TOTAL_TRADES_ANALYSIS_QUERY } from '@/graphql';
import { getWeekRange } from '@/helper';
import { AuthContext } from '@/providers';

interface StatisticType {
  month: string;
  trades: number;
  week: string | null;
}

interface DataType {
  statistics: StatisticType[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const options: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
        drawTicks: false,
      },
      ticks: {
        color: '#615E83',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'transparent',
        drawTicks: false,
      },
      ticks: {
        color: '#615E83',
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: tooltipItem => {
          let label = tooltipItem.dataset.label || '';
          if (label) {
            label += ': ';
          }
          label += tooltipItem.parsed.y;
          return tooltipItem.datasetIndex === 1 ? label : '';
        },
      },
    },
  },
};

const BarChartComponent: React.FC = () => {
  const { forexAccount } = useContext(AuthContext);
  const {
    data: dataRaw,
    loading,
    refetch,
  } = useQuery(GET_TOTAL_TRADES_ANALYSIS_QUERY, {
    variables: {
      forexAccount: forexAccount._id,
    },
  });
  const [totalTradeAnalysisData, setTotalTradesAnalysisData] =
    useState<DataType | null>(null);
  const [type, setType] = useState('annual');

  useEffect(() => {
    if (!loading && dataRaw) {
      setTotalTradesAnalysisData(dataRaw.getTotalTradesAnalysis);
    }
  }, [loading, dataRaw]);

  useEffect(() => {
    if (type == 'quarter') {
      refetch({ forexAccount: forexAccount._id, type: 'quarter' });
    }
    if (type == 'annual') {
      refetch({ forexAccount: forexAccount._id, type: null });
    }
  }, [type, refetch]);

  const data: ChartData<'bar'> = {
    labels:
      type == 'quarter'
        ? totalTradeAnalysisData?.statistics.map(stat =>
            getWeekRange(stat.month, Number(stat.week))
          )
        : totalTradeAnalysisData?.statistics.map(stat => stat.month),
    datasets: [
      {
        label: 'Background',
        data: Array(12).fill(50),
        backgroundColor: '#E5E5EF',
        order: 2,
        barPercentage: 0.25,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
          bottomLeft: 5,
          bottomRight: 5,
        },
      },
      {
        label: 'Trades',
        data: totalTradeAnalysisData?.statistics.map(stat => stat.trades) || [],
        backgroundColor: '#00DF16',
        order: 1,
        barPercentage: 0.25,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
          bottomLeft: 5,
          bottomRight: 5,
        },
      },
    ],
  };

  if (loading) {
    return (
      <Box className="w-full h-full items-center justify-center">
        <Text className="text-xl font-bold">Loading ... </Text>
      </Box>
    );
  }

  return (
    <Box className={inter.className}>
      <Box className="w-[54vw] bg-white rounded-xl px-6 py-8 flex-col">
        <Box className="flex-row justify-between pb-5">
          <Box className="flex-col">
            <Text className="text-[#9291A5]">Activity</Text>
            <Text className="font-bold text-xl text-[#1E1B39]">
              Total Trades
            </Text>
          </Box>
          <Box className="flex-row w-max h-max rounded-xl bg-[#F8F8FF] px-4 py-2 items-center space-x-4">
            <Box
              onClick={() => setType('quarter')}
              className={`w-20 h-10 items-center justify-center ${type == 'quarter' ? 'bg-black rounded-xl text-white' : 'text-[#9291A5]'} font-medium`}
            >
              Quarter
            </Box>
            <Box
              onClick={() => setType('annual')}
              className={`w-20 h-10 items-center justify-center ${type == 'annual' ? 'bg-black rounded-xl text-white' : 'text-[#9291A5]'} font-medium`}
            >
              Annual
            </Box>
          </Box>
        </Box>
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default BarChartComponent;
