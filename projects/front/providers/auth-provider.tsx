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
}

export const AuthContext = createContext<AuthContext>({
  user: {
    _id: '',
    username: '',
    emailVerified: '',
  },
} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    _id: '',
    username: '',
    emailVerified: '',
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
