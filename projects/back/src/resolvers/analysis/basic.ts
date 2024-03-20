import {
  QueryGetBalanceAnalysisArgs,
  QueryGetPlAnalysisArgs,
  QueryGetTotalTradesAnalysisArgs,
  ResolversParentTypes,
} from '../../generated/generated';
import { getGrowth } from '../../helper';
import { ForexAccountModel, StatisticsModel } from '../../models';

interface Statistic {
  month: string;
  weeks: {
    week: number;
    trades: number;
  }[];
  sessions: {
    session: string;
    trades: number;
    winTrades: number;
  }[];
  lastUpdate: string;
}

const sortByLastUpdate = (array: Statistic[]) => {
  return array.sort((a, b) => {
    const dateA = new Date(a.lastUpdate);
    const dateB = new Date(b.lastUpdate);
    return dateA.getTime() - dateB.getTime();
  });
};

export const getBalanceAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetBalanceAnalysisArgs
) => {
  try {
    const forexAccount = await ForexAccountModel.findById(params.forexAccount);
    const growth = getGrowth(
      forexAccount?.balance?.balance,
      forexAccount?.balance?.prevBalance
    );

    const rawStatistics = await StatisticsModel.find(params);
    const statistics = sortByLastUpdate(rawStatistics);

    return {
      balance: forexAccount.balance.balance,
      growth,
      statistics,
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getWinRateAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetBalanceAnalysisArgs
) => {
  try {
    const forexAccount = await ForexAccountModel.findById(params.forexAccount);
    const growth = getGrowth(
      forexAccount?.winRateTypes?.overall?.winRate,
      forexAccount?.winRateTypes?.overall?.prevWinRate
    );

    return {
      winRate: forexAccount?.winRateTypes?.overall?.winRate.toFixed(1),
      growth,
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getPLAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetPlAnalysisArgs
) => {
  try {
    const rawStatistics = await StatisticsModel.find(params);
    const statistics = sortByLastUpdate(rawStatistics);

    return {
      statistics,
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getTotalTradesAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetTotalTradesAnalysisArgs
) => {
  try {
    const rawStatistics = await StatisticsModel.find({
      forexAccount: params.forexAccount,
    });
    const statistics: Statistic[] = sortByLastUpdate(rawStatistics);

    if (params.type == 'quarter') {
      const quarterData = statistics.map(statistic =>
        statistic.weeks.map(week => ({
          month: statistic.month,
          week: week.week,
          trades: week.trades,
        }))
      );
      const flattenedArray = quarterData.flatMap(innerArray =>
        innerArray.map(obj => obj)
      );
      return { statistics: flattenedArray };
    }

    return { statistics };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
