import { Types } from 'mongoose';
import {
  MutationImportTradeHistoryArgs,
  Trade,
} from '../../generated/generated';
import { StatisticsModel } from '../../models/statistics';
import { getCurrentWeek, months } from '../common';
import { getSession } from './get-session';
import { getTopPairs } from './get-top-pairs';

const defaultStatisticsData = {
  pairs: [],
  weeks: [],
  sessions: [],
};

export const updateStatistics = async (
  inserted: Trade[],
  params: MutationImportTradeHistoryArgs
) => {
  const date = new Date();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const week = getCurrentWeek();
  const pl = inserted
    .map(trade => trade.profit)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  const longTrades = inserted.reduce(
    (acc, trade) => acc + (trade.type == 'BUY' ? 1 : 0),
    0
  );
  const shortTrades = inserted.reduce(
    (acc, trade) => acc + (trade.type == 'BUY' ? 0 : 1),
    0
  );

  const document =
    (await StatisticsModel.findOne({
      forexAccount: params.forexAccountId,
      year,
      month,
    })) || defaultStatisticsData;
  console.log(document);
  const topPairs = getTopPairs(inserted, document.pairs);

  const isExist = (document.weeks ?? []).filter(
    (curWeek: { week: number }) => curWeek.week == week
  );

  const sessions = ['Sydney', 'London', 'New York', 'Tokyo'];

  const sessionData = sessions.map((session: string) => {
    const totalTrades = inserted.filter(trade =>
      getSession(trade?.openTime ?? '').includes(session)
    );

    const winTrades = totalTrades.reduce(
      (acc, trade) => (acc + (trade?.profit ?? 0) > 0 ? 1 : 0),
      0
    );

    const oldData = (document.sessions ?? []).filter(
      (oldSession: { session: string; trades: number; winTrades: number }) =>
        oldSession.session == session
    )[0];

    return {
      session,
      winTrades: (oldData?.winTrades ?? 0) + winTrades,
      trades: (oldData?.trades ?? 0) + totalTrades.length,
    };
  });

  await StatisticsModel.findOneAndUpdate(
    { forexAccount: params.forexAccountId, year, month },
    [
      {
        $set: {
          forexAccount: new Types.ObjectId(params.forexAccountId),

          long: {
            $add: [{ $ifNull: ['$long', 0] }, longTrades],
          },
          short: {
            $add: [{ $ifNull: ['$short', 0] }, shortTrades],
          },
          year,
          month,
          balance: params.balance,
          trades: {
            $add: [{ $ifNull: ['$trades', 0] }, inserted.length],
          },
          profit: {
            $add: [{ $ifNull: ['$profit', 0] }, pl > 0 ? pl : 0],
          },
          loss: {
            $add: [{ $ifNull: ['$loss', 0] }, pl > 0 ? 0 : pl],
          },
          sessions: sessionData,
          pairs: topPairs,
          lastUpdate: date.toISOString(),
        },
      },
    ],
    { upsert: true, new: true, runValidators: true }
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
