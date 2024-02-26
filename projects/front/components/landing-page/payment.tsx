import React from 'react';
import { Box } from '../box';
import { Text } from '../text';
import FreeContent from './free-payment-content';
import PaidContent from './paid-content';
const Payment = () => {
  return (
    <Box>
      <Box className="text-white flex-col items-center w-[688px] space-y-[14px]">
        {' '}
        <Text className="text-5xl">Find Your Perfect Plan</Text>
        <Box className="space-y-[60px] items-center flex-col">
          <Box className="space-y-[28px] flex-col items-center">
            <Box className="flex-col text-lg items-center font-light">
              <Text className="">
                Discover the ideal plan to develop your trading strategy. Our
              </Text>
              <Text>
                pricing options are cheap to support every trader who wants to
              </Text>
              <Text>develop.</Text>
            </Box>
            <Box className="flex-row">
              <Box className="w-[100px] h-[54px] bg-white text-black align-middle rounded-l-xl text-lg justify-center items-center">
                Monthly
              </Box>
              <Box className="w-[100px] h-[54px] bg-white text-gray-600 align-middle rounded-r-xl text-lg justify-center items-center">
                Yearly
              </Box>
            </Box>
          </Box>
          <Box className="flex-row space-x-[40px]">
            <FreeContent></FreeContent>
            <PaidContent></PaidContent>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
