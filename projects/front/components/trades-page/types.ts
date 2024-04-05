export interface PlanType {
  time: Date;
  symbol: string;
  type: string;
  lot: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
}

export interface TradePlan {
  _id: string;
  title: string;
  plans: PlanType[];
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
