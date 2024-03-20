import {
  QueryGetOrderAnalysisArgs,
  QueryGetPairAnalysisArgs,
  QueryGetSessionAnalysisArgs,
  ResolversParentTypes,
} from '../../generated/generated';
import { getGrowth, getSession } from '../../helper';
import { ForexAccountModel } from '../../models/forex-account';
import { StatisticsModel } from '../../models/statistics';

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
  pairs: {
    pair: string;
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

export const getSessionAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetSessionAnalysisArgs
) => {
  try {
    const forexAccount = await ForexAccountModel.findById(params.forexAccount);
    const date = new Date();
    let status = 'neutral';

    const sessions = forexAccount.sessions.sort(
      (a: { pl: number }, b: { pl: number }) => b.pl - a.pl
    );
    const currentSessions = getSession(date.toISOString());

    sessions.map((session: { session: string; pl: number }) => {
      if (currentSessions.includes(session.session)) {
        if (session.pl == sessions[0].pl) {
          status = 'best';
          return;
        }
        if (session.pl == sessions[sessions.length - 1].pl) {
          status = 'worst';
          return;
        }
      }
    });

    const rawStatistics = await StatisticsModel.find(params);
    const statistics = sortByLastUpdate(rawStatistics);

    const sessionData = statistics.map(statistic => {
      const sessionWinRates: { [key: string]: number } = {};
      statistic.sessions.map(session => {
        sessionWinRates[
          session.session == 'New York' ? 'NewYork' : session.session
        ] =
          Number(((session.winTrades / session.trades) * 100).toFixed(1)) || 0;
      });
      return {
        month: statistic.month,
        ...sessionWinRates,
      };
    });

    return {
      currentSessions,
      sessionType: status,
      statistics: sessionData,
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getOrderAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetOrderAnalysisArgs
) => {
  try {
    const forexAccount = await ForexAccountModel.findById(params.forexAccount);
    const bestOrderType =
      forexAccount.tradeTypes.long.pl > forexAccount.tradeTypes.short.pl
        ? 'long'
        : 'short';
    const growth = getGrowth(
      forexAccount?.winRateTypes[bestOrderType].winRate,
      forexAccount?.winRateTypes[bestOrderType].prevWinRate
    );

    const rawStatistics = await StatisticsModel.find(params);
    const statistics = sortByLastUpdate(rawStatistics);

    return {
      bestOrderType,
      winRate: forexAccount.winRateTypes[bestOrderType].winRate.toFixed(1),
      growth,
      statistics,
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getPairAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetPairAnalysisArgs
) => {
  try {
    const forexAccount = await ForexAccountModel.findById(params.forexAccount);
    const pairs = forexAccount.pairs.map((pair: { pair: string }) => pair.pair);

    const rawStatistics = await StatisticsModel.find(params);
    const statistics = sortByLastUpdate(rawStatistics);

    const bestPairsData = statistics.map(statistic => {
      const pairData = statistic.pairs
        .map(pair => ({
          pair: pair.pair,
          winRate: ((pair.winTrades / pair.trades) * 100).toFixed(1),
        }))
        .sort((a, b) => Number(b.winRate) - Number(a.winRate))
        .slice(0, 4);

      return {
        month: statistic.month,
        statistics: pairData,
      };
    });
    const worstPairsData = statistics.map(statistic => {
      const pairData = statistic.pairs
        .map(pair => ({
          pair: pair.pair,
          winRate: ((pair.winTrades / pair.trades) * 100).toFixed(1),
        }))
        .sort((a, b) => Number(b.winRate) - Number(a.winRate))
        .slice(-4);

      return {
        month: statistic.month,
        statistics: pairData,
      };
    });

    return {
      bestPairs: pairs.slice(0, 4),
      worstPairs: pairs.slice(-4),
      bestPairsStatistics: bestPairsData,
      worstPairsStatistics: worstPairsData,
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
