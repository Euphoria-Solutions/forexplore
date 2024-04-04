'use client';
import { Box } from '..';
import { DataType, DragItem } from '.';
import { Dispatch, SetStateAction, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDrag } from 'react-dnd';
import { TrashIcon } from '@/public/icons/trash-icon';

type TradingPlanType = {
  data: DataType;
  setData: Dispatch<SetStateAction<DataType[]>>;
  id: number;
  editable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
  openDelete: Dispatch<SetStateAction<boolean>>;
  setDeleteIndex: Dispatch<SetStateAction<number>>;
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
  editable,
  setEditable,
  openDelete,
  setDeleteIndex,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: 'item',
    item: { id: id, data: data },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: () => {
      return !editable;
    },
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
  const handleDelete = () => {
    openDelete(true);
    setDeleteIndex(id);
  };

  return (
    <>
      <Box
        ref={ref}
        onClick={() => setEditable(true)}
        block
        className={`grid grid-cols-7 gap-2 w-full text-gray text-sm px-4 ${!editable && '*:pointer-events-none'}`}
      >
        <Box className="flex items-center">
          <DatePicker
            disabled={!editable}
            className="outline-none w-full bg-transparent py-4"
            selected={data.date}
            onChange={el => changeData(el, 'date')}
            popperPlacement="bottom-end"
            maxDate={new Date()}
          />
        </Box>
        <input
          onBlur={() => setEditable(false)}
          className="outline-none bg-transparent py-4"
          disabled={!editable}
          onChange={e => changeData(e.target.value, 'symbol')}
          value={data.symbol}
        />
        <button
          disabled={!editable}
          onClick={() => changeData(data.purchase, 'purchase')}
          className="outline-none capitalize text-left cursor-text"
        >
          {data.purchase}
        </button>
        <input
          disabled={!editable}
          className="outline-none bg-transparent py-4"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'lots')}
          value={data.lots}
        />
        <input
          disabled={!editable}
          className="outline-none bg-transparent py-4"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'entryPrice')}
          value={data.entryPrice}
        />
        <input
          disabled={!editable}
          className="outline-none text-light-red bg-transparent py-4"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'stopLoss')}
          value={data.stopLoss}
        />
        <Box>
          <input
            disabled={!editable}
            className="outline-none text-light-green bg-transparent py-4 w-full"
            type="number"
            min={0}
            onChange={e => changeData(e.target.value, 'targetProfit')}
            value={data.targetProfit}
          />
          <button
            onClick={handleDelete}
            className="flex-1 !pointer-events-auto"
          >
            <TrashIcon className="text-[#DCDCDD] hover:brightness-75 active:brightness-50 transition-all h-4 w-4" />
          </button>
        </Box>
      </Box>
      <Box className="h-px w-full bg-bg" />
    </>
  );
};
