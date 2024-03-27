'use client';

import React, { useState } from 'react';
import { Box, Text, Input } from '@/components';
import Image from 'next/image';
import logoPath from '@/public/sign-inup/logo.svg';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import SignInWithGoogle from './sign-in-with-google';
import HideButton from './hide-button';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@/graphql';
import { toast } from 'react-toastify';
import { notifUpdater } from '@/helper';
import { useRouter } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const SignInLayout = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const [LogIn] = useMutation(LOGIN_MUTATION);

  const logIn = async () => {
    if (user.email == '' || user.password == '') {
      toast.error('Some fields are missing');
      return;
    }

    const id = toast.loading('Please Wait ...');
    try {
      const { data } = await LogIn({
        variables: user,
      });

      localStorage.setItem('token', data?.logIn);

      await notifUpdater(id, 'Logged In Successfully', 'success');

      router.push('/features');
    } catch (err) {
      await notifUpdater(id, (err as Error).message, 'error');
    }
  };

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
          className="flex-1 justify-center items-center flex-col pt-32"
          style={{ maxWidth: 'calc(50% + 10px)' }}
        >
          <Box className="space-y-12 flex-col w-96">
            <Box className="space-y-6 flex-col text-right">
              <Box className="flex-col space-y-7 items-center">
                <Text className="text-white font-bold text-2xl">Sign in</Text>
                <Input
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                  className="w-full h-14 bg-white rounded-lg text-[#383838] px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
                  placeholder="Enter email or username"
                />
                <HideButton
                  value={user.password}
                  onChange={e => setUser({ ...user, password: e.target.value })}
                  placeholder="Password"
                ></HideButton>
              </Box>
              <Link href={'/'} className="text-neutral-400 text-base">
                Recover Password ?
              </Link>
            </Box>
            <Box
              onClick={logIn}
              className="bg-[#4461F2] w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base"
            >
              Sign in
            </Box>
            <Box className="flex-row items-center">
              <Box className="h-px w-full bg-[#E7E7E7]"></Box>
              <Text className="px-2 text-[#E7E7E7] whitespace-nowrap">
                Or Continue with
              </Text>
              <Box className="h-px w-full bg-[#E7E7E7]"></Box>
            </Box>
            <SignInWithGoogle></SignInWithGoogle>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInLayout;
