'use client';
import { Box } from '@/components';
import BarChartComponent from '@/components/analytics/bar-chart';
import React from 'react';
import LineChartComponent from '@/components/analytics/linear-diagram';
import StraightLineDiagram from '@/components/analytics/straight-line-diagram';
import PieDiagram from '@/components/analytics/pie-diagram';

const Page = () => {
  // const [modal, setModal] = useState(false);
  return (
    <Box className="flex-col overflow-y-auto px-4 gap-y-5 relative scrollbar-hide">
      <Box className="flex-col space-y-8 pb-8">
        <Box className="overflow-x-scroll scrollbar-hide pr-14">
          <Box className="w-max space-x-6">
            <StraightLineDiagram />
            <PieDiagram />
            <StraightLineDiagram />
            <PieDiagram />
          </Box>
        </Box>
        <Box className="overflow-x-scroll scrollbar-hide">
          <Box className="w-max space-x-6">
            <LineChartComponent />
            <LineChartComponent />
            <LineChartComponent />
            <LineChartComponent />
            <LineChartComponent />
          </Box>
        </Box>
        <Box className="overflow-x-auto scrollbar-hide">
          <Box className="w-max space-x-6">
            <BarChartComponent />
            <BarChartComponent />
            <BarChartComponent />
            <BarChartComponent />
            <BarChartComponent />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
