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

ChartJS.register(crosshairPlugin);

const LineChartComponent: React.FC<LineChartProps> = ({ data, options }) => {
  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        display: true,
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
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      fill: false,
      borderColor: dataset.borderColor,
      pointRadius: 0,
      pointHoverRadius: 10,
      pointHitRadius: 20,
      pointBackgroundColor: dataset.pointBackgroundColor || dataset.borderColor,
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: dataset.label === 'Loss' ? 'red' : '#00DF16',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 2,
    })),
  } as ChartData<'line'>;

  return <Line data={newData} options={defaultOptions} />;
};

export default LineChartComponent;
