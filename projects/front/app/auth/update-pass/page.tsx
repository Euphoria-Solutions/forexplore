import { Box, Text } from '@/components';
import React from 'react';
import { Poppins } from 'next/font/google';
import HideButton from '@/components/sign-inup/hide-button';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const UpdatePass = () => {
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
          <Box className="space-y-8 flex-col w-96">
            <Box className="space-y-6 flex-col text-right">
              <Box className="flex-col justify-start items-start space-y-4 mb-4">
                <Text className="text-white font-bold text-4xl">
                  Set Password
                </Text>
                <Text className="text-white text-sm text-start">
                  Your previous password has been reseted. Please set a new
                  password for your account.
                </Text>
              </Box>
              <Box className="flex-col space-y-6 items-center">
                <HideButton placeholder="New Password"></HideButton>
                <HideButton placeholder="Repeat New Password"></HideButton>
              </Box>
            </Box>
            <Box className="bg-[#4461F2] w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base">
              Set password
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdatePass;
