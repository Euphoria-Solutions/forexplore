'use client';
import { Box } from '@/components';
import BarChartComponent from '@/components/analytics/bar-chart';
import React from 'react';
import LineChartComponent from '@/components/analytics/linear-diagram';
import StraightLineDiagram from '@/components/analytics/straight-line-diagram';
import PieDiagram from '@/components/analytics/pie-diagram';
// import { CloseIconModal } from '@/public/icons/close-icon-modal';

const Page = () => {
  // const [modal, setModal] = useState(false);
  const linearData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Loss',
        data: [650000, 590000, 800000, 810000, 560000, 550000],
        borderColor: '#FA4B3C',
        borderWidth: 2,
      },
      {
        label: 'Profit',
        data: [280000, 480000, 400000, 190000, 860000, 270000],
        borderColor: '#00DFA4',
        borderWidth: 2,
      },
    ],
  };
  const straightLineData = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        data: [10, 13, 8, 15, 13, 12, 14],
        borderColor: '#00DF16',
        borderWidth: 2,
      },
    ],
  };
  return (
    <Box className="flex-col overflow-y-auto px-4 gap-y-5 relative scrollbar-hide">
      <Box className="flex-col space-y-8 pb-8">
        <Box className="overflow-x-scroll scrollbar-hide pr-14">
          <Box className="w-max space-x-6">
            <StraightLineDiagram data={straightLineData} />
            <PieDiagram number={35}></PieDiagram>
            <StraightLineDiagram data={straightLineData} />
            <PieDiagram number={35}></PieDiagram>
          </Box>
        </Box>
        <Box className="overflow-x-scroll scrollbar-hide">
          <Box className="w-max space-x-6">
            <LineChartComponent data={linearData}></LineChartComponent>
            <LineChartComponent data={linearData}></LineChartComponent>
            <LineChartComponent data={linearData}></LineChartComponent>
            <LineChartComponent data={linearData}></LineChartComponent>
            <LineChartComponent data={linearData}></LineChartComponent>
          </Box>
        </Box>
        <Box className="overflow-x-auto scrollbar-hide">
          <Box className="w-max space-x-6">
            <BarChartComponent></BarChartComponent>
            <BarChartComponent></BarChartComponent>
            <BarChartComponent></BarChartComponent>
            <BarChartComponent></BarChartComponent>
            <BarChartComponent></BarChartComponent>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
