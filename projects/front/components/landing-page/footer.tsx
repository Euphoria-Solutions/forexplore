import React, { useContext } from 'react';
import { Box } from '../box';
import pathLogo from '@/public/logo/logo1.svg';
import Image from 'next/image';
import { Text } from '../text';
import pathFbIcon from '@/public/icons/facebook-icon.svg';
import Link from 'next/link';
import pathIgIcon from '@/public/icons/instagram-icon.svg';
import { DataContext } from '@/providers/data-provider';
const Footer = () => {
  const { setData } = useContext(DataContext);
  return (
    <Box className="flex-row space-x-28">
      <Box className="flex-col text-white w-72 space-y-5">
        <Box className="flex-row items-center space-x-3">
          <Image
            src={pathLogo.src}
            alt="logo"
            width={24}
            height={32.28}
          ></Image>
          <Text className="text-2xl">Forexplore</Text>
        </Box>
        <Box className="flex-col">
          <Text>Wanna Earn? Start Learning</Text>
          <Text>Wanna Learn? Use Forexplore</Text>
        </Box>
      </Box>
      <Box className="space-x-36">
        <Box className="space-x-24">
          <Box className="flex-col text-white w-40 space-y-8">
            <Text className="font-bold text-lg">Product</Text>
            <Box className="flex-col space-y-2">
              <Box onClick={() => setData({ section: 'home' })}>Home</Box>
              <Box onClick={() => setData({ section: 'features' })}>
                Features
              </Box>
              <Box onClick={() => setData({ section: 'pricing' })}>Pricing</Box>
              <Link href={''}>Contact</Link>
            </Box>
          </Box>
          <Box className="flex-col text-white w-40 space-y-8">
            <Text className="font-bold text-lg">Company</Text>
            <Box className="flex-col space-y-4">
              <Text>About Us</Text>
            </Box>
          </Box>
        </Box>
        <Box className="flex-col text-white space-y-8">
          <Text className="font-bold text-lg">Follow us</Text>
          <Box className="flex-row space-x-4">
            <Image
              src={pathFbIcon.src}
              alt="logo"
              width={12}
              height={22}
            ></Image>
            <Image
              src={pathIgIcon.src}
              alt="logo"
              width={22}
              height={22}
            ></Image>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
