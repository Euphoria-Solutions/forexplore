'use client';

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

interface User {
  _id: string;
  username: string;
  emailVerified: boolean;
}

interface UserContext {
  user: {
    _id: string;
    username: string;
    emailVerified: boolean;
  };
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContext>({
  user: {
    _id: '',
    username: '',
    emailVerified: false,
  },
} as UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    _id: '',
    username: '',
    emailVerified: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
