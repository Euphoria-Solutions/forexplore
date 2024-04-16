'use client';

import { ReactNode, useContext, useEffect, useState } from 'react';
import { Box } from '..';
import { ApolloProvider, useMutation } from '@apollo/client';
import { DataProvider } from '@/providers/data-provider';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from './navbar';
import { VERIFY_TOKEN_MUTATION, client } from '@/graphql';
import { AuthContext } from '@/providers';
import SideBar from './side-bar';
import { Header } from './header';

interface LayoutType {
  children?: ReactNode;
}

export const MainLayout = ({ children }: LayoutType) => {
  const path = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const { setUser } = useContext(AuthContext);
  const [VerifyToken, { loading: verifyLoading }] = useMutation(
    VERIFY_TOKEN_MUTATION,
    {
      client,
    }
  );

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token') ?? '';
        const { data } = await VerifyToken({ variables: { token } });

        setUserId(data.verifyToken._id);
        setUser(data.verifyToken);
      } catch (err) {
        if (!verifyLoading) {
          setUser({
            _id: '',
            emailVerified: '',
            username: '',
          });

          if (path != '/' && !path.includes('auth')) {
            localStorage.clear();
            router.push('/auth/sign-in');
          }
        }
      }
    };
    verifyToken();
  }, [path]);

  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <Box className="w-screen h-screen">
          {path.startsWith('/dashboard') || path.startsWith('/settings') ? (
            <Box className={`relative w-full h-full justify-end`}>
              <SideBar />
              <Box className="flex-col w-[96%] overflow-y-scroll h-full scrollbar-hide bg-[#F3F4FA]">
                <Header userId={userId} />
                <Box className="z-20 h-full">{children}</Box>
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
