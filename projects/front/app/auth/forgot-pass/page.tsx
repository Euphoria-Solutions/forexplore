'use client';

import { Box, Input, Text } from '@/components';
import React, { useContext, useState } from 'react';
import { Poppins } from 'next/font/google';
import SignInWithGoogle from '@/components/sign-inup/sign-in-with-google';
import { GoBack } from '@/public/pass-recovery/go-back';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { SEND_OTP_FOR_FORGET_PASSWORD } from '@/graphql';
import { toast } from 'react-toastify';
import { notifUpdater } from '@/helper';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [SendOTPForForgetPassword] = useMutation(SEND_OTP_FOR_FORGET_PASSWORD);

  const { setAuthDetails } = useContext(AuthContext);

  const sendOTP = async () => {
    if (email == '') {
      toast.error('Email is missing');
      return;
    }
    setLoading(true);

    const id = toast.loading('Please Wait ...');
    try {
      await SendOTPForForgetPassword({
        variables: { email },
      });

      await notifUpdater(id, 'OTP Sent', 'success', 1000);

      setAuthDetails(prev => ({ ...prev, email }));

      router.push('/auth/verify');
    } catch (err) {
      await notifUpdater(id, (err as Error).message, 'error');
    }
    setLoading(false);
  };

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
              <Box className="flex-col items-start space-y-4">
                <Link href={'/auth/sign-in'}>
                  <Box className="flex-row text-white items-center space-x-3 mb-4">
                    <GoBack />
                    <Text className="text-sm">Back to login</Text>
                  </Box>
                </Link>
                <Text className="text-white font-bold text-2xl mb-4">
                  Forgot your password?
                </Text>
                <Text className="text-white text-base">
                  Enter your email below to reset your password
                </Text>
              </Box>
            </Box>
            <Box className="flex-col space-y-8">
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-14 bg-white rounded-lg text-[#383838] px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
                placeholder="Email"
              />
              <Box
                blocked={loading}
                onClick={sendOTP}
                className={`bg-[#4461F2] ${loading && 'opacity-50'} w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base`}
              >
                Submit
              </Box>
            </Box>
            <Box className="flex-row items-center">
              <Box className="h-px w-full bg-[#E7E7E7]"></Box>
              <Text className="px-2 text-[#E7E7E7] whitespace-nowrap text-sm">
                Or Login with
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

export default SignIn;
