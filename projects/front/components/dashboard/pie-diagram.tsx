'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

interface PieDiagramProps {
  number: number; // represents the percentage of the green part
}

const PieDiagram: React.FC<PieDiagramProps> = ({ number }) => {
  const data = {
    labels: ['Green Part', 'Transparent Part'],
    datasets: [
      {
        label: '# of Votes',
        data: [number, 100 - number],
        // Set the green part to be fully opaque and the rest transparent
        backgroundColor: ['rgba(74, 222, 128, 1)', 'rgba(0, 0, 0, 0)'],
        borderColor: ['rgba(74, 222, 128, 1)', 'rgba(0, 0, 0, 0)'],
        borderWidth: 1,
        // This will cut out the center of the pie chart to make it a doughnut chart
        cutout: '75%',
      },
    ],
  };

  const options = {
    plugins: {
      // Disable the tooltip so it does not show on the transparent part
      tooltip: {
        enabled: false,
      },
      // Disable the legend if you don't need it
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieDiagram;
