'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import path from '@/public/graph/pie-bg.svg';
import { Box } from '..';

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
    rotation: -110 * Math.PI,
  };

  return (
    <Box
      className="w-10 h-10 relative"
      style={{
        backgroundImage: `url(${path.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};

export default PieDiagram;
