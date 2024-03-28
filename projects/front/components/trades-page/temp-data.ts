import { DataType, RecentDataType } from '.';

export const tempData: DataType[] = [
  {
    date: new Date(),
    symbol: 'XAUUSD',
    purchase: 'buy',
    lots: 1,
    entryPrice: 2036.375,
    stopLoss: 2050.098,
    targetProfit: 1982.207,
  },
  {
    date: new Date(),
    symbol: 'XAUUSD',
    purchase: 'buy',
    lots: 1,
    entryPrice: 2036.375,
    stopLoss: 2050.098,
    targetProfit: 1982.207,
  },
  {
    date: new Date(),
    symbol: 'XAUUSD',
    purchase: 'buy',
    lots: 1,
    entryPrice: 2036.375,
    stopLoss: 2050.098,
    targetProfit: 1982.207,
  },
];

export const recentTradeData: RecentDataType[] = [
  {
    date: new Date(),
    symbol: 'XAUUSD',
    purchase: 'buy',
    planned: true,
    risk: 1,
    profit: 2016.78,
    lots: 2,
  },
  {
    date: new Date(),
    symbol: 'XUUUSF',
    purchase: 'buy',
    planned: null,
    risk: 10,
    profit: -2016.78,
    lots: 2,
  },
  {
    date: new Date(),
    symbol: 'ASDLJWD',
    purchase: 'buy',
    planned: false,
    risk: 5,
    profit: 2016.78,
    lots: 2,
  },
];
