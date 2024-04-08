'use client';
import { Box, Text } from '..';
import { EditPlanModal, Plan, TradePlan } from '.';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { PlanType } from './types';
import Image from 'next/image';
import { MoreIcon } from '@/public/icons';
import { useDrag, useDrop } from 'react-dnd';
import { Identifier, XYCoord } from 'dnd-core';

type TradingPlanType = {
  data: PlanType[];
  tradePlan: TradePlan;
  setData: Dispatch<SetStateAction<TradePlan[]>>;
  setDeleteIndex: Dispatch<SetStateAction<number>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setTradingPlansData: Dispatch<SetStateAction<TradePlan[]>>;
  searchValue: string;
  moveTradingPlan: (_i: number, _hi: number) => void;
  index: number;
};

type DataIndexType =
  | 'time'
  | 'symbol'
  | 'type'
  | 'lot'
  | 'entryPrice'
  | 'stopLoss'
  | 'takeProfit';
type DragItem = {
  index: number;
};

export const TradingPlan: React.FC<TradingPlanType> = ({
  data,
  setData,
  setDeleteIndex,
  setVisible,
  searchValue,
  tradePlan: allTradePlan,
  setTradingPlansData,
  moveTradingPlan,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    TradePlan,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'tradingPlanDraggable',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveTradingPlan(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: 'tradingPlanDraggable',
    item: () => {
      return {
        index: index,
      };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(dragRef));

  const [editable, setEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const changeData = (
    e: string | Date | null,
    key: DataIndexType,
    index: number
  ) => {
    setData(prev =>
      prev.map(tradePlan => {
        if (allTradePlan._id === tradePlan._id) {
          const newPlans = allTradePlan.plans.map((el, i) => {
            if (i == index) {
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

  const addData = (id: string) => {
    setData(prev =>
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
                moveId: allTradePlan._id,
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
  const onEdit = (name: string) => {
    setTradingPlansData(prev =>
      prev.map(e => {
        if (e._id == allTradePlan._id) {
          return {
            ...e,
            title: name,
          };
        } else {
          return e;
        }
      })
    );
  };
  const onDelete = () => {
    setTradingPlansData(prev => prev.filter(e => e._id != allTradePlan._id));
  };

  if (data.length == 0 && (data.length != 0 || searchValue)) {
    return null;
  }

  return (
    <div
      ref={dragRef}
      data-handler-id={handlerId}
      className={`bg-white flex flex-col gap-10 rounded-lg w-full p-6`}
    >
      <EditPlanModal
        defaultValue={allTradePlan.title}
        onDelete={onDelete}
        onEdit={onEdit}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      <Box className="flex justify-between items-center">
        <Text className="font-medium text-xl">{allTradePlan.title}</Text>
        <Box className="gap-4">
          <button className="p-3" onClick={() => setModalVisible(true)}>
            <MoreIcon />
          </button>
          {/* <Box ref={dragRef} className="cursor-pointer p-3 rounded-lg bg-dark">
            <CategoryIcon className="text-white" />
          </Box> */}
        </Box>
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
    </div>
  );
};
