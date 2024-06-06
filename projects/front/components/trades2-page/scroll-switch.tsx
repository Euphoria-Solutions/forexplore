'use client';
import React from 'react';
import { Box } from '@/components';
import { SwitchOff, SwitchOn } from '@/public';

interface ScrollSwitchProps {
  clicked: boolean;
}

export const ScrollSwitch: React.FC<ScrollSwitchProps> = ({ clicked }) => {
  return <Box>{clicked ? <SwitchOn /> : <SwitchOff />}</Box>;
};
