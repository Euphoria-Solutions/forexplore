import React from 'react';
import { Box, Text } from '@/components';
import Image from 'next/image';
import path from '@/public/icons/lantern.svg';
const GetStarted = () => {
  return (
    <Box
      className="flex-row space-x-36 items-center h-max w-screen justify-center"
      style={{ backgroundColor: 'rgb(4,6,19)' }}
    >
      <Box className="flex-col w-160 space-y-5">
        <Box className="text-white font-bold text-3xl">
          Ready to earn money through trading?
        </Box>
        <Box className="text-white text-lg">
          Use everything we developed just for traders and use its<br></br>{' '}
          advantage to make your trading journey successful
        </Box>
        <Box className="text-white w-52 h-12 bg-customPurple rounded-xl text-xl font-medium items-center justify-center flex">
          <Text>Get Started</Text>
        </Box>
      </Box>
      <Image src={path.src} alt="pic" width={325} height={394}></Image>
    </Box>
  );
};

export default GetStarted;
