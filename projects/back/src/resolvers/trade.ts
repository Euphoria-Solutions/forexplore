import {
  MutationImportTradeHistroyArgs,
  QueryGetTradesArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { ForexAccountModel, TradeModel } from '../models';

export const importTradeHistroy = async (
  _: ResolversParentTypes,
  params: MutationImportTradeHistroyArgs
) => {
  try {
    await ForexAccountModel.findByIdAndUpdate(params.forexAccountId, {
      broker: params.broker,
      balance: params.balance,
    });

    await TradeModel.insertMany(params.trades);

    return true;
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
