'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Text, Input } from '@/components';
import { CloseIcon, RectangleAngle, RedXIcon } from '@/public/';
import { v4 as uuidv4 } from 'uuid';

interface PropsType {
  type: 'Entry' | 'Exit';
}

export const EnterAndExitCondition = ({ type }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  const [clicked, setClicked] = useState(false);
  const [enterAndExitDetails, setEnterAndExitDetails] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const [enterAndExitDatas, setEnterAndExitDatas] = useState<
    { entryAndExitWhen: string; id: string }[]
  >([]);
  const [isHovered, setIsHovered] = useState('');
  const [isEdit, setIsEdit] = useState('');
  const handleAddData = () => {
    const id = uuidv4();
    const newEntry = { entryAndExitWhen: enterAndExitDetails, id: id };
    setEnterAndExitDatas([...enterAndExitDatas, newEntry]);
    setEnterAndExitDetails('');
    setClicked(false);
  };
  const handleAddClick = () => {
    setClicked(prevClicked => {
      if (prevClicked) {
        setEnterAndExitDetails('');
      }
      return !prevClicked;
    });
  };

  const removeTag = (id: string) => {
    const filteredData = enterAndExitDatas.filter(data => data.id != id);

    setEnterAndExitDatas(filteredData);
    setIsHovered('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current) {
        if (!ref.current.contains(event.target as Node)) {
          setIsEdit('');
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isEdit]);

  useEffect(() => {
    const editTag = (id: string) => {
      if (editDetails != '') {
        const editedData = enterAndExitDatas.map(data => {
          if (data.id === id) {
            return { ...data, entryAndExitWhen: editDetails };
          }
          return data;
        });
        setEnterAndExitDatas(editedData);
      }

      setEditDetails('');
      setIsEdit('');
    };
    if (isEdit) {
      document.addEventListener('keypress', e => {
        if (e.key == 'Enter') {
          setIsEdit('');
          setIsHovered('');
          setEditDetails('');
          editTag(isEdit);
        }
      });
    }
  }, [isEdit, editDetails, enterAndExitDatas]);

  return (
    <Box className="flex-col">
      <Text className="font-semibold text-lg ">{type} When</Text>
      <Box className="ml-3 items-baseline">
        <RectangleAngle />
        <Box className="bg-white h-12 rounded-lg w-full items-center px-2 space-x-2">
          {enterAndExitDatas.map((data, index) =>
            data.entryAndExitWhen ? (
              <Box
                className="bg-[#1F1F20] h-9 px-2 w-max rounded-lg items-center justify-center cursor-pointer relative"
                key={index}
                onMouseEnter={() => setIsHovered(data.id)}
                onMouseLeave={() => setIsHovered('')}
              >
                {isHovered == data.id && (
                  <Box
                    className="absolute -right-2 -top-2"
                    onClick={() => removeTag(data.id)}
                  >
                    <RedXIcon></RedXIcon>
                  </Box>
                )}
                <Box>
                  {isEdit == data.id ? (
                    <Box ref={ref}>
                      <Input
                        value={editDetails}
                        onChange={e => setEditDetails(e.target.value)}
                        className="rounded-lg w-24 text-white bg-black text-center"
                      ></Input>
                    </Box>
                  ) : (
                    <Box
                      onClick={() => {
                        setIsEdit(data.id);
                        setEditDetails(data.entryAndExitWhen);
                      }}
                    >
                      <Text
                        className={`${isHovered == data.id && 'underline'} text-white font-medium`}
                      >
                        {data.entryAndExitWhen}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            ) : null
          )}

          <Box
            className="bg-[#1F1F20] h-9 w-20 rounded-lg items-center justify-center cursor-pointer"
            onClick={handleAddClick}
          >
            <Text className="text-white font-medium">+Add</Text>
          </Box>
        </Box>
      </Box>
      <Box
        className={`absolute ${clicked ? 'flex' : 'hidden'} top-0 left-0 z-50 w-screen h-screen bg-modal items-center justify-center`}
      >
        <Box className="bg-white w-96 h-48 rounded-lg items-center flex-col relative">
          <Box onClick={handleAddClick} className="absolute right-2 top-1">
            <CloseIcon />
          </Box>
          <Box className="flex-col w-full h-full items-center justify-center space-y-8">
            <Text className="text-black text-xl font-semibold">
              {type} When
            </Text>
            <Input
              value={enterAndExitDetails}
              onChange={e => setEnterAndExitDetails(e.target.value)}
              className="w-64 h-10 border-gray border rounded-xl px-4"
              placeholder={`${type} When`}
            ></Input>
            <Box
              className="w-20 h-8 bg-[#1F1F20] rounded-3xl items-center justify-center"
              onClick={handleAddData}
            >
              <Text className="text-white font-medium text-kg cursor-pointer">
                Save
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
