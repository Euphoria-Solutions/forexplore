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
  process.env[
    `BACKEND_API_${process.env.CURRENT_ENV == 'PROD' ? 'PROD' : 'DEV'}`
  ];

const httpLink = createHttpLink({
  // uri: "http://localhost:3001/api/graphql",
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
