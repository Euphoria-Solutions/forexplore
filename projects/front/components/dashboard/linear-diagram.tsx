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

interface LineChartProps {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

const LineChartComponent: React.FC<LineChartProps> = ({ data, options }) => {
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
      point: {
        radius: 0, // Hide points on the line
      },
      line: {
        tension: 0.4, // Set this to 0 to have a straight line, or to the desired bezier curve tension
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Hide tooltips
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
    ...options,
  };

  return <Line data={data} options={defaultOptions} />;
};

export default LineChartComponent;
