import { Box } from '@/components';
import LineChartComponent from '@/components/dashboard/linear-diagram';
import React from 'react';

const Page = () => {
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };
  return (
    <Box>
      <LineChartComponent data={lineChartData}></LineChartComponent>
    </Box>
  );
};

export default Page;
