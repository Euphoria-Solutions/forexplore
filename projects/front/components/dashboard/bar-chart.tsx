'use client';
import React from 'react';
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const maxDataValue = 6000;

const data: ChartData<'bar'> = {
  labels: [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ],
  datasets: [
    {
      label: 'Background',
      data: Array(12).fill(maxDataValue),
      backgroundColor: '#E5E5EF',
      order: 2,
      barPercentage: 0.2,
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
      label: 'Money',
      data: [
        1200, 1900, 3000, 5000, 2000, 3000, 1500, 4000, 2500, 4600, 2300, 5000,
      ],
      backgroundColor: '#00DF16',
      order: 1,
      barPercentage: 0.2,
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

const options: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {},
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
          if (tooltipItem.parsed.y !== null) {
            label += `$${tooltipItem.parsed.y}`;
          }
          return tooltipItem.datasetIndex === 1 ? label : '';
        },
      },
    },
  },
};

const BarChartComponent: React.FC = () => {
  return (
    <Box className="w-[54vw] bg-white rounded-lg shadow-md px-6 flex-col">
      <Box className="flex-row justify-between pb-5">
        <Box className="flex-col">
          <Text className="text-neutral-400">Activity</Text>
          <Text className="font-bold text-lg">Total Trades</Text>
        </Box>
        <Box className="flex-row items-center space-x-4">
          <Box>Quarter</Box>
          <Box className="w-max h-max px-4 py-1 bg-black rounded-xl text-white">
            Annual
          </Box>
        </Box>
      </Box>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarChartComponent;
