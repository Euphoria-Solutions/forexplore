'use client';

import { Box, Text } from '@/components';
import { AuthContext } from '@/providers';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const Page = () => {
  const router = useRouter();
  const { setUser, setAuthDetails } = useContext(AuthContext);
  const signOut = () => {
    localStorage.removeItem('token');

    setUser({
      _id: null,
      emailVerified: null,
      username: null,
    });

    setAuthDetails({
      otpToken: null,
      email: null,
    });

    router.push('/auth/sign-in');
  };

  return (
    <Box className="flex-col space-y-2 justify-center items-center w-full">
      <Text>FEATURES</Text>
      <Box className="border border-black rounded-lg p-2" onClick={signOut}>
        <Text>Sign Out</Text>
      </Box>
    </Box>
  );
};

export default Page;
