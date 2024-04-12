'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Text } from '@/components';
import { IndicatorIcon } from '@/public/dashboard-sidebar/active-indicator';
interface SideBarButtonProps {
  iconBaseName: string;
  route: string;
  label: string;
  isHovered: boolean;
}

// eslint-disable-next-line complexity
const SideBarButton: React.FC<SideBarButtonProps> = ({
  iconBaseName,
  route,
  label,
  isHovered,
}) => {
  const currentPath = usePathname();
  const isActive =
    currentPath === route ||
    (route === '/dashboard' && (currentPath === '' || currentPath === '/'));

  const iconPath = `/dashboard-sidebar/${'inactive'}_${iconBaseName}.svg`;

  return (
    <Link href={route}>
      <Box
        className={`flex items-center relative cursor-pointer w-${isHovered ? 'max' : 'full'} h-10`}
      >
        <Box
          className={`relative w-${isHovered ? 'max' : 'full'} h-full flex items-center`}
        >
          <Box className="z-40 h-full items-center absolute">
            {isActive && <IndicatorIcon fill={'#00DF16'} />}
          </Box>
          <Box
            className={`flex items-center justify-center w-${isHovered ? 'max' : 'full'} h-full relative z-50 ${isHovered ? 'mx-5' : ''}`}
          >
            <Image src={iconPath} alt={label} width={15} height={15} />
            <Text
              className={`${!isHovered && 'hidden'} ${isActive ? 'text-[#00DF16]' : 'text-black'}`}
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
