import React from 'react';
import { Box } from '../box';
import { Text } from '../text';
import path from '@/public/icons/yes-white.svg';
import Image from 'next/image';
const PaidContent = () => {
  return (
    <Box className="w-max h-170 rounded-3xl bg-customPurple p-10 text-left flex-col">
      <Box className="flex-col space-y-7">
        <Box className="flex-col space-y-8">
          <Box className="flex-col space-y-6">
            <Box className="flex-row items-center space-x-5">
              <Text className="text-white font-medium text-4xl">
                Journalist
              </Text>
              <Box className="text-sm border border-white font-light rounded-lg px-1.5 py-0.5">
                Recommended
              </Box>
            </Box>

            <Text className="text-neutral-300 text-2xl font-light">
              Use everything our journal feature is<br></br> capable of
            </Text>
          </Box>
          <Box className="flex-row space-x-2.5 items-center">
            <Text className="text-6xl text-white font-medium">$3</Text>
            <Text className="text-white text-2xl font-light">per month</Text>
          </Box>
        </Box>
        <Box className="h-px w-80 bg-white"></Box>
        <Box className="space-y-11 flex-col">
          <Box className="space-y-3 flex-col">
            <Box className="flex-row space-x-4">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">Analytics</Text>
            </Box>
            <Box className="flex-row space-x-4">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">Auto-sync</Text>
            </Box>
            <Box className="flex-row space-x-4">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">
                Guidance from Professionals
              </Text>
            </Box>
            <Box className="flex-row space-x-4">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">
                Third party Integration
              </Text>
            </Box>
            <Box className="flex-row space-x-4">
              <Image src={path.src} alt="path" width={24} height={24}></Image>
              <Text className="text-white text-2xl">24/7 Priority Support</Text>
            </Box>
          </Box>
          <Box className="text-white text-2xl justify-center items-center rounded-xl bg-black h-16">
            Get Started
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PaidContent;
