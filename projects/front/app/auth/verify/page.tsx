'use client';

import { Box, Input, Text } from '@/components';
import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import { GoBack } from '@/public/pass-recovery/go-back';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const Verify = () => {
  const [sent, setSent] = useState(true);
  return (
    <Box className={poppins.className}>
      <Box
        className="h-full w-screen flex flex-row items-start"
        style={{ backgroundColor: 'rgb(18,19,46)' }}
      >
        <Box className="bg-white w-[50%] h-full"></Box>
        <Box
          className="flex-1 justify-center items-center flex-col pt-32"
          style={{ maxWidth: 'calc(50% + 10px)' }}
        >
          <Box className="space-y-12 flex-col w-96">
            <Box className="space-y-6 flex-col text-right">
              <Box className="flex-col items-start space-y-4 w-full">
                <Link href={'/auth/sign-in'}>
                  <Box className="flex-row text-white items-center space-x-3 mb-4">
                    <GoBack />
                    <Text className="text-sm">Back to login</Text>
                  </Box>
                </Link>
                <Text className="text-white font-bold text-2xl">
                  Verify code
                </Text>
                {sent && (
                  <Text className="text-white text-sm mt-4">
                    An authentication code has been sent to your email.
                  </Text>
                )}
              </Box>
            </Box>
            <Box className="flex-col space-y-8">
              <Box className="flex-col space-y-4">
                <Input
                  className="w-full h-14 bg-white rounded-lg text-[#383838] px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
                  placeholder="Verification Code"
                />
                <Box className="flex-row space-x-1 ">
                  <Text className="text-white">Didn’t receive a code?</Text>
                  <Box
                    className="text-[#515DEF]"
                    onClick={() => alert('message sent')}
                  >
                    Resend
                  </Box>
                </Box>
              </Box>
              <Link href={'/auth/update-pass'}>
                <Box
                  className="bg-[#4461F2] w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base"
                  onClick={() => setSent(true)}
                >
                  Verify
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Verify;
