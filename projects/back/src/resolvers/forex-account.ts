import {
  MutationAddForexAccountArgs,
  MutationDeleteForexAccountArgs,
  MutationEditForexAccountArgs,
  QueryGetForexAccountsArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { ForexAccountModel } from '../models';

export const addForexAccount = async (
  _: ResolversParentTypes,
  params: MutationAddForexAccountArgs
) => {
  try {
    const date = new Date();
    const forexAccount = new ForexAccountModel({
      ...params,
      broker: '',
      balance: -1,
      winRate: -1,
      winTrades: 0,
      trades: 0,
      lastUpdate: date.toISOString(),
    });

    await forexAccount.save();

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getForexAccounts = async (
  _: ResolversParentTypes,
  params: QueryGetForexAccountsArgs
) => {
  try {
    return ForexAccountModel.find(params).populate('user');
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const editForexAccount = async (
  _: ResolversParentTypes,
  params: MutationEditForexAccountArgs
) => {
  try {
    await ForexAccountModel.findByIdAndUpdate(params._id, params);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const deleteForexAccount = async (
  _: ResolversParentTypes,
  params: MutationDeleteForexAccountArgs
) => {
  try {
    await ForexAccountModel.findByIdAndDelete(params._id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
