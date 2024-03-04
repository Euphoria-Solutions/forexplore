'use client';
import { Box, Text } from '@/components';
import BarChartComponent from '@/components/analytics/bar-chart';
import React, { useState } from 'react';
import path from '@/public/icons/4cube.svg';
import Image from 'next/image';
import LineChartComponent from '@/components/analytics/linear-diagram';
import StraightLineDiagram from '@/components/analytics/straight-line-diagram';
import PieDiagram from '@/components/analytics/pie-diagram';
import { CloseIconModal } from '@/public/icons/close-icon-modal';
import Link from 'next/link';

const Page = () => {
  const [modal, setModal] = useState(false);

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
    <Box className="flex-col overflow-clip px-4 gap-y-5 relative">
      <Box className="flex-row justify-between mt-9 px-5">
        <Text className="text-xl font-medium">Overview</Text>
        <Box className="space-x-2 h-8">
          <Link href="/settings">
            <Box className="h-full w-max px-6 rounded-lg text-white bg-black items-center justify-center">
              Import
            </Box>
          </Link>
          <Box
            onClick={() => setModal(true)}
            className="h-full w-max px-2 rounded-lg text-white bg-black"
          >
            <Image src={path.src} alt="cube" width={20} height={20}></Image>
          </Box>
        </Box>
      </Box>
      <Box className="flex-col space-y-8">
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
      <Box className={` ${!modal && 'hidden'} fixed w-[100vw] h-screen `}>
        <Box
          onClick={() => setModal(false)}
          className="w-[54.44%] h-full bg-transparent"
        ></Box>
        <Box className="w-[40%] h-full bg-[#F2F3F9] flex-col items-center overflow-y-auto overflow-x-hidden p-10 gap-y-5 scrollbar-hide shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)]">
          <Box className="relative w-full h-max">
            <Box
              className="absolute top-0 right-0 pr-3"
              onClick={() => setModal(false)}
            >
              <CloseIconModal />
            </Box>
          </Box>

          <Box className="flex-col w-max gap-y-5 pt-10">
            <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
              <LineChartComponent data={linearData}></LineChartComponent>
            </Box>
            <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
              <PieDiagram number={35}></PieDiagram>
            </Box>
            <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
              <LineChartComponent data={linearData}></LineChartComponent>
            </Box>
            <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
              <PieDiagram number={35}></PieDiagram>
            </Box>
            <Box className="w-max h-max rounded-xl shadow-[0px_10px_20px_10px_rgba(117,123,123,0.5)] ">
              <StraightLineDiagram data={straightLineData} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
