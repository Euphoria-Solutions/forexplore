import React from 'react';
import { Box } from '../box';
import { Text } from '../text';
import { Source_Code_Pro as SourceCodePro } from 'next/font/google';

const sourceCodePro = SourceCodePro({
  subsets: ['latin'],
  weight: '400',
});

interface UpdateInfoProps {
  progress: number;
  title: string;
  features: string[];
}

const UpdateInfo: React.FC<UpdateInfoProps> = ({
  progress,
  title,
  features,
}) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const progressBarWidth = `${safeProgress}%`;

  return (
    <Box className={sourceCodePro.className}>
      <Box className="flex-col space-y-4">
        <Text className="text-white text-lg">{title}</Text>
        <Box className="flex-col">
          <Box className="w-96 h-1.5 bg-gray-400 relative">
            <Box
              className="h-1.5 bg-white"
              style={{ width: progressBarWidth }}
            ></Box>
          </Box>
          <Text className="text-white">{safeProgress}/100</Text>
        </Box>
        <Box className="flex-col">
          <Text className="text-white">Features:</Text>
          <Box className="pl-2 text-white list-disc list-inside">
            <Box className="flex-col">
              {features.map((feature, index) => (
                <Box key={index} className="flex-row items-center space-x-1">
                  <Text className="text-xs">●</Text>
                  <Text>{feature}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateInfo;
