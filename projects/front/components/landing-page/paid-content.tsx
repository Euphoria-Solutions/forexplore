import React from 'react';
import { Box } from '../box';
import { Text } from '../text';
import path from '@/public/icons/yes-white.svg';
import Image from 'next/image';
const PaidContent = () => {
  return (
    <Box className="w-[488px] h-[680px] rounded-3xl bg-customPurple p-[40px] text-left flex-col">
      <Box className="flex-col space-y-[28px]">
        <Box className="flex-col space-y-[30px]">
          <Box className="flex-col space-y-[24px]">
            <Box className="flex-row items-center space-x-[20px]">
              <Text className="text-white font-medium text-4xl">
                Journalist
              </Text>
              <Box className="text-sm border border-white font-light rounded-lg px-[5px] py-[2.5px]">
                Recommended
              </Box>
            </Box>

            <Text className="text-neutral-300 text-2xl font-light">
              We offer a free plan that is capable of tracking trade history
            </Text>
          </Box>
          <Box className="flex-row space-x-[10px] items-center">
            <Text className="text-6xl text-white font-medium">$3</Text>
            <Text className="text-white text-2xl font-light">per month</Text>
          </Box>
        </Box>
        <Box className="h-[1px] w-[408px] bg-white"></Box>
        <Box className="space-y-[44px] flex-col">
          <Box className="space-y-[12px] flex-col">
            <Box className="flex-row space-x-[16px]">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">Analytics</Text>
            </Box>
            <Box className="flex-row space-x-[16px]">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">Auto-sync</Text>
            </Box>
            <Box className="flex-row space-x-[16px]">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">
                Guidance from Professionals
              </Text>
            </Box>
            <Box className="flex-row space-x-[16px]">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">
                Third party Integration
              </Text>
            </Box>
            <Box className="flex-row space-x-[16px]">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">24/7 Priority Support</Text>
            </Box>
          </Box>
          <Box className="text-white text-2xl justify-center items-center rounded-xl bg-black h-[66px]">
            Get Started
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PaidContent;
