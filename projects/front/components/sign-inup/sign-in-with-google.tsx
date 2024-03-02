import React from 'react';
import { Box } from '../box';
import Image from 'next/image';
import { Text } from '../text';
import googleLogoPath from '@/public/sign-inup/google-logo.svg';
import { Roboto } from 'next/font/google';
const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500'] });
const SignInWithGoogle = () => {
  return (
    <Box className={roboto.className}>
      <Box className="flex-row w-full h-[48px] rounded-3xl bg-white justify-center items-center">
        <Box className="flex-row space-x-5 items-center">
          <Image
            src={googleLogoPath.src}
            alt="google logo"
            width={22.8}
            height={22.8}
          ></Image>
          <Text className="text-sm text-[#757575] font-medium">
            Sign in with Google
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInWithGoogle;
