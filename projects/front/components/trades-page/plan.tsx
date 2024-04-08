'use client';
import { Box } from '..';
import { DragItem, PlanType } from '.';
import { Dispatch, SetStateAction, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDrag } from 'react-dnd';
import { TrashIcon } from '@/public/icons/trash-icon';

type PlansType = {
  data: PlanType;
  id: number;
  editable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
  openDelete: Dispatch<SetStateAction<boolean>>;
  setDeleteIndex: Dispatch<SetStateAction<number>>;
  changeData: (
    _e: string | Date | null,
    _key: DataIndexType,
    _index: number
  ) => void;
};

type DataIndexType =
  | 'time'
  | 'symbol'
  | 'type'
  | 'lot'
  | 'entryPrice'
  | 'stopLoss'
  | 'takeProfit';

export const Plan: React.FC<PlansType> = ({
  data,
  id,
  changeData,
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
            selected={data.time}
            onChange={el => changeData(el, 'time', id)}
            popperPlacement="bottom-end"
            maxDate={new Date()}
          />
        </Box>
        <input
          onBlur={() => setEditable(false)}
          className="outline-none bg-transparent py-4"
          disabled={!editable}
          onChange={e => changeData(e.target.value, 'symbol', id)}
          value={data.symbol}
        />
        <button
          disabled={!editable}
          onClick={() => changeData(data.type, 'type', id)}
          className="outline-none capitalize text-left cursor-text"
        >
          {data.type}
        </button>
        <input
          disabled={!editable}
          className="outline-none bg-transparent py-4"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'lot', id)}
          value={data.lot}
        />
        <input
          disabled={!editable}
          className="outline-none bg-transparent py-4"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'entryPrice', id)}
          value={data.entryPrice}
        />
        <input
          disabled={!editable}
          className="outline-none text-light-red bg-transparent py-4"
          type="number"
          min={0}
          onChange={e => changeData(e.target.value, 'stopLoss', id)}
          value={data.stopLoss}
        />
        <Box>
          <input
            disabled={!editable}
            className="outline-none text-light-green bg-transparent py-4 w-full"
            type="number"
            min={0}
            onChange={e => changeData(e.target.value, 'takeProfit', id)}
            value={data.takeProfit}
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
