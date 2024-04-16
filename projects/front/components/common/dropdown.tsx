'use client';

import { useState } from 'react';
import { Box, Input, Text } from '.';
import { Chevron } from '@/public/icons/chevron';
import addIcon from '../../public/icons/plus.svg';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { notifUpdater } from '@/helper';

interface menuOption {
  name: string;
}

interface DropdownParams {
  placeholder: string;
  menuList?: menuOption[];
  onClick?: () => void;
  className?: string;
}

interface DropdownParams {
  placeholder: string;
  menuList?: menuOption[];
  onClick?: () => void;
  className?: string;
  addItem?: (_account: string) => void;
}

export const DropdownButton = ({
  menuList,
  onClick,
  addItem,
}: DropdownParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('select value');
  const [account, setAccount] = useState('');

  return (
    <Box>
      <Box className="relative inline-block w-[17vw]">
        <Box
          className="p-4 text-black bg-white shadow-md rounded-lg inline-flex items-center w-full justify-between"
          onClick={() => (menuList ? setIsOpen(!isOpen) : onClick && onClick())}
        >
          <Text className="mr-[9px] text-base">{value}</Text>
          <Chevron />
        </Box>
        {isOpen && (
          <Box className="absolute top-full mt-2 w-full shadow-lg bg-white rounded-md">
            <Box
              className="flex-col w-full"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {menuList &&
                menuList.map((option, index) => (
                  <Box
                    key={`option-${index}`}
                    className="hover:bg-prime_bg h-[50px] flex items-center w-full"
                    onClick={() => {
                      setIsOpen(false);
                      setValue(option.name);
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
                        } else {
                          const notifId = toast.loading('Loading ...');
                          notifUpdater(
                            notifId,
                            'field cannot be empty',
                            'error'
                          );
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
    </Box>
  );
};
