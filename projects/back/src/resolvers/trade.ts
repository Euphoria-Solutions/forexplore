import {
  MutationImportTradeHistoryArgs,
  ProfitCalendarDetails,
  QueryGetProfitCalendarArgs,
  QueryGetTradesArgs,
  ResolversParentTypes,
} from '../generated/generated';
import {
  getCurrentWeekDay,
  getLatestDateOfMonth,
  getSession,
  updateForexAccount,
  updateStatistics,
} from '../helper';
import { StatisticsModel, TradeModel } from '../models';

interface DayDataType {
  day: number;
  growthPercent: number;
  growthDollar: number;
  totalTrades: number;
}

export const importTradeHistory = async (
  _: ResolversParentTypes,
  params: MutationImportTradeHistoryArgs
) => {
  try {
    const trades = await TradeModel.find({
      forexAccount: params.forexAccountId,
    });

    const uniqueTrades = params.trades.filter(
      trade =>
        !trades.some(oldTrade => oldTrade.positionId === trade?.positionId)
    );

    if (uniqueTrades.length > 0) {
      const inserted = await TradeModel.insertMany(
        uniqueTrades.map(trade => ({
          session: getSession(trade?.openTime ?? ''),
          plan: null,
          ...trade,
        }))
      );

      // Update Statistics Data
      await updateForexAccount(inserted, params);
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
    if (params.date) {
      const formattedDate = params.date.replace(/-/g, '\\.');
      const regexPattern = `^${formattedDate}`;
      const regex = new RegExp(regexPattern);

      return await TradeModel.find({
        forexAccount: params.forexAccount,
        openTime: { $regex: regex },
      })
        .populate({
          path: 'forexAccount',
          populate: {
            path: 'user',
            model: 'User',
          },
        })
        .populate({
          path: 'plan',
          populate: {
            path: 'tradePlan',
            model: 'TradePlan',
          },
        });
    }
    return await TradeModel.find(params)
      .populate({
        path: 'forexAccount',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .populate({
        path: 'plan',
        populate: {
          path: 'tradePlan',
          model: 'TradePlan',
        },
      });
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getProfitCalendar = async (
  _: ResolversParentTypes,
  params: QueryGetProfitCalendarArgs
) => {
  try {
    const data = (await StatisticsModel.findOne({
      year: params.year,
      month: params.month,
      forexAccount: params.forexAccount,
    })) || { days: [] };

    const latestDate = getLatestDateOfMonth(params.month, params.year);
    let currDate = 1;

    const daysData: ProfitCalendarDetails[] = [];

    while (currDate <= latestDate) {
      const updateIndx = (data.days as DayDataType[]).findIndex(
        oldDay => oldDay.day == currDate
      );
      const weekDay = getCurrentWeekDay(params.year, params.month, currDate);

      daysData.push({
        type: weekDay != 0 && weekDay != 6 ? 'workday' : 'weekend',
        day: currDate,
        totalTrades: updateIndx == -1 ? 0 : data.days[updateIndx].totalTrades,
        growthPercent:
          updateIndx == -1 ? 0 : data.days[updateIndx].growthPercent,
        growthDollar:
          updateIndx == -1 ? 0 : data.days[updateIndx].growthDollar.toFixed(1),
        weekDay: weekDay,
      });

      currDate++;
    }

    return daysData;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
