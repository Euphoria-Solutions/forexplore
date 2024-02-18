'use client';

import { ReactNode } from 'react';
import { Box } from '..';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

interface LayoutType {
  children?: ReactNode;
}

const httpLink = createHttpLink({
  // uri: "http://localhost:3001/api/graphql",
  uri: 'https://tooto-support-backend-six.vercel.app/api/graphql',
  fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const MainLayout = ({ children }: LayoutType) => {
  return (
    <ApolloProvider client={client}>
      <Box className="w-screen h-screen">{children}</Box>
    </ApolloProvider>
  );
};
