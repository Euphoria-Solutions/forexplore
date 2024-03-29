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
    _id: string;
    username: string;
    emailVerified: string;
  };
  setUser: Dispatch<
    SetStateAction<{
      _id: string;
      username: string;
      emailVerified: string;
    }>
  >;
  setAuthDetails: Dispatch<
    SetStateAction<{
      email: string;
      otpToken: string;
    }>
  >;
  authDetails: {
    email: string;
    otpToken: string;
  };
}

export const AuthContext = createContext<AuthContext>({
  user: {
    _id: '',
    username: '',
    emailVerified: '',
  },
  authDetails: {
    email: '',
    otpToken: '',
  },
} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    _id: '',
    username: '',
    emailVerified: '',
  });
  const [authDetails, setAuthDetails] = useState({
    email: '',
    otpToken: '',
  });

  return (
    <AuthContext.Provider
      value={{ user, setUser, authDetails, setAuthDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};
