import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const uri =
  process.env.CURRENT_ENV == 'PROD'
    ? process.env.NEXT_PUBLIC_BACKEND_API_PROD
    : process.env.NEXT_PUBLIC_BACKEND_API_DEV;

const httpLink = createHttpLink({
  uri: uri,
  fetch,
});

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: httpLink,
  cache: new InMemoryCache(),
});
