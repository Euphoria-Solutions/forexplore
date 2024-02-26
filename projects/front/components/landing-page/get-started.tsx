import React from 'react';
import { Box } from '../box';
import Image from 'next/image';
import path from '@/public/icons/lantern.svg';
import { Text } from '../text';
const GetStarted = () => {
  return (
    <Box className="flex-row space-x-[134.95px] items-center">
      <Box className="flex-col w-[642.5px] space-y-[45px]">
        <Box className="text-white font-bold text-3xl">
          Ready to earn money through trading?
        </Box>
        <Box className="text-white text-lg">
          Use everything we developed just for traders and use its<br></br>{' '}
          advantage to make your trading journey successful
        </Box>
        <Box className="text-white w-[260.15px] h-[60px] bg-customPurple rounded-xl text-xl font-medium items-center justify-center">
          <Text>Get Started</Text>
        </Box>
      </Box>
      <Image src={path.src} alt="pic" width={324.67} height={394}></Image>
    </Box>
  );
};

export default GetStarted;
