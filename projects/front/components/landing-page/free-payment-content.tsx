import React from 'react';
import { Box, Text } from '@/components';
import path from '@/public/icons/yes.svg';
import Image from 'next/image';
const FreeContent = () => {
  return (
    <Box className="w-max h-max rounded-3xl bg-neutral-300 px-10 pt-10 pb-20 text-left flex-col">
      <Box className="flex-col space-y-7">
        <Box className="flex-col space-y-8">
          <Box className="flex-col space-y-6">
            <Text className="text-customDarkBlue font-medium text-4xl">
              Free
            </Text>
            <Text className="text-neutral-500 text-2xl font-light">
              We offer a free plan that is capable of<br></br> tracking trade
              history
            </Text>
          </Box>
          <Box className="flex-row space-x-2.5 items-center">
            <Text className="text-6xl text-customDarkBlue font-medium">$0</Text>
            <Text className="text-neutral-500 text-2xl font-light">
              per month
            </Text>
          </Box>
        </Box>
        <Box className="h-px w-80 bg-white"></Box>
        <Box className="space-y-10 flex-col">
          <Box className="space-y-3 flex-col">
            <Box className="flex-row space-x-4">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-customDarkBlue text-2xl">
                Trading history
              </Text>
            </Box>
            <Box className="flex-row space-x-4">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-customDarkBlue text-2xl">
                Write description
              </Text>
            </Box>
            <Box className="flex-row space-x-4">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-customDarkBlue text-2xl">
                Customizable dashboard
              </Text>
            </Box>
          </Box>
          <Box className="text-customDarkBlue text-2xl justify-center items-center rounded-xl border-customDarkBlue border-2 h-16">
            Get Started
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FreeContent;
