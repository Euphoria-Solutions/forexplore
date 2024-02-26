import React from 'react';
import { Box } from '../box';
import pathLogo from '@/public/logo/logo1.svg';
import Image from 'next/image';
import { Text } from '../text';
import pathFbIcon from '@/public/icons/facebook-icon.svg';
import pathIgIcon from '@/public/icons/instagram-icon.svg';
const Footer = () => {
  return (
    <Box className="flex-row space-x-[111px]">
      <Box className="flex-col text-white w-[360px] space-y-[20px]">
        <Box className="flex-row items-center space-x-[10px]">
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
      <Box className="space-x-[144px]">
        <Box className="space-x-[92px]">
          <Box className="flex-col text-white w-[160px] space-y-[32px]">
            <Text className="font-bold text-lg">Product</Text>
            <Box className="flex-col space-y-[6.5px]">
              <Text>Home</Text>
              <Text>Pricing</Text>
              <Text>Features</Text>
              <Text>Contact</Text>
            </Box>
          </Box>
          <Box className="flex-col text-white w-[150px] space-y-[32px]">
            <Text className="font-bold text-lg ">Company</Text>
            <Box className="flex-col space-y-[16px]">
              <Text>About Us</Text>
              <Text>FAQs</Text>
            </Box>
          </Box>
        </Box>
        <Box className="flex-col text-white space-y-[32px]">
          <Text className="font-bold text-lg">Follow us</Text>
          <Box className="flex-row space-x-[16px]">
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
