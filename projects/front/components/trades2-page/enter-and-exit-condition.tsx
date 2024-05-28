import React from 'react';
import { Box, Text } from '@/components';
import { RectangleAngle } from '@/public/';

interface PropsType {
  type: 'Entry' | 'Exit';
}

export const EnterAndExitCondition = ({ type }: PropsType) => {
  return (
    <Box className="flex-col">
      <Text className="font-semibold text-lg ">{type} When</Text>
      <Box className="ml-3">
        <RectangleAngle />
      </Box>
    </Box>
  );
};
