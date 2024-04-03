'use client';

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

interface AuthContext {
  user: {
    _id: string | null;
    username: string | null;
    emailVerified: string | null;
  };
  setUser: Dispatch<
    SetStateAction<{
      _id: string | null;
      username: string | null;
      emailVerified: string | null;
    }>
  >;
  setAuthDetails: Dispatch<
    SetStateAction<{
      email: string | null;
      otpToken: string | null;
    }>
  >;
  authDetails: {
    email: string | null;
    otpToken: string | null;
  };
}

export const AuthContext = createContext<AuthContext>({
  user: {
    _id: null,
    username: null,
    emailVerified: null,
  },
  authDetails: {
    email: null,
    otpToken: null,
  },
} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    _id: string | null;
    username: string | null;
    emailVerified: string | null;
  }>({
    _id: null,
    username: null,
    emailVerified: null,
  });
  const [authDetails, setAuthDetails] = useState<{
    email: string | null;
    otpToken: string | null;
  }>({
    email: null,
    otpToken: null,
  });

  return (
    <AuthContext.Provider
      value={{ user, setUser, authDetails, setAuthDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};
