import {
  MutationImportTradeHistoryArgs,
  Trade,
} from '../../generated/generated';
import { ForexAccountModel } from '../../models';
import { getSession } from './get-session';
import { getTopPairs } from './get-top-pairs';
import { getWeekDay } from './get-week-day';

export const updateForexAccount = async (
  inserted: Trade[],
  params: MutationImportTradeHistoryArgs
) => {
  const date = new Date();
  const winTrades = inserted.filter(
    trade => trade && trade?.profit >= 0
  ).length;
  const orderTypeData = {
    buy: {
      trades: 0,
      winTrades: 0,
      pl: 0,
    },
    sell: {
      trades: 0,
      winTrades: 0,
      pl: 0,
    },
  };
  const document = await ForexAccountModel.findById(params.forexAccountId);
  const topPairs = getTopPairs(inserted, document.pairs);

  const sessionsData = document.sessions.map(
    (session: { session: string; pl: number }) => {
      const pl = inserted
        .filter(trade =>
          getSession(trade?.openTime ?? '').includes(session.session)
        )
        .reduce((acc, trade) => acc + (trade?.profit ?? 0), 0);
      return {
        session: session.session,
        pl: session.pl + pl,
      };
    }
  );

  const weekDaysData = document.weekDays.map(
    (weekData: { weekDay: number; pl: number }) => {
      const pl = inserted
        .filter(trade => getWeekDay(trade?.openTime ?? '') == weekData.weekDay)
        .reduce((acc, trade) => acc + (trade?.profit ?? 0), 0);
      return {
        weekDay: weekData.weekDay,
        pl: weekData.pl + pl,
      };
    }
  );

  const hoursData = document.hours.map(
    (hoursData: { hour: number; profit: number }) => {
      const profit = inserted
        .filter(trade => {
          const date = new Date(trade?.openTime);
          return date.getHours() == hoursData.hour;
        })
        .reduce((acc, trade) => acc + (trade?.profit ?? 0), 0);
      return {
        hour: hoursData.hour,
        profit: hoursData.profit + profit,
      };
    }
  );

  inserted.map(order => {
    if (order.profit > 0) {
      orderTypeData[order.type.toLowerCase() as keyof typeof orderTypeData]
        .winTrades++;
    }
    orderTypeData[order.type.toLowerCase() as keyof typeof orderTypeData]
      .trades++;
    orderTypeData[order.type.toLowerCase() as keyof typeof orderTypeData].pl +=
      order.profit;
  });

  await ForexAccountModel.findByIdAndUpdate(
    params.forexAccountId,
    [
      {
        $set: {
          balance: {
            prevBalance: {
              $ifNull: ['$balance.balance', params.balance],
            },
            balance: params.balance,
          },
          broker: params.broker,
          winRateTypes: {
            overall: {
              winRate:
                ((document.tradeTypes.overall.winTrades + winTrades) /
                  (document.tradeTypes.overall.trades + inserted.length)) *
                100,
              prevWinRate: {
                $ifNull: [
                  '$winRateTypes.overall.winRate',
                  ((document.tradeTypes.overall.winTrades + winTrades) /
                    (document.tradeTypes.overall.trades + inserted.length)) *
                    100,
                ],
              },
            },
            long: {
              winRate:
                ((document.tradeTypes.long.winTrades +
                  orderTypeData.buy.winTrades) /
                  (orderTypeData.buy.trades == 0
                    ? 1
                    : orderTypeData.buy.trades +
                      document.tradeTypes.long.trades)) *
                100,
              prevWinRate: {
                $ifNull: [
                  '$winRateTypes.long.winRate',
                  ((document.tradeTypes.long.winTrades +
                    orderTypeData.buy.winTrades) /
                    (orderTypeData.buy.trades == 0
                      ? 1
                      : orderTypeData.buy.trades +
                        document.tradeTypes.long.trades)) *
                    100,
                ],
              },
            },
            short: {
              winRate:
                ((document.tradeTypes.short.winTrades +
                  orderTypeData.sell.winTrades) /
                  (orderTypeData.sell.trades == 0
                    ? 1
                    : orderTypeData.sell.trades +
                      document.tradeTypes.short.trades)) *
                100,
              prevWinRate: {
                $ifNull: [
                  '$winRateTypes.short.winRate',
                  ((document.tradeTypes.short.winTrades +
                    orderTypeData.sell.winTrades) /
                    (orderTypeData.sell.trades == 0
                      ? 1
                      : orderTypeData.sell.trades +
                        document.tradeTypes.short.trades)) *
                    100,
                ],
              },
            },
          },
          tradeTypes: {
            overall: {
              trades: { $add: ['$tradeTypes.overall.trades', inserted.length] },
              winTrades: { $add: ['$tradeTypes.overall.winTrades', winTrades] },
            },
            long: {
              trades: {
                $add: ['$tradeTypes.long.trades', orderTypeData.buy.trades],
              },
              winTrades: {
                $add: [
                  '$tradeTypes.long.winTrades',
                  orderTypeData.buy.winTrades,
                ],
              },
              pl: {
                $add: ['$tradeTypes.long.pl', orderTypeData.buy.pl],
              },
            },
            short: {
              trades: {
                $add: ['$tradeTypes.short.trades', orderTypeData.sell.trades],
              },
              winTrades: {
                $add: [
                  '$tradeTypes.short.winTrades',
                  orderTypeData.sell.winTrades,
                ],
              },
              pl: {
                $add: ['$tradeTypes.short.pl', orderTypeData.sell.pl],
              },
            },
          },
          pairs: topPairs,
          sessions: sessionsData,
          weekDays: weekDaysData,
          hours: hoursData,
          lastUpdate: date.toISOString(),
        },
      },
    ],
    { new: true }
  );
};
