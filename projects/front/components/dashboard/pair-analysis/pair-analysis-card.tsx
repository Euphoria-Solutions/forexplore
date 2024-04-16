import { Box, Text } from '../..';

interface CardProps {
  cardTitle: string;
  bestPairs: [string];
  worstPairs: [string];
}

export const PairAnalysisCard: React.FC<CardProps> = ({
  cardTitle,
  bestPairs,
  worstPairs,
}) => {
  return (
    <Box className="flex-col shadow-sm p-8 rounded-2xl bg-white space-y-2 font-semibold w-full">
      <Box>
        <Text className="text-xl text-[#9291A5] whitespace-nowrap">
          {cardTitle}
        </Text>
      </Box>
      <Box className="flex-col">
        <Box className="text-xl break-all text-[#5DAAEE] whitespace-nowrap flex-row space-x-1">
          {bestPairs.map((text, indx) => {
            return <Text key={indx}>{text}, </Text>;
          })}
        </Box>
        <Box className="text-xl break-all text-[#FA4B3C] whitespace-nowrap flex-row space-x-1">
          {worstPairs.map((text, indx) => {
            return (
              <Text className="" key={indx}>
                {text},
              </Text>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
