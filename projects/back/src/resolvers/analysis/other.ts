import {
  QueryGetPersonalWinrateGrowthAnalysisArgs,
  ResolversParentTypes,
} from '../../generated/generated';
import { StatisticsModel } from '../../models';

export const getPersonalWinrateGrowthAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetPersonalWinrateGrowthAnalysisArgs
) => {
  try {
    const rawStatistics = await StatisticsModel.find({
      forexAccount: params.forexAccount,
    });

    const statistics = rawStatistics.map(stat => {
      const winrate = (
        ((stat.winLongTrades + stat.winShortTrades) / stat.trades) *
        100
      ).toFixed(1);

      return {
        month: stat.month,
        winrate: winrate,
      };
    });
    return { statistics };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
