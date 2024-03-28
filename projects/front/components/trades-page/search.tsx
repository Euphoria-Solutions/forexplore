import Image from 'next/image';
import { Box, Input } from '..';

export const SearchInput = () => {
  return (
    <Box className="bg-white h-14 px-10  py-3 flex items-center rounded-3xl w-full shadow-sm">
      <Box className="w-full flex items-center gap-4">
        <Image
          alt="search icon"
          src="/icons/search-normal.svg"
          height={20}
          width={20}
        />
        <Input placeholder="Search" className="font-medium w-full" />
      </Box>
      <button className="bg-dark text-white flex-shrink-0 font-medium rounded-full p-2 px-6 flex gap-1">
        <Image src="/icons/add.svg" height={22} width={22} alt="add icon" />
        New Plan
      </button>
    </Box>
  );
};
