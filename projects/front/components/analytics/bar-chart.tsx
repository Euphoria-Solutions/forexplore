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
import { Inter } from 'next/font/google';
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
      label: 'Money',
      data: [
        1200, 1900, 3000, 5000, 2000, 3000, 1500, 4000, 2500, 4600, 2300, 5000,
      ],
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
        callback: function (value) {
          const numericValue = Number(value);
          if (numericValue === 0) {
            return '0';
          } else {
            return numericValue / 1000 + 'k';
          }
        },
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
            <Box className="w-20 h-10 items-center justify-center text-[#9291A5] font-medium">
              Quarter
            </Box>
            <Box className="w-20 h-10 items-center justify-center bg-black rounded-xl text-white font-medium">
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
