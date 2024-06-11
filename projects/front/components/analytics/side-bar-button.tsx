'use client';
import React, { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  DashboardIcon,
  CalendarIcon,
  AnalyticsIcon,
  TradesIcon,
  SettingsIcon,
  LogoutIcon,
  IndicatorIcon,
} from '@/public/dashboard-sidebar';
import { Box, Text } from '@/components';

interface SideBarButtonProps {
  route: string;
  label: string;
  isHovered: boolean;
  onClick?: () => void;
}

// eslint-disable-next-line complexity
const SideBarButton: React.FC<SideBarButtonProps> = ({
  route,
  label,
  isHovered,
  onClick,
}) => {
  const currentPath = usePathname();
  const router = useRouter();

  const isActive =
    route === '/dashboard'
      ? currentPath === route
      : currentPath.startsWith(route);

  const go = useCallback(() => {
    if (label === 'Logout') {
      localStorage.clear();
    }
    router.push(route);
  }, [label, route, router]);

  const IconComponent = (() => {
    switch (label) {
      case 'Dashboard':
        return DashboardIcon;
      case 'Trades':
        return TradesIcon;
      case 'Analytics':
        return AnalyticsIcon;
      case 'Calendar':
        return CalendarIcon;
      case 'Settings':
        return SettingsIcon;
      case 'Logout':
        return LogoutIcon;
      default:
        return null;
    }
  })();

  return (
    <Box onClick={go}>
      <Box
        className={`flex items-center relative cursor-pointer ${isHovered ? 'w-max' : 'w-full'} ${isActive ? 'bg-[#F2FCF2]' : 'bg-white'} h-10`}
        onClick={onClick}
      >
        <Box
          className={`relative w-${isHovered ? '52' : 'full'} h-full flex items-center`}
        >
          <Box className="z-40 h-max items-center absolute">
            {isActive && label !== 'Logout' && <IndicatorIcon />}
          </Box>
          <Box className={`${isHovered ? 'w-max ml-10' : 'w-full'}`}>
            <Box
              className={`flex items-center justify-center w-full h-full relative gap-x-2 z-50`}
            >
              {IconComponent && (
                <IconComponent fill={isActive ? '#00DF16' : '#000000'} />
              )}
              <Text
                className={`${!isHovered && 'hidden'} font-medium text-sm text-[#2B2E48]`}
              >
                {label}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBarButton;
