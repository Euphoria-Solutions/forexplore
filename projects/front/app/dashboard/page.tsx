import { Box } from '@/components';
import BarChartComponent from '@/components/dashboard/bar-chart';
import React from 'react';
import { Text } from '@/components';
import path from '@/public/icons/4cube.svg';
import Image from 'next/image';
import LineChartComponent from '@/components/dashboard/linear-diagram';
import LinearDiagramDecorator from '@/components/dashboard/linear-diagram-decorator';
import StraightLineDiagram from '@/components/dashboard/straight-line-diagram';
// import pathGrwt from '@/public/graph/growth.svg';
import PieDiagram from '@/components/dashboard/pie-diagram';
const Page = () => {
  const linearData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Loss',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#FA4B3C',
        borderWidth: 2,
      },
      {
        label: 'Profit',
        data: [28, 48, 40, 19, 86, 27],
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
    <Box className="flex-col overflow-clip">
      <Box className="flex-row justify-between mt-9">
        <Text className="text-xl font-medium pl-6">Overview</Text>
        <Box className="pr-20 space-x-2 h-8">
          <Box className="h-full w-max px-6 rounded-lg text-white bg-black items-center justify-center">
            Import
          </Box>
          <Box className="h-full w-max px-2 rounded-lg text-white bg-black">
            <Image src={path.src} alt="cube" width={20} height={20}></Image>
          </Box>
        </Box>
      </Box>
      <Box className="overflow-x-scroll scrollbar-hide">
        <Box className="pr-14 w-max">
          <Box className="flex-col">
            <Text>Balance</Text>
            <Box className="flex-row items-center">
              <Text>$10,000.00</Text>
              {/* <Image
                src={pathGrwt.src}
                alt="grwt"
                width={10}
                height={10}
              ></Image> */}
              <Text className="text-[#00DF16] font-semibold">7.2%</Text>
              <Box className="h-8 w-16">
                <StraightLineDiagram
                  data={straightLineData}
                ></StraightLineDiagram>
              </Box>
            </Box>
          </Box>
          <Box className="flex-row">
            <Box className="flex-col">
              <Text>Winrate</Text>
              <Box className="flex-row">
                <Text>40%</Text>
                {/* <Image
                  src={pathGrwt.src}
                  alt="grwt"
                  width={10}
                  height={10}
                ></Image> */}
                <Text className="text-[#00DF16] font-semibold">7.2%</Text>
              </Box>
            </Box>
            <PieDiagram number={35}></PieDiagram>
          </Box>
        </Box>
      </Box>
      <Box className="overflow-x-scroll scrollbar-hide">
        <Box className="pr-14 w-max">
          <Box className="w-[27vw] flex-col px-6">
            <LinearDiagramDecorator></LinearDiagramDecorator>
            <LineChartComponent data={linearData}></LineChartComponent>
          </Box>
        </Box>
      </Box>
      <Box className="overflow-x-scroll scrollbar-hide">
        <Box className="pr-14 w-max">
          <BarChartComponent></BarChartComponent>
          <BarChartComponent></BarChartComponent>
          <BarChartComponent></BarChartComponent>
          <BarChartComponent></BarChartComponent>
          <BarChartComponent></BarChartComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
