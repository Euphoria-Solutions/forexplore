'use client';

import { Box, Text } from '@/components';
import { UserContext } from '@/providers';
import { useContext } from 'react';

const getOperatingSystem = () => {
  const { platform } = navigator;

  if (platform.startsWith('Win')) return 'windows';
  if (platform.startsWith('Mac')) return 'mac';
  return 'Unknown';
};

const Page = () => {
  const { user } = useContext(UserContext);

  const installEA = (platform: string) => {
    window.electronAPI.installEA(platform);

    // window.electronAPI.responseOfInstallEA(data => {
    //   console.log('Installation response received:', data);
    // });
  };

  const handleDownload = async (platform: string) => {
    try {
      const os = getOperatingSystem();
      const response = await fetch(`/api/file?os=${os}&platform=${platform}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        platform == 'mt5'
          ? 'forexplore_ea_script.mq5'
          : 'forexplore_ea_script.mq4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading local file:', error);
    }
  };

  return (
    <Box className="w-full h-full flex-col justify-center items-center space-y-4">
      <Text>user: {user.username}</Text>
      <Text>Install EA Script on</Text>
      <Box className="space-x-4 justify-center items-center">
        <Box
          onClick={() => installEA('mt4')}
          className="p-3 rounded-md bg-[black] w-fit"
        >
          <Text className="text-[white]">MT4</Text>
        </Box>

        <Box
          onClick={() => installEA('mt5')}
          className="p-3 rounded-md bg-[black] w-fit"
        >
          <Text className="text-[white]">MT5</Text>
        </Box>
      </Box>

      <Text>Download EA Script Manually</Text>
      <Box className="space-x-4 justify-center items-center">
        <Box
          onClick={() => handleDownload('mt4')}
          className="p-3 rounded-md bg-[black] w-fit"
        >
          <Text className="text-[white]">MT4</Text>
        </Box>

        <Box
          onClick={() => handleDownload('mt5')}
          className="p-3 rounded-md bg-[black] w-fit"
        >
          <Text className="text-[white]">MT5</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
