import React from 'react';
import { Box } from '../box';
import Image from 'next/image';
import logoPath from '@/public/sign-inup/logo.svg';
import { Text } from '../text';
import { Poppins } from 'next/font/google';
import { Input } from '../input';
import Link from 'next/link';
import SignInWithGoogle from './sign-in-with-google';
import HideButton from './hide-button';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const SignUpLayout = () => {
  return (
    <Box className={poppins.className}>
      <Box
        className="h-screen w-screen flex flex-row items-start"
        style={{ backgroundColor: 'rgb(18,19,46)' }}
      >
        <Box
          className="flex-1 flex-col h-screen"
          style={{ maxWidth: 'calc(50% - 10px)' }}
        >
          <Box className="py-4 pl-16">
            <Image src={logoPath.src} alt={'logo'} width={50} height={50} />
          </Box>

          <Box className="bg-white w-full h-full"></Box>
        </Box>
        <Box
          className="flex-1 justify-center items-center flex-col pt-24"
          style={{ maxWidth: 'calc(50% + 10px)' }}
        >
          <Box className="space-y-12 flex-col w-96">
            <Box className="space-y-6 flex-col text-right">
              <Box className="flex-col space-y-7 items-center">
                <Text className="text-white font-bold text-2xl">Sign up</Text>
                <Input
                  className="w-full h-14 bg-white rounded-lg text-white px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
                  placeholder="Enter username"
                />
                <Input
                  className="w-full h-14 bg-white rounded-lg text-white px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
                  placeholder="Enter email"
                />
                <HideButton placeholder="Password"></HideButton>
                <HideButton placeholder="Confirm Password"></HideButton>
              </Box>
              <Link href={'/'} className="text-neutral-400 text-base">
                Already have an account?
              </Link>
            </Box>
            <Box className="flex-col space-y-7">
              <Box className="bg-[#4461F2] w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base">
                Sign up
              </Box>
              <SignInWithGoogle></SignInWithGoogle>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpLayout;
