import { Types } from 'mongoose';
import {
  MutationImportTradeHistoryArgs,
  Trade,
} from '../../generated/generated';
import { StatisticsModel } from '../../models/statistics';
import { getWeekFromDate, months } from '../common';
import { getSession } from './get-session';
import { getTopPairs } from './get-top-pairs';

const defaultStatisticsData = {
  pairs: [],
  weeks: [],
  sessions: [],
};

interface UpdateDataType {
  year: number;
  month: string;
  forexAccount: string;
  longTrades: number;
  winLongTrades: number;
  shortTrades: number;
  winShortTrades: number;
  trades: Trade[];
  profit: number;
  loss: number;
}

const getSessionData = (
  data: Trade[],
  oldDataSessions: { session: string; trades: number; winTrades: number }[]
) => {
  const sessions = ['Sydney', 'London', 'New York', 'Tokyo'];

  return sessions.map((session: string) => {
    const totalTrades = data.filter(trade =>
      getSession(trade?.openTime ?? '').includes(session)
    );

    const winTrades = totalTrades.reduce(
      (acc, trade) => acc + (trade?.profit > 0 ? 1 : 0),
      0
    );

    const oldData = (oldDataSessions ?? []).filter(
      oldSession => oldSession.session == session
    )[0];

    return {
      session,
      winTrades: (oldData?.winTrades ?? 0) + winTrades,
      trades: (oldData?.trades ?? 0) + totalTrades.length,
    };
  });
};

const getWeekData = (
  data: Trade[],
  oldWeekData: { week: number; trades: number }[]
) => {
  const arr = [...oldWeekData];
  data.forEach(trade => {
    const week = getWeekFromDate(trade.closeTime);
    const updateIndx = arr.findIndex(oldWeek => oldWeek.week == week);

    if (updateIndx == -1) {
      arr.push({
        week: week,
        trades: 1,
      });
    } else {
      arr[updateIndx] = {
        week: arr[updateIndx].week,
        trades: arr[updateIndx].trades + 1,
      };
    }
  });
  return arr;
};

export const updateStatistics = async (
  inserted: Trade[],
  params: MutationImportTradeHistoryArgs
) => {
  const updateData: UpdateDataType[] = [];

  // eslint-disable-next-line complexity
  inserted.forEach(trade => {
    const date = new Date(trade.closeTime);

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const updateIndex = updateData.findIndex(
      trade => trade.month === month && trade.year === year
    );

    const isItShort = trade.type == 'sell' ? 1 : 0;
    const isItLong = trade.type == 'buy' ? 1 : 0;

    const isItWinLong = trade.type == 'buy' && trade.profit > 0 ? 1 : 0;
    const isItWinShort = trade.type == 'sell' && trade.profit > 0 ? 1 : 0;

    const isItProfit = trade.profit > 0 ? trade.profit : 0;
    const isItLoss = trade.profit < 0 ? trade.profit : 0;

    if (updateIndex == -1) {
      updateData.push({
        year,
        month,
        forexAccount: trade.forexAccount._id,
        longTrades: isItLong,
        winLongTrades: isItWinLong,
        shortTrades: isItShort,
        winShortTrades: isItWinShort,
        trades: [trade],
        profit: isItProfit,
        loss: isItLoss,
      });
    } else {
      updateData[updateIndex] = {
        ...updateData[updateIndex],
        longTrades: updateData[updateIndex].longTrades + isItLong,
        winLongTrades: updateData[updateIndex].winLongTrades + isItWinLong,
        shortTrades: updateData[updateIndex].shortTrades + isItShort,
        winShortTrades: updateData[updateIndex].winShortTrades + isItWinLong,
        trades: [...updateData[updateIndex].trades, trade],
        profit: updateData[updateIndex].profit + isItProfit,
        loss: updateData[updateIndex].loss + isItLoss,
      };
    }
  });

  await Promise.all(
    updateData.map(async data => {
      const date = new Date();

      const document =
        (await StatisticsModel.findOne({
          forexAccount: params.forexAccountId,
          year: data.year,
          month: data.month,
        })) || defaultStatisticsData;

      await StatisticsModel.findOneAndUpdate(
        {
          forexAccount: params.forexAccountId,
          year: data.year,
          month: data.month,
        },
        [
          {
            $set: {
              forexAccount: new Types.ObjectId(params.forexAccountId),

              long: {
                $add: [{ $ifNull: ['$long', 0] }, data.longTrades],
              },
              winLongTrades: {
                $add: [{ $ifNull: ['$winLongTrades', 0] }, data.winLongTrades],
              },
              short: {
                $add: [{ $ifNull: ['$short', 0] }, data.shortTrades],
              },
              winShortTrades: {
                $add: [
                  { $ifNull: ['$winShortTrades', 0] },
                  data.winShortTrades,
                ],
              },
              year: data.year,
              month: data.month,
              balance: params.balance,
              trades: {
                $add: [{ $ifNull: ['$trades', 0] }, data.trades.length],
              },
              profit: {
                $add: [{ $ifNull: ['$profit', 0] }, data.profit],
              },
              loss: {
                $add: [{ $ifNull: ['$loss', 0] }, data.loss],
              },
              sessions: getSessionData(data.trades, document.sessions),
              pairs: getTopPairs(data.trades, document.pairs ?? []),
              lastUpdate: date.toISOString(),
              weeks: getWeekData(data.trades, document.weeks),
            },
          },
        ],
        { upsert: true, new: true, runValidators: true }
      );
    })
  );
};
