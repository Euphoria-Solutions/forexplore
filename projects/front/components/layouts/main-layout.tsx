'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { Box } from '..';
import { ApolloProvider, useMutation } from '@apollo/client';
import { DataProvider } from '@/providers/data-provider';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from './navbar';
import { client, VERIFY_TOKEN_MUTATION } from '@/graphql';
import { AuthContext } from '@/providers';
import SideBar from './side-bar';

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
      try {
        const token = localStorage.getItem('token') ?? '';
        const { data } = await VerifyToken({ variables: { token } });

        setUser(data.verifyToken);
      } catch (err) {
        setUser({
          _id: '',
          emailVerified: '',
          username: '',
        });

        if (path != '/' && !path.includes('auth')) {
          router.push('/auth/sign-in');
        }
      }
    };

    verifyToken();
  }, [VerifyToken, setUser]);

  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <Box className="w-screen h-screen">
          {path.startsWith('/dashboard') || path.startsWith('/settings') ? (
            <Box className={`relative w-full h-full justify-end`}>
              <SideBar />
              <Box className="w-[94.44%] overflow-y-scroll h-max scrollbar-hide bg-[#F3F4FA]">
                {children}
              </Box>
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
