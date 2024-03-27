'use client';

import React, { useEffect, useState } from 'react';
import { Box, Text, Input } from '@/components';
import Image from 'next/image';
import logoPath from '@/public/sign-inup/logo.svg';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import SignInWithGoogle from './sign-in-with-google';
import HideButton from './hide-button';
import { toast } from 'react-toastify';
import { checkPasswordStrength, notifUpdater } from '@/helper';
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '@/graphql';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const SignUpLayout = () => {
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

    const id = toast.loading('Please Wait ...');
    try {
      await SignUp({
        variables: user,
      });

      await notifUpdater(id, 'Signed Up Successfully', 'success');
    } catch (err) {
      if ((err as Error).message.includes('E11000')) {
        if ((err as Error).message.includes('username')) {
          await notifUpdater(id, 'Username already taken', 'error');
          return;
        }
        if ((err as Error).message.includes('email')) {
          await notifUpdater(id, 'Email already taken', 'error');
          return;
        }
      }
      await notifUpdater(id, (err as Error).message, 'error');
    }
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
                  value={user.username}
                  onChange={e => setUser({ ...user, username: e.target.value })}
                  className="w-full h-14 bg-white rounded-lg text-black px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
                  placeholder="Enter username"
                />
                <Input
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                  className="w-full h-14 bg-white rounded-lg text-black px-4 border placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
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
                />
              </Box>
              <Link href={'/'} className="text-neutral-400">
                Already have an account?
              </Link>
            </Box>
            <Box className="flex-col space-y-7">
              <Box
                onClick={signUp}
                className="bg-[#4461F2] w-full h-[57px] justify-center items-center text-white rounded-xl font-bold text-base"
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

export default SignUpLayout;
