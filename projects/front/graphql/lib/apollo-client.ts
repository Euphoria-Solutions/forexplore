import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

const uri =
  process.env.CURRENT_ENV == 'PROD'
    ? process.env.NEXT_PUBLIC_BACKEND_API_PROD
    : process.env.NEXT_PUBLIC_BACKEND_API_DEV;

const httpLink = createHttpLink({
  uri: uri,
  fetch,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');

  operation.setContext({
    headers: {
      token: token || '',
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
