'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Box, Text } from '@/components';
import { Poppins } from 'next/font/google';
import { Growth } from '@/public/icons/growth';
import { PieChartBG } from '@/public/icons/piechart-bg';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

interface CardProps {
  winRate: number;
  growth: number;
}

const OrderChart: React.FC<CardProps> = ({ winRate, growth }) => {
  const data = {
    labels: ['Green Part', 'Transparent Part'],
    datasets: [
      {
        label: '# of Votes',
        data: [winRate, 100 - winRate],
        backgroundColor: ['#3498db', 'transparent'],
        borderWidth: 0,
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

  return (
    <Box className={`${poppins.className} w-full`}>
      <Box className="w-full px-10 py-8 bg-white rounded-2xl flex justify-between items-center">
        <Box className="flex flex-col justify-center items-start text-left space-y-2">
          <Text className="text-[#757B7B] font-semibold text-lg">Winrate</Text>
          <Box className="items-center space-x-16">
            <Text className="text-[#1B1D5C] font-semibold text-xl">
              {winRate}%
            </Text>
            <Box className="space-x-1 items-center justify-center">
              <Growth />
              <Text className="text-[#5DAAEE] font-semibold text-xs">
                {growth}%
              </Text>
            </Box>
          </Box>
        </Box>
        <Box className="relative w-20 h-20">
          <Box className="absolute w-20 h-20 z-0">
            <PieChartBG width={80} height={80} />
          </Box>
          <Box className="z-10">
            <Pie data={data} options={options} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderChart;
