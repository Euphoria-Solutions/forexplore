'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DashboardIcon,
  UsersIcon,
  AnalyticsIcon,
  TradesIcon,
  SettingsIcon,
  LogoutIcon,
  IndicatorIcon,
} from '@/public/dashboard-sidebar';
interface SideBarButtonProps {
  route: string;
  label: string;
  isHovered: boolean;
}
import { Box, Text } from '@/components';

// eslint-disable-next-line complexity
const SideBarButton: React.FC<SideBarButtonProps> = ({
  route,
  label,
  isHovered,
}) => {
  const currentPath = usePathname();
  const isActive = currentPath === route;

  console.log(isActive);

  return (
    <Link href={route}>
      <Box
        className={`flex items-center relative cursor-pointer w-${isHovered ? 'max' : 'full'} h-10`}
      >
        <Box
          className={`relative w-${isHovered ? 'max' : 'full'} h-full flex items-center`}
        >
          <Box className="z-40 h-full items-center absolute">
            {isActive && label != 'Settings' && label != 'Logout' && (
              <IndicatorIcon />
            )}
          </Box>
          <Box
            className={`flex items-center justify-center w-${isHovered ? 'max' : 'full'} h-full relative space-x-1 z-50 ${isHovered ? 'mx-10' : ''}`}
          >
            {label == 'Dashboard' && (
              <DashboardIcon fill={isActive ? '#00DF16' : '#000000'} />
            )}
            {label == 'Trades' && (
              <TradesIcon fill={isActive ? '#00DF16' : '#000000'} />
            )}
            {label == 'Analytics' && (
              <AnalyticsIcon fill={isActive ? '#00DF16' : '#000000'} />
            )}
            {label == 'Users' && (
              <UsersIcon fill={isActive ? '#00DF16' : '#000000'} />
            )}
            {label == 'Settings' && <SettingsIcon />}
            {label == 'Logout' && <LogoutIcon />}
            <Text
              className={`${!isHovered && 'hidden'} text-sm font-medium ${isActive && label != 'Settings' && label != 'Logout' ? 'text-[#00DF16]' : 'text-black'}`}
            >
              {label}
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default SideBarButton;
