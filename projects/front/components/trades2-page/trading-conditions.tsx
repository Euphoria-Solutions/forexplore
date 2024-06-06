'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Input, Text } from '../common';
import { ScrollSwitch } from './scroll-switch';

export const TradingConditions = ({
  savePlan,
  reset,
  setTradeEntryDetailsTo,
}: {
  savePlan: () => void;
  reset: () => void;
  setTradeEntryDetailsTo: Dispatch<
    SetStateAction<{
      entryPrice: number;
      targetProfit: number;
      stopLoss: number;
    }>
  >;
}) => {
  const [inputStatuses, setInputStatuses] = useState({
    tp: false,
    sl: false,
  });
  const [tradeEntryDetails, setTradeEntryDetails] = useState({
    entryPrice: 0,
    targetProfit: 0,
    stopLoss: 0,
  });

  useEffect(() => {
    setTradeEntryDetailsTo(tradeEntryDetails);
  }, [tradeEntryDetails, setTradeEntryDetailsTo]);

  return (
    <Box className="gap-y-10 flex-col w-[87vw] items-end">
      <Box className="flex-col w-[87vw] gap-y-5">
        <Text className="text-[#1F1F20] font-semibold text-lg">
          Trading Conditions
        </Text>
        <Box className=" grid grid-cols-3 w-full h-max">
          <Box className="flex flex-col ml-3 gap-y-2">
            <Text className="font-semibold">Entry Price</Text>
            <Input
              value={tradeEntryDetails.entryPrice.toString()}
              onChange={e =>
                setTradeEntryDetails({
                  ...tradeEntryDetails,
                  entryPrice: Number(e.target.value),
                })
              }
              className="h-10 w-80 rounded-xl pl-3 border border-[#D0D5DD] custom-border text-sm font-semibold"
              placeholder="Entry Price"
              type="number"
            />
          </Box>
          <Box className="flex-col items-center">
            <Box className="flex-col gap-y-2">
              <Box className="items-center gap-x-1">
                <Text className="font-semibold">Target Profit</Text>
                <Box
                  onClick={() => {
                    setInputStatuses({
                      ...inputStatuses,
                      tp: !inputStatuses.tp,
                    });
                    setTradeEntryDetails({
                      ...tradeEntryDetails,
                      targetProfit: 0,
                    });
                  }}
                >
                  <ScrollSwitch clicked={inputStatuses.tp} />
                </Box>
              </Box>

              <Input
                value={tradeEntryDetails.targetProfit.toString()}
                onChange={e =>
                  setTradeEntryDetails({
                    ...tradeEntryDetails,
                    targetProfit: Number(e.target.value),
                  })
                }
                disabled={!inputStatuses.tp}
                className="h-10 w-80 rounded-xl pl-3 border border-[#D0D5DD] custom-border text-sm font-semibold"
                placeholder="Target Profit"
                type="number"
              />
            </Box>
          </Box>
          <Box className="flex-col items-end">
            <Box className="flex-col gap-y-2">
              <Box className="items-center gap-x-1">
                <Text className="font-semibold">Stop Loss</Text>
                <Box
                  onClick={() => {
                    setInputStatuses({
                      ...inputStatuses,
                      sl: !inputStatuses.sl,
                    });
                    setTradeEntryDetails({
                      ...tradeEntryDetails,
                      stopLoss: 0,
                    });
                  }}
                >
                  <ScrollSwitch clicked={inputStatuses.sl} />
                </Box>
              </Box>

              <Input
                value={tradeEntryDetails.stopLoss.toString()}
                onChange={e =>
                  setTradeEntryDetails({
                    ...tradeEntryDetails,
                    stopLoss: Number(e.target.value),
                  })
                }
                disabled={!inputStatuses.sl}
                className="h-10 w-80 rounded-xl pl-3 border border-[#D0D5DD] custom-border text-sm font-semibold"
                placeholder="Stop Loss"
                type="number"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="gap-x-3">
        <Box
          onClick={savePlan}
          className="w-[12vw] h-11 bg-[#272727] rounded-lg items-center justify-center cursor-pointer"
        >
          <Text className="font-semibold text-white">Save Plan</Text>
        </Box>
        <Box
          onClick={() => {
            reset();
            setTradeEntryDetails({
              entryPrice: 0,
              targetProfit: 0,
              stopLoss: 0,
            });
            setInputStatuses({
              tp: false,
              sl: false,
            });
          }}
          className="w-[12vw] h-11 bg-[#D92D20] rounded-lg items-center justify-center cursor-pointer"
        >
          <Text className="font-semibold text-white">Reset</Text>
        </Box>
      </Box>
    </Box>
  );
};
