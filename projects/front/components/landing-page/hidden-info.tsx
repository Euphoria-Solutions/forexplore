'use client';
import React from 'react';
import { Box } from '../box';
import { Text } from '../text';
import Image from 'next/image';
import path from '@/public/info-picture/pic.svg';
import { useInView } from 'react-intersection-observer';

const HiddenInfo = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 1 });

  return (
    <Box className="flex-col space-y-[88px]">
      <Box
        ref={ref1}
        className={`flex-row items-center space-x-[220px] transition-all duration-1000 ease-out ${inView1 ? 'opacity-100 delay-150' : 'opacity-0'}`}
      >
        <Box className="flex-col text-white text-4xl">
          <Text>Journal</Text>
          <Text>Trades</Text>
          <Text>Automatically</Text>
        </Box>
        <Image src={path.src} alt="" width={517} height={294.11} />
      </Box>
      <Box
        ref={ref2}
        className={`flex-row items-center space-x-[220px] transition-all duration-1000 ease-out ${inView2 ? 'opacity-100 delay-150' : 'opacity-0'}`}
      >
        <Image src={path.src} alt="" width={517} height={294.11} />
        <Box className="flex-col text-white text-4xl text-right">
          <Text>Use</Text>
          <Text>Interactive</Text>
          <Text>Learning</Text>
          <Text>Feature</Text>
        </Box>
      </Box>
      <Box
        ref={ref3}
        className={`flex-row items-center space-x-[220px] transition-all duration-1000 ease-out ${inView3 ? 'opacity-100 delay-150' : 'opacity-0'}`}
      >
        <Box className="flex-col text-white text-4xl">
          <Text>Journal</Text>
          <Text>Trades</Text>
          <Text>Automatically</Text>
        </Box>
        <Image src={path.src} alt="" width={517} height={294.11} />
      </Box>
    </Box>
  );
};

export default HiddenInfo;
