'use client';
import { Box, Text } from '@/components';
import {
  AccountSettings,
  LoginSecurity,
  TradeImport,
} from '@/components/settings-page';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

const Settings = () => {
  const path = useSearchParams();
  const [tab, setTab] = useState(0);
  const handleTabChange = (number: number) => {
    setTab(number);
  };
  const getColor = (number: number) => {
    if (number == tab) {
      return 'black';
    } else {
      return 'gray';
    }
  };

  useEffect(() => {
    const section = path.get('section');

    setTab(section == 'import' ? 2 : 0);
  }, [path]);

  return (
    <Box
      className={`py-12 px-7 mb-auto rounded-md flex-col gap-6 w-full ml-5 bg-[white]`}
    >
      <Box className={`flex h-fit gap-3 ${tab == 2 ? 'mb-4' : 'mb-12'}`}>
        <button onClick={() => handleTabChange(0)} className="flex flex-col">
          <Text className={`px-3 font-medium text-xl text-${getColor(0)}`}>
            Account Setting
          </Text>
          <Box className={`w-full h-[2px] rounded-full bg-${getColor(0)}`} />
        </button>
        <button onClick={() => handleTabChange(1)} className="flex flex-col">
          <Text className={`px-3 font-medium text-xl text-${getColor(1)}`}>
            Login & Security
          </Text>
          <Box className={`w-full h-[2px] rounded-full bg-${getColor(1)}`} />
        </button>
        <button onClick={() => handleTabChange(2)} className="flex flex-col">
          <Text className={`px-3 font-medium text-xl text-${getColor(2)}`}>
            Import
          </Text>
          <Box className={`w-full h-[2px] rounded-full bg-${getColor(2)}`} />
        </button>
      </Box>
      {tab == 0 && <AccountSettings />}

      {tab == 1 && <LoginSecurity />}

      {tab == 2 && <TradeImport />}
    </Box>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Settings />
    </Suspense>
  );
};

export default Page;
