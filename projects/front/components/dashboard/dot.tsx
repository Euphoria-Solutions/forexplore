import { Box } from '..';

interface DotTypes {
  color: string;
}

export const Dot = ({ color }: DotTypes) => {
  return (
    <Box
      style={{ backgroundColor: color }}
      className={`block rounded-full m-auto h-2 w-2`}
    ></Box>
  );
};
