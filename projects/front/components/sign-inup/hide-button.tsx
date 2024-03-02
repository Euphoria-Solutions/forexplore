'use client';
import React, { useState } from 'react';
import { Box } from '../box';
import { Input } from '../input';

const HideButton = ({ placeholder = 'Password' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);

  return (
    <Box className="relative inline-block">
      <Input
        type={showPassword ? 'text' : 'password'}
        className="w-96 h-14 bg-white rounded-lg px-4 border border-gray-300 placeholder:font-medium placeholder:text-sm placeholder:text-[#383838]"
        placeholder={placeholder}
      />
      <Box
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="absolute inset-y-0 right-0 flex items-center text-sm font-medium text-[#383838] pr-4 cursor-pointer"
      >
        {showPassword ? 'Hide' : 'Show'}
      </Box>
    </Box>
  );
};

export default HideButton;
