import {
  MutationAddForexAccountArgs,
  MutationDeleteForexAccountArgs,
  MutationEditForexAccountArgs,
  QueryGetForexAccountsArgs,
  ResolversParentTypes,
} from '../generated/generated';
import { ForexAccountModel } from '../models';

const defSessions = [
  {
    session: 'Sydney',
    pl: 0,
  },
  {
    session: 'London',
    pl: 0,
  },
  {
    session: 'New York',
    pl: 0,
  },
  {
    session: 'Tokyo',
    pl: 0,
  },
];

export const addForexAccount = async (
  _: ResolversParentTypes,
  params: MutationAddForexAccountArgs
) => {
  try {
    const date = new Date();
    const forexAccount = new ForexAccountModel({
      ...params,
      broker: '',
      tradeTypes: {
        overall: {
          trades: 0,
          winTrades: 0,
        },
        long: {
          trades: 0,
          winTrades: 0,
          pl: 0,
        },
        short: {
          trades: 0,
          winTrades: 0,
          pl: 0,
        },
      },
      pairs: [],
      sessions: defSessions,
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
    return await ForexAccountModel.find(params).populate('user');
  } catch (err) {
    return [];
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
