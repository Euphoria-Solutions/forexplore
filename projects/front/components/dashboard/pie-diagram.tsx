'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Box, Text } from '@/components';
import { PieBg } from '@/public/graph/pie-bg';

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
  };

  return (
    <Box className="w-10 h-10 relative bg-white">
      <Box className="absolute top-0 left-0 z-10 w-full h-full flex flex-col justify-center items-center">
        <Text>Winrate</Text>
        <Box className="flex flex-row">
          <Text>40%</Text>
          <Text className="text-[#00DF16] font-semibold">7.2%</Text>
        </Box>
      </Box>

      <Box className="absolute top-0 left-0 z-30 w-full h-full">
        <PieBg></PieBg>
      </Box>

      <Box className="absolute top-0 left-0 z-40 w-full h-full">
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};

export default PieDiagram;
