import React from 'react';
import pathIdGr from '@/public/icons/Identifier_green.svg';
import pathIdRed from '@/public/icons/Identifier_red.svg';
import { Box, Text } from '@/components/index';
import Image from 'next/image';
const LinearDiagramDecorator = () => {
  return (
    <Box className="flex-row justify-between">
      <Box className="flex-col">
        <Text className="text-sm">Statistics</Text>
        <Text>Profit, loss ratio</Text>
      </Box>
      <Box className="space-x-3">
        <Box className="flex-row items-center space-x-2">
          <Image src={pathIdGr.src} alt="gr" width={4} height={4}></Image>
          <Text className="text-xs">Profit</Text>
        </Box>
        <Box className="flex-row items-center space-x-2">
          <Image
            src={pathIdRed.src}
            alt="RedpathIdRed"
            width={4}
            height={4}
          ></Image>
          <Text className="text-xs">Loss</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LinearDiagramDecorator;
