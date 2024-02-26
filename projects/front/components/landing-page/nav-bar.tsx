import React from 'react';
import { Box } from '@/components/box';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <Box className="flex flex-row space-x-[557px] h-[69px] items-center mb-[81px]">
      <Image
        src="/logo/logo1.svg"
        width={50}
        height={69}
        alt="Picture of the author"
      ></Image>
      <Box className="space-x-[45px] py-[45px]">
        <Link href="/" className="text-white text-xl font-bold">
          Home
        </Link>
        <Link href="/features" className="text-white text-xl font-medium">
          Features
        </Link>
        <Link href="/pricing" className="text-white text-xl font-medium">
          Pricing
        </Link>
        <Link href="/contacts" className="text-white text-xl font-medium">
          Contact
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
