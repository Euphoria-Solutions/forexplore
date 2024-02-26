import React from 'react';
import { Box } from '../box';
import Image from 'next/image';
import partnerIconPath from '@/public/icons/partner-image.svg';
import HiddenInfo from './hidden-info';
import Payment from './payment';

const MidScroll = () => {
  return (
    <Box className="flex-col items-center space-y-[120px]">
      <Box className="space-y-[27px] flex-col items-center">
        <Box className="text-white text-xl">Partnered with</Box>
        <Box className="flex-row space-x-[178px]">
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
      <Box>
        <HiddenInfo></HiddenInfo>
      </Box>
      <Payment></Payment>
    </Box>
  );
};

export default MidScroll;
