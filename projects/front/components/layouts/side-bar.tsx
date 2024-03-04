'use client';
import React, { useState } from 'react';
import SideBarButton from '../analytics/side-bar-button';
import { Box } from '@/components';
import { Logo } from '@/public/dashboard-sidebar';
const SideBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  return (
    <Box
      className={`${isHovered ? 'w-max' : 'w-[4%]'} fixed left-0 bg-white h-screen transition-all ease-in-out duration-300 space-y-6 z-50 flex-col items-center`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Logo></Logo>
      <Box className="w-full flex-col h-full justify-between">
        <Box className="flex-col w-full">
          <SideBarButton
            route="/dashboard"
            label="Dashboard"
            isHovered={isHovered}
          />

          <SideBarButton
            route="/dashboard/trades"
            label="Trades"
            isHovered={isHovered}
          />

          <SideBarButton
            route="/dashboard/analytics"
            label="Analytics"
            isHovered={isHovered}
          />

          <SideBarButton
            route="/dashboard/users"
            label="Users"
            isHovered={isHovered}
          />
        </Box>
        <Box className="flex-col space-y-5 mb-16">
          <SideBarButton
            route="/settings"
            label="Settings"
            isHovered={isHovered}
          />
          <SideBarButton route="/" label="Logout" isHovered={isHovered} />
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
