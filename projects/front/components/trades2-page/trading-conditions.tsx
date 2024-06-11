'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Input, Text } from '@/components/common';
import { ScrollSwitch } from './scroll-switch';
import { CloseIcon } from '@/public';
import { useRouter } from 'next/navigation';

interface TradingConditionsProps {
  type: string;
  savePlan: () => void;
  reset: () => void;
  setTradeEntryDetailsTo: Dispatch<
    SetStateAction<{
      entryPrice: number;
      targetProfit: number;
      stopLoss: number;
    }>
  >;
}

export const TradingConditions: React.FC<TradingConditionsProps> = ({
  type,
  savePlan,
  reset,
  setTradeEntryDetailsTo,
}) => {
  const [clicked, setClicked] = useState(false);
  const [finishPlanDetails, setfinishPlanDetails] = useState('');
  const [inputStatuses, setInputStatuses] = useState({
    tp: false,
    sl: false,
  });

  const router = useRouter();

  const [tradeEntryDetails, setTradeEntryDetails] = useState({
    entryPrice: 0,
    targetProfit: 0,
    stopLoss: 0,
  });

  useEffect(() => {
    setTradeEntryDetailsTo(tradeEntryDetails);
  }, [tradeEntryDetails, setTradeEntryDetailsTo]);

  const reRoute = () => {
    router.push('/dashboard/trades2');
  };

  const handleAddClick = () => {
    setClicked(prevClicked => {
      if (prevClicked) {
        setfinishPlanDetails('');
      }
      return !prevClicked;
    });
  };

  return (
    <Box className="gap-y-10 flex-col w-[87vw] items-end">
      <Box className="flex-col w-[87vw] gap-y-5">
        <Text className="text-[#1F1F20] font-semibold text-lg">
          {type} Trading Conditions
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
      {type == 'save' ? (
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
      ) : (
        <Box className="gap-x-3 mb-10">
          <Box
            onClick={savePlan}
            className="w-[12vw] h-11 bg-[#272727] rounded-lg items-center justify-center cursor-pointer"
          >
            <Text className="font-semibold text-white">Update Plan</Text>
          </Box>
          <Box
            className="w-[12vw] h-11 bg-white rounded-lg items-center justify-center cursor-pointer border border-[#D0D5DD]"
            onClick={handleAddClick}
          >
            <Text className="font-semibold text-black">Finish Plan</Text>
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
      )}
      <Box
        className={`absolute ${clicked ? 'flex' : 'hidden'} top-0 left-0 z-50 w-screen h-screen bg-modal items-center justify-center`}
      >
        <Box className="bg-white w-96 h-48 rounded-lg items-center flex-col relative">
          <Box onClick={handleAddClick} className="absolute right-2 top-2">
            <CloseIcon></CloseIcon>
          </Box>
          <Box className="flex-col w-full h-full items-center justify-center space-y-8">
            <Text className="text-black text-xl font-semibold">
              Are you sure?
            </Text>
            <Input
              value={finishPlanDetails}
              onChange={e => setfinishPlanDetails(e.target.value)}
              className="w-64 h-10 border-gray border rounded-xl px-4"
              placeholder={`Write your profit amount`}
              type="number"
            ></Input>
            <Box
              className="w-20 h-8 bg-[#1F1F20] rounded-3xl items-center justify-center"
              onClick={reRoute}
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
