import {
  MutationImportTradeHistroyArgs,
  QueryGetTradesArgs,
  ResolversParentTypes,
  Trade,
} from '../generated/generated';
import { ForexAccountModel, TradeModel } from '../models';
import { StatisticsModel } from '../models/statistics';
import { Types } from 'mongoose';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getCurrentWeekOfMarch = () => {
  const today = new Date();
  const currentDayOfMonth = today.getDate();
  return Math.ceil(currentDayOfMonth / 7);
};

const updateStatistics = async (
  inserted: Trade[],
  params: MutationImportTradeHistroyArgs
) => {
  const date = new Date();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const week = getCurrentWeekOfMarch();
  const winTrades = inserted.filter(
    trade => trade && trade?.profit >= 0
  ).length;
  const pl = inserted
    .map(trade => trade.profit)
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  await ForexAccountModel.findByIdAndUpdate(
    params.forexAccountId,
    [
      {
        $set: {
          prevBalance: {
            $cond: {
              if: { $eq: ['$balance', -1] },
              then: params.balance,
              else: '$balance',
            },
          },
          balance: params.balance,
          broker: params.broker,
          winRate: {
            $multiply: [
              {
                $divide: [
                  { $add: ['$winTrades', winTrades] },
                  { $add: ['$trades', inserted.length] },
                ],
              },
              100,
            ],
          },
          prevWinRate: {
            $cond: {
              if: { $eq: ['$winRate', -1] },
              then: {
                $multiply: [
                  {
                    $divide: [
                      { $add: ['$winTrades', winTrades] },
                      { $add: ['$trades', inserted.length] },
                    ],
                  },
                  100,
                ],
              },
              else: '$winRate',
            },
          },
          lastUpdate: date.toISOString(),
          trades: { $add: ['$trades', inserted.length] },
          winTrades: { $add: ['$winTrades', winTrades] },
        },
      },
    ],
    { new: true }
  );

  await StatisticsModel.findOneAndUpdate(
    { forexAccount: params.forexAccountId, year, month },
    [
      {
        $set: {
          forexAccount: new Types.ObjectId(params.forexAccountId),

          year,
          month,
          trades: {
            $add: [{ $ifNull: ['$trades', 0] }, inserted.length],
          },
          profit: {
            $add: [{ $ifNull: ['$profit', 0] }, pl > 0 ? pl : 0],
          },
          loss: {
            $add: [{ $ifNull: ['$loss', 0] }, pl > 0 ? 0 : pl],
          },
        },
      },
    ],
    { upsert: true, new: true, runValidators: true }
  );

  const document = await StatisticsModel.findOne({
    forexAccount: params.forexAccountId,
    year,
    month,
  });

  const isExist = (document.weeks ?? []).filter(
    (curWeek: { week: number }) => curWeek.week == week
  );

  if (isExist.length > 0) {
    const arr = document.weeks.map(
      (curWeek: { week: number; trades: number }) =>
        curWeek.week == week
          ? { week, trades: curWeek.trades + inserted.length }
          : week
    );
    await StatisticsModel.findByIdAndUpdate(document._id, {
      $set: {
        weeks: arr,
      },
    });
  } else {
    await StatisticsModel.findByIdAndUpdate(document._id, {
      $push: {
        weeks: {
          week,
          trades: inserted.length,
        },
      },
    });
  }
};

export const importTradeHistroy = async (
  _: ResolversParentTypes,
  params: MutationImportTradeHistroyArgs
) => {
  try {
    const uniqueFieldValues = new Set(
      await TradeModel.find().distinct('positionId')
    );

    const uniqueTrades = params.trades.filter(
      trade => !uniqueFieldValues.has(trade?.positionId)
    );

    if (uniqueTrades.length > 0) {
      const inserted = await TradeModel.insertMany(uniqueTrades);

      // Update Statistics Data
      await updateStatistics(inserted, params);

      return inserted;
    } else {
      return [];
    }
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getTrades = async (
  _: ResolversParentTypes,
  params: QueryGetTradesArgs
) => {
  try {
    return await TradeModel.find(params).populate({
      path: 'forexAccount',
      populate: {
        path: 'user',
        model: 'User',
      },
    });
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
