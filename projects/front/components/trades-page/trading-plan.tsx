'use client';
import Image from 'next/image';
import { Box } from '..';
import { DataType, DragItem } from '.';
import { Dispatch, SetStateAction, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDrag } from 'react-dnd';

type TradingPlanType = {
  data: DataType;
  setData: Dispatch<SetStateAction<DataType[]>>;
  id: number;
};

type DataIndexType =
  | 'date'
  | 'symbol'
  | 'purchase'
  | 'lots'
  | 'entryPrice'
  | 'stopLoss'
  | 'targetProfit';

export const TradingPlan: React.FC<TradingPlanType> = ({
  data,
  id,
  setData,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag<DragItem, void>({
    type: 'item',
    item: { id: id, data: data },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(ref);

  const changeData = (e: string | Date | null, key: DataIndexType) => {
    setData(prev =>
      prev.map((el, i) => {
        if (i == id) {
          return {
            ...el,
            [key]: key == 'purchase' ? (e == 'buy' ? 'sell' : 'buy') : e,
          };
        }
        return el;
      })
    );
  };

  return (
    <>
      <Box
        ref={ref}
        block
        className={`grid grid-cols-8 gap-2 w-full text-gray text-sm py-3 px-5`}
      >
        <Box className="flex items-center">
          <DatePicker
            className="outline-none w-full"
            selected={data.date}
            onChange={el => changeData(el, 'date')}
            popperPlacement="bottom-end"
            maxDate={new Date()}
          />
        </Box>
        <input
          className="outline-none"
          onChange={e => changeData(e.target.value, 'symbol')}
          value={data.symbol}
        />
        <button
          onClick={() => changeData(data.purchase, 'purchase')}
          className="outline-none capitalize text-left"
        >
          {data.purchase}
        </button>
        <input
          className="outline-none"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'lots')}
          value={data.lots}
        />
        <input
          className="outline-none"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'entryPrice')}
          value={data.entryPrice}
        />
        <input
          className="outline-none text-light-red"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'stopLoss')}
          value={data.stopLoss}
        />
        <input
          className="outline-none text-light-green"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'targetProfit')}
          value={data.targetProfit}
        />
        <button>
          <Image
            src="/icons/down-arrow.svg"
            height={24}
            width={24}
            alt="down arrow icon"
          />
        </button>
      </Box>
      <Box className="h-px w-full bg-bg" />
    </>
  );
};
