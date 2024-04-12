'use client';

import { Box, Input, Text } from '@/components';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import { GoBack } from '@/public/pass-recovery/go-back';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import {
  CHECK_OTP,
  CHECK_OTP_FOR_FORGET_PASSWORD,
  SEND_OTP,
  SEND_OTP_FOR_FORGET_PASSWORD,
} from '@/graphql';
import { toast } from 'react-toastify';
import { AuthContext } from '@/providers';
import { notifUpdater } from '@/helper';
import { useRouter, useSearchParams } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const [CheckOTPForForgetPass] = useMutation(CHECK_OTP_FOR_FORGET_PASSWORD);
  const [CheckOTP] = useMutation(CHECK_OTP);
  const [SendOTPForForgetPass] = useMutation(SEND_OTP_FOR_FORGET_PASSWORD);
  const [SendOTP] = useMutation(SEND_OTP);
  const router = useRouter();
  const path = useSearchParams();
  const param = path.get('type');
  const { authDetails, setAuthDetails, user, setUser } =
    useContext(AuthContext);

  const checkOTP = async () => {
    if (otp == '' || !Number(otp)) {
      toast.error('verification number is invalid');
      return;
    }
    setLoading(true);

    const id = toast.loading('Please Wait ...');
    try {
      if (param == 'email-verification') {
        const { data } = await CheckOTP({
          variables: { id: user._id, otp: Number(otp) },
        });
        if (data?.checkOTP) {
          await notifUpdater(id, 'Success', 'success');
          setUser({
            ...user,
            emailVerified: 'true',
          });
          router.push('/dashboard');
        } else {
          await notifUpdater(id, 'Wrong Verification Code', 'error');
        }
      } else {
        const { data } = await CheckOTPForForgetPass({
          variables: { otp: Number(otp), email: authDetails.email },
        });

        if (data?.checkOTPForForgetPass) {
          await notifUpdater(id, 'Success', 'success');
          setAuthDetails({
            ...authDetails,
            otpToken: data?.checkOTPForForgetPass,
          });
          router.push('/auth/update-pass');
        } else {
          await notifUpdater(id, 'Wrong Verification Code', 'error');
        }
      }
    } catch (err) {
      await notifUpdater(id, 'Wrong Verification Code', 'error');
    }
    setLoading(false);
  };
  const sendOTPAgain = async () => {
    setResendLoading(true);

    const id = toast.loading('Please Wait ...');
    try {
      if (param == 'email-verification') {
        await SendOTP({
          variables: { id: user._id },
        });
      } else {
        await SendOTPForForgetPass({
          variables: { email: authDetails.email },
        });
      }

      await notifUpdater(id, 'Verification Code Sent Successfully', 'success');
    } catch (err) {
      await notifUpdater(id, (err as Error).message, 'error');
    }
    setResendLoading(false);
  };
  useEffect(() => {
    if (user._id && user._id !== '') {
      setPageLoading(false);
    } else {
      if (param == 'email-verification') {
        if (user._id == '') {
          router.push('/auth/sign-in');
          return;
        }
      } else {
        if (!authDetails.email) {
          router.push('/auth/sign-in');
          return;
        }
      }
    }
  }, [authDetails, user, pageLoading]);

  if (pageLoading) {
    return (
      <Box>
        <Text>Loading ...</Text>
      </Box>
    );
  }

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
                <Text className="text-white text-sm mt-4">
                  An authentication code has been sent to your email.
                </Text>
              </Box>
            </Box>
            <Box className="flex-col space-y-8">
              <Box className="flex-col space-y-4">
                <Input
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-full h-14 bg-white rounded-lg text-[#383838] px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
                  placeholder="Verification Code"
                />
                <Box className="flex-row space-x-1 ">
                  <Text className="text-white">Didn’t receive a code?</Text>
                  <Box
                    blocked={resendLoading}
                    className={`text-[#515DEF] ${resendLoading && 'opacity-50'} `}
                    onClick={sendOTPAgain}
                  >
                    Resend
                  </Box>
                </Box>
              </Box>
              <Box
                blocked={loading}
                className={`bg-[#4461F2] ${loading && 'opacity-50'} w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base`}
                onClick={checkOTP}
              >
                Verify
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Verify />
    </Suspense>
  );
};
export default Page;
