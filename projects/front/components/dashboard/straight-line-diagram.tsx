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

  return <Line data={newData} options={defaultOptions} />;
};

export default StraightLineDiagram;
