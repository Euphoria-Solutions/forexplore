import React from 'react';
import { Box } from '../box';
import Image from 'next/image';
import partnerIconPath from '@/public/icons/partner-image.svg';
import HiddenInfo from './hidden-info';
import Payment from './payment';

const MidScroll = () => {
  return (
    <Box className="flex flex-col items-center space-y-24">
      <Box className="flex flex-col items-center space-y-7">
        <Box className="text-white text-xl">Partnered with</Box>
        <Box className="flex flex-row space-x-44 justify-center">
          <Image
            src={partnerIconPath.src}
            alt="Partner Icon"
            width={65}
            height={65}
          />
          <Image
            src={partnerIconPath.src}
            alt="Partner Icon"
            width={65}
            height={65}
          />
          <Image
            src={partnerIconPath.src}
            alt="Partner Icon"
            width={65}
            height={65}
          />
          <Image
            src={partnerIconPath.src}
            alt="Partner Icon"
            width={65}
            height={65}
          />
          <Image
            src={partnerIconPath.src}
            alt="Partner Icon"
            width={65}
            height={65}
          />
        </Box>
      </Box>
      <Box className="flex-col">
        <Box></Box>
        <HiddenInfo></HiddenInfo>
      </Box>
      <Payment></Payment>
    </Box>
  );
};

export default MidScroll;
