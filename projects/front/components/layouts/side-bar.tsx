'use client';
import { Box } from '../box';
// import Image from 'next/image';
// import pathLogo from '@/public/dashboard-sidebar/logo.svg';
// import SideBarButton from '../dashboard/side-bar-button';
// import pathNotification from '@/public/dashboard-sidebar/notification.svg';
// import pathSettings from '@/public/dashboard-sidebar/settings.svg';
// import pathBack from '@/public/dashboard-sidebar/back.svg';
import React, { useState } from 'react';
import { Text } from '../text';
import { Settings } from '@/public/dashboard-sidebar/settings';
import { Back } from '@/public/dashboard-sidebar/back';
import { Logo } from '@/public/dashboard-sidebar/logo';
const SideBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  return (
    <Box
      className={`${isHovered ? 'w-max' : 'w-[4vw]'} absolute left-0  bg-white h-screen transition-all ease-in-out duration-300 space-y-6 z-50 flex-col items-center`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Logo></Logo>
      <Box className="w-full flex-col h-full justify-between">
        <Box className="flex-col w-full">
          {/* <SideBarButton
            iconBaseName="dashboard"
            route="/dashboard"
            label="Dashboard"
            isHovered={isHovered}
          />

          <SideBarButton
            iconBaseName="history"
            route="/dashboard/trades"
            label="Trades"
            isHovered={isHovered}
          />

          <SideBarButton
            iconBaseName="analytics"
            route="/dashboard/analytics"
            label="Analytics"
            isHovered={isHovered}
          />

          <SideBarButton
            iconBaseName="users"
            route="/dashboard/users"
            label="Users"
            isHovered={isHovered}
          /> */}
        </Box>
        <Box className="flex-col space-y-7 items-center mb-16">
          {/* <Box className="items-center justify-center">
            <Image
              src={pathNotification.src}
              alt={'notification'}
              width={15}
              height={15}
            ></Image>
            <Text className={`${!isHovered && 'hidden'}`}>notification</Text>
          </Box> */}
          <Box className="items-center justify-center">
            <Settings></Settings>
            <Text className={`${!isHovered && 'hidden'}`}>notification</Text>
          </Box>
          <Box className="items-center justify-center">
            <Back></Back>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
