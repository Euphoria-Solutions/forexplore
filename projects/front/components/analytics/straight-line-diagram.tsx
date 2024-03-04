'use client';
import React from 'react';
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
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Box, Text } from '@/components';
import { Poppins } from 'next/font/google';
import { Growth } from '@/public/graph/growth';

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
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

const StraightLineDiagram: React.FC<StraightLineDiagramProps> = ({
  data,
  options,
}) => {
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

  const newData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      fill: false,
      borderColor: dataset.borderColor,
    })),
  } as ChartData<'line'>;

  return (
    <Box className={poppins.className}>
      <Box className="w-[30vw] h-[16vh] pl-10 pr-16 bg-white rounded-md items-center justify-between">
        <Box className="flex-col w-full space-y-2">
          <Text className="text-[#757B7B] font-semibold text-lg">Balance</Text>
          <Box className="flex-row items-center space-x-3">
            <Text className="text-[#1B1D5C] font-semibold text-xl">
              $10,000.00
            </Text>
            <Box className="space-x-1 items-center justify-center">
              <Growth></Growth>
              <Text className="text-[#00DF16] font-semibold text-sm">7.2%</Text>
            </Box>
          </Box>
        </Box>
        <Box className="h-16 w-max items-center justify-center flex-col">
          <Line data={newData} options={defaultOptions} />
        </Box>
      </Box>
    </Box>
  );
};

export default StraightLineDiagram;
