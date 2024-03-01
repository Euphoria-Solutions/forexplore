'use client';

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

interface DataContext {
  data: {
    section: string;
  };
  setData: Dispatch<SetStateAction<{ section: string }>>;
}

export const DataContext = createContext<DataContext>({
  data: {
    section: '',
  },
} as DataContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({
    section: '',
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
