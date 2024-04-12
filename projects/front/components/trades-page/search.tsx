import Image from 'next/image';
import { Box, Input } from '..';
import { Dispatch, SetStateAction } from 'react';

type SearchType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  rightElement?: React.ReactNode;
};

export const SearchInput: React.FC<SearchType> = ({
  value,
  setValue,
  placeholder,
  rightElement,
}) => {
  return (
    <Box className="bg-white h-14 px-10  py-3 flex items-center rounded-3xl w-full shadow-sm">
      <Box className="w-full flex items-center gap-4">
        <Image
          alt="search icon"
          src="/icons/search-normal.svg"
          height={20}
          width={20}
        />
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          className="font-medium w-full"
        />
      </Box>
      {rightElement && rightElement}
    </Box>
  );
};
