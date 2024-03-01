'use client';

import React, { useContext } from 'react';
import { Box } from '@/components/box';
import Image from 'next/image';
import Link from 'next/link';
import { DataContext } from '@/providers/data-provider';

const Navbar = () => {
  const { setData } = useContext(DataContext);

  return (
    <Box className="flex flex-row items-center h-16 mb-20 px-12 justify-between">
      <Image src="/logo/logo1.svg" width={50} height={69} alt="Logo" />
      <Box className="flex space-x-8">
        <Box
          onClick={() => setData({ section: 'features' })}
          className="text-white text-xl font-medium"
        >
          Features
        </Box>
        <Box
          onClick={() => setData({ section: 'pricing' })}
          className="text-white text-xl font-medium"
        >
          Pricing
        </Box>
        <Link href={'/contacts'} className="text-white text-xl font-medium">
          Contact
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
