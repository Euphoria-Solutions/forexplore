'use client';
import { Box, Text } from '..';
import { EditPlanModal, Plan, TradePlan } from '.';
import { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { DataIndexType, TradingPlanType } from './types';
import Image from 'next/image';
import { MoreIcon } from '@/public/icons';
import { useDrag, useDrop } from 'react-dnd';
import { Identifier, XYCoord } from 'dnd-core';
import { toast } from 'react-toastify';
import { notifUpdater } from '@/helper';
import { useMutation } from '@apollo/client';
import {
  ADD_PLAN_MUTATION,
  EDIT_PLAN_MUTATION,
  EDIT_TRADING_PLAN_MUTATION,
  REMOVE_TRADING_PLAN_MUTATION,
} from '@/graphql';

export const TradingPlan: React.FC<TradingPlanType> = ({
  data,
  setData,
  searchValue,
  tradePlan: allTradePlan,
  moveTradingPlan,
  index,
  tradePlan,
  refetchData,
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
    hover(item: { index: number }, monitor) {
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
  const [isChanged, setIsChanged] = useState(false);

  const [AddPlan] = useMutation(ADD_PLAN_MUTATION);
  const [EditPlan] = useMutation(EDIT_PLAN_MUTATION);

  const [EditTradingPlan] = useMutation(EDIT_TRADING_PLAN_MUTATION);
  const [RemoveTradingPlan] = useMutation(REMOVE_TRADING_PLAN_MUTATION);

  const changeData = async (
    e: string | Date | null,
    key: DataIndexType,
    index: number
  ) => {
    setData(prev =>
      prev.map(oldTradePlan => {
        if (oldTradePlan._id === tradePlan._id) {
          const newPlans = oldTradePlan.plans.map((el, i) => {
            if (i == index) {
              return {
                ...el,
                [key]:
                  key == 'type'
                    ? e == 'buy'
                      ? 'sell'
                      : 'buy'
                    : Number(e)
                      ? Number(e)
                      : e,
              };
            }
            return el;
          });
          return {
            ...oldTradePlan,
            plans: newPlans,
          };
        }
        return oldTradePlan;
      })
    );
    setIsChanged(true);
  };

  const handleSave = async () => {
    const notifId = toast.loading('Loading ...');
    try {
      await EditPlan({
        variables: {
          plans: data,
        },
      });
      refetchData();
      await notifUpdater(notifId, 'Updated Successfully', 'success');
      setIsChanged(false);
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
    }
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

  const addData = async () => {
    const notifId = toast.loading('Loading ...');
    try {
      await AddPlan({
        variables: {
          tradePlan: tradePlan._id,
          time: new Date().toISOString(),
          symbol: '',
          type: 'sell',
          lot: 0,
          entryPrice: 0,
          stopLoss: 0,
          takeProfit: 0,
        },
      });
      refetchData();
      await notifUpdater(notifId, 'Updated Successfully', 'success');
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
    }
  };
  const onEdit = async (name: string) => {
    const notifId = toast.loading('Loading ...');
    try {
      await EditTradingPlan({
        variables: {
          id: tradePlan._id,
          title: name,
        },
      });
      refetchData();
      await notifUpdater(notifId, 'Updated Successfully', 'success');
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
    }
  };
  const onDelete = async () => {
    const notifId = toast.loading('Loading ...');
    try {
      await RemoveTradingPlan({
        variables: {
          id: tradePlan._id,
        },
      });
      refetchData();
      await notifUpdater(notifId, 'Updated Successfully', 'success');
    } catch (err) {
      await notifUpdater(notifId, (err as Error).message, 'error');
    }
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
              setEditable={setEditable}
              editable={editable}
              changeData={changeData}
              setTradePlansData={setData}
              id={i}
              key={i}
              data={e}
              refetchData={refetchData}
            />
          ))}
        </Box>
        <Box className="py-3 justify-center gap-6">
          {isChanged && (
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
          )}
          <button
            onClick={addData}
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
