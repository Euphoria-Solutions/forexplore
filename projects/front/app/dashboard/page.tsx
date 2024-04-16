'use client';

import React from 'react';
import { Box } from '@/components';
import Container from '@/components/common/dnd/dnd-container';

const Dashboard = () => {
  return (
    <Box className="w-full h-screen flex-col p-5 space-y-4 bg-[#F3F4FA]">
      <Box className="pb-2">
        <Container />
      </Box>
    </Box>
  );
};

export default Dashboard;
