import { Box, Text } from '../..';

interface CardProps {
  cardText: string;
}

export const OrderCard: React.FC<CardProps> = ({ cardText }) => {
  return (
    <Box className="flex-col shadow-sm p-8 rounded-2xl bg-white space-y-2 font-semibold w-full">
      <Box>
        <Text className="text-xl text-[#9291A5] whitespace-nowrap">
          Recommended order
        </Text>
      </Box>
      <Box className="flex-col">
        <Text className="text-xl break-all text-[#1B1D5C] whitespace-nowrap">
          You have been doing pretty good
        </Text>
        <Text className="text-xl break-all text-[#1B1D5C] whitespace-nowrap">
          on{'\u00A0'}
          <span className="text-xl text-[#5DAAEE]">{cardText}</span>
          {'\u00A0'}recently!
        </Text>
      </Box>
    </Box>
  );
};
