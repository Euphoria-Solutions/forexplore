import {
  MutationImportTradeHistoryArgs,
  QueryGetTradesArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { getSession, updateForexAccount, updateStatistics } from '../helper';
import { TradeModel } from '../models';

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
