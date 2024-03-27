'use client';
import React, { useContext, useEffect, useRef } from 'react';
import { Box, Text } from '@/components';
import FreeContent from './free-payment-content';
import PaidContent from './paid-content';
import { DataContext } from '@/providers/data-provider';

const Payment = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useContext(DataContext);

  useEffect(() => {
    if (data.section === 'pricing' && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);
  return (
    <Box ref={ref} id="pricing">
      <Box className="text-white flex flex-col items-center w-full md:w-3/4 lg:w-[688px] space-y-4 pt-10">
        <Text className="text-6xl text-center">Find Your Perfect Plan</Text>
        <Box className="space-y-14 items-center flex flex-col">
          <Box className="space-y-7 flex flex-col items-center">
            <Box className="flex flex-col text-2xl items-center font-light space-y-0.5">
              <Text>
                Discover the ideal plan to develop your trading strategy. Our
              </Text>
              <Text>
                pricing options are cheap to support every trader who wants to
              </Text>
              <Text>develop.</Text>
            </Box>
            <Box
              className="flex flex-row w-64 h-16 rounded-xl items-center justify-center"
              style={{ backgroundColor: 'rgb(251, 251, 251)' }}
            >
              <Box className="w-1/2 h-max text-black text-xl items-center justify-center">
                <Box
                  className="rounded-lg px-5 py-3 bg-white"
                  style={{ border: '1px solid rgb(231, 235, 255)' }}
                >
                  Monthly
                </Box>
              </Box>
              <Box className="w-1/2 h-max text-gray-600 text-xl items-center justify-center">
                Yearly
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-row space-x-10">
            <FreeContent />
            <PaidContent />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
