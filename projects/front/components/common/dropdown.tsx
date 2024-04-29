'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Input, Text } from '.';
import { Chevron } from '@/public/icons/chevron';
import addIcon from '../../public/icons/plus.svg';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { notifUpdater } from '@/helper';

interface menuOption {
  name: string;
  _id: string;
}

interface DropdownParams {
  menuList?: menuOption[];
  onClick?: () => void;
  className: string;
}

interface DropdownParams {
  menuList?: menuOption[];
  onClick?: () => void;
  className: string;
  addItem?: (_account: string) => void;
  setSelected: Dispatch<SetStateAction<{ name: string; _id: string }>>;
  selected: {
    name: string;
    _id: string;
  };
  width: string;
}

export const DropdownButton = ({
  menuList,
  addItem,
  setSelected,
  selected,
  className,
  onClick,
  width,
}: DropdownParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState('');
  return (
    <Box className={`relative inline-block w-${width}`}>
      <Box
        className={className}
        onClick={() => {
          setIsOpen(!isOpen);
          onClick && onClick();
        }}
      >
        <Text className="mr-[9px] text-base">{selected?.name || ''}</Text>
        <Chevron />
      </Box>
      {isOpen && (
        <Box className="absolute top-full mt-2 w-full shadow-lg bg-white rounded-md z-50">
          <Box
            className="flex-col w-full max-h-[200px] min-h-[100px] overflow-auto hide-scrollbar"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuList &&
              menuList.map((option, index) => (
                <Box
                  key={`option-${index}`}
                  className="hover:bg-prime_bg min-h-[50px] flex items-center w-full"
                  onClick={() => {
                    setIsOpen(false);
                    setSelected(option);
                  }}
                >
                  <Box className="w-full px-4 py-2 text-sm text-gray-700">
                    {option.name}
                  </Box>
                </Box>
              ))}
            {addItem && (
              <Box className="hover:bg-prime_bg h-[50px] flex-row items-center w-full justify-center">
                <Box className="w-full p-4 justify-between">
                  <Input
                    className="text-sm text-[#666666] placeholder:text-left placeholder:"
                    placeholder="Add account"
                    value={account}
                    onChange={e => {
                      setAccount(e.target.value);
                    }}
                  />
                  <Box
                    onClick={() => {
                      if (addItem && account != '') {
                        addItem(account);
                        setAccount('');
                        setIsOpen(false);
                      } else {
                        const notifId = toast.loading('Loading ...');
                        notifUpdater(notifId, 'field cannot be empty', 'error');
                      }
                    }}
                  >
                    <Image src={addIcon} alt="plus icon" />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
