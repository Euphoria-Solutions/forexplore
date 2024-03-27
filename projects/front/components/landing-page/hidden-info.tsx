'use client';
import React, { useContext, useEffect, useRef } from 'react';
import { Box, Text } from '@/components';
import Image from 'next/image';
import path from '@/public/info-picture/pic.svg';
import { useInView } from 'react-intersection-observer';
import { Poppins } from 'next/font/google';
import { DataContext } from '@/providers/data-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
const HiddenInfo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 1 });

  const { data } = useContext(DataContext);

  useEffect(() => {
    if (data.section === 'features' && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  return (
    <Box className={poppins.className} ref={ref} id="features">
      <Box className="flex-col space-y-24 pt-10">
        <Box
          ref={ref1}
          className={`flex-row items-center space-x-56 transition-all duration-1000 ease-out ${inView1 ? 'opacity-100 delay-150' : 'opacity-0'}`}
        >
          <Box className="flex-col text-white text-4xl space-y-5">
            <Text>Journal</Text>
            <Text>Trades</Text>
            <Text>Automatically</Text>
          </Box>
          <Image src={path.src} alt="" width={517} height={294} />
        </Box>
        <Box
          ref={ref2}
          className={`flex-row items-center space-x-56 transition-all duration-1000 ease-out ${inView2 ? 'opacity-100 delay-150' : 'opacity-0'}`}
        >
          <Image src={path.src} alt="" width={517} height={294} />
          <Box className="flex-col text-white text-4xl text-right space-y-5">
            <Text>Use</Text>
            <Text>Interactive</Text>
            <Text>Learning</Text>
            <Text>Feature</Text>
          </Box>
        </Box>
        <Box
          ref={ref3}
          className={`flex-row items-center space-x-56 transition-all duration-1000 ease-out ${inView3 ? 'opacity-100 delay-150' : 'opacity-0'}`}
        >
          <Box className="flex-col text-white text-4xl space-y-5">
            <Text>Journal</Text>
            <Text>Trades</Text>
            <Text>Automatically</Text>
          </Box>
          <Image src={path.src} alt="" width={517} height={294} />
        </Box>
      </Box>
    </Box>
  );
};

export default HiddenInfo;
