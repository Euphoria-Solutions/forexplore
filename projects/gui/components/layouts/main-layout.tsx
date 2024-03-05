'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { Box } from '..';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  useMutation,
} from '@apollo/client';
import { usePathname, useRouter } from 'next/navigation';
import { VERIFY_TOKEN_MUTATION } from '@/graphql';
import { UserContext } from '@/providers';

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
  const router = useRouter();
  const path = usePathname();
  const { setUser } = useContext(UserContext);

  const [verifyToken] = useMutation(VERIFY_TOKEN_MUTATION, { client });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const accessToken = localStorage.getItem('token');

        const { data } = await verifyToken({
          variables: {
            token: accessToken,
          },
        });

        if (data?.verifyToken) {
          setUser(data?.verifyToken);

          return;
        }
        router.push('/');
      } catch (e) {
        router.push('/');
      }
    };

    if (path != '/') {
      verifyUser();
    }
  }, [path, router, setUser, verifyToken]);

  return (
    <ApolloProvider client={client}>
      <Box className="w-screen h-screen">{children}</Box>
    </ApolloProvider>
  );
};
