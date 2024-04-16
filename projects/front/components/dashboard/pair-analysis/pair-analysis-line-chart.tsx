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
  Plugin,
  Tooltip,
  Filler,
  Legend,
  ChartData,
  ChartOptions,
  Chart,
} from 'chart.js';
import { Box, Text } from '@/components';
import { Poppins } from 'next/font/google';
import { Dot } from '../dot';
import { Divider } from '@nextui-org/react';
import { transformData } from '@/helper';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const crosshairPlugin: Plugin<'line'> = {
  id: 'crosshair',
  afterDraw: (chart: Chart) => {
    const tooltip = chart.tooltip;
    if (tooltip && tooltip.getActiveElements().length > 0 && chart?.scales?.y) {
      const ctx = chart.ctx;
      const activeElement = tooltip.getActiveElements()[0];
      const x = activeElement.element.x;
      const topY = chart?.scales?.y?.top;
      const bottomY = chart?.scales?.y?.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#9291A5';
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.restore();
    }
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  crosshairPlugin
);

ChartJS.unregister(crosshairPlugin);

interface LineChartProps {
  data: [MonthlyData];
  options?: ChartOptions<'line'>;
  title: string;
}

interface MonthlyData {
  month: string;
  statistics: Array<{
    pair: string;
    winRate: string;
  }>;
}

const PairAnalysisLineChart: React.FC<LineChartProps> = ({
  data,
  options,
  title,
}) => {
  const sessionLinearData = transformData(data);

  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        display: true,
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
        display: true,
        grid: {
          display: true,
          drawTicks: false,
        },
        ticks: {
          align: 'end',
          color: '#615E83',
          callback: function (value) {
            const numericValue = Number(value);
            if (numericValue === 0) {
              return '0';
            } else {
              return numericValue + '%';
            }
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0.4,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        position: 'average',
      },

      ...(options?.plugins as object),
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
    ...(options as object),
  };

  const newData = {
    ...sessionLinearData,
    datasets: sessionLinearData.datasets.map(dataset => ({
      ...dataset,
      fill: false,
      borderColor: dataset.borderColor,
      pointRadius: 0,
      pointHoverRadius: 10,
      pointHitRadius: 20,
      pointBackgroundColor: dataset.borderColor,
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: dataset.label === 'Loss' ? 'red' : '#00DF16',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 2,
    })),
  } as ChartData<'line'>;

  return (
    <Box className={`w-full h-full ${poppins.className}`}>
      <Box className="w-full h-full px-8 py-8 bg-white rounded-2xl flex-col">
        <Box className="justify-between w-full h-full font-semibold">
          <Box className="flex-col w-full h-full">
            <Text className="text-[#9291A5]">Statistics</Text>
            <Text className="text-[#1B1D5C] text-lg">{title}</Text>
          </Box>
          <Box className="space-x-12 w-full h-full items-end">
            {
              <Box className="items-center space-x-2">
                <Dot color="greenDot" />
                <Text className="text-sm text-[#615E83]">{}</Text>
              </Box>
            }
          </Box>
        </Box>
        <Box className="mt-6 mb-8">
          <Divider />
        </Box>
        <Line data={newData} options={defaultOptions} />
      </Box>
    </Box>
  );
};

export default PairAnalysisLineChart;
