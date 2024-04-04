export type DataType = {
  date: Date;
  symbol: string;
  purchase: 'buy' | 'sell';
  lots: number;
  entryPrice: number;
  stopLoss: number;
  targetProfit: number;
};

export type RecentDataType = {
  plans?: DataType;
  symbol: string;
  date: Date;
  purchase: 'buy' | 'sell';
  lots: number;
  planned: boolean | null;
  risk: number;
  profit: number;
};

export type DragItem = {
  id: number;
  data: DataType;
};
//Changes incoming
