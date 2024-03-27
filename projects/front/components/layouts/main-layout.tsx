'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { Box } from '@/components';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  useMutation,
} from '@apollo/client';
import { AuthContext, DataProvider } from '@/providers';
import { VERIFY_TOKEN_MUTATION } from '@/graphql';
import { usePathname, useRouter } from 'next/navigation';

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
  const { setUser } = useContext(AuthContext);
  const path = usePathname();
  const router = useRouter();
  const [VerifyToken] = useMutation(VERIFY_TOKEN_MUTATION, { client });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token') ?? '';
      const { data } = await VerifyToken({ variables: { token } });

      setUser(data.verifyToken);

      if (path != '/' && data.verifyToken._id == '') {
        router.push('/sign-in');
      }
    };

    verifyToken();
  }, [VerifyToken, setUser]);

  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <Box className="w-screen h-screen">{children}</Box>
      </DataProvider>
    </ApolloProvider>
  );
};
