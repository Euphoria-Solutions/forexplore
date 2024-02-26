import React from 'react';
import { Box } from '../box';
import { Text } from '../text';
import path from '@/public/icons/yes.svg';
import Image from 'next/image';
const FreeContent = () => {
  return (
    <Box className="w-[488px] h-[646px] rounded-3xl bg-neutral-300 p-[40px] text-left flex-col">
      <Box className="flex-col space-y-[28px]">
        <Box className="flex-col space-y-[30px]">
          <Box className="flex-col space-y-[24px]">
            <Text className="text-customDarkBlue font-medium text-4xl">
              Free
            </Text>
            <Text className="text-neutral-500 text-2xl font-light">
              We offer a free plan that is capable of tracking trade history
            </Text>
          </Box>
          <Box className="flex-row space-x-[10px] items-center">
            <Text className="text-6xl text-customDarkBlue font-medium">$0</Text>
            <Text className="text-neutral-500 text-2xl font-light">
              per month
            </Text>
          </Box>
        </Box>
        <Box className="h-[1px] w-[408px] bg-white"></Box>
        <Box className="space-y-[40px] flex-col">
          <Box className="space-y-[12px] flex-col">
            <Box className="flex-row space-x-[16px]">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-customDarkBlue text-2xl">
                Trading history
              </Text>
            </Box>
            <Box className="flex-row space-x-[16px]">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-customDarkBlue text-2xl">
                Write description
              </Text>
            </Box>
            <Box className="flex-row space-x-[16px]">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-customDarkBlue text-2xl">
                Customizable dashboard
              </Text>
            </Box>
          </Box>
          <Box className="text-customDarkBlue text-2xl justify-center items-center rounded-xl border-customDarkBlue border-2 h-[66px]">
            Get Started
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FreeContent;
