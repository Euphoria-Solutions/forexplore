'use client';
import React, { useState } from 'react';
import { Box, Input } from '@/components';
import { HidePass, ShowPass } from '@/public/pass-recovery';

interface HideButtonType {
  placeholder: string;
  value?: string;
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HideButton = ({
  placeholder = 'Password',
  value,
  onChange,
}: HideButtonType) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);

  return (
    <Box className="relative inline-block">
      <Input
        value={value}
        onChange={onChange}
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
        {showPassword ? <ShowPass /> : <HidePass />}
      </Box>
    </Box>
  );
};

export default HideButton;
