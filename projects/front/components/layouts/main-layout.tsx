'use client';

import { ReactNode } from 'react';
import { Box } from '..';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { DataProvider } from '@/providers/data-provider';
import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';

interface LayoutType {
  children?: ReactNode;
}

const uri =
  process.env.CURRENT_ENV == 'PROD'
    ? process.env.NEXT_PUBLIC_BACKEND_API_PROD
    : process.env.NEXT_PUBLIC_BACKEND_API_DEV;

const httpLink = createHttpLink({
  uri: uri,
  fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const MainLayout = ({ children }: LayoutType) => {
  const path = usePathname();
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
