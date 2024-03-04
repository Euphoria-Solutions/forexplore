'use client';

import { Box, Input, Text } from '@/components';
import React, { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import HideButton from '@/components/sign-inup/hide-button';
import SignInWithGoogle from '@/components/sign-inup/sign-in-with-google';
import { notifUpdater } from '@/helper';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, SEND_OTP, VERIFY_TOKEN_MUTATION } from '@/graphql';
import { useRouter } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const SignIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [LogIn] = useMutation(LOGIN_MUTATION);
  const [VerifyToken] = useMutation(VERIFY_TOKEN_MUTATION);
  const [SendOTP] = useMutation(SEND_OTP);

  const logIn = async () => {
    setLoading(true);
    if (user.email == '' || user.password == '') {
      toast.error('Some fields are missing');
      setLoading(false);
      return;
    }

    const id = toast.loading('Please Wait ...');
    try {
      const { data } = await LogIn({
        variables: user,
      });

      if (data.logIn) {
        localStorage.setItem('token', data?.logIn);

        await notifUpdater(id, 'Logged In Successfully', 'success');

        const {
          data: { verifyToken },
        } = await VerifyToken({ variables: { token: data?.logIn } });
        setUser(verifyToken);

        if (!verifyToken.emailVerified) {
          await SendOTP({
            variables: { id: verifyToken._id },
          });

          router.push('/auth/verify?type=email-verification');
          return;
        }

        router.push('/dashboard');
      } else {
        await notifUpdater(id, 'Email or Password wrong', 'error');
      }
    } catch (err) {
      await notifUpdater(id, (err as Error).message, 'error');
    }
    setLoading(false);
  };

  const goSignUp = () => {
    router.push('/auth/sign-up');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token != '') {
      router.push('/dashboard');
    }
  }, [router]);
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
              <Link
                href={'/auth/forgot-pass'}
                className="text-neutral-400 text-base"
              >
                Recover Password ?
              </Link>
            </Box>
            <Box
              blocked={loading}
              onClick={logIn}
              className={`bg-[#4461F2] ${loading && 'opacity-50'} w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base`}
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
            <Box className="justify-center items-center space-x-2">
              <Text className="text-white text-sm">
                Do not have an account?
              </Text>
              <Box onClick={goSignUp}>
                <Text className="text-[#4461f2] text-sm cursor-pointer">
                  Sign up
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
