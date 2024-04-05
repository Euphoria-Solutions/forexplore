'use client';
import { Box, Text } from '..';
import { Plan, TradePlan } from '.';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { PlanType } from './types';
import Image from 'next/image';

type TradingPlanType = {
  data: PlanType[];
  tradePlan: TradePlan;
  setData: Dispatch<SetStateAction<TradePlan[]>>;
  id: number;
  setDeleteIndex: Dispatch<SetStateAction<number>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
};

type DataIndexType =
  | 'time'
  | 'symbol'
  | 'type'
  | 'lot'
  | 'entryPrice'
  | 'stopLoss'
  | 'takeProfit';

export const TradingPlan: React.FC<TradingPlanType> = ({
  data: curData,
  setData: setCurData,
  setDeleteIndex,
  setVisible,
  id,
  searchValue,
  tradePlan: allTradePlan,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [editable, setEditable] = useState(false);
  const [data, setData] = useState(curData);

  const changeData = (e: string | Date | null, key: DataIndexType) => {
    setCurData(prev =>
      prev.map(tradePlan => {
        if (allTradePlan._id === tradePlan._id) {
          const newPlans = allTradePlan.plans.map((el, i) => {
            if (i == id) {
              return {
                ...el,
                [key]: key == 'type' ? (e == 'buy' ? 'sell' : 'buy') : e,
              };
            }
            return el;
          });
          return {
            ...tradePlan,
            plans: newPlans,
          };
        }
        return tradePlan;
      })
    );
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current) {
        if (!ref.current.contains(event.target as Node)) {
          setEditable(false);
        } else {
          setEditable(true);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setEditable]);
  useEffect(() => {
    if (curData) {
      if (searchValue) {
        const curSearch = searchValue.toLowerCase();
        setData(
          curData.filter(e => {
            if (e.time.toLocaleDateString().toLowerCase().includes(curSearch))
              return true;
            if (e.type.toLowerCase().includes(curSearch)) return true;
            if (e.symbol.toLowerCase().includes(curSearch)) return true;
            return false;
          })
        );
      } else {
        setData(curData);
      }
    }
  }, [curData, searchValue]);

  const addData = (id: string) => {
    setCurData(prev =>
      prev.map(tradePlan => {
        if (tradePlan._id === id) {
          return {
            ...tradePlan,
            plans: [
              {
                time: new Date(),
                symbol: '',
                type: 'sell',
                lot: 0,
                entryPrice: 0,
                stopLoss: 0,
                takeProfit: 0,
              },
              ...tradePlan.plans,
            ],
          };
        }
        return tradePlan;
      })
    );
  };
  const handleSave = () => {
    setEditable(false);
  };

  if (data.length == 0 && (curData.length != 0 || searchValue)) {
    return null;
  }

  return (
    <Box className="bg-white flex flex-col gap-10 rounded-lg w-full p-6">
      <Box className="flex justify-between items-center">
        <Text className="font-medium text-xl">Trading plan 1</Text>
        <button className="bg-dark p-3 rounded-lg">
          <Image
            src="/icons/category.svg"
            alt="category icon"
            height={20}
            width={20}
          />
        </button>
      </Box>
      <Box className="w-full flex flex-col">
        <Box block className="grid grid-cols-7 gap-2 w-full text-sm bg-bg p-4">
          <Text>Time</Text>
          <Text>Symbol</Text>
          <Text>Buy/Sell</Text>
          <Text>Lots</Text>
          <Text>Entry Price</Text>
          <Text>Stop loss</Text>
          <Text>Target Profit</Text>
        </Box>
        <Box className="flex-col w-full" ref={ref}>
          {data?.map((e, i) => (
            <Plan
              setDeleteIndex={setDeleteIndex}
              openDelete={setVisible}
              setEditable={setEditable}
              editable={editable}
              changeData={changeData}
              id={i}
              key={i}
              data={e}
            />
          ))}
        </Box>
        <Box className="py-3 justify-center gap-6">
          <button
            onClick={handleSave}
            className="bg-dark rounded-md p-2 active:brightness-150 transition-all"
          >
            <Image
              src="/icons/save.svg"
              height={12.5}
              width={12.5}
              alt="save icon"
            />
          </button>
          <button
            onClick={() => addData(allTradePlan._id)}
            className="bg-dark rounded-md p-1  active:brightness-150 transition-all"
          >
            <Image src="/icons/add.svg" height={20} width={20} alt="add icon" />
          </button>
        </Box>
        <Box className="h-px w-full bg-bg" />
      </Box>
    </Box>
  );
};
