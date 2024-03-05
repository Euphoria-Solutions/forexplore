'use client';

import { Box, Input, Text } from '@/components';
import { LOGIN_MUTATION } from '@/graphql';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const [user, setUser] = useState({
    email: 'itgeltugsjargal421@gmail.com',
    password: '12345678',
  });
  const [Login] = useMutation(LOGIN_MUTATION);
  const router = useRouter();

  const login = async () => {
    try {
      const { data } = await Login({
        variables: {
          email: user.email,
          password: user.password,
        },
      });

      if (data?.logIn) {
        localStorage.setItem('token', data?.logIn);

        router.push('/home');
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return (
    <Box className="w-full h-full flex-col items-center justify-center space-y-5">
      <Text>
        FRONTEND ENVIRONMENT:{' '}
        {process.env.NEXT_PUBLIC_CURRENT_ENV == 'PROD' ? 'PROD' : 'DEV'}
      </Text>

      <Text>LOGIN</Text>

      <Box className="flex-col items-center space-y-5">
        <Input
          className="border rounded-md border-[black] p-1 px-2"
          placeholder="email"
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
        />
        <Input
          className="border rounded-md border-[black] p-1 px-2"
          placeholder="password"
          value={user.password}
          onChange={e => setUser({ ...user, password: e.target.value })}
        />

        <Box
          onClick={login}
          className="w-[100px] h-[40px] bg-[black] rounded-md text-[white] justify-center items-center cursor-pointer"
        >
          Login
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
