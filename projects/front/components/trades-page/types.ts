import { Dispatch, SetStateAction } from 'react';

export interface PlanType {
  _id: string;
  time: Date;
  symbol: string;
  type: string;
  lot: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  moveId: string;
  linkedToTrade: boolean;
}

export interface TradePlan {
  _id: string;
  title: string;
  plans: PlanType[];
  index: number;
}

export interface Trade {
  _id: string;

  openTime: string;
  closeTime: string;
  positionId: string;
  symbol: string;
  type: string;
  volume: number;
  openPrice: number;
  closePrice: number;
  sl: number;
  tp: number;
  commission: number;
  swap: number;
  profit: number;
  plan: PlanType | null;
}

export type DragItem = {
  id: number;
  data: PlanType;
};
//Changes incoming

export type TradingPlanType = {
  data: PlanType[];
  tradePlan: TradePlan;
  setData: Dispatch<SetStateAction<TradePlan[]>>;
  setDeleteIndex: Dispatch<SetStateAction<number>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  moveTradingPlan: (_i: number, _hi: number) => void;
  index: number;
  refetchData: () => void;
};

export type DataIndexType =
  | 'time'
  | 'symbol'
  | 'type'
  | 'lot'
  | 'entryPrice'
  | 'stopLoss'
  | 'takeProfit';
