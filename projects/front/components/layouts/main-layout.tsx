'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { Box } from '..';
import { ApolloProvider, useMutation } from '@apollo/client';
import { DataProvider } from '@/providers/data-provider';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from './navbar';
import { client, VERIFY_TOKEN_MUTATION } from '@/graphql';
import { AuthContext } from '@/providers';

interface LayoutType {
  children?: ReactNode;
}

export const MainLayout = ({ children }: LayoutType) => {
  const path = usePathname();
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [VerifyToken] = useMutation(VERIFY_TOKEN_MUTATION, { client });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token') ?? '';
      const { data } = await VerifyToken({ variables: { token } });

      setUser(data.verifyToken);
      if (path != '/' && !path.includes('auth') && !data.verifyToken) {
        router.push('/auth/sign-in');
      }
    };

    verifyToken();
  }, [VerifyToken, setUser]);

  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <Box className="w-screen h-screen">
          {path.startsWith('/dashboard') ? (
            <Box className={`flex-row`}>
              <Box></Box>
              <Box>{children}</Box>
            </Box>
          ) : (
            <Box>
              {path.startsWith('/auth') ? (
                <Box className={`w-screen h-screen flex-col`}>
                  <Navbar />
                  <Box className={`h-full`}>{children}</Box>
                </Box>
              ) : (
                <Box>{children}</Box>
              )}
            </Box>
          )}
        </Box>
      </DataProvider>
    </ApolloProvider>
  );
};
