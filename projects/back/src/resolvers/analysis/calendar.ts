import {
  QueryGetTradingHoursAnalysisArgs,
  QueryGetWeekDaysProfitAnalysisArgs,
  ResolversParentTypes,
} from '../../generated/generated';
import { ForexAccountModel } from '../../models';

export const getWeekDaysProfitAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetWeekDaysProfitAnalysisArgs
) => {
  const weekDays: { [key: string]: string } = {
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
  };

  try {
    const rawStatistics = await ForexAccountModel.findById({
      _id: params.forexAccount,
    });

    const statistics = (rawStatistics.weekDays ?? []).map(
      (statistic: { weekDay: number; pl: number }) => ({
        weekDay: weekDays[statistic.weekDay as keyof typeof weekDays],
        pl: statistic.pl.toFixed(1),
      })
    );

    return {
      statistics,
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getTradingHoursAnalysis = async (
  _: ResolversParentTypes,
  params: QueryGetTradingHoursAnalysisArgs
) => {
  try {
    const statistics = await ForexAccountModel.findById(params.forexAccount);

    console.log(statistics.hours);
    return {
      statistics: statistics.hours,
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
