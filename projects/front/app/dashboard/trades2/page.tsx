'use client';

import {
  Box,
  DropdownButton,
  EnterAndExitCondition,
  Input,
  ScrollSwitch,
  Text,
} from '@/components';
import { useState } from 'react';
import React from 'react';

const Page = () => {
  const [inputStatuses, setInputStatuses] = useState({
    tp: false,
    sl: false,
  });
  const [tradeEntryDetails, setTradeEntryDetails] = useState({
    entryPrice: '',
    targetProfit: '',
    stopLoss: '',
  });
  const [selected, setSelected] = useState({
    _id: '',
    name: 'Choose a symbol',
  });
  return (
    <Box className="flex-col ml-5 space-y-5">
      <Text className="font-semibold text-2xl">New Trading Plan</Text>
      <Box className="w-[87vw] justify-between">
        <Box
          className={`h-full rounded-xl bg-white w-[54%] flex-col space-y-3 py-4 px-5`}
        >
          <Box className="justify-between">
            <Box className={`flex-col space-y-2`}>
              <Box className={`font-semibold text-[#1F1F20]`}>
                Search Instrument
              </Box>
              <Box>
                <DropdownButton
                  className="p-4 bg-white rounded-lg text-[#344054] font-semibold text-sm inline-flex items-center w-80 justify-between h-5 border-[#D0D5DD] border"
                  width={'[17vw]'}
                  menuList={[
                    { name: 'a', _id: 'aa' },
                    { name: 'b', _id: 'bb' },
                  ]}
                  setSelected={setSelected}
                  selected={selected}
                ></DropdownButton>
              </Box>
            </Box>
            <Box>
              <Box className={`flex-col space-y-2`}>
                <Box className={`font-semibold text-[#1F1F20]`}>
                  Position size
                </Box>
                <Input
                  className={`h-5 w-80 rounded-lg p-4 border-[#D0D5DD] border text-sm font-semibold`}
                  placeholder="Lot size"
                ></Input>
              </Box>
            </Box>
          </Box>
          <Box className={`flex-col`}>
            <Box className="text-[#1F1F20] font-semibold">Position</Box>
            <Box
              className={`w-32 h-10 bg-white rounded-lg items-center justify-between p-2 custom-border`}
            >
              <Box
                className={`text-[#7F7F7F] border-[#D0D5DD] border rounded-lg font-semibold text-sm w-14 h-max py-1 items-center justify-center cursor-pointer`}
              >
                Buy
              </Box>
              <Box
                className={`text-[#7F7F7F] font-semibold w-14 h-max items-center text-sm justify-center cursor-pointer`}
              >
                Sell
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className={`h-full rounded-xl bg-white w-[44%] items-center px-4 justify-between`}
        >
          <Box className={`flex-col space-y-2`}>
            <Box className="text-[#1F1F20] font-semibold">Mental State</Box>
            <textarea
              className={`h-24 w-72 text-start rounded-lg px-4 pt-2 border-[#D0D5DD] border text-sm font-semibold resize-none outline-none`}
              placeholder="Write your mental statement here so you can learn from your own mental statement"
            ></textarea>
          </Box>
          <Box className={`flex-col space-y-2`}>
            <Box className="text-[#1F1F20] font-semibold">
              Technical Analytics
            </Box>
            <Input
              className={`h-24 w-60 rounded-lg p-4 border-[#D0D5DD] border text-sm font-semibold`}
              placeholder="Upload an embed link"
            ></Input>
          </Box>
        </Box>
      </Box>
      <Box className="flex-col space-y-9 ml-5">
        <EnterAndExitCondition type={'Entry'} />
        <EnterAndExitCondition type={'Exit'} />
      </Box>
      <Box className="space-y-10 flex-col w-[87vw] items-end">
        <Box className="flex-col w-[87vw] space-y-5">
          <Text className="text-[#1F1F20] font-semibold text-lg">
            Trading Conditions
          </Text>
          <Box className=" grid grid-cols-3 w-full h-max">
            <Box className="flex flex-col ml-3 space-y-2">
              <Text className="font-semibold">Entry Price</Text>
              <Input
                value={tradeEntryDetails.entryPrice}
                onChange={e =>
                  setTradeEntryDetails({
                    ...tradeEntryDetails,
                    entryPrice: e.target.value,
                  })
                }
                className="h-10 w-80 rounded-xl pl-3 border border-[#D0D5DD] custom-border text-sm font-semibold"
                placeholder="Entry Price"
              />
            </Box>
            <Box className="flex-col items-center">
              <Box className="flex-col space-y-2">
                <Box className="items-center space-x-1">
                  <Text className="font-semibold">Target Profit</Text>
                  <Box
                    onClick={() => {
                      setInputStatuses({
                        ...inputStatuses,
                        tp: !inputStatuses.tp,
                      });
                      setTradeEntryDetails({
                        ...tradeEntryDetails,
                        targetProfit: '',
                      });
                    }}
                  >
                    <ScrollSwitch clicked={inputStatuses.tp} />
                  </Box>
                </Box>

                <Input
                  value={tradeEntryDetails.targetProfit}
                  onChange={e =>
                    setTradeEntryDetails({
                      ...tradeEntryDetails,
                      targetProfit: e.target.value,
                    })
                  }
                  disabled={!inputStatuses.tp}
                  className="h-10 w-80 rounded-xl pl-3 border border-[#D0D5DD] custom-border text-sm font-semibold"
                  placeholder="Target Profit"
                />
              </Box>
            </Box>
            <Box className="flex-col items-end">
              <Box className="flex-col space-y-2">
                <Box className="items-center space-x-1">
                  <Text className="font-semibold">Stop Loss</Text>
                  <Box
                    onClick={() => {
                      setInputStatuses({
                        ...inputStatuses,
                        sl: !inputStatuses.sl,
                      });
                      setTradeEntryDetails({
                        ...tradeEntryDetails,
                        stopLoss: '',
                      });
                    }}
                  >
                    <ScrollSwitch clicked={inputStatuses.sl} />
                  </Box>
                </Box>

                <Input
                  value={tradeEntryDetails.stopLoss}
                  onChange={e =>
                    setTradeEntryDetails({
                      ...tradeEntryDetails,
                      stopLoss: e.target.value,
                    })
                  }
                  disabled={!inputStatuses.sl}
                  className="h-10 w-80 rounded-xl pl-3 border border-[#D0D5DD] custom-border text-sm font-semibold"
                  placeholder="Stop Loss"
                ></Input>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="space-x-3">
          <Box className="w-[12vw] h-11 bg-[#272727] rounded-lg items-center justify-center cursor-pointer">
            <Text className="font-semibold text-white">Save Plan</Text>
          </Box>
          <Box className="w-[12vw] h-11 bg-[#D92D20] rounded-lg items-center justify-center cursor-pointer">
            <Text className="font-semibold text-white">Reset</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
