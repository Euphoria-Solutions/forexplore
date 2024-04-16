import { Box, Text } from '../..';

interface CardProps {
  cardTitle: [string];
  cardText: string;
}

export const SessionCard: React.FC<CardProps> = ({ cardTitle, cardText }) => {
  return (
    <Box className="flex-col shadow-sm p-8 rounded-2xl bg-white space-y-2 font-semibold w-full">
      <Box>
        <Text className="text-xl text-[#9291A5] whitespace-nowrap">
          {cardTitle.map((item, index) => (
            <span key={index}>{item}</span>
          ))}{' '}
        </Text>
      </Box>
      <Box className="flex-col">
        <Text className="text-xl break-all text-[#1B1D5C] whitespace-nowrap">
          Now it’s your{'\u00A0'}
          <span className="text-xl text-[#FA4B3C]">{cardText}</span>
          {'\u00A0'}session to
        </Text>
        <Text className="text-xl break-all text-[#1B1D5C] whitespace-nowrap">
          open trades
        </Text>
      </Box>
    </Box>
  );
};
