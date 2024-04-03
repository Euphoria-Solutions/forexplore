'use client';

import { Box, Input, Text } from '@/components';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import HideButton from '@/components/sign-inup/hide-button';
import SignInWithGoogle from '@/components/sign-inup/sign-in-with-google';
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '@/graphql';
import { toast } from 'react-toastify';
import { checkPasswordStrength, notifUpdater } from '@/helper';
import { useRouter } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const SignUp = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    birthday: '',
    type: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState({
    strength: '',
    color: '',
  });
  const [SignUp] = useMutation(SIGN_UP_MUTATION);

  const checkFields = () => {
    if (user.username == '' || user.email == '' || user.password == '') {
      toast.error('Some fields are missing');
      return;
    }

    if (user.password != user.confirmPassword) {
      toast.error('Confirm password is incorrect');
      return;
    }

    if (passwordStrength.strength == 'Weak') {
      toast.error('Password is too weak');
    }
  };

  const signUp = async () => {
    checkFields();

    setLoading(true);
    const id = toast.loading('Please Wait ...');
    try {
      const { data } = await SignUp({
        variables: user,
      });

      if (data.signUp) {
        localStorage.setItem('token', data.signUp);

        await notifUpdater(id, 'Signed Up Successfully', 'success');
        router.push('/auth/verify?type=email-verification');
      }
    } catch (err) {
      if ((err as Error).message.includes('E11000')) {
        if ((err as Error).message.includes('username')) {
          await notifUpdater(id, 'Username already taken', 'error');
          setLoading(false);
          return;
        }
        if ((err as Error).message.includes('email')) {
          await notifUpdater(id, 'Email already taken', 'error');
          setLoading(false);
          return;
        }
      }
      await notifUpdater(id, (err as Error).message, 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user.password != '') {
      setPasswordStrength(checkPasswordStrength(user.password));
    } else {
      setPasswordStrength({ strength: '', color: '' });
    }
  }, [user.password]);
  return (
    <Box className={poppins.className}>
      <Box
        className="h-full w-screen flex flex-row items-start"
        style={{ backgroundColor: 'rgb(18,19,46)' }}
      >
        <Box className="bg-white w-[50%] h-full"></Box>
        <Box
          className="flex-1 justify-center items-center flex-col pt-24"
          style={{ maxWidth: 'calc(50% + 10px)' }}
        >
          <Box className="space-y-12 flex-col w-96">
            <Box className="space-y-6 flex-col text-right">
              <Box className="flex-col space-y-7 items-center">
                <Text className="text-white font-bold text-2xl">Sign up</Text>
                <Input
                  value={user.username}
                  onChange={e => setUser({ ...user, username: e.target.value })}
                  className="w-full h-14 bg-white rounded-lg px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
                  placeholder="Enter username"
                />
                <Input
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                  className="w-full h-14 bg-white rounded-lg px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
                  placeholder="Enter email"
                />
                <Box className="flex-col items-start space-y-2">
                  <HideButton
                    value={user.password}
                    onChange={e =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="Password"
                  />
                  {passwordStrength.strength != '' && (
                    <Text className={`${passwordStrength.color} text-sm `}>
                      Status: {passwordStrength.strength}
                    </Text>
                  )}
                </Box>
                <HideButton
                  value={user.confirmPassword}
                  onChange={e =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm Password"
                ></HideButton>
              </Box>
              <Link
                href={'/auth/sign-in'}
                className="text-neutral-400 text-base"
              >
                Already have an account?
              </Link>
            </Box>
            <Box className="flex-col space-y-7">
              <Box
                blocked={loading}
                onClick={signUp}
                className={`bg-[#4461F2] ${loading && 'opacity-50'} w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base`}
              >
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

export default SignUp;
