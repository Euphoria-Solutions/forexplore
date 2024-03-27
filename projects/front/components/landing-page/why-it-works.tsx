import React from 'react';
import { Box, Text } from '@/components';
import Image from 'next/image';
import path from '@/public/icons/decorator.svg';
import path1 from '@/public/icons/student-icon.svg';
import path2 from '@/public/icons/gov3.png';
import path3 from '@/public/icons/gr3.svg';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const WhyItWorks = () => {
  return (
    <Box className={poppins.className}>
      <Box className={`flex flex-col items-center space-y-5`}>
        <Box className="flex flex-col items-center space-y-5">
          <Box className="text-white font-semibold text-5xl">Why it works</Box>
          <Image src={path.src} alt="decorator" width={284} height={40} />
        </Box>
        <Box className="flex flex-row justify-center items-start space-x-12">
          <Box className="flex flex-col items-center space-y-6 w-80">
            <Image src={path1.src} alt="icon" width={87} height={100} />
            <Box className="flex flex-col space-y-2.5 items-center">
              <Text className="text-white text-2xl font-semibold">
                Personalized learning
              </Text>
              <Text className={'text-white text-lg text-center'}>
                Students practice at their own pace, first filling in gaps in
                their understanding and then accelerating their learning.
              </Text>
            </Box>
          </Box>
          <Box className="flex flex-col items-center space-y-6 w-80">
            <Image src={path2.src} alt="icon" width={130} height={100} />
            <Box className="flex flex-col space-y-2.5 items-center">
              <Text className="text-white text-2xl font-semibold">
                Trusted content
              </Text>
              <Text className="text-white text-lg text-center">
                Created by experts, library of trusted practice and lessons
                covers math, science, and more. Always free for learners and
                teachers.
              </Text>
            </Box>
          </Box>
          <Box className="flex flex-col items-center space-y-6 w-80">
            <Image src={path3.src} alt="icon" width={132} height={100} />
            <Box className="flex flex-col space-y-2.5 items-center">
              <Text className="text-white text-2xl font-semibold">
                Track your growth
              </Text>
              <Text className="text-white text-lg text-center">
                Students can track their progress and get personalized analyses
                from our professionals.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhyItWorks;
