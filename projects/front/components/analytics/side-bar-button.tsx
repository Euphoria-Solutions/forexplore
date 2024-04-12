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
        className={`flex items-center relative cursor-pointer ${isHovered ? 'w-max' : 'w-full'} ${isActive ? 'bg-[#F2FCF2]' : 'bg-white'} h-10`}
      >
        <Box
          className={`relative w-${isHovered ? '52' : 'full'} h-full flex items-center`}
        >
          <Box className="z-40 h-max items-center absolute">
            {isActive && label != 'Logout' && <IndicatorIcon />}
          </Box>
          <Box className={`${isHovered ? 'w-max ml-10' : 'w-full'}`}>
            <Box
              className={`flex items-center justify-center w-full h-full relative gap-x-2 z-50`}
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
              {label == 'Settings' && (
                <SettingsIcon fill={isActive ? '#00DF16' : '#000000'} />
              )}
              {label == 'Logout' && <LogoutIcon />}
              <Text
                className={`${!isHovered && 'hidden'} font-medium text-sm text-[#2B2E48]`}
              >
                {label}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default SideBarButton;
