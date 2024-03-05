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
  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <Box className="w-screen h-screen">{children}</Box>
      </DataProvider>
    </ApolloProvider>
  );
};
