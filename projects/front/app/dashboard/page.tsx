import { Box } from '@/components';
import Pie from '@/components/dashboard/pie-diagram';
import React from 'react';
import path from '@/public/graph/pie-bg.svg';
import Image from 'next/image';
const Page = () => {
  return (
    <Box block className="relative">
      <Image src={path.src} alt="some pic" width={100} height={100}></Image>
      <Box className="absolute">
        <Pie number={25}></Pie>
      </Box>
    </Box>
  );
};

export default Page;
