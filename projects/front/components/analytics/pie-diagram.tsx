'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Box, Text } from '@/components';
import { PieBg } from '@/public/graph/pie-bg';
import { Poppins } from 'next/font/google';
import { Growth } from '@/public/graph/growth';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

interface PieDiagramProps {
  number: number;
}

const PieDiagram: React.FC<PieDiagramProps> = ({ number }) => {
  const data = {
    labels: ['Green Part', 'Transparent Part'],
    datasets: [
      {
        label: '# of Votes',
        data: [number, 100 - number],
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

  return (
    <Box className={poppins.className}>
      <Box className="w-[30vw] h-[16vh] bg-white rounded-md pl-12 pr-28 flex justify-between items-center">
        <Box className="flex flex-col justify-center items-start text-left space-y-2">
          <Text className="text-[#757B7B] font-semibold text-lg">Winrate</Text>
          <Box className="items-center space-x-16">
            <Text className="text-[#1B1D5C] font-semibold text-xl">40%</Text>
            <Box className="space-x-1 items-center justify-center">
              <Growth></Growth>
              <Text className="text-[#00DF16] font-semibold text-xs">7.2%</Text>
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
