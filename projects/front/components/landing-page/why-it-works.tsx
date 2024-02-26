import React from 'react';
import { Box } from '../box';
import Image from 'next/image';
import path from '@/public/icons/decorator.svg';
import path1 from '@/public/icons/student-icon.svg';
import path2 from '@/public/icons/gov3.png';
import path3 from '@/public/icons/gr3.svg';
import { Text } from '../text';
const WhyItWorks = () => {
  return (
    <Box className="flex flex-col items-center space-y-[20px]">
      <Box className="flex flex-col items-center space-y-[19px]">
        <Box className="text-white font-semibold text-5xl">Why it works</Box>
        <Image src={path.src} alt="decorator" width={283.63} height={40} />
      </Box>
      <Box className="flex flex-row justify-center items-start space-x-[50px]">
        <Box className="flex flex-col items-center space-y-[24px] w-[334px]">
          <Image src={path1.src} alt="icon" width={86.57} height={100} />
          <Box className="flex flex-col space-y-[10px] items-center">
            <Text className="text-white text-2xl font-semibold">
              Personalized learning
            </Text>
            <Text className="text-white text-lg text-center">
              Students practice at their own pace,<br></br> first filling in
              gaps in their<br></br> understanding and then<br></br>{' '}
              accelerating their learning.
            </Text>
          </Box>
        </Box>
        <Box className="flex flex-col items-center space-y-[24px] w-[334px]">
          <Image src={path2.src} alt="icon" width={129.59} height={100} />
          <Box className="flex flex-col space-y-[10px] items-center ">
            <Text className="text-white text-2xl font-semibold">
              Trusted content
            </Text>
            <Text className="text-white text-lg text-center">
              Created by experts, library of trusted practice and lessons covers
              math, science, and more. Always free for learners and teachers.
            </Text>
          </Box>
        </Box>
        <Box className="flex flex-col items-center space-y-[24px] w-[334px]">
          <Image src={path3.src} alt="icon" width={131.5} height={100} />
          <Box className="flex flex-col space-y-[10px] items-center">
            <Text className="text-white text-2xl font-semibold">
              Track your growth
            </Text>
            <Text className="text-white text-lg text-center">
              Students can track their progress<br></br> and get personalized
              analyses from our professionals.{' '}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhyItWorks;
